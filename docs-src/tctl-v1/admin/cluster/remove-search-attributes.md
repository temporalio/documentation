---
id: remove-search-attributes
title: tctl admin cluster remove_search_attributes
sidebar_label: remove_search_attributes
description: Removing custom search metadat from a Cluster.
tags:
  - tctl
  - admin
---

> The Temporal tctl documentation covers version 1.16 of the Temporal CLI.

The `tctl admin cluster remove-search-attributes` command removes custom Search Attribute metadata from a Cluster.
This operation has no effect on Elasticsearch index schema.

Use the following command to remove a [Search Attribute](/concepts/what-is-a-search-attribute) from a Cluster's metadata:

```bash
tctl admin cluster remove-search-attributes --name <SearchAttributeKey>
```

Only custom Search Attributes can be removed from a Cluster's metadata.
Default Search Attributes cannot be removed.

Removing a Search Attribute removes it from the Cluster's metadata but does not remove it from the Elasticsearch index.
This means that the Search Attribute can be added back later as the same type.
After a Search Attribute has been added to the Elasticsearch index, it cannot be changed.

The following modifier changes the behavior of the operation:

#### --name

Name of the Search Attribute to remove.
