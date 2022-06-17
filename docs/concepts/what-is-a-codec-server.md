---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A codec server provides a means of securely decrypting payload data for display by Temporal user interfaces.

Codec servers act as a go-between for the application and the database. Data from the customer’s remote server is decrypted via a codec server before it can be viewed on the WebUI. Conversely, data from the WebUI is encrypted through the codec server before being passed along to the database.

Codec servers can handle authentication and authorization in a similar manner used by Temporal Clusters. It is more secure for Temporal to store encrypted data. In the event of a data breach, any information uncovered would be indecipherable to bad actors.

## Purpose

DataConverters can be configured to use a PayloadCodec to encrypt data before it’s sent to Temporal.

![](/static/img/remote-codec-server-problem)

However, the pre-built tctl and WebUI binaries use a default DataConverter that does not include your PayloadCodec.

Because of this, tctl and the WebUI will not be able to show decrypted data—at least, not without help.

![](/static/img/remote-codec-server-solution)

This is where a Codec Server comes into play. The server exposes your PayloadCodec’s encode/decode methods via HTTP interface. This allows tctl and the WebUI to use the PayloadCodec to encrypt and decrypt data as needed.

## Configuration

Codec servers are initiated in a similar manner to a Temporal Worker.

Before you begin to run a codec server, make sure that a Temporal service is running in your SDK of choice.

If you are using Go, feel free to base your remote codec server off of [this existing repo](https://github.com/temporalio/samples-go). For other languages, please refer to the diagrams in the Go sample to construct the codec server.
