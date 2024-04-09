---
id: temporal-client-prepare-for-icloud
title: Temporal Cloud Prerequisites
sidebar_label: Prerequisites
description: Prepare the information you need to use Temporal Cloud with Java Clients.
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

When working with the Cluster hosted at Temporal Cloud, you'll need:

- A Temporal Cloud account with Developer authority.
- A Namespace to work with, personal or shared.
- A local copy of ['tcld'](/cloud/tcld/how-to-install-tcld), a command-line tool you use to interact with Temporal Cloud set-up tasks.

## Namespace Id and gRPC Endpoint

You can fetch your Cloud Namespace Id and gRPC endpoint from the Temporal Cloud WebUI.
This information is used to properly configure your Client code.
Follow these steps.

1. Visit [https://cloud.temporal.io](https://cloud.temporal.io) and log in with your credentials.
1. Navigate to your [Cloud Namespaces](https://cloud.temporal.io/namespaces) page and confirm your access to any shared Namespace, or -- if you have administrative privileges -- create your own Namespace.
1. Open the Namespace detail page by selecting a Namespace from the Namespaces page.
1. Copy the Namespace identity from the top of the detail page.
   The identity includes the Namespace name followed by a period and a unique account identifier.
   Account identifiers consist of five or more alphanumeric characters.
   This identifier lasts for the lifetime of a client account and will not change over time.
1. Locate the Namespace gRPC endpoint just below the Namespace identity.
   You'll see a row of information including a completed Workflow retention policy, the Namespace region, the Actions-Per-Second limit, and the gRPC endpoint.
   Click the copy icon next to the gRPC address to copy it to your clipboard.

Save the Namespace identity and gRPC endpoint to someplace where you can easily reference them.

![gRPC endpoint](/img/grpc-endpoint.png)
