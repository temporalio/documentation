---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: A Codec Server is an HTTP server that uses your custom Payload Codec to encode and decode your data remotely through endpoints.
tags:
  - term
---

A Codec Server is an HTTP/HTTPS server that uses a [custom Payload Codec](/self-hosted/data-encryption) to decode your data remotely through endpoints.

![](/diagrams/tctl-diagram-codec-server.svg)

A Codec Server follows the Temporal [Codec Server Protocol](https://github.com/temporalio/samples-go/tree/main/codec-server#codec-server-protocol).
It implements two endpoints:

- `/encode`
- `/decode`

Each endpoint receives and responds with a JSON body that has a `payloads` property with an array of [Payloads](/concepts/what-is-a-payload).
The endpoints run the Payloads through a [Payload Codec](/concepts/what-is-a-data-converter#payload-codec) before returning them.

Most SDKs provide example Codec Server implementation samples, listed here:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/blob/main/encryption/codec_server.py)
- [TypeScript](https://github.com/temporalio/samples-typescript/blob/main/encryption/src/codec-server.ts)

#### Usage

When you apply custom encoding with encryption or compression on your Workflow data, it is stored in the encrypted/compressed format on the Temporal Server. For details on what data is encoded, see [Securing your data](/self-hosted/data-encryption).

To see decoded data when using the CLI or Web UI to perform some operations on a Workflow Execution, configure the Codec Server endpoint in the Web UI and CLI.
When you configure the Codec Server endpoints, the CLI and Web UI send the encoded data to the Codec Server, and display the decoded data received from the Codec Server.

For details on creating your Codec Server, see [Codec Server Setup](/self-hosted/how-to-setup-codec-server#codec-server-setup).

After you start your Codec Server, [configure your Codec Server endpoints](/self-hosted/how-to-set-up-codec-server#set-your-codec-server-endpoints-with-web-ui-and-cli).

<!-- You can set your Codec Server endpoints to encode data sent to the Temporal Server (see [Remote data encoding](/concepts/what-is-remote-data-encoding)).
However, before you use a Codec Server to encode your data, ensure that you consider all the security implications of running codecs remotely.
For example, codecs that perform encryption might need to be secured to prevent decryption by untrusted callers. -->
