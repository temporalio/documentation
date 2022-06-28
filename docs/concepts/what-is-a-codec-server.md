---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A Codec Server is an optional implementation for your [Temporal Platform](/docs/concepts/what-is-the-temporal-platform). With it, deserialized Payloads can have their data displayed on your WebUI.

## Purpose

![](/img/remote-codec-server-problem.svg)

By default, the Temporal Platform provides Clients to receive information from the tctl, WebUI, and running Workers. Each Client has a built-in [Data Converter](/docs/concepts/what-is-a-data-converter).

Data Converters serialize and deserialize between a language's native data types and raw Payloads received from the Temporal Cluster. However, the pre-built tctl and WebUI binaries won't be able to decrypt the Payloads.

![](/img/remote-codec-server-solution.svg)

With a Codec Server, the Client's Data Converter can send an HTTP API request to the codec to decrypt a Payload.
This decrypted data is passed back to a user-facing interface (through the command line or by WebUI) for viewing by the developer.

Decrypted data can also be passed back through the Codec Server for encryption. Then, when passed through the Client's Data Converter, it can be deserialized before being sent back to the Temporal Cluster.

The Codec Server can only receive HTTP APIs from Clients. The WebUI and tctl cannot send or receive anything directly to the Codec Server.

## Configuration

Codec Servers are initiated in a similar manner to a Temporal Worker.

Before running a Codec Server, make sure that a [Temporal service](https://docs.temporal.io/application-development-guide/#run-a-dev-cluster) is running in your SDK of choice.

If you are using Go, feel free to base your remote Codec Server off of [this existing repo](https://github.com/temporalio/samples-go). For other languages, please refer to the diagrams in the Go sample to construct the Codec Server.
