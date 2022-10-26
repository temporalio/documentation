---
id: how-to-connect-to-a-cluster-in-python
title: How to connect to a Temporal Cluster in Python
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the Python SDK.
tags:
  - developer-guide
  - sdk
  - python
---

Use the [`connect()`](https://python.temporal.io/temporalio.client.client#connect) method on the [`Client`](https://python.temporal.io/temporalio.client.client) class to create and connect to a Temporal Client to the Temporal Cluster.

Specify the `target_host` parameter as a string and provide the [`tls` configuration](https://python.temporal.io/temporalio.service.TLSConfig.html) for connecting to a Temporal Cluster.

```python
client = await Client.connect(
    #  target_host for the Temporal Cloud
    "your-custom-namespace.tmprl.cloud:7233",
    # target_host for Temporalite
    # "127.0.0.1:7233"
    namespace="your-custom-namespace",
    tls=TLSConfig(
        client_cert=client_cert,
        client_private_key=client_private_key,
        # domain=domain
        # server_root_ca_cert=server_root_ca_cert,
    ),
)
```
