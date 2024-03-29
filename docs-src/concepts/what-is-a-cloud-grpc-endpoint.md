---
id: what-is-a-cloud-grpc-endpoint
title: What is a Cloud gRPC Endpoint?
sidebar_label: Temporal Cloud gRPC Endpoint
description: A Cloud gRPC Endpoint is a Namespace-specific address used to access Temporal Cloud from your code.
tags:
  - term
  - explanation
---

Temporal Clients communicate between application code and a Temporal Server by sending and receiving messages via the gRPC protocol.
gRPC is a Remote Procedure Call framework featuring low latency and high performance.
gRPC provides Temporal with an efficient, language-agnostic communication framework.

Every Temporal Namespace uses a gRPC endpoint for communication.
When migrating to Temporal Cloud, you'll need to switch the gRPC endpoint in your code from your current hosting, whether self-hosted or locally-hosted, to Temporal Cloud.

A Namespace-specific gRPC endpoint is found on the detail page for each Cloud Namespace.
Follow these steps to find it:

1. Log into your account on [cloud.temporal.io](https://cloud.temporal.io/namespaces).
2. Navigate to the Namespace list page from the left-side vertical navigation.
3. Tap or click on the Namespace Name to select and open the page for the Namespace whose endpoint you want to retrieve.
4. On the Namespace detail page, locate the Namespace name.
   Just below that is a row of information including the completed Workflow retention policy, the Namespace region, the Actions-Per-Second limit, and the gRPC endpoint.
5. Click the copy icon next to the gRPC address to copy it to your clipboard.

![gRPC endpoint](/img/grpc-endpoint.png)
