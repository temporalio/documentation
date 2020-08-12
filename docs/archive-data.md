---
id: archive-data
title: How to archive data
sidebar_label: Archive data
---

This guide covers Temporal's archiving capabilities and how to setup the Archival feature.

## Overview

Temporal stores data that is generated from a Workflow, such as Event Histories, per the configured retention period. When the retention period expires the data is deleted to avoid running out of space. To preserve Workflow data indefinitely you can use the Archival feature, which automatically moves the data from Temporal to long-term storage (i.e. S3) after the Workflow retention period expires.

There are at least two reasons you may want to keep data after the retention period has passed:

1. **Compliance**: For legal reasons, data may need to be stored for a long period of time.
2. **Debugging**: Older data may help with debugging.

:::note

Archival is not supported when running Temporal via `docker-compose`. It is disabled by default when cloning the repo and installing the system manually, and when deploying via [helm charts](https://github.com/temporalio/helm-charts/blob/master/templates/server-configmap.yaml#L176) but can be enabled in the [config](https://github.com/temporalio/temporal/blob/master/config/development.yaml).

Archival only supports Event Histories. You may notice some boilerplate infrastructure to support archiving visibility records. Visibility archival is not yet supported and visibility records are deleted after the Workflow retention period.

:::

## Setup

Archival consists of four elements.

1. **Configuration**: Archival is controlled by the [server configuration](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81) (i.e. the `config/development.yaml` file).
2. **Provider**: Location where the data should be archived. Supported providers are S3, GCloud, and the local file system.
3. **Archiver**: System component which archives and retrieves data. Each archiver supports a specific provider. 
4. **URI**: Specifies which provider and archiver should be used. The system uses the URI schema and path to make the determination.

To setup Archival, you will need to take the following steps.

1. Setup the provider of your choice. 
2. Configure Archival.
3. Create a Namespace with Archival enabled provide it a valid URI.

### Providers

Temporal supports several providers out of the box.

- **Local file system**: The [filestore archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/filestore) is used to archive data in the file system of whatever host the Temporal server is running on. This provider is used mainly for local installations and testing and should not be relied on for production environments.
- **Google Cloud**: The [gcloud archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/gcloud) is used to connect and archive data with them. Create an account with [Google Cloud](https://cloud.google.com/storage) to get started with using them as a provider.
- **S3**: The [s3store archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/s3store) is used to connect and archive data with S3. Create an account with [S3](https://aws.amazon.com/s3) to get started with them as a provider. 
- **Custom**: If you want to use a provider that is not currently supported, you can [create your own archiver](#custom-archiver) to support it (To archive data with a specific provider, Temporal must have a corresponding archiver component installed.)

You will need the storage location's URI as it will need to be passed as a parameter when a [Namespace is created](#namespace-creation).

### Configuration

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

At the cluster level, `archival.history.state` must be set to `"enabled"` for Archival to work at the Namespace level for Even Histories. Once enabled at the cluster level, a Namespace can safely switch between `enabled` and `disabled` states.

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

## Custom archiver

Temporal does not intend to limit you to specific archive locations. To use a provider that is not currently supported you may create your own archiver.

### Create a new package

The first step is to create a new package for your implementation in [`/common/archiver`](https://github.com/temporalio/temporal/tree/master/common/archiver). Create a new directory in the archiver folder and arrange the  structure to look like the following:

```
./common/archiver
  - filestore/                      -- Filestore implementation
  - provider/
      - provider.go                 -- Provider of archiver instances
  - yourImplementation/
      - historyArchiver.go          -- HistoryArchiver implementation
      - historyArchiver_test.go     -- Unit tests for HistoryArchiver
      - visibilityArchiver.go       -- VisibilityArchiver implementations
      - visibilityArchiver_test.go  -- Unit tests for VisibilityArchiver
```

### Implement interfaces

Next, implement the [`HistoryArchiver`](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L80) and the [`VisibilityArchiver`](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L109) interfaces.

```go
type HistoryArchiver interface {
	// Archive is used to archive a workflow history. When the context expires the method should stop trying to archive.
	// Implementors are free to archive however they want, including implementing retries of sub-operations. The URI defines
	// the resource that histories should be archived into. The implementor gets to determine how to interpret the URI.
	// The Archive method may or may not be automatically retried by the caller. The ArchiveOptions are used
	// to interact with these retries including giving the implementor the ability to cancel retries and record progress
  // between retry attempts.
  // This method will be invoked after a workflow passes its retention period.
    Archive(context.Context, URI, *ArchiveHistoryRequest, ...ArchiveOption) error

    // Get is used to access an archived history. When context expires method should stop trying to fetch history.
    // The URI identifies the resource from which history should be accessed and it is up to the implementor to interpret this URI.
    // This method should thrift errors - see filestore as an example.
    Get(context.Context, URI, *GetHistoryRequest) (*GetHistoryResponse, error)

    // ValidateURI is used to define what a valid URI for an implementation is.
    ValidateURI(URI) error
}
```

```go
type VisibilityArchiver interface {
    // Archive is used to archive one workflow visibility record.
    // Check the Archive() method of the HistoryArchiver interface in Step 2 for parameters' meaning and requirements.
    // The only difference is that the ArchiveOption parameter won't include an option for recording process.
    // Please make sure your implementation is lossless. If any in-memory batching mechanism is used, then those batched records will be lost during server restarts.
    // This method will be invoked when workflow closes. Note that because of conflict resolution, it is possible for a workflow to through the closing process multiple times, which means that this method can be invoked more than once after a workflow closes.
    Archive(context.Context, URI, *ArchiveVisibilityRequest, ...ArchiveOption) error

    // Query is used to retrieve archived visibility records.
    // Check the Get() method of the HistoryArchiver interface in Step 2 for parameters' meaning and requirements.
    // The request includes a string field called query, which describes what kind of visibility records should be returned. For example, it can be some SQL-like syntax query string.
    // Your implementation is responsible for parsing and validating the query, and also returning all visibility records that match the query.
    // Currently the maximum context timeout passed into the method is 3 minutes, so it's ok if this method takes a long time to run.
    Query(context.Context, URI, *QueryVisibilityRequest) (*QueryVisibilityResponse, error)

    // ValidateURI is used to define what a valid URI for an implementation is.
    ValidateURI(URI) error
}
```

### Update provider

Update provider to enable access to your implementation by modifying the [`/provider/provider.go`](https://github.com/temporalio/temporal/blob/master/common/archiver/provider/provider.go) file so that the ArchiverProvider knows how to create an instance of your archiver. 

### Add configs

Add configs for you archiver to static yaml config files, such as `config/development.yaml`. 

Then modify the [`HistoryArchiverProvider`](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L403) and [`VisibilityArchiverProvider`](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L421) struct in the `./common/service/config.go` accordingly.

### Custom archiver FAQ

**If my Archive method can automatically be retried by the caller, how can I record and access progress between retries?**

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

The archiver package provides a utility called [`HistoryIterator`](https://github.com/temporalio/temporal/blob/master/common/archiver/historyIterator.go) which is a wrapper of [`HistoryManager`](https://github.com/temporalio/temporal/blob/master/common/persistence/historyStore.go). `HistoryIterator` is more simple than the `HistoryManager`, which is available in the BootstrapContainer, so archiver implementations can choose to use it when reading Workflow histories. See the [historyIterator.go](https://github.com/temporalio/temporal/blob/master/common/persistence/historyStore.go) file for more details. Use the [filestore historyArchiver implementation](https://github.com/temporalio/temporal/tree/master/common/archiver/filestore) as an example.

**Should my archiver define its own error types?**

Each archiver is free to define and return its own errors. However many common errors which exist between archivers are already defined in [constants.go](https://github.com/temporalio/temporal/blob/master/common/archiver/constants.go).

**Is there a generic query syntax for the visibility archiver?**

Currently no. But this is something we plan to do in the future. As for now, try to make your syntax similar to the one used by our advanced list Workflow API.

