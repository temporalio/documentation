#!/usr/bin/env python3
"""Run a Temporal guide end to end against a local dev server and check its output.

Given a manifest (or a guide id that resolves to manifests/<id>.json), this:
  1. ensures the Temporal CLI and uv are installed (auto-installs via Homebrew),
  2. rebuilds the guide's project from its inline code blocks,
  3. starts a fresh `temporal server start-dev` on 7233,
  4. runs the guide's worker (background) and driver (foreground, output captured),
  5. asserts the driver's output contains what the manifest expects,
  6. tears everything down and reports.

Exit code 0 means every assertion passed. See references/authoring-manifests.md for
the manifest schema.
"""
from __future__ import annotations

import argparse
import json
import os
import shlex
import shutil
import signal
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
MANIFESTS_DIR = SKILL_DIR / "manifests"
EXTRACT_SCRIPT = SKILL_DIR / "scripts" / "extract_guide.py"
STATIC_SCRIPT = SKILL_DIR / "scripts" / "static_checks.py"

ALL_STATIC_CHECKS = (
    "unused_imports",
    "unhandled_failures",
    "undefined_names",
    "nondeterminism",
)

TEMPORAL_HOST = "127.0.0.1"
TEMPORAL_PORT = 7233


# --------------------------------------------------------------------------- #
# small helpers
# --------------------------------------------------------------------------- #
def log(msg: str) -> None:
    print(f"[guide-test] {msg}", flush=True)


def find_repo_root(start: Path) -> Path:
    """Walk up from `start` to the git repo root (where docs/ lives)."""
    cur = start.resolve()
    for parent in [cur, *cur.parents]:
        if (parent / ".git").exists() and (parent / "docs").is_dir():
            return parent
    # Fall back to the skill's repo root (…/.claude/skills/docs-guide-test -> repo).
    return SKILL_DIR.parents[2]


def port_open(host: str, port: int, timeout: float = 0.5) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(timeout)
        return s.connect_ex((host, port)) == 0


def ensure_tool(name: str, brew_formula: str, auto_install: bool) -> None:
    """Make sure a CLI is on PATH, installing it with Homebrew if allowed."""
    if shutil.which(name):
        return
    if not auto_install:
        raise SystemExit(f"error: `{name}` is not installed and auto-install is off.")
    if not shutil.which("brew"):
        raise SystemExit(
            f"error: `{name}` is missing and Homebrew isn't available to install it. "
            f"Install `{name}` and re-run."
        )
    log(f"installing {name} via Homebrew…")
    r = subprocess.run(["brew", "install", brew_formula])
    if r.returncode != 0 or not shutil.which(name):
        raise SystemExit(f"error: failed to install `{name}`.")


def terminate(proc: subprocess.Popen | None) -> None:
    """Stop a background process and its group, politely then firmly."""
    if proc is None or proc.poll() is not None:
        return
    try:
        os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
    except ProcessLookupError:
        return
    try:
        proc.wait(timeout=10)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
        except ProcessLookupError:
            pass


def run_setup_steps(steps: list[str], verbose: bool) -> bool:
    """Run one-time setup commands against the ready server.

    Used for things a guide expects to exist before its Worker starts but that a
    fresh `temporal server start-dev` does not create on its own: custom Search
    Attributes, extra Namespaces, and the like. Each step is a shell-style command
    string (for example, `temporal operator search-attribute create --name Foo
    --type Keyword`). A failing step fails the run, since the guide's code depends
    on it. Steps are expected to be idempotent-friendly but need not be.
    """
    for step in steps:
        log(f"setup: {step}")
        r = subprocess.run(
            shlex.split(step),
            capture_output=not verbose,
            text=True,
            timeout=60,
        )
        if r.returncode != 0:
            log(f"setup step failed (exit {r.returncode}): {step}")
            if not verbose:
                print(r.stdout or "")
                print(r.stderr or "", file=sys.stderr)
            return False
    return True


def tail(path: Path, n: int = 40) -> str:
    if not path.is_file():
        return "(no output)"
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    return "\n".join(lines[-n:]) or "(empty)"


