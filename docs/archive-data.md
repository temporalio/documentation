---
id: archive-data
title: How to archive data
sidebar_label: Archive data
---

Data that is generated from a Workflow persists in normal Temporal storage per the configured retention period. The retention period exists so that the persistence store is not overwhelmed by the accummulation of Workflow data over time. To preserve Workflow data indefinitely, you can use the Archival feature which automatically moves Workflow Event Histories from the normal persistence storage to long-term storage after the Workflow retention period expires.

:::info

**Archival is currently disabled by default.**
- Archival is disabled when running Temporal via `docker-compose` and can not be enabled.
- Archival is disabled by default when cloning the repo and installing the system manually, but can be enabled in the config.
- Archival is disabled by default when deploying via [helm charts](https://github.com/temporalio/helm-charts/blob/d08ab3a582e9bc605da460b79cd7524e18d2c91d/templates/server-configmap.yaml#L176) but can be enabled in the config.

:::

:::info

**Archival only supports Event Histories.**

You may notice some boilerplate infrastructure to support archiving visibility records. This functionality is not yet supported and visibility records are currently deleted after the Workflow retention period.

:::

## Archiving use cases

There are two main reasons you may want to keep Event Histories after the retention period has past:

1. **Compliance**: For legal reasons, Event Histories may need to be stored for a long period of time.
2. **Debugging**: Old Event Histories may help with debugging.

## Archival components

Archival consists of four main components.

1. **Archival feature configuration**: Archival is controlled by the [`archival` configuration](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81) in the `config/development.yaml` file.
2. **Archive Provider**: Location where the Event Histories are archived to. Commonly used providers are S3, GCloud, Kafka, and the local file system.
3. **Archiver**: System component which archives and retrieves Event Histories. An Archiver is directly correlated to a single Archive Provider. 
4. **URI**: Specifies to the Namespace which Archiver Provider and Archiver should be used. The schema of the URI identifies which Archiver and Provider to use. Where the URI points to identifies the archive location.

## Archival setup    

To setup Archival, there are a few things you will need to do:
1. Setup archive providers. 
2. Manage Archival related configurations for the Temporal server.
3. Create a Namespace that enables Archival and is registered with an Archival URI.

### Archival providers

Temporal supports several archive providers (and archivers) out of the box as well as the option to create and use your own.

To archive data with a specific provider, Temporal must have a corresponding archiver component installed. [Currently supported archive providers](https://github.com/temporalio/temporal/tree/master/common/archiver) include the local filesystem (of whatever host Temporal is currently running on), Google Cloud, and S3.

The local filesystem is used mainly for local installations, testing, and when running Temporal via `docker-compose`. In a production environment, you will most likely want to archive Event data using one of the cloud based storage systems.

Get started with Google Cloud storage here: https://cloud.google.com/storage
Get started with S3 storage here: https://aws.amazon.com/s3

You will need the URI of the storage location where you want the data to be archived.

If you want to create your own archiver, follow [this guide](https://github.com/temporalio/temporal/blob/master/common/archiver/README.md). Contributions are welcome.

### Archival configuration

First familiarize yourself with the configuration in [`config/development.yaml`](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81).

| Config |  Description |
|--------|--------------|
| `archival.history.state`                       | Acceptable values are `"enabled"`,`"disabled"`. This must be set to `"enabled"` to use the Archival feature with any Namespace in the cluster. |
| `archival.history.enableRead`                  | Acceptable values are `true`, `false`. This must be set to `true` to read from the archived Event History. |
| `archival.history.provider`                    | Sub `provider` configs are `filestore`, `gstorage`, `s3`, or `your_custom_provider`. The default config specifies `filestore`. |
| `archival.history.provider.filestore.fileMode` | This specifies the file permissions of the archived files. We recommend using the default value of `"0666"` to avoid read/write issues. |
| `archival.history.provider.filestore.dirMode`  |  This specifies the directory permissions of the archive directory. we recommend using the default value of `"0766"` to avoid read/write issues. |
| `namespaceDefaults.archival.history.state`     | Acceptable values are `"enabled"`, `"disabled"`. This sets the default state of the Archival feature whenever a new Namespace is created without specifying the Archival state. |
| `namespaceDefaults.archival.history.URI`       | The value must be a URI of the file store location and match a schema that correlates to a provider. |

Consider the following example:

```yaml
# Cluster level Archival config
archival:
  # Event History configuration
  history:
    # State at the cluster level
    state: "enabled"
    # Read permissions
    enableRead: true
    # Available providers
    provider:
      # Local filestore provider  
      filestore:
        # File permissions
        fileMode: "0666"
        # Directory permissions
        dirMode: "0766"
      # Google Cloud provider  
      gstorage:
        # Google Cloud credentials file
        credentialsPath: "/tmp/gcloud/keyfile.json"

# Default values for a Namespace if none are provided at creation
namespaceDefaults:
  # Archival defaults
  archival:
    # Event History defaults
    history:
      # Default state
      state: "enabled"
      # Default URI
      URI: "file:///tmp/temporal_archival/development"
```

In the configuration above we see that:

1. Archival is enabled at the cluster level.
2. Namespaces can use either the local filestore provider or the Google Cloud provider.
3. New Namespaces will default to the local provider, 

:::tip

**Want to disable Archival?**

You can disable Archival by setting `archival.history.state` and `namespaceDefaults.archival.history.state` to `"disabled"`.

Example:

```yaml
archival:
  history:
    state: "disabled"

namespaceDefaults:
  archival:
    history:
      state: "disabled"
```

:::

### Namespace creation

The Archival URI is set when a Namespace is created. If you do not specify the URI when creating a Namespace, it will use the value of `defaultNamespace.archival.history.URI` from the `config/development.yaml` file. Once set, the URI can not be changed. Each Namespace supports a single Archival URI, but each Namespace can use a different URI (archiver).

At the cluster level, `archival.history.state` must be set to `"enabled"` for Archival to work at the Namespace level. Once enabled at the cluster level, a Namespace can safely switch between `enabled` and `disabled` states.

Archival is supported in global Namespaces (Namespaces spanning multiple clusters). When Archival is running in a global Namepsace, it will first run on the active cluster and then some time later it will run on the standby cluster. Before archiving, a history check is done to see what has been previously uploaded.

## Archive reads
 
To retrieve archived Event Histories you will need the Workflow Id and the Run Id:

```bash
$ ./temporal --ns <namespace> wf show --wid <workflowId> --rid <runId>
```

:::tip

Want to test this feature locally? Start by running a Temporal server:

```bash
$ ./temporal-server start
```

Then register a new Namespace with Archival enabled. 

```bash
$ ./tctl --ns samples-namespace namespace register --gd false --history_archival_status enabled --retention 0
```

Next, run a sample workflow such as the [helloworld temporal sample](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld).

Once the sample execution has finished, you can view the archived Event Histories by copying the `workflowId` and `runId` of the completed Workflow from the log output and running:

```bash
$ ./temporal --ns samples-namespace wf show --wid <workflowId> --rid <runId>
```

:::

