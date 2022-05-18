---
id: how-to-remove-a-search-attribute-from-a-cluster-using-tctl
title: How to remove a Search Attribute from a Cluster's metadata using tctl
sidebar_label: Remove Search Attribute
description: Use the `tctl admin cluster remove-search-attributes` command to remove a Search Attribute from a Cluster's metadata.
tags:
  - tctl
  - visibility
  - filtered-lists
---

> The Temporal tctl documentation covers version 1.16 of the Temporal CLI.

<!-- prettier-ignore -->
import * as WhatIsASearchAttribute from '../concepts/what-is-a-search-attribute.md'

Use the following command to remove a <preview page={WhatIsASearchAttribute}>Search Attribute</preview> from a Cluster's metadata:

```bash
tctl admin cluster remove-search-attributes --name <SearchAttributeKey>
```

Only custom Search Attributes can be removed from a Cluster's metadata.
Default Search Attributes cannot be removed.

Removing a Search Attribute removes it from the Cluster's metadata but does not remove it from the Elasticsearch index.
This means that the Search Attribute can be added back later as the same type.
After a Search Attribute has been added to the Elasticsearch index, it cannot be changed.
