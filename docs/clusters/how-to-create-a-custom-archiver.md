---
id: how-to-create-a-custom-archiver
title: How to create a custom Archiver
sidebar_label: Custom Archiver
description: todo
tags:
  - how-to
---

To archive data with a given provider, using the [Archival](/docs/concepts/what-is-archival) feature, Temporal must have a corresponding Archiver component installed.
The platform does not intend to limit you to the existing providers, so to use a provider that is not currently supported you may create your own Archiver.

#### Create a new package

The first step is to create a new package for your implementation in [/common/archiver](https://github.com/temporalio/temporal/tree/master/common/archiver). Create a new directory in the archiver folder and arrange the structure to look like the following:

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

Next, define objects that implement the [HistoryArchiver](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L80) and the [VisibilityArchiver](https://github.com/temporalio/temporal/blob/master/common/archiver/interface.go#L109) interfaces.

The objects should live in `historyArchiver.go` and `visibilityArchiver.go` respectively.

#### Update provider

Update provider to enable access to your implementation by modifying the

Update the `GetHistoryArchiver` and `GetVisibilityArchiver` methods of the `archiverProvider` object in the [/common/archiver/provider/provider.go](https://github.com/temporalio/temporal/blob/master/common/archiver/provider/provider.go) file so that it knows how to create an instance of your archiver.

#### Add configs

Add configs for you archiver to the `config/development.yaml` file and then modify the [HistoryArchiverProvider](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L403) and [VisibilityArchiverProvider](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go#L421) struct in `/common/service/config.go` accordingly.

#### Custom archiver FAQ

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

**If my `Archive` method encounters an error which is non-retryable, how do I indicate to the caller that it should not retry?**

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

- [s3store](https://github.com/temporalio/temporal/tree/master/common/archiver/s3store#visibility-query-syntax)
- [gcloud](https://github.com/temporalio/temporal/tree/master/common/archiver/gcloud#visibility-query-syntax)
