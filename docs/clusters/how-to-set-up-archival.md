---
id: how-to-set-up-archival
title: How to set up Archival
sidebar_label: Set up Archival
description: This guide covers Temporal's archiving capabilities and how to set up the Archival feature.
tags:
  - how-to
---

[Archival](/concepts/what-is-archival) consists of the following elements:

- **Configuration**: Archival is controlled by the [server configuration](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L81) (i.e. the `config/development.yaml` file).
- **Provider**: Location where the data should be archived. Supported providers are S3, GCloud, and the local file system.
- **URI**: Specifies which provider should be used. The system uses the URI schema and path to make the determination.

Take the following steps to set up Archival:

1. [Set up the provider](#providers) of your choice.
2. [Configure Archival](#configuration).
3. [Create a Namespace](#namespace-creation) that uses a valid URI and has Archival enabled.

#### Providers

Temporal directly supports several providers:

- **Local file system**: The [filestore archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/filestore) is used to archive data in the file system of whatever host the Temporal server is running on. This provider is used mainly for local installations and testing and should not be relied on for production environments.
- **Google Cloud**: The [gcloud archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/gcloud) is used to connect and archive data with [Google Cloud](https://cloud.google.com/storage).
- **S3**: The [s3store archiver](https://github.com/temporalio/temporal/tree/master/common/archiver/s3store) is used to connect and archive data with [S3](https://aws.amazon.com/s3).
- **Custom**: If you want to use a provider that is not currently supported, you can [create your own archiver](#custom-archiver) to support it.

Make sure that you save the provider's storage location URI in a place where you can reference it later, because it is passed as a parameter when you [create a Namespace](#namespace-creation).

#### Configuration

Archival configuration is defined in the [`config/development.yaml`](https://github.com/temporalio/temporal/blob/master/config/development.yaml#L93) file.
Let's look at an example configuration:

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

| Config                                         | Acceptable values                                                                  | Description                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `archival.history.state`                       | `enabled`, `disabled`                                                              | Must be `enabled` to use the Archival feature with any Namespace in the cluster.                                             |
| `archival.history.enableRead`                  | `true`, `false`                                                                    | Must be `true` to read from the archived Event History.                                                                      |
| `archival.history.provider`                    | Sub provider configs are `filestore`, `gstorage`, `s3`, or `your_custom_provider`. | Default config specifies `filestore`.                                                                                        |
| `archival.history.provider.filestore.fileMode` | File permission string                                                             | File permissions of the archived files. We recommend using the default value of `"0666"` to avoid read/write issues.         |
| `archival.history.provider.filestore.dirMode`  | File permission string                                                             | Directory permissions of the archive directory. We recommend using the default value of `"0766"` to avoid read/write issues. |
| `namespaceDefaults.archival.history.state`     | `enabled`, `disabled`                                                              | Default state of the Archival feature whenever a new Namespace is created without specifying the Archival state.             |
| `namespaceDefaults.archival.history.URI`       | Valid URI                                                                          | Must be a URI of the file store location and match a schema that correlates to a provider.                                   |

#### Namespace creation

Although Archival is configured at the cluster level, it operates independently within each Namespace.
If an Archival URI is not specified when a Namespace is created, the Namespace uses the value of `defaultNamespace.archival.history.URI` from the `config/development.yaml` file.
The Archival URI cannot be changed after the Namespace is created.
Each Namespace supports only a single Archival URI, but each Namespace can use a different URI.
A Namespace can safely switch Archival between `enabled` and `disabled` states as long as Archival is enabled at the cluster level.

Archival is supported in [Global Namespaces](/concepts/what-is-a-global-namespace/) (Namespaces that span multiple clusters).
When Archival is running in a Global Namespace, it first runs on the active cluster; later it runs on the standby cluster. Before archiving, a history check is done to see what has been previously archived.

#### Test setup

To test Archival locally, start by running a Temporal server:

```bash
./temporal-server start
```

Then register a new Namespace with Archival enabled.

```bash
./tctl --ns samples-namespace namespace register --gd false --history_archival_state enabled --retention 3
```

:::note

If the retention period isn't set, it defaults to 2 days.
The minimum retention period is 1 day.
The maximum retention period is 30 days.

Setting the retention period to 0 results in the error _A valid retention period is not set on request_.

:::

Next, run a sample Workflow such as the [helloworld temporal sample](https://github.com/temporalio/temporal-go-samples/tree/master/helloworld).

When execution is finished, Archival occurs.

#### Retrieve archives

You can retrieve archived Event Histories by copying the `workflowId` and `runId` of the completed Workflow from the log output and running the following command:

```bash
./temporal --ns samples-namespace wf show --wid <workflowId> --rid <runId>
```
