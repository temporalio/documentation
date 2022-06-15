---
id: how-to-register-types-with-a-worker-in-python
title: How to register types with a Worker in Python
sidebar_label: Register types with a Worker
description: Register types with a Worker
tags:
  - developer-guide
  - sdk
  - python
---

When a `Worker` is created, it accepts [iterable objects](https://docs.python.org/3/library/functions.html#iter), like: lists, tuples, dictionaries, or sets, in Workflows and Activities in the `workflows` and `activities` parameters respectively.

To register multiple values, provide more than one values to the Worker.
