import os
from pathlib import Path

# Define the directories
root_dir = Path('docs-src/typescript')
generated_dir = root_dir / 'generated'

# Iterate over all .md files in the root directory
for file_path in root_dir.glob('*.md'):
    generated_file_path = generated_dir / file_path.name

    # If the file exists in both directories, delete it from the root directory
    if generated_file_path.exists():
        file_path.unlink()

print("Finished checking and deleting duplicate files.")
