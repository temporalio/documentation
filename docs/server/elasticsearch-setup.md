---
id: elasticsearch-setup
title: Set up Elasticsearch for the Temporal Server
sidebar_label: Set up Elasticsearch
---

## Overview

You can integrate [Elasticsearch](https://www.elastic.co/elasticsearch/) with the Temporal Server to enhance [Workflow search](/docs/server/workflow-search) functionality.

Integration with Elasticsearch is defined in the Server configuration files.

You can use the Temporal Server [development_es.yaml](https://github.com/temporalio/temporal/blob/master/config/development_es.yaml) file as working example.

## Persistence

Elasticsearch relies on storage to operate.
Storage related configurations are defined within the `persistence` section of the configuration file.
The Temporal Server needs to know how and where to connect to Elasticsearch storage.
To do this, add the `advancedVisibilityStore: es-visibility` key value pair to the `persistence` section.

```yaml
persistence:
  ...
  advancedVisibilityStore: es-visibility
```

Then, define the Elasticsearch datastore connection information under the `es-visibility` key:

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
