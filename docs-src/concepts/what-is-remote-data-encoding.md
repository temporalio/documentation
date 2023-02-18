---
id: what-is-remote-data-encoding
title: What is remote data encoding?
sidebar_label: Remote data encoding
description: Remote data encding is using your custom Data Converter to decode (and encode) your payloads remotely through endpoints.
tags:
  - term
  - explanation
---

Remote data encoding is using your custom Data Converter to decode (and encode) your payloads remotely through endpoints.

Running your encoding remotely allows you to use it with `tctl` to encode payloads for `tctl workflow start` and with Temporal WebUI to [decode encrypted payloads](#decoding-payloads-on-the-webui-and-tctl)

To run data encoding/decoding remotely, use a [Codec Server](/concepts/what-is-a-codec-server). A Codec Server is an HTTP server that is configured to use your custom Payload Codec with encryption/compression and decryption/decompression logic.

Note that currently only Go and Java SDKs support setting a remote Payload Codec with a custom Data Converter.
You can however create a Codec Server in any of the SDKs, and use it to decode payloads on the WebUI and in `tctl`.

Before you use a remote data encoder to encode your payloads and allowing decryption or decoding through a service call, ensure that you consider all the security implications of running encryptions remotely.

#### Decoding payloads on the Web UI and tctl

If you use custom encryption/encoding with your custom Data Converter, all the data handled by the Temporal Cluster is encrypted/encoded. Since the WebUI uses the [Visibility](/concepts/what-is-visibility) database to show events and data stored on the Temporal Server, all data in the Workflow Execution History in your WebUI or tctl is encoded/encrypted.

To see the original format of data in your WebUI and tctl, create a Codec Server with a remote data encoder and use the Payload Codec to decode your data locally.

Note that an encryption/decryption remote data encoder is a separate system with access to your encryption keys and exposes APIs to encode and decode any payloads that are encrypted with the Payload Codec used. Evaluate and ensure that your remote data encoder endpoints are secured and only authorized users have access to them.

Samples:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [TypeScript](https://github.com/temporalio/samples-typescript/tree/main/encryption)
- [Python](https://github.com/temporalio/samples-python/tree/main/encryption)
