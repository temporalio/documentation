#!/usr/bin/env python3
"""Static checks over a guide's reconstructed source files.

The end-to-end runner (`run_guide_test.py`) catches a guide whose happy path
stopped working. It does not catch two classes of defect that leave the happy
path green:

  * **unused imports** — an `import` the code never uses never raises at runtime,
    so the guide runs fine with dead imports a reader would copy verbatim.
  * **unhandled failure conditions** — a failure path (a `wait_condition` timeout,
    an Activity whose bounded retries are exhausted) is never exercised when
    nothing fails, so the Workflow that *would* crash on it runs clean.

Both are findings a human reviewer raised on real guide PRs. They are structural
properties of the source, so this script finds them by parsing the extracted
files with the `ast` module — no dependencies, no server, no execution.

These are **heuristics**, reported as findings for a human to judge, not proof of
a bug. `run_guide_test.py` treats them as warnings by default; a manifest can opt
a guide into failing the run on findings. See references/authoring-manifests.md.

Usage:
    static_checks.py SRC_DIR [--checks unused_imports,unhandled_failures]
                             [--exclude a.py,b.py]

Prints a JSON object {"findings": [...], "errors": [...]} to stdout.
"""
from __future__ import annotations

import argparse
import ast
import json
import sys
from pathlib import Path

ALL_CHECKS = ("unused_imports", "unhandled_failures")

# Exception names that count as handling a wait_condition timeout.
_TIMEOUT_EXCS = {
    "TimeoutError",
    "asyncio.TimeoutError",
    "CancelledError",
    "asyncio.CancelledError",
}
# A catch-all handler handles anything.
_CATCHALL = {"*bare*", "Exception", "BaseException"}

# Temporal calls that launch an Activity and can surface a failure to the caller.
_ACTIVITY_CALLS = {
    "execute_activity",
    "execute_activity_method",
    "execute_local_activity",
    "execute_local_activity_method",
    "start_activity",
    "start_local_activity",
}


# --------------------------------------------------------------------------- #
# ast helpers
# --------------------------------------------------------------------------- #
def _dotted(node: ast.AST) -> str:
    """Render a Name/Attribute chain as a dotted string (``a.b.c``)."""
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        base = _dotted(node.value)
        return f"{base}.{node.attr}" if base else node.attr
    return ""


def _call_name(node: ast.Call) -> str:
    return _dotted(node.func)


def _has_kw(node: ast.Call, name: str) -> bool:
    return any(kw.arg == name for kw in node.keywords)


def _handler_exc_names(handler: ast.ExceptHandler) -> set[str]:
    """Dotted names an `except` clause catches; a bare `except:` yields `*bare*`."""
    if handler.type is None:
        return {"*bare*"}
    parts = handler.type.elts if isinstance(handler.type, ast.Tuple) else [handler.type]
    return {_dotted(p) for p in parts}


def _dunder_all(tree: ast.Module) -> set[str]:
    """Names listed in a module-level `__all__`, which count as 'used' (re-exports)."""
    names: set[str] = set()
    for node in tree.body:
        if isinstance(node, ast.Assign) and any(
            isinstance(t, ast.Name) and t.id == "__all__" for t in node.targets
        ):
            value = node.value
            if isinstance(value, (ast.List, ast.Tuple)):
                for elt in value.elts:
                    if isinstance(elt, ast.Constant) and isinstance(elt.value, str):
                        names.add(elt.value)
    return names


# --------------------------------------------------------------------------- #
# check: unused imports
# --------------------------------------------------------------------------- #
def check_unused_imports(filename: str, tree: ast.Module) -> list[dict]:
    """Flag imports whose bound name is never referenced in the file.

    Handles the common cases: `import a.b` binds `a`; `import a.b as c` binds `c`;
    `from m import x as y` binds `y`; names in `__all__` count as used. A star
    import (`from m import *`) makes tracking impossible, so the file is skipped.
    Known blind spot: a name used only inside a string annotation is not seen as
    used, so a purely type-checking import can be a false positive.
    """
    imported: dict[str, tuple[int, str]] = {}  # bound name -> (lineno, display)
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                bound = (alias.asname or alias.name).split(".")[0]
                imported[bound] = (node.lineno, alias.asname or alias.name)
        elif isinstance(node, ast.ImportFrom):
            if node.module == "__future__":
                continue  # `from __future__ import annotations` is never referenced
            if any(alias.name == "*" for alias in node.names):
                return []  # can't track usage through a star import
            for alias in node.names:
                bound = alias.asname or alias.name
                display = f"{node.module}.{alias.name}" if node.module else alias.name
                imported[bound] = (node.lineno, display)

    used: set[str] = {n.id for n in ast.walk(tree) if isinstance(n, ast.Name)}
    used |= _dunder_all(tree)

    findings = []
    for bound, (lineno, display) in sorted(imported.items(), key=lambda kv: kv[1][0]):
        if bound not in used:
            findings.append(
                {
                    "check": "unused_imports",
                    "file": filename,
                    "line": lineno,
                    "symbol": bound,
                    "message": f"'{display}' imported but never used",
                }
            )
    return findings


