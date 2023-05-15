---
id: how-to-connect-to-temporal-cloud-in-python
title: How to connect to Temporal Cloud
sidebar_label: Connect to Temporal Cloud
description: Use a certificate key pair and your Temporal Cloud Namespace to connect to Temporal Cloud.
---

Use the `connect()` method on the Client class to create and connect to a Temporal Client to the Temporal Cluster.
Then specify the [TLSConfig](https://python.temporal.io/temporalio.service.TLSConfig.html) arguments to connect to a Temporal Cluster with TLS enabled.
The `client_cert` must be combined with `client_private_key` to authenticate the Client.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/connect_cloud_dacx.py">View source code</a>

```python
from temporalio.client import Client, TLSConfig
# . . .
# . . .
async def main():
    with open("client-cert.pem", "rb") as f:
        client_cert = f.read()
    with open("client-private-key.pem", "rb") as f:
        client_private_key = f.read()
    client = await Client.connect(
        "your-custom-namespace.tmprl.cloud:7233",
        namespace="your-custom-namespace",
        tls=TLSConfig(
            client_cert=client_cert,
            client_private_key=client_private_key,
            # domain=domain, # TLS domain
            # server_root_ca_cert=server_root_ca_cert, # ROOT CA to validate the server cert
        ),
    )
```
