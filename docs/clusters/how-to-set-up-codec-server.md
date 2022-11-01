---
id: how-to-set-up-codec-server
title: How to set up a Codec Server
sidebar_label: Codec Server
description: Implementation of a remote encryption/decryption server.
---

The [Codec Server Go sample](https://github.com/temporalio/samples-go/tree/main/codec-server) is an example that shows how to decode a Payload that has been encoded so the Payload can be displayed by [tctl](/tctl-v1) and the [Web UI](/web-ui).

A codec HTTP protocol specifies two endpoints to handle Payload encoding and decoding.

Implementations must do the following:

- Send and receive Payloads protobuf as JSON.
- Check only the final part of the incoming URL to determine whether the request is for /encode or /decode.

:::note
A Temporal Cluster should already be in operation before starting the Codec Server.
:::

## tctl

[Start up the Codec Server](https://github.com/temporalio/samples-go/tree/main/codec-server).

Configure the codec endpoint:

```bash
tctl --codec_endpoint 'http://localhost:{PORT}/{namespace}' workflow show --wid codecserver_workflowID
```

## Web UI

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

The [codec endpoint](/references/web-ui-configuration#codec) can be specified in the configuration file.
It can also be changed during runtime.

Select the button with an up-down arrow in the left area of the screen.
This action displays the codec endpoint dialog.

Enter the URL and port number for your codec endpoint.
Exit the dialog, go back to the previous page, and refresh the page.

The button should now be light blue, and your Payloads should be displayed in a readable format.
