---
id: how-to-set-tls-configuration-in-python
title: How to set TLS configuration in Python
sidebar_label: Set TLS configuration
description: Set TLS configuration
tags:
  - developer-guide
  - sdk
  - python
---

Use the `tls_config` parameter from the [`Client`](https://python.temporal.io/temporalio.client.client) class to connect a Client with TLS.

The following example connects your Client to your address. The `tls_config` options uses variables that reference the certificate and private key.

```python
await Client.connect(
    "foo.bar.tmprl.cloud",
    namespace="foo.bar",
    tls_config=TLSConfig(
        client_cert=client_cert,
        client_private_key=client_private_key,
    ),
)
```

<!-- Update link once merged in

[The Hello World mTLS sample]() demonstrates sample code used to connect to a Temporal Cloud account with the `argparse` library.

-->
