---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A Codec Server provides a means of securely decrypting payload data for display by Temporal user interfaces.

On the Temporal Platform, you can use the WebUI or the [tctl plugin](/docs/tctl/index) to request data from the Temporal Cluster. This request is passed through a client's [Data Converter](/docs/concepts/what-is-a-data-converter), which sends and receives API calls from the Remote Codec Server. These calls are then passed from the client to the cluster, where a successful request passes an encoded payload back through the platform.

With a Codec Server, data is decrypted before it can be viewed on the [Temporal Web UI](/concepts/what-is-the-temporal-web-ui/). Conversely, data from the WebUI is encrypted through the Codec Server before being passed along to the Temporal Server. Therefore, it is more secure for Temporal to store encrypted data.

Codec Servers can handle authentication and authorization in a similar manner used by Temporal Clusters. In the event of a data breach, any information uncovered would be indecipherable to bad actors.

## Purpose

In application code, Data Converters can be configured to use a Payload Codec to encrypt data before it’s sent to Temporal.

![](/img/remote-codec-server-problem.svg)

However, the pre-built tctl and WebUI binaries use a default Data Converter that does not include your Payload Codec.
The tctl and WebUI won't be able to show decrypted data.

![](/img/remote-codec-server-solution.svg)

This is where a Codec Server comes into play. The server exposes your Payload Codec’s encode and decode methods via HTTP interface. This allows tctl and the WebUI to use the Payload Codec to encrypt and decrypt data as needed.

## Configuration

Codec Servers are initiated in a similar manner to a Temporal Worker.

Before running a Codec Server, make sure that a [Temporal service](https://docs.temporal.io/application-development-guide/#run-a-dev-cluster) is running in your SDK of choice.

If you are using Go, feel free to base your remote Codec Server off of [this existing repo](https://github.com/temporalio/samples-go). For other languages, please refer to the diagrams in the Go sample to construct the Codec Server.
