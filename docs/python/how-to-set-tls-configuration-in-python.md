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

The following example connects your Client to your address. The `tls_config` options uses variables that reference the certification and private key.

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

<!-- Update link once merged in -->

[The Hello World mTLS sample](https://github.com/temporalio/samples-python/pull/4/files#diff-851a07866061dda39a4607717f748af6c0251d4c10d29d9988686ba0cd13773c) demonstrates sample code used to connect to a Temporal Cloud account with the `argparse` library.
