---
id: search-attribute-key
title: search-attribute-key
description: definition for the --search-attribute-key modifier
tags:
  - reference
  - tctl
---

### `--search-attribute-key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attribute` command.

**Example**

```bash
tctl workflow <command> --search-attribute-key <value>
```
