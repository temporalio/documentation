---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A Codec Server is a feature that can perform additional levels of encoding and decoding on Payloads that are handled by [tctl](/docs/tctl/index) or the [Web UI](/docs/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui).

The Web UI and tctl both use a default [Data Converter](/docs/concepts/what-is-a-data-converter), which is capable of serialization only.

Codec Servers can encrypt, compress, and change the format of a Payload object.
These measures can further secure your data.

![](/img/tctl-diagram-codec-server.svg)

## Use case - tctl

Suppose that a developer wants to view Workflow History. This can be done with the following command:

```bash
    tctl workflow show {workflowID}
```

This command retrieves all events that occurred within that Workflow, along with a list of details. These details might include a Payload. Without a Codec Server, this Payload cannot be read.

Codec Servers allow further customization for Payload objects. The default Data Converter sends the Payload to a given endpoint, and receives a decoded Payload if the API returns a successful result. The Data Converter passes this result back to the command line, which prints the decoded result.

## Use case - Web UI

Suppose that another developer wanted to view the Workflow History of a given Workflow on their browser. This view allows the developer to see additional information about the Workflow, such as the time needed for each Event to occur.

Payload information can also be seen under the 'input' and 'result' variables. Without a Codec Server, this information remains encoded.

Passing these Payloads through a Codec Server will return decoded results to the Web UI.