# --------------------------------------------------------------------------- #
# static checks
# --------------------------------------------------------------------------- #
def run_static_checks(src_dir: Path, checks_cfg: dict) -> tuple[list[dict], bool]:
    """Run the static source checks and print their section. Returns (findings, fatal).

    `fatal` is True only when the manifest opted in with `checks.fail_on_findings`
    and at least one finding was reported. By default these checks are advisory:
    they surface defects a passing end-to-end run can't (dead imports, unhandled
    failure paths) without turning a working guide red.
    """
    # Which checks to run. Each defaults on; set a check to false in the manifest
    # to turn it off. `fail_on_findings` and `exclude` are config, not checks.
    enabled = [
        name for name in ALL_STATIC_CHECKS if checks_cfg.get(name, True)
    ]
    if not enabled:
        return [], False

    exclude = ",".join(checks_cfg.get("exclude", []))
    cmd = [sys.executable, str(STATIC_SCRIPT), str(src_dir), "--checks", ",".join(enabled)]
    if exclude:
        cmd += ["--exclude", exclude]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        log("static checks could not run:")
        print(res.stderr or res.stdout)
        return [], False

    data = json.loads(res.stdout)
    findings = data.get("findings", [])
    errors = data.get("errors", [])

    print("\n" + "=" * 60)
    print("STATIC CHECKS")
    print("=" * 60)
    if not findings and not errors:
        print("  [OK] no findings")
    for err in errors:
        print(f"  [SKIP] {err['file']}: {err['message']}")
    for f in findings:
        print(f"  [{f['check']}] {f['file']}:{f['line']}  {f['message']}")

    fatal = bool(findings) and bool(checks_cfg.get("fail_on_findings", False))
    if findings and not fatal:
        print("  (advisory: these do not fail the run; set checks.fail_on_findings to change that)")
    return findings, fatal


# --------------------------------------------------------------------------- #
# manifest
# --------------------------------------------------------------------------- #
def load_manifest(arg: str) -> tuple[Path, dict]:
    candidate = Path(arg)
    if candidate.is_file():
        path = candidate
    else:
        path = MANIFESTS_DIR / (arg if arg.endswith(".json") else f"{arg}.json")
    if not path.is_file():
        raise SystemExit(f"error: no manifest at {path}")
    return path, json.loads(path.read_text(encoding="utf-8"))


# --------------------------------------------------------------------------- #
# python runner (via uv)
# --------------------------------------------------------------------------- #
def setup_python_env(workdir: Path, manifest: dict, verbose: bool) -> Path:
    """Create an isolated venv with the guide's deps; return the python executable."""
    py_version = str(manifest.get("python", "3.12"))
    deps = manifest.get("pip", [])
    venv = workdir / ".venv"

    log(f"creating venv (python {py_version}) with uv…")
    subprocess.run(
        ["uv", "venv", "--python", py_version, str(venv)],
        check=True,
        capture_output=not verbose,
    )
    python = venv / "bin" / "python"
    if deps:
        log(f"installing: {', '.join(deps)}")
        subprocess.run(
            ["uv", "pip", "install", "--python", str(python), *deps],
            check=True,
            capture_output=not verbose,
        )
    return python


