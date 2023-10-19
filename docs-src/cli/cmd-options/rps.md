---
id: rps
title: temporal rps
sidebar_label: rps
description: Limit for the number of operations processed per second within the batch.
tags: 
    - cli reference
    - temporal cli
    - options-feature
    - command-line-interface-cli
    - workflow execution
    - requests per second
---

If the specified limit exceeds the server's configured limit, the server's limit will take precedence.

Limit for the number of operations processed per second within this batch.
Its purpose is to reduce the stress on the system caused by batch operations, which helps to prevent system
overload and minimize potential delays in executing ongoing tasks for user workers.

Note that when no explicit limit is provided, the server will operate according to its [limit defined by the
dynamic configuration key `worker.batcherRPS`](/references/dynamic-configuration#service-level-rps-limits).
This also applies if the value in this field exceeds the server's configured limit.