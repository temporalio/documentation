---
id: how-to-integrate-elasticsearch-into-a-temporal-cluster
title: How to integrate Elasticsearch into a Temporal Cluster
sidebar_label: Elasticsearch
description: To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - Elasticsearch v8 is supported beginning with Temporal Server version 1.18.0.
  - Elasticsearch v7.10 is supported beginning with Temporal Server version 1.17.0.
  - Elasticsearch v6.8 is supported through Temporal Server version 1.17._x_.
  - Elasticsearch v6.8 and v7.10 are explicitly supported with AWS Elasticsearch.
---

You can integrate Elasticsearch with your Temporal Cluster for [advanced Visibility](/concepts/what-is-advanced-visibility) to take on the Visibility request load.
We recommend using Elasticsearch for large-scale operations on the Temporal Cluster.

To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.

:::note

The following steps are needed only if you have a "plain" [Temporal Server Docker image](https://hub.docker.com/r/temporalio/server).

If you operate a Temporal Cluster using our [Helm charts](https://github.com/temporalio/helm-charts) or
[Docker Compose](https://github.com/temporalio/docker-compose), the Elasticsearch index schema and index are created automatically using the [auto-setup Docker image](https://hub.docker.com/r/temporalio/auto-setup).

:::

**Persistence configuration**

Set your Elasticsearch Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `mysql-visibility` and define the datastore configuration in your Temporal Cluster Configuration YAML.

```yaml
persistence:
  ...
  visibilityStore: es-visibility
  datastores:
    ...
    es-visibility: # Define the Elasticsearch datastore connection information under the `es-visibility` key
      elasticsearch:
        version: "v7"
        url:
          scheme: "http"
          host: "127.0.0.1:9200"
        indices:
          visibility: temporal_visibility_v1_dev
```

**Index schema and index**

Run the following commands to create the index schema and index:

```bash
# ES_SERVER is the URL of Elasticsearch server; for example, "http://localhost:9200".
SETTINGS_URL="${ES_SERVER}/_cluster/settings"
SETTINGS_FILE=${TEMPORAL_HOME}/schema/elasticsearch/visibility/cluster_settings_${ES_VERSION}.json
TEMPLATE_URL="${ES_SERVER}/_template/temporal_visibility_v1_template"
SCHEMA_FILE=${TEMPORAL_HOME}/schema/elasticsearch/visibility/index_template_${ES_VERSION}.json
INDEX_URL="${ES_SERVER}/${ES_VIS_INDEX}"
curl --fail --user "${ES_USER}":"${ES_PWD}" -X PUT "${SETTINGS_URL}" -H "Content-Type: application/json" --data-binary "@${SETTINGS_FILE}" --write-out "\n"
curl --fail --user "${ES_USER}":"${ES_PWD}" -X PUT "${TEMPLATE_URL}" -H 'Content-Type: application/json' --data-binary "@${SCHEMA_FILE}" --write-out "\n"
curl --user "${ES_USER}":"${ES_PWD}" -X PUT "${INDEX_URL}" --write-out "\n"
```

**Elasticsearch privileges**

Ensure that the following privileges are granted for the Elasticsearch Temporal index:

- **Read**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `create`, `index`, `delete`, `read`
- **Write**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `write`
- **Custom Search Attributes**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `manage`
  - [cluster privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-cluster): `monitor` or `manage`.
