---
id: how-to-integrate-elasticsearch-into-a-temporal-cluster
title: How to integrate Elasticsearch into a Temporal Cluster
sidebar_label: Elasticsearch
description: To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

To integrate Elasticsearch with your Temporal Cluster, edit the `persistence` section of your `development.yaml` configuration file and run the index schema setup commands.

Elasticsearch is required to support [Advanced Visibility](/docs/concepts/what-is-advanced-visibility).

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

#### Edit persistence

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

#### Create index schema and index

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

#### Set Elasticsearch privileges

Ensure that the following privileges are granted for the Elasticsearch Temporal index:

- **Read**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `create`, `index`, `delete`, `read`
- **Write**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `write`
- **Custom Search Attributes**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices): `manage`
  - [cluster privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-cluster): `monitor` or `manage`.

#### Add custom Search Attributes (optional)

This step is optional.
Here we are adding custom Search Attributes to your Cluster.

Run the following `tctl` command to add the `ProductId` custom Search Attribute to the Temporal Cluster (and Elasticsearch Temporal index):

```bash
tctl admin cluster add-search-attributes --name ProductId --type Keyword
```

Run the following `tctl` command to add custom Search Attributes used by samples and SDK integration tests:

```bash
tctl --auto_confirm admin cluster add-search-attributes \
    --name CustomKeywordField --type Keyword \
    --name CustomStringField --type Text \
    --name CustomTextField --type Text \
    --name CustomIntField --type Int \
    --name CustomDatetimeField --type Datetime \
    --name CustomDoubleField --type Double \
    --name CustomBoolField --type Bool
```
