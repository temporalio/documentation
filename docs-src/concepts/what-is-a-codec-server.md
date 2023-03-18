---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: A Codec Server is an HTTP server that is configured to use your custom Payload Codec to run encoding and decoding on your data remotely through endpoints.
tags:
  - term
---

A Codec Server is an HTTP server that is configured to use your custom [Payload Codec](/concepts/what-is-a-data-converter#payload-codec) to run encoding and decoding on your data remotely through endpoints.

![](/img/tctl-diagram-codec-server.svg)

You can create a custom [Payload Codec](/prod-readiness-context/data-encryption) with your encoding logic (such as encryption and/or compression), and apply it to the data processed in your Workflows.

Using a custom Payload Codec in your Codec Server enables encoding and decoding data remotely through the endpoints that you expose on the Codec Server.

A Codec Server follows the Temporal [Codec Server Protocol](https://github.com/temporalio/samples-go/tree/main/codec-server#codec-server-protocol).
It implements two endpoints:

- `POST /encode`
- `POST /decode`

Each endpoint receives and responds with a JSON body that has a `payloads` property with an array of Payloads.
The endpoints run the Payloads through a [Payload Codec](/concepts/what-is-a-data-converter#payload-codec) before returning them.

Most SDKs provide example Codec Server implementation samples, listed here:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/blob/main/encryption/codec_server.py)
- [TypeScript](https://github.com/temporalio/samples-typescript/blob/main/encryption/src/codec-server.ts)

#### Usage

When using tctl or the Web UI to perform some operations on a Workflow Execution, you can configure the exposed Codec Server endpoints to remotely encode data sent to the Temporal Server and decode data received from the Temporal Server.

When you apply custom encoding with encryption or compression on your Workflow data, it is stored in the encrypted/compressed format on the Temporal Server.

For example, the following objects are persisted in your encoded format in the Workflow Execution Event History:

- Inputs and outputs/results in your [Workflow](/concepts/what-is-a-workflow-execution), [Activity](/concepts/what-is-an-activity-execution), and [Child Workflow](/concepts/what-is-a-child-workflow-execution)
- [Signal](/concepts/what-is-a-signal) inputs
- Results of [Local Activity](/concepts/what-is-a-local-activity), [Side Effects](/concepts/what-is-a-side-effect)
- [Query](/concepts/what-is-a-query) results
- [Memo](/concepts/what-is-a-memo)
- [Application errors and failures](/kb/failures).

Before you use a Codec Server to encode your data, ensure that you consider all the security implications of running codecs remotely. For example, codecs that perform encryption may need to be secured to prevent decryption by untrusted callers.

[Configure your Codec Server endpoints](/prod-readiness-context/how-to-set-up-codec-server) to decode the encoded data to its original format when viewed from the Web UI or tctl.

The following samples provide implementation examples for applying authentication on your Codec Server using the GO SDK.

- [Codec Server](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [GRPC proxy server](https://github.com/temporalio/samples-go/tree/main/grpc-proxy)
