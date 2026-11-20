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
  * **undefined names** — a reference to a symbol defined nowhere in the
    reconstructed project (a block the guide forgot to show, or a rename that
    left a call site behind). The code is incomplete, but the gap is invisible
    until a reader assembles and runs it.
  * **non-determinism** — wall-clock reads, randomness, or I/O used directly in
    Workflow code instead of the deterministic `workflow.*` equivalents. The
    happy path runs, but the Workflow fails to replay.

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
import builtins
import json
import sys
from pathlib import Path

ALL_CHECKS = (
    "unused_imports",
    "unhandled_failures",
    "undefined_names",
    "nondeterminism",
)

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
# check: undefined names (project-wide)
# --------------------------------------------------------------------------- #
# Names available without being defined in the source.
_BUILTIN_NAMES = set(dir(builtins)) | {
    "__name__", "__file__", "__doc__", "__package__", "__spec__", "__loader__",
    "__builtins__", "__class__", "__qualname__", "__module__", "__annotations__",
    "__dict__", "__path__", "__all__",
}


def _collect_defined(tree: ast.Module) -> set[str]:
    """Every name this module binds, across all scopes.

    Deliberately flattens scopes into one set: a name bound as a local, a
    parameter, a loop/comprehension target, an `except ... as`, a function or
    class, or an import counts as 'defined' everywhere. That trades scope
    precision (a false negative if a name is bound in one function but used
    undefined in another) for very few false positives — which is the right
    bias for a completeness check whose job is to flag names defined *nowhere*.
    """
    defined: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store):
            defined.add(node.id)
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            defined.add(node.name)
        elif isinstance(node, ast.arg):
            defined.add(node.arg)
        elif isinstance(node, ast.ExceptHandler) and node.name:
            defined.add(node.name)
        elif isinstance(node, (ast.Global, ast.Nonlocal)):
            defined.update(node.names)
        elif isinstance(node, ast.Import):
            for alias in node.names:
                defined.add((alias.asname or alias.name).split(".")[0])
        elif isinstance(node, ast.ImportFrom):
            if node.module == "__future__":
                continue
            for alias in node.names:
                if alias.name != "*":
                    defined.add(alias.asname or alias.name)
        else:
            # match-statement captures (3.10+), guarded so older grammars are fine.
            cls = node.__class__.__name__
            if cls == "MatchAs" and getattr(node, "name", None):
                defined.add(node.name)
            elif cls == "MatchStar" and getattr(node, "name", None):
                defined.add(node.name)
            elif cls == "MatchMapping" and getattr(node, "rest", None):
                defined.add(node.rest)
    return defined


def _has_star_import(tree: ast.Module) -> bool:
    return any(
        isinstance(n, ast.ImportFrom) and any(a.name == "*" for a in n.names)
        for n in ast.walk(tree)
    )


def check_undefined_names(parsed: list[tuple[str, ast.Module]]) -> list[dict]:
    """Flag names loaded but defined nowhere in the whole reconstructed project.

    Resolves across all extracted files at once, because a guide splits its code
    over worker/workflow/activities files that reference each other. A flagged
    name is defined in none of them and isn't a builtin — almost always a block
    the guide didn't show or a rename it half-applied. A `from m import *` in any
    file hides what's defined, so the check backs off entirely rather than guess.
    """
    if any(_has_star_import(tree) for _, tree in parsed):
        return []

    defined: set[str] = set(_BUILTIN_NAMES)
    for _, tree in parsed:
        defined |= _collect_defined(tree)

    first_use: dict[tuple[str, str], int] = {}  # (file, name) -> lowest line
    for filename, tree in parsed:
        for node in ast.walk(tree):
            if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                if node.id not in defined:
                    key = (filename, node.id)
                    if key not in first_use or node.lineno < first_use[key]:
                        first_use[key] = node.lineno

    return [
        {
            "check": "undefined_names",
            "file": filename,
            "line": line,
            "symbol": name,
            "message": (
                f"'{name}' is used but defined nowhere in the reconstructed "
                f"project (a block the guide didn't show, or a rename)"
            ),
        }
        for (filename, name), line in first_use.items()
    ]


