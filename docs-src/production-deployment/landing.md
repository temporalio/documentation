---
id: landing
title: Deploy your Temporal Application to production
sidebar_label: Production deployment
description: There are self-hosted and SaaS options to deploy your Temporal Application to production.
tags:
  - production deployment
---

First [build your durable Temporal Application](/dev-guide) with a Temporal SDK, using a development Cluster to supervise it.

Temporal isn't opinionated about how or where you deploy your application code.

Use the Temporal Client to integrate your Temporal Application with your existing systems.

**Build with a dev Cluster.**

![Connect to a development Cluster while building your application](/diagrams/basic-platform-topology-dev.svg)

Then, when it's time to deploy your application to production connect to [Temporal Cloud](/cloud), or connect to a [self-hosted](/self-hosted-guide) Temporal Cluster using Temporal's open source software.

- [Temporal Cloud guide](/cloud)
- [Self-hosted guide](/self-hosted-guide)

**Deploying to production can be as simple as updating your connection endpoints to point at Temporal Cloud.**

![Connect to Temporal Cloud or a self-hosted Cluster to run in production](/diagrams/basic-platform-topology-prod.svg)
