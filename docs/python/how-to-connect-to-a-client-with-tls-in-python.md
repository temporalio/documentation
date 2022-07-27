---
id: how-to-connect-to-a-client-with-tls-in-python
title: How to connect to a Client with TLS in Python
sidebar_label: Connect to a Client with TLS
description: Connect to a Client with TLS
tags:
  - developer-guide
  - sdk
  - python
---

Use the `tls_config` parameter from the [`connect()`](https://python.temporal.io/temporalio.client.client#connect) method of the [`Client`](https://python.temporal.io/temporalio.client.client) class to connect to a Client with TLS.

The following example reads the client certification and key, and store it in the corresponding variable `client_cert` and `client_private_key`.

```python
with open("your-pem-file.pem", "rb") as f:
    client_cert = f.read()
with open("your-key-file.key", "rb") as f:
    client_private_key = f.read()
```

Then, connect to a Client with your address set to your Temporal Cluster `foo.bar.tmprl.cloud` and your Namespace set to `foo.bar`.
In the `tls_config` options, specify your certification and key.

```python
client = await Client.connect(
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