# --------------------------------------------------------------------------- #
# main run
# --------------------------------------------------------------------------- #
def run(manifest_arg: str, keep: bool, verbose: bool, auto_install: bool) -> int:
    manifest_path, manifest = load_manifest(manifest_arg)
    guide_id = manifest_path.stem

    if manifest.get("skip"):
        log(f"SKIP {guide_id}: {manifest['skip']}")
        return 0

    language = manifest.get("language", "python")
    if language != "python":
        raise SystemExit(f"error: language '{language}' is not supported yet (pilot is Python only).")

    repo_root = find_repo_root(Path(manifest.get("repo_root", "."))) if manifest.get("repo_root") else find_repo_root(Path.cwd())
    guide_path = (repo_root / manifest["guide"]).resolve()
    if not guide_path.is_file():
        raise SystemExit(f"error: guide not found: {guide_path}")

    # Prerequisites.
    ensure_tool("temporal", "temporal", auto_install)
    ensure_tool("uv", "uv", auto_install)

    workdir = Path(tempfile.mkdtemp(prefix=f"guide-test-{guide_id}-"))
    log(f"workdir: {workdir}")
    server_proc: subprocess.Popen | None = None
    worker_proc: subprocess.Popen | None = None
    server_log = workdir / "server.log"
    worker_log = workdir / "worker.log"

    try:
        # 1. Reconstruct the project from the guide's code blocks.
        extract = manifest.get("extract", {})
        exclude = ",".join(extract.get("exclude", []))
        mode = extract.get("mode", "concat-header")
        src_dir = workdir / "src"
        cmd = [sys.executable, str(EXTRACT_SCRIPT), str(guide_path), str(src_dir), "--lang", language, "--mode", mode]
        if exclude:
            cmd += ["--exclude", exclude]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            log("extraction failed:")
            print(res.stdout)
            print(res.stderr, file=sys.stderr)
            return 1
        extracted = json.loads(res.stdout)
        log(f"extracted {len(extracted['written'])} files: {', '.join(extracted['written'])}")

        # 1b. Static checks over the reconstructed source (unused imports,
        # unhandled failure paths). These need no server or execution, so run
        # them now; they're advisory unless the manifest opts into failing.
        static_findings, static_fatal = run_static_checks(src_dir, manifest.get("checks", {}))

        # 2. Python environment.
        python = setup_python_env(workdir, manifest, verbose)

        # 3. Fresh local server on 7233.
        if port_open(TEMPORAL_HOST, TEMPORAL_PORT):
            log(
                f"error: port {TEMPORAL_PORT} is already in use. Stop the running "
                f"Temporal server and re-run so the test gets a clean, isolated server."
            )
            return 1
        log("starting temporal server start-dev…")
        with open(server_log, "w") as slog:
            server_proc = subprocess.Popen(
                ["temporal", "server", "start-dev"],
                stdout=slog,
                stderr=subprocess.STDOUT,
                start_new_session=True,
            )
        deadline = time.time() + 30
        while time.time() < deadline and not port_open(TEMPORAL_HOST, TEMPORAL_PORT):
            if server_proc.poll() is not None:
                log("server exited early:")
                print(tail(server_log))
                return 1
            time.sleep(0.3)
        if not port_open(TEMPORAL_HOST, TEMPORAL_PORT):
            log("server did not become ready in time:")
            print(tail(server_log))
            return 1
        log("server ready.")

        # 3b. One-time setup against the ready server (Search Attributes,
        # extra Namespaces) that the guide's code expects to exist.
        setup_steps = manifest.get("setup", [])
        if setup_steps and not run_setup_steps(setup_steps, verbose):
            print(tail(server_log))
            return 1

        # 4a. Worker in the background.
        worker_cmd = manifest["worker"]
        log(f"starting worker: {worker_cmd}")
        with open(worker_log, "w") as wlog:
            worker_proc = subprocess.Popen(
                [str(python), *worker_cmd.split()[1:]] if worker_cmd.startswith("python ") else worker_cmd.split(),
                cwd=src_dir,
                stdout=wlog,
                stderr=subprocess.STDOUT,
                start_new_session=True,
                env={**os.environ, "PYTHONUNBUFFERED": "1"},
            )
        time.sleep(float(manifest.get("startup_wait_seconds", 4)))
        if worker_proc.poll() is not None:
            log("worker exited before the driver ran:")
            print(tail(worker_log))
            return 1

        # 4b. Driver in the foreground, output captured.
        driver_cmd = manifest["driver"]
        log(f"running driver: {driver_cmd}")
        driver = subprocess.run(
            [str(python), *driver_cmd.split()[1:]] if driver_cmd.startswith("python ") else driver_cmd.split(),
            cwd=src_dir,
            capture_output=True,
            text=True,
            timeout=int(manifest.get("driver_timeout_seconds", 120)),
            env={**os.environ, "PYTHONUNBUFFERED": "1"},
        )
        driver_out = driver.stdout + driver.stderr
        if verbose:
            print(driver_out)

        # 5. Assertions.
        checks = manifest.get("assert", {})
        expected = checks.get("stdout_contains", [])
        results = [(needle, needle in driver_out) for needle in expected]
        exit_ok = (not checks.get("driver_exit_zero", True)) or driver.returncode == 0

        print("\n" + "=" * 60)
        print(f"GUIDE: {guide_id}")
        print("=" * 60)
        for needle, ok in results:
            print(f"  [{'PASS' if ok else 'FAIL'}] output contains: {needle!r}")
        if checks.get("driver_exit_zero", True):
            print(f"  [{'PASS' if driver.returncode == 0 else 'FAIL'}] driver exited 0 (got {driver.returncode})")

        run_pass = exit_ok and all(ok for _, ok in results)
        if static_fatal:
            print(f"  [FAIL] static checks reported {len(static_findings)} finding(s) "
                  f"(checks.fail_on_findings is set)")
        all_pass = run_pass and not static_fatal
        print("-" * 60)
        print("RESULT:", "PASS ✅" if all_pass else "FAIL ❌")
        print("=" * 60)

        if not run_pass:
            print("\n--- driver output ---\n" + (driver_out or "(none)"))
            print("\n--- worker log (tail) ---\n" + tail(worker_log))
            print("\n--- server log (tail) ---\n" + tail(server_log))
        return 0 if all_pass else 1

    except subprocess.TimeoutExpired:
        log("driver timed out.")
        print("\n--- worker log (tail) ---\n" + tail(worker_log))
        return 1
    finally:
        if keep:
            log(f"--keep set: leaving workdir and servers up. workdir={workdir}")
        else:
            terminate(worker_proc)
            terminate(server_proc)
            shutil.rmtree(workdir, ignore_errors=True)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("manifest", help="Guide id (manifests/<id>.json) or a path to a manifest file")
    p.add_argument("--keep", action="store_true", help="Leave the scratch dir and servers running for inspection")
    p.add_argument("--verbose", action="store_true", help="Stream dependency install and driver output")
    p.add_argument("--no-install", action="store_true", help="Do not auto-install missing prerequisites")
    args = p.parse_args(argv)
    return run(args.manifest, keep=args.keep, verbose=args.verbose, auto_install=not args.no_install)


if __name__ == "__main__":
    raise SystemExit(main())
