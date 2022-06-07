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

Use [`Client.connect()`](https://python.temporal.io/temporalio.client.client#connect) to create and connect to a Temporal Server at a given address and Namespace.

Specify the `target_url` parameter as a string.

```python
async def main():
    client = await Client.connect("http://localhost:7233", namespace="your-namespace")
```

A `Client` does not have an explicit close.
If you don't specify a Namespace, Temporal defaults the `namespace` parameter to the value `default`.

`Client` may be directly instantiated with a service of another. For example, if you need to create another Client to use an additional Namespace.
