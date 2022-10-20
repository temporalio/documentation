---
id: add-search-attributes
title: tctl admin cluster add_search_attributes
sidebar_label: add_search_attributes
description: Adding custom Search Attributes to a Cluster.
tags:
  - tctl
  - admin
---

Alias: `asa`

The `tctl admin cluster add-search-attributes` command allows Search Attributes to be added to a Cluster.
Custom Search Attributes can be used to make a Cluster more identifiable.

:::note
Due to Elasticsearch limitations, you can only add new custom Search Attributes. Existing Search Attributes cannot be renamed or removed from the Elasticsearch index.
:::

Use this command to add custom Search Attributes to your Temporal Cluster:

```bash
tctl admin cluster add-search-attributes --name <SearchAttributeName> --type <SearchAttributeValueType>
```

:::note
If you are adding custom Search Attributes to a Cluster running from the `docker-compose-es.yml` file in the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo, make sure to increase the Docker memory to more than 6 GB.
:::

#### --skip_schema_update

Allows the user to skip the Elasticsearch index schema update.

:::note
This will only register in metadata.
:::

#### --name

Alias: `-n value`

The name of the Search Attribute to add. Names can have multiple values.

Search Attribute names are case sensitive.

#### --type

Alias: `-t value`

The type of Search Attribute to add.
Multiple values can be added at once.

Values: Text, Keyword, Int, Double, Bool, Datetime
