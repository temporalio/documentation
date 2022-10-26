---
id: how-to-set-cluster-address-in-python
title: How to set a Cluster address in Python
sidebar_label: Set Cluster address
description: Set Cluster address
tags:
  - python
  - how-to
---

To use a custom Cluster address, set the `target_url` parameter of the [`Client`](https://python.temporal.io/temporalio.client.Client.html) class.

```python
client = await Client.connect(
    "foo.bar.tmprl.cloud",
    # ...
)
```
