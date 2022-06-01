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

Use `Client.connect()` to create and connect to a Temporal Server at a given address and Namespace.

Specify the `target_url` as a string.

```python
from temporalio.client import Client


async def main():
    Client.connect("http://localhost:7233", namespace="your-namespace")
```

A `Client` does not have an explicit close.
If you don't specify a Namespace, Temporal defaults to the name `default`.

`Client` may be directly instantiated with a service of another. For example, if you need to create another Client to use an additional Namespace.
