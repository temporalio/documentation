---
id: how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl
title: How to add a custom Search Attribute to a Cluster using tctl
description: Use the `tctl admin cluster add-search-attributes` command to add a custom Search Attribute to your Temporal Cluster.

tags:
  - operation-guides
  - filtered-lists
  - tctl
---

Use the `tctl admin cluster add-search-attributes` command to add a custom Search Attribute to your Temporal Cluster.

```bash
tctl admin cluster add-search-attributes --name <SearchAttributeKeyName> --type <SearchAttributeValueType>
```

Search Attribute key names are case sensitive.

The possible values for `--type` are:

- String
- Keyword
- Int
- Double
- Bool
- Datetime

:::note

Due to Elasticsearch limitations you can only add new custom search attributes but not rename or remove existing ones.

:::

:::note Local testing

If you are adding custom Search Attributes to a Cluster running from the `docker-compose-es.yml` file in the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo, make sure to increase the Docker memory to more than 6 GB.

:::
