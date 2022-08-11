---
id: add-search-attributes
title: tctl admin cluster add_search_attributes
sidebar_label: add_search_attributes
description: Adding custom Search Attributes to a Cluster.
tags:
  - reference
  - tctl
  - admin
---

The `tctl admin cluster add_search_attributes` command allows custom search attributes to be added to a given Cluster.

Alias: `asa`

## Modifiers

#### `--skip_schema_update`

Allows the user to skip the Elasticsearch index schema update.

:::note
This will only register in metadata.
:::

#### `--name value`

Alias: `-n value`

The name of the Search Attribute to add. Multiple values are supported.

#### `--type value`

Alias: `-t value`

The type of Search Attribute to add.
Multiple values can be added at once.

Values: Text, Keyword, Int, Double, Bool, Datetime
