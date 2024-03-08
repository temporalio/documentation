---
id: landing
title: Deploy your Temporal Application to production
sidebar_label: Production deployment
description: Choose a Temporal Service to orchestrate your durable application.
tags:
  - production deployment
---

**Ready to elevate your durable application into production?**

To take your application to production, you deploy your application code, including your Workflows, Activities, and Workers, on your infrastructure using your existing build, test and deploy tools.

Then you need a production-ready Temporal Service to coordinate the execution of your Workflows and Activities. 

You can use Temporal Cloud, a fully-managed platform, or you can self-host the service.

## Use Temporal Cloud

You can let us handle the operations of running the Temporal Service, and focus on your application.
Follow the [Temporal Cloud guide](/cloud) to get started.

![Connect your application instances to Temporal Cloud](/diagrams/basic-platform-topology-cloud.svg)

## Run a Self-hosted Temporal Service

Alternatively, you can run your own production level Temporal Service to orchestrate your durable applications.
Follow the [Self-hosted guide](/self-hosted-guide) to get started.

![Connect your application instances to your self-hosted Temporal Service](/diagrams/basic-platform-topology-self-hosted.svg)
