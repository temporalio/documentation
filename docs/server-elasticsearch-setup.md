---
id: server-elasticsearch-setup
title: Set up Elasticsearch for Temporal Server
sidebar_label: Set up Elasticsearch
---

## Overview

You can integrate [Elasticsearch](https://www.elastic.co/elasticsearch/) with the Temporal Server to enhance [Workflow search](/docs/server-workflow-search) functionality.
The [Server versions and dependencies](/docs/server-versions-and-dependencies) page lists compatible versions of dependencies.
To set up Elasticsearch, there are two main Server configurations that need to be edited.

- `persistence`
- `kafka`

Note that you can use the Temporal Server [development_es.yaml](https://github.com/temporalio/temporal/blob/master/config/development_es.yaml) file as working example.

## Persistence

Elasticsearch relies on storage to operate.
Storage related configurations are defined within the `persistence` section of the configuration file.
The Temporal Server needs to know where to connect to the Elasticsearch storage.

To do this, first add the `advancedVisibilityStore: es-visibility` key value pair to the `persistence` section.

```yaml
persistence:
  ...
  advancedVisibilityStore: es-visibility
```

Next, define the ElasticSearch datastore connection information under the `es-visibility` key:

```yaml
persistence:
  ...
  datastores:
    ...
    es-visibility:
      elasticsearch:
        version: "v7"
        url:
          scheme: "http"
          host: "127.0.0.1:9200"
        indices:
          visibility: temporal-visibility-dev
```

## Kafka

The Workflow metadata that gets stored and matched to search queries is moved around the system as "visibility records".
In order to ship these records to specific processes, Kafka is used.
To configure Kafka for this purpose, find and edit the `kafka` section of the configuration file.

There are four parts of the section that need to be defined.

- `tls`: Enables or disables TLS connections for Kafka traffic.
- `clusters`: Connection information for Kafka broker.
- `applications`: Defines the Kafka topic names.
- `topics`: Maps Kafka topic name to Kafka broker.

Here is an example of how the entire Kafka config might look like:

```yaml
kafka:
  tls:
    enabled: false
  clusters:
    test:
      brokers:
        - 127.0.0.1:9092
  topics:
    temporal-visibility-dev:
      cluster: test
    temporal-visibility-dev-dlq:
      cluster: test
  applications:
    visibility:
      topic: temporal-visibility-dev
      dlq-topic: temporal-visibility-dev-dlq
```
