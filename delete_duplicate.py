import os
import yaml
from pathlib import Path

def extract_yaml_front_matter(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        if lines[0].strip() == '---':
            end_idx = lines[1:].index('---\n') + 1
            front_matter = ''.join(lines[1:end_idx])
            return yaml.safe_load(front_matter)
    return None

def find_and_delete_duplicates(src_dir, target_dir):
    src_files = [f for f in Path(src_dir).glob('*.md')]
    target_files = [f for f in Path(target_dir).glob('*.md')]

    target_ids = {extract_yaml_front_matter(f)['id']: f for f in target_files if extract_yaml_front_matter(f)}

    duplicates = []
    for src_file in src_files:
        src_data = extract_yaml_front_matter(src_file)
        if src_data and src_data['id'] in target_ids:
            duplicates.append((src_file, target_ids[src_data['id']]))

    for dup in duplicates:
        print(f'Duplicate found: {dup[0]} and {dup[1]}')
        os.remove(dup[0])

# Usage
find_and_delete_duplicates('docs-src/python', 'docs-src/python/generated')
