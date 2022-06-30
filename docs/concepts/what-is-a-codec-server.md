---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A Codec Server is an optional feature used to encrypt and decrypt Payloads for the WebUI.

![](/img/remote-codec-server-problem.svg)

Each Client has a built-in [Data Converter](/docs/concepts/what-is-a-data-converter). However, the pre-built tctl and WebUI binaries won't be able to decrypt the serialized Payloads.

![](/img/remote-codec-server-solution.svg)

With a Codec Server, the Client's Data Converter can send an HTTP API request to the codec to decrypt a Payload.
This decrypted data is passed back to the WebUI.

Decrypted data can also be passed back through the Codec Server for encryption. Then, when passed through the Client's Data Converter, it can be deserialized before being sent back to the Temporal Cluster.

![](/img/remote-codec-server-diagram.svg)

## Configuration

Before running a Codec Server, make sure that a [Temporal service](https://docs.temporal.io/application-development-guide/#run-a-dev-cluster) is running in your SDK of choice.

If you are using Go, feel free to base your remote Codec Server on the [temporalio/samples-go](https://github.com/temporalio/samples-go) repository.
For other languages, please refer to the diagrams in the Go sample to construct the Codec Server.
