---
id: how-to-set-mtls-configuration-in-python
title: How to set mTLS configuration in Python
sidebar_label: Set mTLS configuration
description: Use the `tls_config` parameter from the `Client` class to connect a Client with mTLS.
tags:
  - developer-guide
  - sdk
  - python
---

Use the `tls_config` parameter from the [`Client`](https://python.temporal.io/temporalio.client.Client.html) class to connect a Client with mTLS.

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

[The Hello World mTLS sample](https://github.com/temporalio/samples-python/blob/main/hello/hello_mtls.py) demonstrates sample code used to connect to a Temporal Cloud account with the `argparse` library.
