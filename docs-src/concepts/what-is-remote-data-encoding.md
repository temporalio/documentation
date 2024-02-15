---
id: what-is-remote-data-encoding
title: What is remote data encoding?
sidebar_label: Remote data encoding
description: Remote data encding is using your custom Data Converter to decode (and encode) your Payloads remotely through endpoints.
tags:
  - term
  - explanation
---

Remote data encoding is exposing your Payload Codec via HTTP endpoints to support remote encoding and decoding.

Running your encoding remotely allows you to use it with the [`temporal` CLI](/concepts/what-is-the-temporal-cli) to encode/decode data for several commands including `temporal workflow show` and with Temporal Web UI to decode data in your Workflow Execution details view.

To run data encoding/decoding remotely, use a [Codec Server](/concepts/what-is-a-codec-server). A Codec Server is an HTTP server that uses your custom Codec logic to decode your data remotely.
The Codec Server is independent of the Temporal Cluster and decodes your encrypted payloads through predefined endpoints.
You create, operate, and manage access to your Codec Server in your own environment.
The `temporal` CLI and the Web UI in turn provide built-in hooks to call the Codec Server to decode encrypted payloads on demand.

#### Encoding data on the Web UI and CLI

You can perform some operations on your Workflow Execution using `temporal` and the Web UI, such as starting or sending a Signal to an active Workflow Execution using `temporal` or canceling a Workflow Execution from the Web UI, which might require inputs that contain sensitive data.

To encode this data, [specify your Codec Server endpoints](/concepts/what-is-a-codec-server#endpoints) with [`temporal`](/cli/cmd-options#codec-endpoint) and configure your Web UI to use the Codec Server endpoints.

#### Decoding data on the Web UI and CLI

If you use custom encoding, Payload data handled by the Temporal Cluster is stored encoded. Since the Web UI uses the [Visibility](/concepts/what-is-visibility) database to show events and data stored on the Temporal Server, all data in the Workflow Execution History in your Web UI is displayed in the encoded format.

To decode output when using the Web UI and `temporal`, use a [Codec Server](/concepts/what-is-a-codec-server).

Note that a remote data encoder is a separate system with access to your encryption keys and exposes APIs to encode and decode any data.
Evaluate and ensure that your remote data encoder endpoints are secured and only authorized users have access to them.

Samples:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/tree/main/encryption)
- [TypeScript](https://github.com/temporalio/samples-typescript/tree/main/encryption)
