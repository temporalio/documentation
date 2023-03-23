---
id: what-is-a-failure-converter
title: What is a Failure Converter?
sidebar_label: Failure Converter
description: A Failure Converter converts error objects to proto Failures and back.
tags:
  - term
  - explanation
---

A Failure Converter converts error objects to proto Failures and back.
The default Failure Converter copies error messages and stack traces as plain text.

For details, see the API references.

- [Go](https://pkg.go.dev/go.temporal.io/sdk/converter#FailureConverter)
- [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/FailureConverter.html)
- [Python](https://python.temporal.io/temporalio.converter.FailureConverter.html)
- [TypeScript](https://typescript.temporal.io/api/interfaces/common.FailureConverter)

Note that failures are not encoded by default; you must explicitly enable encoding on failures.

You can make a custom Failure Converter, but if you use multiple SDKs, you must implement the same logic in each.
Creating a custom Failure Converter is not yet supported in Java.

If your errors might contain sensitive information, you can encrypt the message and stack trace by configuring the default Failure Converter to use your encoded attributes, in which case it moves your `message` and `stack_trace` fields to a Payload that's run through your [codec](/concepts/what-is-a-payload-codec).
