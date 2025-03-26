# Readability Tools

This repository includes a small set of utilities to support content readability.
All tools are Bash scripts, located in the `bin/` directory at the root of this repository.
These scripts help review and transform content to improve documentation processing.
They are lightweight and designed to work within the content-creation and content-evaluation workflow.

## Compatibility notes

These tools were created for macOS and work best in that environment.
Most functionality also works on Linux, but some features—like copying to the clipboard or opening TextEdit—are macOS-specific.
We welcome contributions to improve Linux support or expand compatibility to other platforms.

Scripts support GNU Bash version 3.2.57(1)-release and later.

## plainify tool

`plainify` converts a single `.mdx` file to plain text by removing formatting and markup.
The result is easier to scan, evaluate, or pass through additional tooling.

The script removes:

- Frontmatter
- Code blocks
- Tables
- Headings (converted to uppercase)
- Links (keeps the label, drops the URL)
- MDX admonition blocks like `:::tip`

It writes to `stdout` by default.
You can copy the output, open it in TextEdit, or write it to a `.txt` file in the same folder as the original.

```bash
Usage: plainify [options] <file.mdx>

Options:
  -c            Copy output to clipboard
  -o            Open output in TextEdit
  -w            Write output to a .txt file in the same folder
  -e            Echo to stdout when other flags are used
  -v            Verbose output
  -h            Show this help message
```

Use this tool when reviewing draft content or running readability checks.

### Pre-requisites

This script requires:

- [pandoc](https://pandoc.org), a general file format conversion utility.
  `plainify` uses pandoc to convert Markdown to plain text.
- `sed`, used heavily throughout the script.
  It relies on the Bash-native version from GNU Bash 3.2.57(1) or later.
  
To install pandoc, follow the [Pandoc installation guide](https://pandoc.org/installing.html).
