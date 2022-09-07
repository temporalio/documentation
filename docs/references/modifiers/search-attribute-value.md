---
id: search-attribute-value
title: search-attribute-value
description: definition for the --search-attribute-value modifier
tags:
  - reference
  - tctl
---

### `--search-attribute-value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attribute` command.
