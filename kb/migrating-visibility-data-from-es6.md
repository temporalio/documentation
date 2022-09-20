---
slug: migrate-visibility-data-from-es6
title: Migrate visibility data from ES6
tags:
  - kb-article
date: 2022-08-29T00:00:00Z
---

We added support for [Elasticsearch v7+ (ES7)](https://www.elastic.co/downloads/past-releases/#elasticsearch) in the v1.7.0 update to the [Temporal Server](/clusters/#temporal-server).
Elasticsearch v7 introduces several breaking changes, including the removal of mapping types.
These changes make Elasticsearch v6 incompatible with Elasticsearch v7.

<!-- truncate -->

As of v1.18.0, v6 support has been completely removed from Temporal.
Support for Elasticsearch v8 has been added; v7 remains as the default version to run.

Use one of the following methods to update your Temporal Server and Elasticsearch.

## Temporary shutdown

1. Shut down the Temporal Cluster.
2. Upgrade Elasticsearch v6 to Elasticsearch v7 according to [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html).
3. Upgrade Temporal to the latest version.
4. Make sure that the static config file is set to version `v7` or doesn't specify version at all:

   ```
   persistence:
     datastores:
       es-visibility:
         elasticsearch:
           version: "v7"
   ```

5. Start the Temporal Cluster.

## Rolling upgrade

1. If you are still using Elasticsearch v6, make sure your config file is set to `v6`:
   ```
   persistence:
     datastores:
       es-visibility:
         elasticsearch:
           version: "v6"
   ```
   If you're using a pre-built Docker image, set the `ES_VERSION` environment variable to `v6`.
2. Update Temporal to the latest 1.17.x version.
3. Add the following to the dynamic config file:
   ```
   history.visibilityTaskWorkerCount:
       - value: 0
   ```
   This will disable the internal visibility queue processor.
4. Restart the Temporal Server services.
   Workflow visibility information won't be updated.
5. Upgrade Elasticsearch v6 to Elasticsearch v7 following steps from the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html).
6. Start Elasticsearch v7.
   Visibility read queries will temporarily generate errors.
   Write queries are blocked because the the processor is disabled.
7. Change `v6` to `v7` in your config file or remove `version` completely:
   ```
   persistence:
     datastores:
       es-visibility:
         elasticsearch:
           version: "v7"
   ```
   If you're using a pre-build docker image, set `ES_VERSION` to `v7`.
8. Remove the following statement from the dynamic config file:
   ```
   history.visibilityTaskWorkerCount:
       - value: 0
   ```
   This will enable the internal visibility queue processor.
9. Restart the Server one more time.
