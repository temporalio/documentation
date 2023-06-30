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
  - Supported beginning with Temporal Server v1.21.
---

To migrate your Visibility database, [set up a secondary Visibility store](/cluster-deployment-guide#set-up-secondary-visibility-store) to enable [Dual Visibility](/concepts/what-is-dual-visibility), and update the dynamic configuration in your Cluster to update the read and write operations for the Visibility store.

Dual Visibility setup is optional but useful in gradually migrating your Visibility data to another database.

Before you begin, verify [supported databases and versions](/cluster-deployment-guide#supported-databases) for a Visibility store.

The following steps describe how to migrate your Visibility database.

After you make any changes to your [Cluster configuration](/concepts/what-is-cluster-configuration), ensure that you restart your services.

#### Set up secondary Visibility store

1. In your Cluster configuration, [add a secondary Visibility store](/references/configuration#secondaryvisibilitystore) to your Visibility setup under the Persistence configuration.

   Example: To migrate from Cassandra to Elasticsearch, add Elasticsearch as your secondary database and set it up.
   For details, see [secondary Visibility database schema and setup](/cluster-deployment-guide#set-up-secondary-visibility-store).

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
           visibility: temporal_visibility_v1_dev
           closeIdleConnectionsInterval: 15s
   ```

1. Update the [dynamic configuration](/clusters#dynamic-configuration) keys on your self-hosted Temporal Cluster to enable write operations to the secondary store and disable read operations.
   Example:

   ```yaml
   system.secondaryVisibilityWritingMode:
   - value: "dual"
   constraints: {}
   system.enableReadFromSecondaryVisibility:
   - value: false
   constraints: {}
   ```

At this point, Visibility data is read from the primary store, and all Visibility data is written to both the primary and secondary store.
This setting applies only to new Visibility data generated after Dual Visibility is enabled.
It does not migrate any existing data in the primary store to the secondary store.

For details on write options to the secondary store, see [Secondary Visibility dynamic configuration reference](/references/dynamic-configuration#secondary-visibility-settings).

#### Run in dual mode

When you enable a secondary store, only new Visibility data is written to both primary and secondary stores.
The primary store still holds the Workflow Execution data from before the secondary store was set up.

Running in dual mode lets you plan for closed and open Workflow Executions data from before the secondary store was set up in your self-hosted Temporal Cluster.

Example:

- To manage closed Workflow Executions data, run in dual mode until the Namespace [Retention Period](/clusters#retention-period) is reached.
  After the Retention Period, Workflow Execution data is removed from the Persistence and Visibility stores.
  If you want to keep the closed Workflow Executions data after the set Retention Period, you must set up [Archival](/cluster-deployment-guide#archival).
- To manage data for all open Workflow Executions, run in dual mode until all the Workflow Executions started before enabling Dual Visibility mode are closed.
  After the Workflow Executions are closed, verify the Retention Period and set up Archival if you need to keep the data beyond the Retention Period.

You can run your Visibility setup in dual mode for an indefinite period, or until you are ready to deprecate the primary store and move completely to the secondary store without losing data.

#### Deprecate primary Visibility store

When you are ready to deprecate your primary store, follow these steps.

1. Update the dynamic configuration YAML to enable read operations from the secondary store.
   Example:

   ```yaml
   system.secondaryVisibilityWritingMode:
   - value: "dual"
   constraints: {}
   system.enableReadFromSecondaryVisibility:
   - value: true
   constraints: {}
   ```

   At this point, Visibility data is read from the secondary store only.
   Verify whether data on the secondary store is correct.

1. When the secondary store is vetted and ready to replace your current primary store, change your Cluster configuration to set the secondary store as your primary, and remove the dynamic configuration set in the previous steps.
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
           visibility: temporal_visibility_v1_dev
           closeIdleConnectionsInterval: 15s
   ```
