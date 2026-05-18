---
id: archival
title: Self-hosted Archival setup
sidebar_label: Archival
description: Configure Archival to store closed Workflow Event Histories and Visibility records in blob storage.
slug: /self-hosted-guide/archival
toc_max_heading_level: 4
keywords:
  - explanation
  - how-to
tags:
  - Temporal Service
  - Self-hosting
---

Use Archival to back up closed Workflow Execution [Event Histories](/workflow-execution/event#event-history) and
Visibility records from Temporal Service persistence to blob storage.

- [How to create a custom Archiver](#custom-archiver)
- [How to set up Archival](#set-up-archival)

When a Workflow Execution closes, Temporal schedules close-processing tasks for both Visibility records and Event
History Archival. Archival then runs asynchronously after a randomized delay. By default, that delay is up to 5 minutes
set by `history.archivalProcessorArchiveDelay`, and is capped by the Namespace
[Retention Period](/temporal-service/temporal-server#retention-period).

The closed execution still stays in Temporal persistence until retention cleanup runs. For some time, the same closed
execution can exist in both persistence and archival storage. Archival enables Workflow Execution data to persist beyond
retention without overwhelming the Temporal Service persistence store.

Use this to keep closed Workflow data available for compliance, audits, and debugging without keeping all closed data in
your primary persistence store.

:::info Experimental feature

Archival is an **experimental** feature and not subject to normal
[versioning and support policy](/temporal-service/temporal-server#versions-and-support).

:::

Archival is not supported when running Temporal through Docker. It's disabled by default when installing the system
manually and when deploying through
[helm charts](https://github.com/temporalio/helm-charts/blob/main/charts/temporal/templates/server-configmap.yaml). It
can be enabled in the server [configuration](https://github.com/temporalio/temporal/blob/main/config/development.yaml).

### Set up Archival {#set-up-archival}

To set up [Archival](/temporal-service/archival), decide the following:

- **Which provider to use:** S3, Google Cloud, local file system, or custom.
- **Which URI to use:** URI scheme and path identify the provider and destination.
- **Which Namespace should use Archival:** Archival must be enabled at both the Temporal Service level and the Namespace
  level.

Take the following steps to set up Archival:

1. [Choose an Archival provider](#choose-an-archival-provider).
2. [Configure Archival options](#configure-archival-options).
3. [Create an Archiving Namespace](#create-an-archiving-namespace).

#### Choose an Archival provider {#choose-an-archival-provider}

Temporal directly supports several providers:

- **Local file system**: The
  [filestore archiver](https://github.com/temporalio/temporal/tree/main/common/archiver/filestore) is used to archive
  data in the file system of whatever host the Temporal server is running on. In the case of
  [temporal helm-charts](https://github.com/temporalio/helm-charts), the archive data is stored in the `history` pod.
  APIs do not function with the filestore archive. This provider is used mainly for local installations and testing and
  should not be relied on for production environments.
- **Google Cloud**: The [gcloud archiver](https://github.com/temporalio/temporal/tree/main/common/archiver/gcloud) is
  used to connect and archive data with [Google Cloud](https://cloud.google.com/storage).
- **S3**: The [s3store archiver](https://github.com/temporalio/temporal/tree/main/common/archiver/s3store) is used to
  connect and archive data with [S3](https://aws.amazon.com/s3).
- **Custom**: If you want to use a provider that is not currently supported, you can
  [create your own archiver](#custom-archiver) to support it.

Save the provider URI so you can pass it when you create a Namespace with Archival enabled.

#### Configure Archival options {#configure-archival-options}

Configure Archival in
[`config/development.yaml`](https://github.com/temporalio/temporal/blob/main/config/development.yaml#L93):

```yaml
# Temporal Service level Archival config
archival:
  # Event History configuration
  history:
    # Archival is enabled at the Temporal Service level
    state: 'enabled'
    enableRead: true
    # Namespaces can use either the local filestore provider or the Google Cloud provider
    provider:
      filestore:
        fileMode: '0666'
        dirMode: '0766'
      gstorage:
        credentialsPath: '/tmp/gcloud/keyfile.json'

# Default values for a Namespace if none are provided at creation
namespaceDefaults:
  # Archival defaults
  archival:
    # Event History defaults
    history:
      state: 'enabled'
      # New Namespaces will default to the local provider
      URI: 'file:///tmp/temporal_archival/development'
```

You can disable Archival by setting `archival.history.state` and `namespaceDefaults.archival.history.state` to
`"disabled"`.

Example:

```yaml
archival:
  history:
    state: 'disabled'

namespaceDefaults:
  archival:
    history:
      state: 'disabled'
```

The following table shows the available configuration options and their accepted values:

| Config                                         | Acceptable values                                                                  | Description                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `archival.history.state`                       | `enabled`, `disabled`                                                              | Must be `enabled` to use the Archival feature with any Namespace in the Temporal Service.                                    |
| `archival.history.enableRead`                  | `true`, `false`                                                                    | Must be `true` to read from the archived Event History.                                                                      |
| `archival.history.provider`                    | Sub provider configs are `filestore`, `gstorage`, `s3`, or `your_custom_provider`. | Default config specifies `filestore`.                                                                                        |
| `archival.history.provider.filestore.fileMode` | File permission string                                                             | File permissions of the archived files. We recommend using the default value of `"0666"` to avoid read/write issues.         |
| `archival.history.provider.filestore.dirMode`  | File permission string                                                             | Directory permissions of the archive directory. We recommend using the default value of `"0766"` to avoid read/write issues. |
| `namespaceDefaults.archival.history.state`     | `enabled`, `disabled`                                                              | Default state of the Archival feature whenever a new Namespace is created without specifying the Archival state.             |
| `namespaceDefaults.archival.history.URI`       | Valid URI                                                                          | Must be a URI of the file store location and match a schema that correlates to a provider.                                   |

Additional resources: [Temporal Service configuration reference](/references/configuration).

#### Create an Archiving Namespace {#create-an-archiving-namespace}

Although Archival is configured at the Temporal Service level, it operates independently within each Namespace. If you
don't specify an Archival URI during Namespace creation, the Namespace uses `namespaceDefaults.archival.history.URI`
from `config/development.yaml`. The Archival URI cannot be changed after the Namespace is created. Each Namespace
supports only a single Archival URI, but each Namespace can use a different URI. A Namespace can safely switch Archival
between `enabled` and `disabled` states as long as Archival is enabled at the Temporal Service level.

Archival is supported in [Global Namespaces](/global-namespace) (Namespaces that span multiple clusters). When Archival
is running in a Global Namespace, it first runs on the active cluster; later it runs on the standby cluster. Before
archiving, a history check is done to see what has been previously archived.

#### Test your Archival setup {#test-your-archival-setup}

To test Archival locally, start by running a Temporal server:

```bash
./temporal-server start
```

Then register a new Namespace with Archival enabled.

{/* ./tctl --ns samples-namespace namespace register --gd false --history_archival_state enabled --retention 3 */}

```bash
./temporal operator namespace create --namespace="my-namespace" --global false --history-archival-state="enabled" --retention="4d"
```

:::note

If the retention period isn't set, it defaults to 72h. The minimum retention period is one day. For retention maximums,
check [Temporal Service Retention Period limits](/temporal-service/temporal-server#retention-period) for your server
version.

Setting the retention period to 0 results in the error _A valid retention period is not set on request_.

:::

Next, run a sample Workflow such as the
[helloworld temporal sample](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld).

When the Workflow Execution closes, Temporal schedules archival processing.

#### Retrieve archived history {#retrieve-archived-history}

You can retrieve archived Event Histories by copying the `workflowId` and `runId` of the completed Workflow from the log
output and running the following command:

{/* ./tctl --ns samples-namespace wf show --wid <workflowId> --rid <runId> */}

```bash
./temporal workflow show --workflow-id="my-workflow-id" --run-id="my-run-id" --namespace="my-namespace"
```

### Create a custom Archiver {#custom-archiver}

To archive data with a given provider, using the [Archival](/temporal-service/archival) feature, Temporal must have a
corresponding Archiver component installed. The platform does not limit you to the existing providers. To use a provider
that is not currently supported, you can create your own Archiver.

#### Create a new package

The first step is to create a new package for your implementation in
[/common/archiver](https://github.com/temporalio/temporal/tree/main/common/archiver). Create a directory in the archiver
folder and arrange the structure to look like the following:

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

#### Archiver interfaces

Next, define objects that implement the
[HistoryArchiver](https://github.com/temporalio/temporal/blob/main/common/archiver/interface.go#L80) and the
[VisibilityArchiver](https://github.com/temporalio/temporal/blob/main/common/archiver/interface.go#L121) interfaces.

The objects should live in `historyArchiver.go` and `visibilityArchiver.go`, respectively.

#### Update provider

Update the `GetHistoryArchiver` and `GetVisibilityArchiver` methods of the `archiverProvider` object in the
[/common/archiver/provider/provider.go](https://github.com/temporalio/temporal/blob/main/common/archiver/provider/provider.go)
file so that it knows how to create an instance of your archiver.

#### Add configs

Add configs for your archiver to the `config/development.yaml` file and then modify the
[HistoryArchiverProvider](https://github.com/temporalio/temporal/blob/main/common/config/config.go#L376) and
[VisibilityArchiverProvider](https://github.com/temporalio/temporal/blob/main/common/config/config.go#L393) structs in
`/common/common/config.go` accordingly.

#### Custom archiver FAQ

**If my custom Archive method can automatically be retried by the caller, how can I record and access progress between
retries?**

Handle this situation by using `ArchiverOptions`. Here is an example:

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

**If my `Archive` method encounters an error that is non-retryable, how do I indicate to the caller that it should not
retry?**

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

The archiver package provides a utility called
[HistoryIterator](https://github.com/temporalio/temporal/blob/main/common/archiver/historyIterator.go) which is a
wrapper of
[ExecutionManager](https://github.com/temporalio/temporal/blob/main/common/persistence/data_interfaces.go#L1014).
`HistoryIterator` is more simple than the `HistoryManager`, which is available in the BootstrapContainer, so archiver
implementations can choose to use it when reading Workflow histories. See the
[historyIterator.go](https://github.com/temporalio/temporal/blob/main/common/archiver/history_iterator.go) file for more
details. Use the
[filestore historyArchiver implementation](https://github.com/temporalio/temporal/tree/main/common/archiver/filestore)
as an example.

**Should my archiver define its own error types?**

Each archiver is free to define and return its own errors. However, many common errors that exist between archivers are
already defined in
[common/archiver/constants.go](https://github.com/temporalio/temporal/blob/main/common/archiver/constants.go).

**Is there a generic query syntax for the visibility archiver?**

Currently, no. But this is something we plan to do in the future. As for now, try to make your syntax similar to the one
used by our advanced list Workflow API.

- [s3store](https://github.com/temporalio/temporal/tree/main/common/archiver/s3store#visibility-query-syntax)
- [gcloud](https://github.com/temporalio/temporal/tree/main/common/archiver/gcloud#visibility-query-syntax)
