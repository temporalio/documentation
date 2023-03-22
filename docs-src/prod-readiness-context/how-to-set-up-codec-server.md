---
id: how-to-set-up-codec-server
title: Setting Codec Server endpoints
sidebar_label: Setting Codec Server endpoints
description: Run a Codec Server with your Payload Codec and then configure tctl and the Web UI to use the server.
tags:
  - security
  - how-to
---

To use a [Codec Server](/concepts/what-is-a-codec-server), first run it with your Payload Codec and then configure [tctl](/tctl-v1) and the [Web UI](/web-ui) to use it.

#### tctl

Once the Codec Server is started, provide the exposed endpoint to tctl using the `--codec_endpoint` global option.

For example, if you are running your Codec Server locally and expose port 8888 as your endpoint, you can run the following command to see the decoded output of "yourWorkflow" Workflow Execution in the Namespace "yourNamespace".

```bash
tctl --codec-endpoint "http://localhost:8888" --namespace "yourNamespace" workflow show --workflow-id "yourWorkflow"  --run-id "<yourRunId>" --output "table"
```

#### Web UI

You can set the codec endpoints either in the Web UI or in the [UI server](https://github.com/temporalio/ui-server) configuration file before starting the UI server.

**In the Web UI**

![Data Encoder icon](/img/docs/data-encoder-button.png)

Select the **Data Encoder** icon with an up-down arrow on the bottom left of the screen.
This action displays the codec endpoint dialog.

Enter the URL and port number for your codec endpoint.
Refresh your Workflow Execution page to see encoded/decoded data.

**In the Web UI server configuration file**

Specify the codec endpoint in the Web UI server [configuration file](/references/web-ui-configuration#codec):

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

Start the UI server to use this endpoint for decoding data in Workflow Executions in the specified Namespace.
