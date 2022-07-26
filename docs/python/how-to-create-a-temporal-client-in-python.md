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

Specify the `target_host` parameter as a string.

```python
async def main():
    client = await Client.connect("localhost:7233", namespace="your-namespace")
```

A `Client` does not have an explicit close.
