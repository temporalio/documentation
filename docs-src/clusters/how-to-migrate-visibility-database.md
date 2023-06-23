---
id: how-to-migrate-visibility-database
title: How to migrate Visibility database
sidebar_label: Migrating Visibility database
description: To migrate your Visibility database to another database, set up a secondary Visibility to enable Dual Visibility, and update the dynamic configuration in your Cluster to update the Visibility store read and write operations.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - Supported from Temporal Server v1.21 onwards.
---

To migrate your Visibility database, [set up a secondary Visibility](/cluster-deployment-guide#set-up-secondary-visibility) to enable [Dual Visibility](/concepts/what-is-dual-visibility), and update the dynamic configuration in your Cluster to update the Visibility store read and write operations.

Before you begin, verify [supported databases and versions](/cluster-deployment-guide#supported-databases) for a Visibility store.
The following steps describe how to migrate your Visibility database with examples.

1. In your Cluster configuration, [add a secondary Visibility store](/references/configuration#secondaryvisibilitystore) to your Visibility setup under the Persistence configuration.
   Example: To migrate from Cassandra to Elasticsearch, add Elasticsearch as your secondary database, and set it up. For details, see [secondary Visibility database schema and setup](/cluster-deployment-guide#set-up-secondary-visibility).

   ```yaml
   persistence:
   visibilityStore: cass-visibility
   secondaryVisibilityStore: es-visibility
   datastores:
       cass-visibility:
       cassandra:
           hosts: "127.0.0.1"
           keyspace: "temporal_visibility"
       es-visibility:
       elasticsearch:
           version: "v7"
           logLevel: "error"
           url:
           scheme: "http"
           host: "127.0.0.1:9200"
           indices:
           visibility: temporal_visibility_v1
           closeIdleConnectionsInterval: 15s
   ```

2. Update the dynamic configuration keys on your self-hosted Temporal Cluster to enable write operations to the secondary Visibility store, and disable read operations at first.
   Example:
   ```yaml
   system.secondaryVisibilityWritingMode:
   - value: "dual"
   constraints: {}
   system.enableReadFromSecondaryVisibility:
   - value: false
   constraints: {}
   ```
   At this point, Visibility data is read from the primary Visibility store, and all Visibility data is written to both the primary and secondary store.
   For details on write options to the secondary Visibility store, see [Secondary Visibility dynamic configuration reference](/references/dynamic-configuration#secondary-visibility-settings).

3. When you are ready to deprecate your primary Visibility store, update the dynamic configuration YAML to enable read operations from the secondary Visibility store.
   Example:
   ```yaml
   system.secondaryVisibilityWritingMode:
   - value: "dual"
   constraints: {}
   system.enableReadFromSecondaryVisibility:
   - value: true
   constraints: {}
   ```
   At this point, Visibility data is read from the secondary store only. Verify whether data on the secondary store is correct.

4. When secondary Visibility store is vetted and ready to replace your current primary store, change your Cluster configuration to set the secondary store as your primary, and remove the dynamic configuration set in the previous steps.
   Example:
   ```yaml
   persistence:
   visibilityStore: es-visibility
   datastores:
       es-visibility:
       elasticsearch:
           version: "v7"
           logLevel: "error"
           url:
           scheme: "http"
           host: "127.0.0.1:9200"
           indices:
           visibility: temporal_visibility_v1
           closeIdleConnectionsInterval: 15s
   ```
