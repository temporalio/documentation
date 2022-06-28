---
id: how-to-create-a-temporal-client-in-python
title: How to create a Temporal Client in Python
sidebar_label: Create a Temporal Client
description: Create a Temporal Client
tags:
  - developer-guide
  - sdk
  - python
---

Use [`connect()`](https://python.temporal.io/temporalio.client.client#connect) method on the [`Client`](https://python.temporal.io/temporalio.client.client) class to create and connect to a Temporal Server at a given address and Namespace.

Specify the `target_url` parameter as a string.

```python
async def main():
    client = await Client.connect("http://localhost:7233", namespace="your-namespace")
```

A `Client` does not have an explicit close.
If you don't specify a Namespace, Temporal defaults the `namespace` parameter to the value `default`.

`Client` may be directly instantiated with a service of another. For example, if you need to create another Client to use an additional Namespace.

Clients also provide a shallow copy of their config for use in making slightly different Clients backed by the same connection with [`config`](https://python.temporal.io/temporalio.client.client#config). The following example creates a new Client with the same connection but a different Namespace.

```python
config = client.config()
config["namespace"] = "your-other-namespace"
other_ns_client = Client(**config)
```
