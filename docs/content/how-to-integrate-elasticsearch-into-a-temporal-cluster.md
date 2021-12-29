---
id: how-to-integrate-elasticsearch-into-a-temporal-cluster
title: How to integrate Elasticsearch into a Temporal Cluster
sidebar_label: Elasticsearch integration
description: To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

<!-- prettier-ignore -->
import * as WhatIsAdvancedVisibility from './what-is-advanced-visibility.md'

To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.

Elasticsearch is required to support <preview page={WhatIsAdvancedVisibility}>Advanced Visibility</preview>.

:::note

These steps are needed only if you have a "plain" [Temporal Server Docker image](https://hub.docker.com/r/temporalio/server).

If you operate a Temporal Cluster using our [Helm charts](https://github.com/temporalio/helm-charts) or
[docker-compose](https://github.com/temporalio/docker-compose), the Elasticsearch index schema and index are created automatically using the [auto-setup Docker image](https://hub.docker.com/r/temporalio/auto-setup).

:::

:::note Supported versions

- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported in all Temporal versions
- Both versions are explicitly supported with AWS Elasticsearch

:::

### Edit persistence

1. Add the `advancedVisibilityStore: es-visibility` key-value pair to the `persistence` section.
   The [development_es.yaml](https://github.com/temporalio/temporal/blob/master/config/development_es.yaml) file in the `temporalio/temporal` repo is a working example.
   The configuration instructs the Temporal Cluster how and where to connect to Elasticsearch storage.

```yaml
persistence:
  ...
  advancedVisibilityStore: es-visibility
```

2. Define the Elasticsearch datastore connection information under the `es-visibility` key:

```yaml
persistence:
  ...
  advancedVisibilityStore: es-visibility
  datastores:
    ...
    es-visibility:
      elasticsearch:
        version: "v7"
        url:
          scheme: "http"
          host: "127.0.0.1:9200"
        indices:
          visibility: temporal_visibility_v1_dev
```

### Create index schema and index

Run the following commands to create the index schema and index:

<!--SNIPSTART setup-es-template-commands-->
<!--SNIPEND-->

### Set Elasticsearch privileges

Ensure that the following privileges are granted for the Elasticsearch Temporal index:

- **Read**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `create`, `index`, `delete`, `write`
- **Write**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `read`
- **Custom Search Attributes**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `manage`
  - [cluster privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-cluster): `monitor` or `manage`.

### Add custom Search Attributes (optional)

This step is optional.
Here we are adding custom Search Attributes to your Cluster.

Run the following `tctl` command to add `ProductId` custom Search Attributes to the Temporal Cluster (and Elasticsearch Temporal index):

```bash
tctl admin cluster add-search-attributes --name ProductId --type Keyword
```

Run the following `tctl` command to add custom Search Attributes used by samples and SDK integration tests:

<!--SNIPSTART add-custom-search-attributes-for-testing-command-->
<!--SNIPEND-->
