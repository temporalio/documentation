This plan should be synced with the progress that I make. I should check off items in my plan below as I complete them. If I find out that I don't need to do an item, I should remove that item.

# Plan

## Initial Assessment   
- [ ] Run `tree -a -L 2 -I .git`. This'll serve two purposes: 1. to show me the files I've created or have been created for me in .long_term_context/ while processing other triggers and 2. to show me the top-level docs repo structure, so I understand the overall structure of the docs repo.
- [ ] Read `.long_term_context/product_knowledge/product_overview.md` and `.long_term_context/doc_workflow/client_instructions.md` to understand the product and client preferences. If there are other files in .long_term_context/ that I think I should read before diving into research, dig in there too.   
- [ ] Review the content of the trigger event, including files in `$WORKING_NOTES/trigger_assets/`, updating the plan along the way with notes about what might need to be updated.   

## Context Review
(None, to be filled in as I figure out what types of resources I might want to review)

## Potential Documentation Areas to Create or Update:
(None, to be filled in as I review the trigger event and existing docs)

## Documentation Plan
- [ ] Check for existing suggestions and branches using `get_existing_suggestions`
- [ ] Review `.long_term_context/style/client_style_guide.md` for tone & formatting rules
- [ ] Review `.long_term_context/doc_patterns/doc_platform_instructions.md` for any information about how to make good updates to the docs platform
- [ ] Check again for any other files in .long_term_context/ that might contain learnings from previous triggers that might be me process and document the current trigger
- [ ] Use `rewrite_with_client_voice` for new content before applying patches or creating new files
- [ ] If there are any images that I want to include in the docs, use `create_image_for_docs` to upload the image to S3 and get a public URL, and then include the URL in my edits.
- [ ] As I'm making changes, add citations using `add_citation` to document my sources, so that a peer reviewer can more easily review my suggestion. Use `grep -n 'text snippet' filename` to find line numbers. 

(Add specific files that I'd want to update and edit here)

## Final Review Checklist  
- [ ] Review `.long_term_context/style/client_style_guide.md` to ensure that my suggestions align with the client style guide
- [ ] Review `.long_term_context/doc_workflow/client_instructions.md` to ensure that I've satisfied the client instructions

