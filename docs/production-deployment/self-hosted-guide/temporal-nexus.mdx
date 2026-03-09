---
id: nexus
title:  Self-hosted Temporal Nexus
sidebar_label: Temporal Nexus
description: Use Nexus in your self-hosted Temporal Service.
toc_max_heading_level: 4
keywords:
  - self-hosted
tags:
  - Self hosting
  - enable-nexus
---

import { CaptionedImage } from '@site/src/components';

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Temporal Nexus is now [Generally Available](/evaluate/development-production-features/release-stages#general-availability).
Learn why you should use Nexus in the [evaluation guide](/evaluate/nexus).

:::

[Temporal Nexus](/nexus) allows you to reliably connect Temporal Applications.
It was designed with Durable Execution in mind and enables each team to have their own Namespace for improved modularity, security, debugging, and fault isolation.

<CaptionedImage
    src="/img/cloud/nexus/nexus-overview-short.png"
    title="Nexus Overview"
/>

## Enable Nexus

Enable Nexus in your self-hosted Temporal Service by updating the server's static configuration file and enabling Nexus through dynamic config, then setting the public callback URL and allowed callback addresses.
Nexus is only supported in single cluster setups at this time.
For additional information on operating Nexus workloads in your self-hosted cluster, see [Nexus Architecture](https://github.com/temporalio/temporal/blob/main/docs/architecture/nexus.md).

:::note
Replace `$PUBLIC_URL` with a URL value that's accessible to external callers or internally within the cluster.
Currently, external Nexus calls are considered experimental so it should be safe to use the address of an internal load balancer for the Frontend Service.
:::

To enable Nexus in your deployment:

1. Ensure that the server's static configuration file enables the HTTP API.

   ```yaml
   services:
     frontend:
       rpc:
         # NOTE: keep other fields as they were
         httpPort: 7243

   clusterMetadata:
     # NOTE: keep other fields as they were
     clusterInformation:
       active:
         # NOTE: keep other fields as they were
         httpAddress: $PUBLIC_URL:7243
   ```

2. Set the required dynamic configuration
    1. **Prior to version 1.30.X**, you must enable Nexus through dynamic config, set the public callback URL, and set the allowed callback addresses.

       **NOTE**: the callback endpoint template and allowed addresses should be set when using the experimental
       "external" endpoint targets.

       ```yaml
       system.enableNexus:
         - value: true
       component.nexusoperations.callback.endpoint.template:
         # The URL must be publicly accessible if the callback is meant to be called by external services.
         # When using Nexus for cross namespace calls, the URL's host is irrelevant as the address is resolved using
         # membership. The URL is a Go template that interpolates the `NamepaceName` and `NamespaceID` variables.
         - value: https://$PUBLIC_URL:7243/namespaces/{{.NamespaceName}}/nexus/callback
       component.callbacks.allowedAddresses:
         # Limits which callback URLs are accepted by the server.
         # Wildcard patterns (*) and insecure (HTTP) callbacks are intended for development only.
         # For production, restrict allowed hosts and set AllowInsecure to false
         # whenever HTTPS/TLS is supported. Allowing HTTP increases MITM and data exposure risk.
         - value:
             - Pattern: "*" # Update to restrict allowed callers, e.g. "*.example.com"
               AllowInsecure: true # In production, set to false and ensure traffic is HTTPS/TLS encrypted
       ```

    2. Since version 1.30.X, Nexus is enabled by default, the only configuration needed is to use the system callback URL.
       ```yaml
       component.nexusoperations.useSystemCallbackURL:
         - value: true
       ```

## Build and use Nexus Services

Nexus has a familiar programming model to build and use Nexus Services using the Temporal SDK.
The [Nexus Operation lifecycle](/nexus/operations#operation-lifecycle) supports both synchronous and asynchronous Operations.
Nexus Operations can be implemented with Temporal primitives, like a Workflow, or execute arbitrary code.

:::tip RESOURCES

- [Go SDK - Nexus quick start and code sample](/develop/go/nexus)
- [Java SDK - Nexus quick start and code sample](/develop/java/nexus)

:::

## Learn more

- [Evaluate](/evaluate/nexus) why you should use Nexus and watch the [Nexus keynote and demo](https://youtu.be/qqc2vsv1mrU?feature=shared&t=2082).
- [Learn key Nexus concepts](/nexus) and how Nexus works in the [Nexus deep dive talk](https://www.youtube.com/watch?v=izR9dQ_eIe4&t=934s)
- Explore [additional resources](/evaluate/nexus#learn-more) to learn more about Nexus.
