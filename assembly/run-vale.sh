#!/bin/bash
# Navigate to the script's directory to ensure relative paths are handled correctly
cd "$(dirname "$0")"

# Assuming the script is in `assembly` and `docs-src` is at the same level as `assembly`
{ git diff --name-only --diff-filter=M; git diff --cached --name-only --diff-filter=M; } | grep '^docs-src/.*\.md$' | sort -u | while read -r file; do 
  if [ -f "../$file" ]; then 
    vale "../$file"  # Using `vale` as if it's installed globally
  fi; 
done