# --------------------------------------------------------------------------- #
# check: unhandled failure conditions
# --------------------------------------------------------------------------- #
def _file_has_bounded_retry(tree: ast.Module) -> bool:
    """True if the file builds a `RetryPolicy(maximum_attempts=...)` anywhere.

    A bounded retry policy is what makes an Activity's failure *terminal*: once
    the attempts run out, the error propagates to the caller. Without one, the
    default policy retries indefinitely, so an unguarded call is not the same
    smell. We gate the Activity check on this so we don't flag every call.
    """
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Call)
            and _call_name(node).split(".")[-1] == "RetryPolicy"
            and _has_kw(node, "maximum_attempts")
        ):
            return True
    return False


class _FailureVisitor(ast.NodeVisitor):
    """Walk a module tracking which exceptions are caught at each point.

    As it descends into a `try` body it pushes that `try`'s handled exception
    set; a target call is "handled" when the running set covers the relevant
    exception. Handler and `finally` bodies are visited without the `try`'s own
    protection (an error there is not caught by the same handlers).
    """

    def __init__(self, filename: str, retry_is_bounded: bool):
        self.filename = filename
        self.retry_is_bounded = retry_is_bounded
        self._caught_stack: list[set[str]] = []
        self.findings: list[dict] = []

    def _caught(self) -> set[str]:
        out: set[str] = set()
        for layer in self._caught_stack:
            out |= layer
        return out

    def visit_Try(self, node: ast.Try) -> None:
        caught: set[str] = set()
        for handler in node.handlers:
            caught |= _handler_exc_names(handler)
        self._caught_stack.append(caught)
        for stmt in node.body:
            self.visit(stmt)
        for stmt in node.orelse:
            self.visit(stmt)
        self._caught_stack.pop()
        # Handlers and finally run outside this try's protection.
        for handler in node.handlers:
            for stmt in handler.body:
                self.visit(stmt)
        for stmt in node.finalbody:
            self.visit(stmt)

    def visit_Call(self, node: ast.Call) -> None:
        base = _call_name(node).split(".")[-1]

        if base == "wait_condition" and _has_kw(node, "timeout"):
            caught = self._caught()
            if not (caught & _CATCHALL or caught & _TIMEOUT_EXCS):
                self.findings.append(
                    {
                        "check": "unhandled_failures",
                        "file": self.filename,
                        "line": node.lineno,
                        "symbol": "wait_condition(timeout=...)",
                        "message": (
                            "wait_condition has a timeout but no surrounding "
                            "try/except for asyncio.TimeoutError; on timeout the "
                            "exception propagates and fails the Workflow"
                        ),
                    }
                )

        if base in _ACTIVITY_CALLS and self.retry_is_bounded and not self._caught():
            self.findings.append(
                {
                    "check": "unhandled_failures",
                    "file": self.filename,
                    "line": node.lineno,
                    "symbol": f"{base}(...)",
                    "message": (
                        "Activity is executed with no surrounding try/except while "
                        "the file sets a bounded retry policy (maximum_attempts); "
                        "exhausted retries raise ActivityError and fail the Workflow"
                    ),
                }
            )

        self.generic_visit(node)


def check_unhandled_failures(filename: str, tree: ast.Module) -> list[dict]:
    visitor = _FailureVisitor(filename, _file_has_bounded_retry(tree))
    visitor.visit(tree)
    return visitor.findings


# --------------------------------------------------------------------------- #
# driver
# --------------------------------------------------------------------------- #
CHECKS = {
    "unused_imports": check_unused_imports,
    "unhandled_failures": check_unhandled_failures,
}


def run(src_dir: Path, enabled: list[str], exclude: set[str]) -> dict:
    findings: list[dict] = []
    errors: list[dict] = []
    for path in sorted(src_dir.rglob("*.py")):
        if path.name in exclude:
            continue
        rel = str(path.relative_to(src_dir))
        try:
            tree = ast.parse(path.read_text(encoding="utf-8"), filename=rel)
        except SyntaxError as exc:
            errors.append({"file": rel, "message": f"could not parse: {exc}"})
            continue
        for name in enabled:
            findings.extend(CHECKS[name](rel, tree))
    return {"findings": findings, "errors": errors}


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    p.add_argument("src_dir", type=Path, help="Directory of extracted source files")
    p.add_argument(
        "--checks",
        default=",".join(ALL_CHECKS),
        help=f"Comma-separated checks to run (default: all). Available: {', '.join(ALL_CHECKS)}",
    )
    p.add_argument("--exclude", default="", help="Comma-separated filenames to skip")
    args = p.parse_args(argv)

    if not args.src_dir.is_dir():
        print(f"error: not a directory: {args.src_dir}", file=sys.stderr)
        return 2

    enabled = [c.strip() for c in args.checks.split(",") if c.strip()]
    unknown = [c for c in enabled if c not in CHECKS]
    if unknown:
        print(f"error: unknown check(s): {', '.join(unknown)}", file=sys.stderr)
        return 2
    exclude = {s.strip() for s in args.exclude.split(",") if s.strip()}

    result = run(args.src_dir, enabled, exclude)
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
