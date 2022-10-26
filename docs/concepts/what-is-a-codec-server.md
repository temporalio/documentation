---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
tags:
  - term
---

A Codec Server is a feature that can perform additional levels of encoding and decoding on Payloads that are handled by [tctl](/tctl-v1) or the [Web UI](/web-ui).

- [How to set up a Codec Server](/clusters/how-to-set-up-codec-server/)

The Web UI and tctl both use a default [Data Converter](/concepts/what-is-a-data-converter), which is capable of serialization only.

Codec Servers can encrypt, compress, and change the format of a Payload object.
These measures can further secure your data.

![](/img/tctl-diagram-codec-server.svg)

## Use case: tctl

Suppose that you want to view Workflow History.
This information needs to be decoded before it can be viewed.

You can use [tctl workflow showid](/tctl-v1/workflow#show) to view a Workflow Execution Event History.

```bash
tctl workflow showid <workflowID>
```

With a Codec Server, the Payload is decoded before being deserialized by tctl's default Data Converter. The default Data Converter sends the Payload to a given endpoint, and receives a decoded Payload if the API returns a successful result.

The Data Converter passes this result back to the command line, which prints the decoded result.

## Use case - Web UI

Workflow Execution Event History is available in the Web UI.
Payload information for each Event is captured within Event 'input' and 'result' fields.
Without a Codec Server, this information remains encoded.

Passing these Payloads through a Codec Server returns decoded results to the Web UI.
Make sure to [enter a valid URL and port](/clusters/how-to-set-up-codec-server#web-ui) for the codec endpoint when configuring the Codec Server.
