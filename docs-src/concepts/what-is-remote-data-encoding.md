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

Running your encoding remotely allows you to use it with `tctl` to encode/decode data for several commands including `tctl workflow start` and with Temporal Web UI to encode and decode data in your Workflow Execution details view.

To run data encoding/decoding remotely, use a [Codec Server](/concepts/what-is-a-codec-server). A Codec Server is an HTTP server that is configured to use your custom Payload Codec.

<!-- Note that currently only Go and Java SDKs support setting a remote Payload Codec with a custom Data Converter.
You can however create a Codec Server in any of the SDKs, and use it to decode payloads on the Web UI and in `tctl`.-->

Before you use a remote data encoder to encode/decode your data, ensure that you consider all the security implications of running codecs remotely. For example, codecs that perform encryption may need to be secured to prevent decryption by untrusted callers.

#### Encoding data on the Web UI and tctl

You can perform some operations on your Workflow Execution using tctl and the Web UI, such as starting or sending a Signal to an active Workflow Execution using tctl or canceling a Workflow Execution from the Web UI, which might require inputs that contain sensitive data.

To encode this data, [specify your Codec Server endpoints](/dataconversion#setting-codec-server-endpoints) with the tctl command and configure your Web UI to use the Codec Server endpoints.

#### Decoding data on the Web UI and tctl

If you use custom encoding in your custom Data Converter, Payload data handled by the Temporal Cluster is encoded. Since the Web UI uses the [Visibility](/concepts/what-is-visibility) database to show events and data stored on the Temporal Server, all data in the Workflow Execution History in your Web UI or tctl shows in the encoded format.

To see the original format of data in your Web UI and tctl, create a [Codec Server](/concepts/what-is-a-codec-server) with a remote data encoder and use the Payload Codec to decode your data locally.

Note that a remote data encoder is a separate system with access to your encryption keys and exposes APIs to encode and decode any data with the Payload Codec used. Evaluate and ensure that your remote data encoder endpoints are secured and only authorized users have access to them.

Samples:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/tree/main/encryption)
- [TypeScript](https://github.com/temporalio/samples-typescript/tree/main/encryption)
