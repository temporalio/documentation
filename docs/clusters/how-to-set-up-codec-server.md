---
id: how-to-set-up-codec-server
title: How to set up a Codec Server
sidebar_label: Codec Server
description: Implementation of a remote encryption/decryption server.
---

A [Codec Server](/docs/concepts/what-is-a-codec-server) is an optional feature that can further encode or decode Payloads.
This can be done through the [Web UI](/docs/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui) or with [tctl](/docs/tctl/index).

A codec HTTP protocol specifies two endpoints to handle Payload encoding and decoding.
Implementations must do the following:

- Send and receive Payloads protobuf as JSON.
- Check only the final part of the incoming URL to determine whether the request is for /encode or /decode.

Each platform has a different approach to setting up and running the Codec Server.
Follow these steps to get a Codec Server running on your preferred platform.

## tctl

Before running a Codec Server, make sure that a Temporal service is running.

Start the codec server:

```bash
go run ./codec-server
```

Pass the encoded Payloads to the codec endpoint:

```bash
tctl --codec_endpoint 'http://localhost:{PORT}/{namespace}' workflow show --wid codecserver_workflowID
```

## Web UI

Before running the Temporal service, specify the codec endpoint in the configuration file.

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

Select the button with two arrows in the top right area of the screen.
This action displays the codec endpoint dialog.

Enter the URL and port number for your codec endpoint.
Exit the dialog, go back to the previous page, and refresh the page.

The button should now be light blue, and your Payloads should be displayed in a readable format.
