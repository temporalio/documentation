#!/usr/bin/env python3
"""Extract runnable source files from a Temporal guide's inline code blocks.

Temporal guides under docs/guides/ show their code as fenced blocks, one file at a
time, with the file's name as a comment on the first line (for example `# worker.py`).
This script pulls those blocks back out into real files so the guide can be run.

Default mode ("comment-header"): a fenced block in the target language whose first
non-empty line is a `# name.ext` (or `// name.ext`) comment is treated as a complete
file. The first block for a given filename wins; later blocks with the same name are
skipped, which is what keeps optional or alternative snippets (a "change this line to
..." variant shown later in the guide) from clobbering the real file. Blocks with no
filename header are ignored entirely.

Alternate mode ("prose-filename"): some guides name each file in the prose just above
the block ("Create a file named `models.py`:") instead of in a comment on the first
line. In this mode the filename is taken from the nearest backtick-quoted `name.ext`
in the few non-empty lines preceding the fence. The same first-block-wins and exclude
rules apply. Use this only for guides that follow the prose convention; the default
comment-header mode is more precise when the guide uses in-block headers.

Alternate mode ("concat-header"): for guides built with the "Code Sandwich" technique,
where one file is shown as a `# name.ext` header block followed by many header-less
continuation blocks interleaved with prose. Here a `# name.ext` header starts (or
switches) the current file, and every following header-less block in the target
language is appended to it until the next header. This is the opposite of
first-block-wins — it concatenates — so it only works when a guide presents each file's
blocks contiguously and at the right indentation (method blocks shown indented under
their class, not dedented to column 0). Excluded files and their continuation blocks
are skipped together.

Usage:
    extract_guide.py GUIDE.mdx OUT_DIR [--lang python]
                      [--mode comment-header|prose-filename|concat-header]
                      [--exclude a.py,b.py]

Prints a JSON summary of what it wrote to stdout.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

# A filename header comment: "# models.py", "// client.ts", "# sub/dir/file.go".
# The name must have an extension so prose comments aren't mistaken for filenames.
_HEADER_RE = re.compile(r"^(?:#|//)\s*([A-Za-z0-9_./-]+\.[A-Za-z0-9]+)\s*$")

# A backtick-quoted filename in prose: `models.py`, `worker/main.py`.
_PROSE_NAME_RE = re.compile(r"`([A-Za-z0-9_./-]+\.[A-Za-z0-9]+)`")

# How many non-empty prose lines above a fence prose-filename mode will look back
# for a filename hint. Guides that use this convention put the name on the line
# right above the block, so a small window avoids picking up an unrelated mention.
_PROSE_LOOKBACK = 8


def _iter_code_blocks(text: str):
    """Yield (info_string, block_lines, open_index) for each fenced block.

    `open_index` is the index in `text.splitlines()` of the opening fence, so a
    caller can look at the prose preceding the block.
    """
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()
        if stripped.startswith("```"):
            open_index = i
            info = stripped[3:].strip()
            fence_indent = len(line) - len(stripped)
            block: list[str] = []
            i += 1
            while i < len(lines):
                closing = lines[i].lstrip()
                if closing.startswith("```"):
                    break
                # Strip the fence's own indentation so nested/indented fences
                # still produce correctly-dedented source.
                block.append(lines[i][fence_indent:] if lines[i][:fence_indent].isspace() else lines[i])
                i += 1
            yield info, block, open_index
        i += 1


def _name_from_comment_header(block: list[str]) -> str | None:
    """Return the filename from a `# name.ext` first line, or None."""
    first = next((ln for ln in block if ln.strip()), "")
    m = _HEADER_RE.match(first.strip())
    return m.group(1) if m else None


def _append_block(lines: list[str], block: list[str]) -> None:
    """Append a block to a file's accumulating lines, with a blank separator."""
    if lines:
        lines.append("")
    lines.extend(block)


def _name_from_prose(lines: list[str], open_index: int) -> str | None:
    """Return the filename named in the prose just above the fence, or None.

    Looks back up to `_PROSE_LOOKBACK` non-empty lines for a backtick-quoted
    `name.ext`, taking the closest one to the fence.
    """
    seen = 0
    for j in range(open_index - 1, -1, -1):
        line = lines[j]
        if line.lstrip().startswith("```"):
            # Don't read across into an earlier code block.
            break
        if not line.strip():
            continue
        seen += 1
        m = _PROSE_NAME_RE.search(line)
        if m:
            return m.group(1)
        if seen >= _PROSE_LOOKBACK:
            break
    return None


def extract(guide: Path, out_dir: Path, lang: str, exclude: set[str], mode: str = "comment-header") -> dict:
    text = guide.read_text(encoding="utf-8")
    all_lines = text.splitlines()
    out_dir.mkdir(parents=True, exist_ok=True)

    # Build an ordered map of filename -> accumulated lines, then write once.
    files: dict[str, list[str]] = {}
    skipped_duplicate: list[str] = []
    excluded: list[str] = []

    if mode == "concat-header":
        current: str | None = None  # file the current run of blocks belongs to
        current_excluded = False
        for info, block, _ in _iter_code_blocks(text):
            if info != lang:
                continue
            header = _name_from_comment_header(block)
            if header:
                base = Path(header).name
                current = base
                current_excluded = base in exclude
                if current_excluded:
                    if base not in excluded:
                        excluded.append(base)
                    continue
                _append_block(files.setdefault(base, []), block)
            elif current is not None and not current_excluded:
                _append_block(files[current], block)
    else:
        for info, block, open_index in _iter_code_blocks(text):
            if info != lang:
                continue
            if mode == "prose-filename":
                name = _name_from_prose(all_lines, open_index)
            else:
                name = _name_from_comment_header(block)
            if not name:
                continue
            base = Path(name).name  # flatten any path in the header to a bare filename
            if base in exclude:
                if base not in excluded:
                    excluded.append(base)
                continue
            if base in files:  # first block per filename wins
                skipped_duplicate.append(base)
                continue
            files[base] = list(block)

    written: list[str] = []
    for base, lines in files.items():
        (out_dir / base).write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
        written.append(base)

    return {
        "guide": str(guide),
        "out_dir": str(out_dir),
        "lang": lang,
        "mode": mode,
        "written": written,
        "skipped_duplicate": skipped_duplicate,
        "excluded": excluded,
    }


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("guide", type=Path, help="Path to the guide .mdx file")
    p.add_argument("out_dir", type=Path, help="Directory to write extracted files into")
    p.add_argument("--lang", default="python", help="Fenced-block language tag to extract (default: python)")
    p.add_argument(
        "--mode",
        default="comment-header",
        choices=["comment-header", "prose-filename", "concat-header"],
        help="How to find each block's filename (default: comment-header)",
    )
    p.add_argument("--exclude", default="", help="Comma-separated filenames to extract-skip (e.g. test_determinism.py)")
    args = p.parse_args(argv)

    if not args.guide.is_file():
        print(f"error: guide not found: {args.guide}", file=sys.stderr)
        return 2

    exclude = {s.strip() for s in args.exclude.split(",") if s.strip()}
    result = extract(args.guide, args.out_dir, args.lang, exclude, args.mode)
    if not result["written"]:
        print(
            f"error: no {args.lang} files with a '# filename' header found in {args.guide}",
            file=sys.stderr,
        )
        print(json.dumps(result, indent=2))
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
