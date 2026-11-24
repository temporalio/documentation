#!/usr/bin/env python3
"""Check that a revised guide preserves all code from the original.

Usage:
    python check_code_preserved.py ORIGINAL.md[x] REVISED.md[x]

Extracts fenced code blocks from both documents and compares their code lines
in order. Indentation, blank lines, comment-only lines, trailing comments, and
docstrings are ignored, because the Code Sandwich technique moves comments into
prose and splitting blocks can change surrounding whitespace.

Diagram blocks (mermaid) are compared separately, ignoring order, because
diagrams get moved into implementation steps.

Exit code 0 if no code is missing, 1 otherwise. New lines in the revision are
reported but don't fail the check (context lines like `class X:` are allowed).
"""

import difflib
import re
import sys

FENCE_RE = re.compile(r"^(\s*)(`{3,}|~{3,})\s*([\w+-]*)")
DIAGRAM_LANGS = {"mermaid"}
INLINE_COMMENT_RE = re.compile(r"\s{2,}(#|//).*$")


def extract_blocks(text):
    """Return a list of (lang, [lines]) for each fenced code block."""
    blocks = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        m = FENCE_RE.match(lines[i])
        if not m:
            i += 1
            continue
        fence, lang = m.group(2), m.group(3).lower()
        body = []
        i += 1
        while i < len(lines) and not lines[i].strip().startswith(fence):
            body.append(lines[i])
            i += 1
        blocks.append((lang, body))
        i += 1
    return blocks


def normalize(body):
    """Reduce a code block to comparable code lines."""
    out = []
    in_doc = None
    for raw in body:
        line = raw.strip()
        if in_doc:
            if in_doc in line:
                in_doc = None
            continue
        for q in ('"""', "'''"):
            if line.startswith(q):
                rest = line[3:]
                if q not in rest:
                    in_doc = q
                line = ""
                break
        if not line:
            continue
        if line.startswith("#") or line.startswith("//"):
            continue
        line = INLINE_COMMENT_RE.sub("", line)
        line = re.sub(r"\s+", " ", line).strip()
        if line:
            out.append(line)
    return out


def collect(text):
    code, diagrams = [], []
    for lang, body in extract_blocks(text):
        if lang in DIAGRAM_LANGS:
            diagrams.append(tuple(normalize(body)))
        else:
            code.extend(normalize(body))
    return code, diagrams


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    with open(sys.argv[1], encoding="utf-8") as f:
        orig_code, orig_diagrams = collect(f.read())
    with open(sys.argv[2], encoding="utf-8") as f:
        rev_code, rev_diagrams = collect(f.read())

    sm = difflib.SequenceMatcher(a=orig_code, b=rev_code, autojunk=False)
    missing, added = [], []
    for tag, a1, a2, b1, b2 in sm.get_opcodes():
        if tag in ("delete", "replace"):
            missing.extend(orig_code[a1:a2])
        if tag in ("insert", "replace"):
            added.extend(rev_code[b1:b2])

    print(f"Original code lines: {len(orig_code)}  Revised code lines: {len(rev_code)}")

    if missing:
        print(f"\nMISSING from revision ({len(missing)} lines):")
        for line in missing:
            print(f"  - {line}")
    else:
        print("\nNo code is missing.")

    if added:
        print(f"\nNEW in revision ({len(added)} lines) — confirm each is intentional:")
        for line in added:
            print(f"  + {line}")

    lost = [d for d in orig_diagrams if d not in rev_diagrams]
    if lost:
        print(f"\nDIAGRAMS changed or removed: {len(lost)} of {len(orig_diagrams)}")
    elif orig_diagrams:
        print(f"\nAll {len(orig_diagrams)} diagrams preserved.")

    sys.exit(1 if missing or lost else 0)


if __name__ == "__main__":
    main()
