---
id: how-to-set-up-codec-server
title: How to set up a Codec Server
sidebar_label: Codec Server
description: Run a Codec Server with your Payload Codec and then configure tctl and the Web UI to use the server.
---

To use a [Codec Server](/concepts/what-is-a-codec-server), first run it with your Payload Codec and then configure [tctl](/tctl-v1) and the [Web UI](/web-ui) to use it.

## Run the server

A Codec Server is an HTTP server that implements two endpoints:

- `POST /encode`
- `POST /decode`

Each endpoint receives and responds with a JSON body that has a `payloads` property with an array of Payloads.
The endpoints run the Payloads through a [Payload Codec](/concepts/what-is-a-data-converter#payload-codec) before returning them.

Sample Codec Servers:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Python](https://github.com/temporalio/samples-python/blob/main/encryption/codec_server.py)
- [TypeScript](https://github.com/temporalio/samples-typescript/blob/main/encryption/src/codec-server.ts)


## Configure tctl

Once the Codec Server is started, for example on `http://localhost:8888`, provide it to tctl using the `--codec_endpoint` global option:

```bash
tctl --codec_endpoint 'http://localhost:8888' workflow show --wid workflow-id-123
```

## Configure the Web UI

Once the Codec Server is started, there are two ways to provide it to the Web UI:

### In the UI

![Data Encoder icon](/img/docs/data-encoder-button.png)

Select the icon with an up-down arrow on the bottom left of the screen.
This action displays the codec endpoint dialog.

Enter the URL and port number for your codec endpoint.
Exit the dialog, go back to the previous page, and refresh the page.

The button should now be light blue, and your Payloads should be displayed in a readable format.

### In the config file

The codec endpoint can be specified in the [configuration file](/references/web-ui-configuration#codec):

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

