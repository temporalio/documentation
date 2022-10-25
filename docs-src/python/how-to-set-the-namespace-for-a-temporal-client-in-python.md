---
id: how-to-set-the-namespace-for-a-temporal-client-in-python
title: How to set a Namespace for a Temporal Client in Python
sidebar_label: Set Namespace
description: Set Namespace
tags:
  - python
  - how-to
---

To specify a Namespace, set the `namespace` parameter from the [`connect()`](https://python.temporal.io/temporalio.client.Client.html#connect) method.

```python
await Client.connect("127.0.0.1:7233", namespace="your-custom-namespace")
```

`Client` can be directly instantiated with a service of another, such as when you need to create another Client to use an additional Namespace.

Clients also provide a shallow copy of their config for use in making slightly different Clients backed by the same connection with [`config`](https://python.temporal.io/temporalio.client.Client.html#config). The following example creates a new Client with the same connection but a different Namespace.

```python
config = client.config()
config["namespace"] = "your-other-namespace"
other_ns_client = Client(**config)
```
