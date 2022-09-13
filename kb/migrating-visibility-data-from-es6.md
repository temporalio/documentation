---
slug: migrate-visibility-data-from-es6
title: Migrate visibility data from ES6
tags:
  - kb-article
date: 2022-29-08T00:00:00Z
---

We added support for [Elasticsearch v7+ (ES7)](https://www.elastic.co/downloads/past-releases/#elasticsearch) in the v1.7.0 update to the [Temporal Server](/clusters#temporal-server).
Elasticsearch v7 introduces several breaking changes, including the removal of mapping types.
These changes make Elasticsearch v6 incompatible with Elasticsearch v7.

As of v1.18.0, v6 support has been completely removed from Temporal.
Support for Elasticsearch v8 has been added; v7 remains as the default version to run.

Use one of the following methods to update your Temporal Server and Elasticsearch.

## Upgrade with temporary shutdown

1. Shut down the Temporal Cluster.
2. Upgrade Elasticsearch v6 to Elasticsearch v7 according to [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html).
3. Upgrade Temporal to the latest version.
4. Make sure that the static config file is not set to `v6`:

   ```
   persistence:
     datastores:
       es-visibility:
         elasticsearch:
           version: "v6"
   ```

5. Start the Temporal Cluster.

## Rolling upgrade

1. Update the Server to the latest release.
2. Add the following to the dynamic config:

   ```
   history.visibilityProcessorEnabled:
     - value: false
   ```

3. Restart the Server.
   Workflow visibility information won't be updated.

4. Upgrade Elasticsearch v6 to Elasticsearch v7 following steps from the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html).

5. Start Elasticsearch v7.
   Visibility read queries will temporarily generate errors.
   Write queries are blocked because the processor is disabled.

6. Switch to Elasticsearch v7 in the Server's static config:

   ```
   persistence:
     datastores:
       es-visibility:
         elasticsearch:
           version: "v7"
   ```

7. Set ES_VERSION env to v7 if you are using pre-build docker image.

8. Remove this from the dynamic config:

   ```
   history.visibilityProcessorEnabled:
     - value: false
   ```

9. Restart the Server one more time.