# --------------------------------------------------------------------------- #
# check: non-determinism in Workflow code
# --------------------------------------------------------------------------- #
# Calls that are non-deterministic in a Workflow, mapped to the SDK-safe form.
_ND_NONDET_EXACT = {
    "datetime.now": "workflow.now()",
    "datetime.utcnow": "workflow.now()",
    "datetime.today": "workflow.now()",
    "datetime.datetime.now": "workflow.now()",
    "datetime.datetime.utcnow": "workflow.now()",
    "datetime.datetime.today": "workflow.now()",
    "time.time": "workflow.now() / workflow.time()",
    "time.time_ns": "workflow.now()",
    "time.monotonic": "workflow.now()",
    "time.monotonic_ns": "workflow.now()",
    "time.sleep": "workflow.sleep()",
    "asyncio.sleep": "workflow.sleep()",
    "uuid.uuid1": "workflow.uuid4()",
    "uuid.uuid4": "workflow.uuid4()",
    "os.urandom": "workflow.random()",
    "os.getrandom": "workflow.random()",
}
_ND_NONDET_PREFIX = ("random.", "secrets.")  # -> workflow.random()
_ND_IO_PREFIX = ("requests.", "httpx.", "aiohttp.", "urllib.", "socket.")
_ND_IO_BARE = {"open", "input"}

# A decorator marks a Workflow when its dotted name is `workflow.defn` (or a
# bare `defn` imported from temporalio.workflow).
def _is_workflow_class(node: ast.ClassDef) -> bool:
    for dec in node.decorator_list:
        target = dec.func if isinstance(dec, ast.Call) else dec
        name = _dotted(target)
        if name == "defn" or name.endswith(".defn"):
            return True
    return False


def check_nondeterminism(filename: str, tree: ast.Module) -> list[dict]:
    """Flag wall-clock, randomness, and I/O used directly in Workflow code.

    Scoped to classes decorated `@workflow.defn`: that's where the SDK enforces
    determinism, and where these calls break replay. Activities (and plain
    helpers) may read the clock or do I/O, so they're left alone. Only
    module-qualified calls (`random.random()`, `time.time()`) and bare
    `open`/`input` are matched; a `from random import randint` style call is a
    known blind spot.
    """
    findings: list[dict] = []
    for cls in ast.walk(tree):
        if not (isinstance(cls, ast.ClassDef) and _is_workflow_class(cls)):
            continue
        for node in ast.walk(cls):
            if not isinstance(node, ast.Call):
                continue
            dotted = _call_name(node)
            bare = dotted.split(".")[-1]

            suggestion = None
            is_io = False
            if dotted in _ND_NONDET_EXACT:
                suggestion = _ND_NONDET_EXACT[dotted]
            elif dotted.startswith(_ND_NONDET_PREFIX):
                suggestion = "workflow.random()"
            elif dotted.startswith(_ND_IO_PREFIX) or (bare in _ND_IO_BARE and dotted == bare):
                is_io = True

            if is_io:
                msg = (
                    f"`{dotted}` performs I/O, which isn't allowed in Workflow code; "
                    f"move it into an Activity"
                )
            elif suggestion:
                msg = (
                    f"`{dotted}` is non-deterministic in Workflow code and breaks "
                    f"replay; use `{suggestion}`"
                )
            else:
                continue

            findings.append(
                {
                    "check": "nondeterminism",
                    "file": filename,
                    "line": node.lineno,
                    "symbol": f"{dotted}(...)",
                    "message": msg,
                }
            )
    return findings


# --------------------------------------------------------------------------- #
# driver
# --------------------------------------------------------------------------- #
# Checks that look at one file at a time.
PER_FILE_CHECKS = {
    "unused_imports": check_unused_imports,
    "unhandled_failures": check_unhandled_failures,
    "nondeterminism": check_nondeterminism,
}
# Checks that need every file at once.
PROJECT_CHECKS = {
    "undefined_names": check_undefined_names,
}


def run(src_dir: Path, enabled: list[str], exclude: set[str]) -> dict:
    findings: list[dict] = []
    errors: list[dict] = []
    parsed: list[tuple[str, ast.Module]] = []

    for path in sorted(src_dir.rglob("*.py")):
        if path.name in exclude:
            continue
        rel = str(path.relative_to(src_dir))
        try:
            tree = ast.parse(path.read_text(encoding="utf-8"), filename=rel)
        except SyntaxError as exc:
            errors.append({"file": rel, "message": f"could not parse: {exc}"})
            continue
        parsed.append((rel, tree))
        for name in enabled:
            check = PER_FILE_CHECKS.get(name)
            if check:
                findings.extend(check(rel, tree))

    for name in enabled:
        check = PROJECT_CHECKS.get(name)
        if check:
            findings.extend(check(parsed))

    findings.sort(key=lambda f: (f["file"], f["line"]))
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
    unknown = [c for c in enabled if c not in ALL_CHECKS]
    if unknown:
        print(f"error: unknown check(s): {', '.join(unknown)}", file=sys.stderr)
        return 2
    exclude = {s.strip() for s in args.exclude.split(",") if s.strip()}

    result = run(args.src_dir, enabled, exclude)
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
