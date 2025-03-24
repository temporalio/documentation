# Readability Tools

This repository includes a small set of utilities to support content readability.
All tools are Bash scripts, located in the `bin/` directory at the root of this repository.
These scripts help review and transform content to improve documentation processing.
They are lightweight and designed to work within the content-creation and content-evaluation workflow.  

## plainify Tool

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
