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

First [build your durable Temporal Application](/dev-guide) with a Temporal SDK, using a development Cluster to orchestrate it.
The Temporal Platform isn't opinionated about how or where you deploy your application code and you can use the Temporal Client to integrate your Temporal Application with your existing systems.

**Connect to a development Cluster while building your application.**

![Build with a development Cluster](/diagrams/apps-are-external.png)

### Deploy

When it's time to deploy your application to production, connect to [Temporal Cloud](/cloud), or connect to a [self-hosted](/self-hosted-guide) Temporal Cluster.

- [Temporal Cloud guide](/cloud)
- [Self-hosted guide](/self-hosted-guide)

![Connect to a self-hosted Cluster to run in production](/diagrams/role-of-cluster.png)

Even when the application's orchestrator is Temporal Cloud, you still control the environments where your code executes and the integration points.

![Connect to Temporal Cloud to run in production](/diagrams/role-of-cloud.png)
