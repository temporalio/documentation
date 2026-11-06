---
name: docs-guide-revision
description: Revise a draft Temporal Validated Pattern guide (a docs.temporal.io/guides tutorial) so it follows the team's Guides structural guidance — outcome-focused metadata, a three-paragraph intro, minimal background, consolidated prerequisites, "Step N" implementation sections built with the Code Sandwich technique, transitions between steps, and an Outcomes section that pays off the intro's promise. Use this skill whenever someone shares a draft or published Temporal guide, pattern tutorial, or .md/.mdx file under docs/guides and asks to revise, restructure, edit, review, clean up, apply the structural guidance, apply the guide template, break up code blocks, or make it more pedagogical — even if they don't mention "structural guidance" by name.
---

# Revise a Validated Pattern guide

You take a draft Temporal guide and return a revised version that follows the Guides structural guidance, plus a short list of editor's notes for anything the author must decide.

The full guidance lives in `references/structural-guidance.md`. A corrected before/after excerpt lives in `references/worked-example.md`. Read both before starting a revision; the rules below summarize them and settle the places where the guidance's own examples are inconsistent.

## Ground rules

These matter more than any individual structural change, because breaking them makes the guide wrong rather than just less polished.

- **Never change what the code does.** You may split code into smaller blocks, re-order explanations, and move comments into prose. You may not rename identifiers, change values, add or remove statements, or "fix" logic. If code looks wrong, leave it and raise it in the editor's notes.
- **Never change technical claims.** Limits, version numbers, Event counts, API behavior, and similar facts stay as written. If a claim looks wrong or contradicts another part of the guide, flag it.
- **Do fix plain errors in prose:** typos, grammar, duplicated sentences or paragraphs, broken parallelism.
- **Preserve every link and every MDX/Docusaurus element** (admonitions, imports, components, images, diagram blocks). Moving them is fine; dropping them is not.
- **Don't guess where the guidance is silent.** Make a reasonable, minimal choice, then list it in the editor's notes so the author can override it.

## Workflow

1. Read the whole draft. Identify the files the reader builds (usually announced with "Create a file named `x.py`"), the steps, and every code block.
2. Restructure the document top to bottom using the section rules below.
3. Rewrite the implementation steps using the Code Sandwich rules.
4. Run the code check (see "Verifying the code") if the draft was provided as a file.
5. Re-read the result once as a reader would: does every step open by saying what it does and close by saying what was accomplished and what comes next?
6. Deliver the revised guide and the editor's notes (see "Output").

## Section rules

Apply these in order. The final document has this shape:

```
frontmatter
(intro — no heading)
## Background            (optional, short)
## Prerequisites
### Required software and infrastructure
### Resources and access privileges
### Required concepts
### Operational considerations
## Step 1: ...
## Step 2: ...
...
## Outcomes
## Related resources
```

### Metadata

Use this frontmatter:

```yaml
---
id:
title:
description:
sidebar_label:
toc_max_heading_level: 3
author:
tags:
---
```

- Set `toc_max_heading_level: 3`.
- Never change an existing `id`; it controls the URL.
- Fill in any missing fields. For existing `title`, `description`, or `sidebar_label` values that don't meet the guidance, keep them and propose a replacement in the editor's notes. The guidance wants: a title that names the reader's outcome rather than the pattern or technology; a description that's one full sentence starting with a verb; a sidebar label of about three words.
- If the draft has a byline in the body (for example `**by Name**`), keep it unless `author` is set in frontmatter, then flag the duplication.

### Introduction

No heading. Replace any opening "Problem statement", "Solution", "Overview", or "Outcomes" sections with three paragraphs:

1. **The problem, from the reader's side.** Typically: "X is valuable, but it has problem Y" → specifics → the obvious current approach and why it falls short.
2. **The solution, from the reader's side.** Enough for the reader to decide whether it fits them. Name the core Temporal mechanism; supporting primitives are optional color.
3. **The promise.** Begin with "With this guide, you'll [strong verb]…" — build, create, fix, diagnose, deploy. Never "you'll learn", "you'll know", or "you'll see how to". No hedging ("should", "if"). A bullet list of benefits is fine when there are several real benefits; a single sentence is fine when there's one.

Remove from the intro: selling Temporal (comparisons to competitors, "only possible with Temporal", Cloud upsell) and credibility statements. Address the reader as "you", not "we".

### Background

Keep only what the reader needs to understand this specific solution, usually one paragraph defining the pattern plus one paragraph mapping it onto this example. Link to the matching page under `/design-patterns/` for theory instead of repeating it.

Cut general sections such as "Why Temporal is well suited for this pattern" or "How X differs from Y". If something in them is needed to understand a specific step, move it into that step (just-in-time learning) rather than deleting it outright. List what you cut in the editor's notes.

### Target audience

Delete the section; audience is handled with tags. If the draft's audience text suggests useful tags, propose them in the editor's notes.

### Prerequisites

One `## Prerequisites` section, opened by a one-sentence summary of what the guide requires, followed by these H3 subsections:

- **Required software and infrastructure:** Temporal Server or Cloud, the SDK with its minimum version, the language version, tooling. A link to the Quickstarts is welcome.
- **Resources and access privileges:** both the Temporal Cloud role and the local access needed, unless the guide is Cloud-only.
- **Required concepts:** a few primitives, each linked to its Encyclopedia or concept page with a one-line description. Don't go overboard.
- **Operational considerations:** limits and constraints to know before starting, especially anything that affects billing. Move this here from wherever it appears in the draft.

