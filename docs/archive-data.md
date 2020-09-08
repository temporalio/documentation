---
id: archive-data
title: How to archive data
sidebar_label: Archive data
---

This guide covers Temporal's archiving capabilities and how to setup the Archival feature.

## Overview

Temporal stores data that is generated from a Workflow, such as Event Histories, per the configured retention period. When the retention period expires the data is deleted to avoid running out of space. To preserve Workflow data indefinitely you can use the Archival feature, which automatically moves the data from Temporal persistence to long-term storage (i.e. S3) after the Workflow retention period expires.

There are at least two reasons you may want to keep data after the retention period has passed:

1. **Compliance**: For legal reasons, data may need to be stored for a long period of time.
2. **Debugging**: Older data may help with debugging.

:::note

- Archival is not supported when running Temporal via docker-compose.
- Archival is disabled by default when installing the system manually and when deploying via [helm charts](https://github.com/temporalio/helm-charts/blob/master/templates/server-configmap.yaml#L176), but can be enabled in the [config](https://github.com/temporalio/temporal/blob/master/config/development.yaml).
- Archival only supports Event Histories. You may notice some boilerplate infrastructure to support archiving visibility records. Visibility archival is not yet supported and visibility records are deleted after the Workflow retention period.

:::

## Setup

Archival consists of the following elements:

- **Configuration**: Archival is controlled by the [server configuration](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81) (i.e. the `config/development.yaml` file).
- **Provider**: Location where the data should be archived. Supported providers are S3, GCloud, and the local file system.
- **URI**: Specifies which provider should be used. The system uses the URI schema and path to make the determination.

Take the following steps to set up Archival:

1. [Set up the provider](#providers) of your choice. 
2. [Configure Archival](#configuration).
3. [Create a Namespace](#namespace-creation) that uses a valid URI and has Archival enabled.

### Providers

Temporal supports several providers out of the box:

- **Local file system**: The [filestore archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/filestore) is used to archive data in the file system of whatever host the Temporal server is running on. This provider is used mainly for local installations and testing and should not be relied on for production environments.
- **Google Cloud**: The [gcloud archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/gcloud) is used to connect and archive data with [Google Cloud](https://cloud.google.com/storage).
- **S3**: The [s3store archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/s3store) is used to connect and archive data with [S3](https://aws.amazon.com/s3). 
- **Custom**: If you want to use a provider that is not currently supported, you can [create your own archiver](#custom-archiver) to support it.

Make sure that you save the provider's storage location URI in a place where you can reference it later, as it is passed as a parameter when you [create a Namespace](#namespace-creation).

### Configuration

Archival configuration is defined in the [`config/development.yaml`](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81) file. Let's look at an example configuration below:

```yaml
# Cluster level Archival config
archival:
  # Event History configuration
  history:
    # Archival is enabled at the cluster level
    state: "enabled"
    enableRead: true
    # Namespaces can use either the local filestore provider or the Google Cloud provider
    provider:
      filestore:
        fileMode: "0666"
        dirMode: "0766"  
      gstorage:
        credentialsPath: "/tmp/gcloud/keyfile.json"

# Default values for a Namespace if none are provided at creation
namespaceDefaults:
  # Archival defaults
  archival:
    # Event History defaults
    history:
      state: "enabled"
      # New Namespaces will default to the local provider
      URI: "file:///tmp/temporal_archival/development"
```

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

The following table showcases acceptable values for each configuration and what purpose they serve. 

| Config | Acceptable values | Description |
|--------|-------------------|-------------|
| `archival.history.state`                       | `enabled`, `disabled`  | Must be `enabled` to use the Archival feature with any Namespace in the cluster. |
| `archival.history.enableRead`                  | `true`, `false`        | Must be `true` to read from the archived Event History. |
| `archival.history.provider`                    | Sub provider configs are `filestore`, `gstorage`, `s3`, or `your_custom_provider`. |  Default config specifies `filestore`. |
| `archival.history.provider.filestore.fileMode` | File permission string | File permissions of the archived files. We recommend using the default value of `"0666"` to avoid read/write issues. |
| `archival.history.provider.filestore.dirMode`  | File permission string | Directory permissions of the archive directory. We recommend using the default value of `"0766"` to avoid read/write issues. |
| `namespaceDefaults.archival.history.state`     | `enabled`, `disabled`  | Default state of the Archival feature whenever a new Namespace is created without specifying the Archival state. |
| `namespaceDefaults.archival.history.URI`       | Valid URI              | Must be a URI of the file store location and match a schema that correlates to a provider. |

### Namespace creation

While Archival is configured at the cluster level, it operates independently within each Namespace. When a Namespace is created, if an Archival URI is not specified then the Namespace will use the value of `defaultNamespace.archival.history.URI` from the `config/development.yaml` file. The Archival URI can not be changed once the Namespace is created. Each Namespace supports just a single Archival URI, but each Namespace can use a different URI. A Namespace can safely switch Archival between `enabled` and `disabled` states as long as Archival is enabled at the cluster level.

Archival is supported in global Namespaces (Namespaces spanning multiple clusters). When Archival is running in a global Namepsace, it will first run on the active cluster and then some time later it will run on the standby cluster. Before archiving, a history check is done to see what has been previously archived.

### Test setup

To test Archival locally, start by running a Temporal server:

```bash
./temporal-server start
```

Then register a new Namespace with Archival enabled. 

```bash
./tctl --ns samples-namespace namespace register --gd false --history_archival_status enabled --retention 0
```

Next, run a sample workflow such as the [helloworld temporal sample](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld).

Once execution has finished Archival will occur.

### Retrieve archives

You can retrieve archived Event Histories by copying the `workflowId` and `runId` of the completed Workflow from the log output and running:

```bash
./temporal --ns samples-namespace wf show --wid <workflowId> --rid <runId>
```

## Custom archiver

To archive data with a given provider, Temporal must have a corresponding archiver component installed. The system does not intend to limit you to the existing providers, so to use a provider that is not currently supported you may create your own archiver.

### Create a new package

The first step is to create a new package for your implementation in [/common/archiver](https://github.com/temporalio/temporal/tree/master/common/archiver). Create a new directory in the archiver folder and arrange the  structure to look like the following:

```
temporal/common/archiver
  - filestore/                      -- Filestore implementation
  - provider/
      - provider.go                 -- Provider of archiver instances
  - yourImplementation/
      - historyArchiver.go          -- HistoryArchiver implementation
      - historyArchiver_test.go     -- Unit tests for HistoryArchiver
      - visibilityArchiver.go       -- VisibilityArchiver implementations
      - visibilityArchiver_test.go  -- Unit tests for VisibilityArchiver
```

### Archiver interfaces

Next, define objects that implement the [HistoryArchiver](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L80) and the [VisibilityArchiver](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L109) interfaces.

The objects should live in `historyArchiver.go` and `visibilityArchiver.go` respectively.

### Update provider

Update provider to enable access to your implementation by modifying the

Update the `GetHistoryArchiver` and `GetVisibilityArchiver` methods of the `archiverProvider` object in the [/common/archiver/provider/provider.go](https://github.com/temporalio/temporal/blob/master/common/archiver/provider/provider.go) file so that it knows how to create an instance of your archiver. 

### Add configs

Add configs for you archiver to the `config/development.yaml` file and then modify the [HistoryArchiverProvider](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L403) and [VisibilityArchiverProvider](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L421) struct in `/common/service/config.go` accordingly.

### Custom archiver FAQ

**If my custom Archive method can automatically be retried by the caller, how can I record and access progress between retries?**

Handle this using the `ArchiverOptions`. Here is an example:

```go
func(a * Archiver) Archive(ctx context.Context, URI string, request * ArchiveRequest, opts...ArchiveOption) error {
    featureCatalog: = GetFeatureCatalog(opts...) // this function is defined in options.go
    var progress progress
    // Check if the feature for recording progress is enabled.
    if featureCatalog.ProgressManager != nil {
        if err: = featureCatalog.ProgressManager.LoadProgress(ctx, & prevProgress);
        err != nil {
            // log some error message and return error if needed.
        }
    }

    // Your archiver implementation...

    // Record current progress
    if featureCatalog.ProgressManager != nil {
        if err: = featureCatalog.ProgressManager.RecordProgress(ctx, progress);
        err != nil {
            // log some error message and return error if needed.
        }
    }
}
```

**If my `Archive` method encounters an error which is non-retryable how do I indicate to the caller that should not retry?**

```go
func(a * Archiver) Archive(ctx context.Context, URI string, request * ArchiveRequest, opts...ArchiveOption) error {
    featureCatalog: = GetFeatureCatalog(opts...) // this function is defined in options.go

    err: = youArchiverImpl()
  
    if nonRetryableErr(err) {
        if featureCatalog.NonRetryableError != nil {
            return featureCatalog.NonRetryableError() // when the caller gets this error type back it will not retry anymore.
        }
    }
}
```

**How does my history archiver implementation read history?**

The archiver package provides a utility called [HistoryIterator](https://github.com/temporalio/temporal/blob/master/common/archiver/historyIterator.go) which is a wrapper of [HistoryManager](https://github.com/temporalio/temporal/blob/master/common/persistence/historyStore.go). `HistoryIterator` is more simple than the `HistoryManager`, which is available in the BootstrapContainer, so archiver implementations can choose to use it when reading Workflow histories. See the [historyIterator.go](https://github.com/temporalio/temporal/blob/master/common/persistence/historyStore.go) file for more details. Use the [filestore historyArchiver implementation](https://github.com/temporalio/temporal/tree/master/common/archiver/filestore) as an example.

**Should my archiver define its own error types?**

Each archiver is free to define and return its own errors. However many common errors which exist between archivers are already defined in [common/archiver/constants.go](https://github.com/temporalio/temporal/blob/master/common/archiver/constants.go).

**Is there a generic query syntax for the visibility archiver?**

Currently no. But this is something we plan to do in the future. As for now, try to make your syntax similar to the one used by our advanced list Workflow API.

