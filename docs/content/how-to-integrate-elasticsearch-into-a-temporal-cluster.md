---
id: how-to-integrate-elasticsearch-into-a-temporal-cluster
title: How to integrate Elasticsearch into a Temporal Cluster
description: todo
tags:
  - operations-guide
---

To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands .

:::note Supported versions

- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported in all Temporal versions
- Both versions are explicitly supported with AWS Elasticsearch

:::

1. Add the `advancedVisibilityStore: es-visibility` key value pair to the `persistence` section.
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

3. Create the index schema template and index using the commands found in this [Makefile](https://github.com/temporalio/temporal/blob/master/Makefile#L382-L386).

:::note

If you run a Temporal Cluster using our [Helm Charts](https://github.com/temporalio/helm-charts) or
[docker-compose](https://github.com/temporalio/docker-compose), which uses the [auto-setup](https://hub.docker.com/r/temporalio/auto-setup) Docker image, then the Elasticsearch index schema and index are automatically created.
The auto-setup Docker image also [creates](https://github.com/temporalio/temporal/blob/master/docker/auto-setup.sh#L263-L269) 6 custom search attributes for testing.

Only if you are running the "plain" [Server Docker image](https://hub.docker.com/r/temporalio/server) do you need to create the index schema template and index manually.

:::
