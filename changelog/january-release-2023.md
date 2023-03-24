---
slug: january-release-2023
title: January 23 2023
date: 2023-01-23T00:00:00Z
---

Since our last change log in November 2022, we published the following content:

- [How to set up Grafana with Temporal Cloud observability to view metrics](/kb/prometheus-grafana-setup-cloud).
  Temporal Cloud and SDKs emit metrics that can be used to monitor performance and troubleshoot errors.
  Temporal Cloud emits metrics through a Prometheus HTTP API endpoint, which can be directly used as a Prometheus data source in Grafana or to query and export Cloud metrics to any observability platform.

- [A reference of Temporal Platform failure types](/kb/failures).
  Each type of Failure has a different type in the SDKs and different information in the protobuf messages (which are used to communicate with the Temporal Cluster and appear in Event History).

- [A reference of Workflow Task errors](/references/errors).
  This reference lists possible Workflow Task errors, a subset of a type of Temporal Platform failure.
  Each of the errors corresponds with a `WorkflowTaskFailedCause`, which appears in Events under the `workflow_task_failed_event_attributes` field.

- [How the Python SDK uses a sandbox](/kb/python-sandbox-environment).
  The Temporal Python SDK enables you to run Workflow code in a sandbox environment to help prevent non-determinism errors in your application.
  The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

**Legacy docs for SDKs**

To support all the SDKs, in 2022 we started building the [Dev guide](/application-development).
This guide now provides a single set of docs across Go, Java, PHP, Python, and TypeScript with more languages potentially on the way.
This guide is the focus of new information moving forward.

We published the legacy language-specific docs for Go, Java, PHP, and TypeScript to [legacy-documentation-sdks.temporal.io](https://legacy-documentation-sdks.temporal.io/).

The documentation at [legacy-documentation-sdks.temporal.io](https://legacy-documentation-sdks.temporal.io/) is read-only but might still contain some information that is not yet represented in the [Dev guide](/application-development).

We are still encouraging users to use both sets of documentation at this time.
