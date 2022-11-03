---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: A Codec Server is an HTTP server that runs data from tctl or the Web UI through a Payload Codec.
tags:
  - term
---

A Codec Server is an HTTP server that runs data from [tctl](/tctl-v1) or the [Web UI](/web-ui) through a [Payload Codec](/concepts/what-is-a-data-converter#payload-codecs).

- [How to set up a Codec Server](/clusters/how-to-set-up-codec-server/)

By default, tctl and the Web UI use the [Default Data Converter](/concepts/what-is-a-data-converter#default-data-converter) without a [Payload Codec](/concepts/what-is-a-data-converter#payload-codecs).
If you use a Payload Codec with your SDK, you may not be able to understand the Payload data displayed in the Web UI/tctl (for example, it may be encrypted or compressed).
In order to convert the data to its original format, you can [configure the Web UI/tctl](/clusters/how-to-set-up-codec-server/) to use a Codec Server that uses your Payload Codec.

![](/img/tctl-diagram-codec-server.svg)

## Use case: tctl

Suppose that you want to view Workflow History.
This information needs to be decoded before it can be viewed.

You can use [tctl workflow showid](/tctl-v1/workflow#show) to view a Workflow Execution Event History.

```bash
tctl workflow showid <workflowID>
```

With a Codec Server, Payloads that are part of the Event History will be sent to the Codec Server to be decoded before being deserialized by the Default Data Converter and displayed in your terminal.

- [How to configure tctl with a Codec Server](/clusters/how-to-set-up-codec-server#configure-tctl)

## Use case: Web UI

Workflow Execution Event History is available in the Web UI.
Payload information for each Event is captured within Event 'input' and 'result' fields.
Without a Codec Server, this information remains encoded.

Passing these Payloads through a Codec Server returns decoded results to the Web UI.

- [How to configure the Web UI with a Codec Server](/clusters/how-to-set-up-codec-server#configure-the-web-ui)
