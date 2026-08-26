---
id: elasticsearch
title: Integrate Elasticsearch or OpenSearch
sidebar_label: Elasticsearch / OpenSearch
slug: /self-hosted-guide/visibility/elasticsearch
description: Configure Elasticsearch or OpenSearch as your self-hosted Visibility store, with version compatibility and index schema setup.
toc_max_heading_level: 4
tags:
  - Temporal Service
  - Self-hosting
  - Visibility
---

You can integrate Elasticsearch or OpenSearch with your Temporal Service as your Visibility store. We recommend using
one of these backends for large-scale operations on the Temporal Service.

To integrate Elasticsearch or OpenSearch with your Temporal Service, edit the `persistence` section of your
`development.yaml` configuration file to add the search backend as the `visibilityStore`, and run the index schema setup
commands.

Use the following version guidance:

- Elasticsearch v7 is supported with Temporal Server v1.7 and later.
- Elasticsearch v8 is supported with Temporal Server v1.18 and later.
- OpenSearch 2+ is supported with Temporal Server v1.30.1 and later.

The examples in this section use Elasticsearch. For OpenSearch, use the same datastore configuration shape and
operational flow unless a release note for your target Temporal Server version says otherwise.

## Persistence configuration

Set your Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the
search backend configuration under `datastores`.

The following example shows how to set a Visibility store named `es-visibility` and define the Elasticsearch datastore
configuration in your Temporal Service configuration YAML.

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

## Index schema and index

To set up Elasticsearch as your Visibility store, use the `temporal-elasticsearch-tool` available in the
`temporalio/admin-tools` image.

The following example shows how to set up an Elasticsearch Visibility store with a MySQL persistence store using
`temporal-elasticsearch-tool`. For more examples with different databases, refer to the
[samples-server repository](https://github.com/temporalio/samples-server/tree/main/compose/scripts).

{/* SNIPSTART compose-mysql-es-setup */}
[compose/scripts/setup-mysql-es.sh](https://github.com/temporalio/samples-server/blob/main/compose/scripts/setup-mysql-es.sh)
```sh
set -eu

# Validate required environment variables
: "${ES_SCHEME:?ERROR: ES_SCHEME environment variable is required}"
: "${ES_HOST:?ERROR: ES_HOST environment variable is required}"
: "${ES_PORT:?ERROR: ES_PORT environment variable is required}"
: "${ES_VISIBILITY_INDEX:?ERROR: ES_VISIBILITY_INDEX environment variable is required}"
: "${ES_VERSION:?ERROR: ES_VERSION environment variable is required}"

: "${MYSQL_SEEDS:?ERROR: MYSQL_SEEDS environment variable is required}"
: "${MYSQL_USER:?ERROR: MYSQL_USER environment variable is required}"

echo 'Starting MySQL and Elasticsearch schema setup...'
echo 'Waiting for MySQL port to be available...'
nc -z -w 10 ${MYSQL_SEEDS} ${DB_PORT:-3306}
echo 'MySQL port is available'

# Create and setup temporal database
temporal-sql-tool --plugin mysql8 --ep ${MYSQL_SEEDS} -u ${MYSQL_USER} -p ${DB_PORT:-3306} --db temporal create
temporal-sql-tool --plugin mysql8 --ep ${MYSQL_SEEDS} -u ${MYSQL_USER} -p ${DB_PORT:-3306} --db temporal setup-schema -v 0.0
temporal-sql-tool --plugin mysql8 --ep ${MYSQL_SEEDS} -u ${MYSQL_USER} -p ${DB_PORT:-3306} --db temporal update-schema -d /etc/temporal/schema/mysql/v8/temporal/versioned

# Setup Elasticsearch index
# temporal-elasticsearch-tool is available in v1.30+ server releases
if [ -x /usr/local/bin/temporal-elasticsearch-tool ]; then
  echo 'Using temporal-elasticsearch-tool for Elasticsearch setup'
  temporal-elasticsearch-tool --ep "$ES_SCHEME://$ES_HOST:$ES_PORT" setup-schema
  temporal-elasticsearch-tool --ep "$ES_SCHEME://$ES_HOST:$ES_PORT" create-index --index $ES_VISIBILITY_INDEX
else
  echo 'Using curl for Elasticsearch setup'
  echo 'WARNING: curl will be removed from admin-tools in v1.30.'
  echo 'Waiting for Elasticsearch to be ready...'
  max_attempts=30
  attempt=0
  until curl -s -f "$ES_SCHEME://$ES_HOST:$ES_PORT/_cluster/health?wait_for_status=yellow&timeout=1s"; do
    attempt=$((attempt + 1))
    if [ $attempt -ge $max_attempts ]; then
      echo "ERROR: Elasticsearch did not become ready after $max_attempts attempts"
      echo "Last error from curl:"
      curl "$ES_SCHEME://$ES_HOST:$ES_PORT/_cluster/health?wait_for_status=yellow&timeout=1s" 2>&1 || true
      exit 1
    fi
    echo "Elasticsearch not ready yet, waiting... (attempt $attempt/$max_attempts)"
    sleep 2
  done
  echo ''
  echo 'Elasticsearch is ready'
  echo 'Creating index template...'
  curl -X PUT --fail "$ES_SCHEME://$ES_HOST:$ES_PORT/_template/temporal_visibility_v1_template" -H 'Content-Type: application/json' --data-binary "@/etc/temporal/schema/elasticsearch/visibility/index_template_$ES_VERSION.json"
  echo ''
  echo 'Creating index...'
  curl --head --fail "$ES_SCHEME://$ES_HOST:$ES_PORT/$ES_VISIBILITY_INDEX" 2>/dev/null || curl -X PUT --fail "$ES_SCHEME://$ES_HOST:$ES_PORT/$ES_VISIBILITY_INDEX"
  echo ''
fi

echo 'MySQL and Elasticsearch setup complete'
```
{/* SNIPEND */}

## Elasticsearch privileges

Ensure that the following privileges are granted for the Elasticsearch Temporal index:

- **Read**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices):
    `create`, `index`, `delete`, `read`
- **Write**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices):
    `write`
- **Custom Search Attributes**
  - [index privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices):
    `manage`
  - [cluster privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-cluster):
    `monitor` or `manage`.