### Architecture diagrams

The guidance says to fold diagrams into the implementation steps; detailed diagram guidance isn't written yet. Move each diagram (and its narrative, if any) into the step whose code it illustrates, introduced by a sentence that says what the diagram shows. Don't change diagram content. Always add an editor's note that diagram guidance is pending and say where you placed each diagram. If a diagram doesn't map cleanly to one step, place it at the start of the first step it applies to and say so.

### Implementation steps

- Name every step `## Step N: <what the reader does>`, all at the same heading level (H2), numbered consecutively. An optional step keeps its numbering and is labeled `## (Optional) Step N: ...`.
- Inside a step, use descriptive H3/H4 headings ("Annotate the Workflow", "Configure the Worker"). Never use "Step 1/2/3" for sub-steps; it collides with the main numbering.
- Each step accomplishes one part of the overall task, and the reader knows what that part is before they type any code (progressive disclosure).
- Put background where it's used. If a step depends on a concept from Background or elsewhere, give the one or two sentences the reader needs right there and link out for more (just-in-time learning).

### Transitions

Every step, including the last ones, gets:

- **An opening** (one or two sentences after the heading) that adds detail beyond the heading: how the step will be done or why it's needed.
- **A closing** that says what the reader just accomplished and points to the next step.

Vary the wording. Don't restate the step heading, and don't open every step with the same construction. The final step's closing should lead into Outcomes.

### Outcomes

`## Outcomes`. Remind the reader of the intro's promise and confirm it was fulfilled; spend a sentence or two naming the techniques that fulfilled it; suggest other use cases the pattern fits. Don't repeat the intro's bullet list. If the draft's conclusion already does all three, keep it.

### Related resources

`## Related resources` with several links: the relevant `/design-patterns/` pages, the concepts used, the language-specific SDK pages, and any companion guides. Keep every link the draft already had. If there are no Design Patterns links, add them when you can identify the right page with certainty, otherwise flag the gap.

## The Code Sandwich

Large code blocks encourage copy-paste without understanding. Rebuild each file the way a developer would write it, one idea at a time:

1. **Lead-in** — one or two sentences saying what the reader is about to add and why ("Next, you'll need a class that defines an event…").
2. **Snippet** — the code for that one idea.
3. **Explanation** — what the code does and anything non-obvious, written as full sentences right below the snippet so the reader never scrolls back.

### How to split

- Typical units: the imports; a group of constants or config; each class or dataclass; each function; each method or handler group (all Signal handlers together is fine; a long method stands alone).
- Very short, obvious units can share a snippet. A method longer than ~40 lines can be split at a natural seam if each piece is explained, but prefer explaining blocks within one snippet over fragmenting control flow.
- Concatenated in order, the snippets for a file must reproduce the original file's code (minus moved comments). Don't skip any code, even boilerplate like `if __name__ == "__main__":`. When a step's original prose explained a specific design decision after a big block, move that explanation next to the snippet it's about.
- Keep the file-path comment (for example `# models.py`) on the first snippet of each file.

### Class context

Snippets of methods must keep their real indentation inside the class, and the lead-in must say where they go: "Inside the `LoyaltyEntityWorkflow` class, add the Signal handlers:". The first snippet of a class shows the `class` line (with decorators). Never dedent methods to column 0; a reader who pastes them in order would create module-level functions. For methods that are nested more deeply or snippets that would be ambiguous, it's fine to show a leading `class Name:` line followed by `    ...` to anchor the context.

### Comments and docstrings

- Move docstrings and explanatory comments out of the snippets and into the explanation prose, rewritten as full sentences.
- Keep comments that are placeholders for the reader's own code (for example `# await db.execute(...)`) and short comments where the line is unreadable without them.
- The guidance says comments should remain in the complete code files given to users. If the draft doesn't link to complete source files, add this placeholder at the end of the last implementation step and flag it:

```mdx
:::note
TODO: Link to the complete, commented source for this guide.
:::
```

## Verifying the code

When the draft is available as a file, save the revision as a file too and run:

```bash
python scripts/check_code_preserved.py <original.md|mdx> <revised.md|mdx>
```

It compares every non-comment line of code in both documents, in order, ignoring indentation and docstrings. It reports code that's missing from the revision and code that's new in it. Fix any missing lines before delivering. For new or changed lines, confirm each is intentional (for example a `class X:` context line) and mention any that aren't trivial in the editor's notes. Separately, re-read each method snippet to confirm its indentation, since the check ignores indentation on purpose.

## Output

1. **The revised guide** in the draft's format (`.mdx` or `.md`), complete — not a diff and not a summary. When the draft came as a file or is long, write it to a file named after the original with `.revised` before the extension and present it. Otherwise return it in the reply.
2. **Editor's notes**, in the reply after the guide: a short list of decisions the author needs to make or confirm. Always include, when they apply: proposed metadata changes; where diagrams were placed (and that diagram guidance is pending); background content that was cut or moved; the full-source TODO; anything in the code or technical claims that looked wrong; any choice you made where the guidance was silent. Keep each note to one or two sentences. Don't list routine changes the guidance clearly requires.
