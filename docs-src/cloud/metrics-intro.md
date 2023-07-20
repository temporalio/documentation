---
id: metrics-intro
title: How to monitor Temporal Cloud metrics
sidebar_label: Cloud metrics
description: Configure and track performance metrics for Temporal Cloud.
tags:
  - how-to
---

Beyond the [metrics](/references/sdk-metrics) provided by the Temporal SDKs, some key metrics exist only in Temporal Cloud.
You can use your own observability tool to query an endpoint and review Namespace metrics.

To ensure security of your metrics, a CA certificate dedicated to observability is required.
Only clients that use certificates signed by that CA, or that chain up to the CA, can query the metrics endpoint.
For more information about CA certificates in Temporal Cloud, see [Certificate requirements](https://docs.temporal.io/cloud/certificates-intro#certificate-requirements).
