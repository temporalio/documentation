---
id: landing
title: Deploy your Temporal Application to production
sidebar_label: Production deployment
description: There are self-hosted and SaaS options to deploy your Temporal Application to production.
tags:
  - production deployment
---

**Deploying to production can be as simple as updating your connection endpoints to point at Temporal Cloud.**

### Develop

First [build your durable Temporal Application](/dev-guide) with a Temporal SDK, using a development Cluster to supervise it.
Temporal isn't opinionated about how or where you deploy your application code and you can use the Temporal Client to integrate your Temporal Application with your existing systems.

**Connect to a development Cluster while building your application.**

![Build with a development Cluster](/diagrams/basic-platform-topology-dev.svg)

### Deploy

When it's time to deploy your application to production, connect to [Temporal Cloud](/cloud), or connect to a [self-hosted](/self-hosted-guide) Temporal Cluster.

- [Temporal Cloud guide](/cloud)
- [Self-hosted guide](/self-hosted-guide)

![Connect to Temporal Cloud or a self-hosted Cluster to run in production](/diagrams/basic-platform-topology-prod.svg)
