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

Use [`connect()`](https://python.temporal.io/temporalio.client.Client.html#connect) method on the [`Client`](https://python.temporal.io/temporalio.client.Client.html) class to create and connect to a Temporal Server at a given address and Namespace.

Specify the `target_host` parameter as a string.

**Connect to Docker**

```python
await Client.connect("127.0.0.1:7233", namespace="your-custom-namespace")
```

**Connect to your Cluster**

```python
await Client.connect(
    "web.<Namespace_ID>.tmprl.cloud", namespace="your-custom-namespace"
)
```

A `Client` does not have an explicit close.
