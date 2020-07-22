---
id: configuring-archival
title: Configuring Archival
---
 
## What is Archival?

Archival is a feature that automatically moves Workflow Event Histories from Temporal's normal persistence storage to a long-term blob store after the Workflow retention period expires.

This feature enables Event Histories to be stored indefinitely while not overwhelming the persistence store.

The Archival feature can be customized per Namespace, but must be enabled and configured at the Cluster level as well.

:::note

**Archival only supports Event Histories.**

You may see some infrastructure in place to support archiving visibility records. However, the functionality is not yet supported and visibility records are currently deleted after the Workflow retention period.

:::

## Why use Archival?

There are two main reasons you may want to keep Event Histories after the retention period has past:

1. **Compliance:** For legal reasons Event Histories may need to be stored for a long period of time.
2. **Debugging:** Old Event Histories may help with debugging.

:::info

**Want to turn off the Archival feature?**

Set `archival.history.state` and `namespaceDefaults.archival.history.state` to `disabled`.

:::

## How to use Archival

There are four main components to the Archival feature that you need to be aware of.

1. **Archival feature configuration**: The Archival feature is controlled by the `archival` configuration in the `config/development.yaml` file.
2. **Archive Provider**: The location where the Event Histories are archived to is called the Archive Provider. Common providers are S3, GCloud, Kafka, and the local file system.
3. **Archiver**: The actual system component that archives and retrieves Event Histories is called an Archiver. An Archiver is directly correlated to a single Archive Provider. 
4. **URI**: The URI is what the Namespace uses to know which Archive Provider and Archiver to use. The schema of the URI identifies which Archiver and Provider to use, and where the URI points to, identifies the actual archive location.

Temporal supports several Archive Providers (and Archivers) out of the box as well as the option to create and use your own. If you want to create your own Archiver, follow [this guide](https://github.com/temporalio/temporal/blob/master/common/archiver/README.md).

New Namespaces require the Archival URI to be set at the time of creation. Once set, the URI can not be changed for a Namespace. Each Namespace supports a single Archival URI, but each Namespace in a cluster can have a unique URI.

When creating a new Namespace, if the URI is not specifically provided, the Namespace will use the value of `defaultNamespace.archival.history.URI` from the `config/development.yaml` file.

A Namespace can safely switch between `enabled` and `disabled` states, however `archival.history.state` must be set to `"enabled"` for Archival to work within any Namespace within the cluster regardless of whether the Namespace has Archival enabled.

Currently, the `defaultNamespace` configuration makes use of the local file system Provider and Archiver, storing Event Histories at `file:///tmp/temporal_archival/development`.

However, in a production environment, you will most likely want to store Event Histories in a cloud based storage system such as S3 or Google Cloud. In this scenario you will need to make changes in the `config/development.yaml` file or use the dynamic config overwrite.

:::note

The dynamic config will only take effect if `archival.history.state` is set to `"enabled"` in `config/development.yaml`.

:::

Archival is supported in global Namespaces (Namespaces spanning multiple clusters). When Archival runs for a global Namepsace, it will first run on the active cluster and then some time later it will run on the standby cluster as well. Before archiving, a history check is done to see what has already been uploaded.

:::caution

**A Workflow should never operate on clear text PII to prevent PII from being archived.**

:::

### Archival configuration reference

**Example configuration**:

```yaml
archival:
  history:
    state: "enabled"
    enableRead: true
    provider:
      filestore:
        fileMode: "0666"
        dirMode: "0766"
      gstorage:
        credentialsPath: "/tmp/gcloud/keyfile.json"

namespaceDefaults:
  archival:
    history:
      state: "enabled"
      URI: "file:///tmp/temporal_archival/development"
```

| Config |  Description |
|--------|--------------------------|
| `archival.history.state` | Acceptable values are `"enabled"`,`"disabled"`. This must be set to `"enabled"` to use the Archival feature with any Namespace in the cluster. |
| `archival.history.enableRead`| Acceptable values are `true`, `false`. This must be set to `true` to read from the archived Event History. |
| `archival.history.provider` | Sub `provider` configs are typically `filestore`, `gstorage`, `s3`, or `your_custom_provider`. The default provider is `filestore`. |
| `archival.history.provider.filestore.fileMode` | This specifies the file permissions of the archived files. We recommend using the default value of `"0666"` to avoid read/write issues. |
| `archival.history.provider.filestore.dirMode` |  This specifies the directory permissions of the archive directory. we recommend using the default value of `"0766"` to avoid read/write issues. |
| `namespaceDefaults.archival.history.state` | Acceptable values are `"enabled"`, `"disabled"`. This sets the default state of the Archival feature whenever a new Namespace is created without specifying the Archival state. |
| `namespaceDefaults.archival.history.URI` | The value must be the URI of the file store location. By default, this is set to your local filestore, but can be changed to any Archive Provider location. |

## Retrieving archived Event Histories
 
To retrieve archived Event Histories you will need the Workflow Id and the Run Id:

```
$ ./temporal --ns <namespace> wf show --wid <workflowId> --rid <runId>`
```

:::info

Want to test this feature locally? Start by running a Temporal server:

```
$ ./temporal-server start
```

Then register a new Namespace with the Archival feature enabled for that Namespace. 

```
$ ./tctl --ns samples-namespace namespace register --gd false --history_archival_status enabled --retention 0
```

Next, run a sample workflow such as the [helloworld temporal sample](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld). Following the README to set up the sample.

Once the sample has completed, you can view the archived Event Histories by copying the `workflowId` and `runId` of the completed Workflow from the log output and running:

```
$ ./temporal --ns samples-namespace wf show --wid <workflowId> --rid <runId>`
```
:::

