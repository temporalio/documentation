# Temporal Documentation Site Utilities

This file documents utilities meant to support repository health.
These utilities are not meant for use by contributors.

## audit-stray-pages

[**Docusaurus**](https://docusaurus.io) serves all files, whether they are mentioned in sidebars.js or not.
[**Algolia**](https://algolia.com) will index these files so they show up in search, even though we intend to hide them.

The `audit-stray-pages` utility audits unreferenced docs files so they can be evaluated and, if needed, hidden in Docusaurus.
This script scans your Docusaurus project for `.md` and `.mdx` files in the top level `docs/` folder and reports the ones that are **not actively referenced** in your `sidebars.js` file. "Not actively referenced" includes:

- Files that were commented out in sidebars.js
- Files that are not included at all

It helps you find:

- Stray or deprecated documentation pages that aren’t in the site navigation
- Files that are publicly accessible but unintentionally published
- Gaps in `id:` usage where default IDs don’t match sidebar references

You can hide Docusaurus files by setting them to drafts in the file metadata:

```
draft: true
```

Docusaurus will render drafts in preview mode but not production.

**Please note**: 

- Some "deprecated" files are left intentionally visible outside the normal navigation system and are linked from other pages.
  They should not be set to draft as that breaks `yarn build` and will fail CI and Vercel deployment.
- The sidebars.js file does not use `/path/to/file.mdx`.
  It uses `/path/to/folder/your-file-id`, which uses the `id: your-file-id` declared in your mdx YAML frontmatter.
- Slugs are not equivalent to ids.
  Ids are used to stitch together the site.

### What It Does

1. **Parses `sidebars.js`** to extract all actively referenced doc IDs  
   - Ignores lines that are commented out (`//` or `/* ... */`)
2. **Extracts doc IDs** from sidebar references, including:
   - Simple string references: `"foo/bar"`
   - Object syntax: `{ type: 'doc', id: 'foo/bar' }`
3. **Scans all `.md` and `.mdx` files** in the `docs/` directory:
   - First checks if the file's path-derived ID is in the sidebar
   - Then checks for a frontmatter `id:` override and searches that
   - If neither is found, the file is flagged as unreferenced

### Usage

Save the script as `audit-stray-pages` and make it executable:

```bash
chmod +x audit-stray-pages
./audit-stray-pages
```

### Work

After running the script, review each unreferenced file carefully.

- Some files may be intentionally excluded from the sidebar, such as deprecated pages or internal drafts.
- Others may be unintentional omissions that should be added to sidebars.js.
- Others are intentionally excluded but not referenced from anywhere on the site.
  This is deliberate in the case of `tctl` pages.
  This is accidental for other pages.

For each flagged file, check whether it:

- Should be deleted or archived
- Should have a `draft: true` frontmatter added (Docusaurus v3+)
- Needs a matching `id:` in the frontmatter
- Belongs in `sidebars.js` but was accidentally left out or commented out

This utility highlights potential issues—it’s up to you to decide what belongs in our published documentation.
