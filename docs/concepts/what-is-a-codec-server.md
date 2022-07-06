---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.
---

A Codec Server is an optional feature that carries out additional levels of encoding/decoding to Payloads that are handled by [tctl](/docs/tctl/index) or the [Web UI](/docs/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui).

The Web UI and tctl both use a default [Data Converter](/docs/concepts/what-is-a-data-converter), which is only capable of serialization.

Codec Servers can be used to encrypt, compress, and change the format of a Payload object. These measures further secure your data while formatting it to your preference.

## Use case - tctl

Suppose that a developer wants to view Workflow History. They can accomplish this with the `workflow show` command with tctl. A Payload is retrieved and sent to a default Data Converter, which converts the Payload object into a human-readable format. Suppose it wasn't what you wanted.

Codec Servers allow further customization for Payload objects. The default Data Converter sends the Payload to a given endpoint, and receives a decoded Payload if the API returns a successful result. The Data Converter passes this back to the Client for viewing.

![](/img/codec-implementation.svg)

## Use Case - Web UI
