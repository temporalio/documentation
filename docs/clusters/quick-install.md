---
id: quick-install
title: How to quickly install a Temporal Cluster for testing and local development
sidebar_label: Quick install
description: There are four ways to quickly install and run a Temporal Cluster.
---

There are four ways to quickly install and run a Temporal Cluster:

- [Docker](#docker): Using Docker Compose makes it easy to develop your Temporal Application locally.
- [Render](#render): Our [temporalio/docker-compose](https://github.com/temporalio/docker-compose) experience has been translated to Render's Blueprint format for an alternative cloud connection.
- [Helm charts](#helm-charts): Deploying a Cluster to [Kubernetes](https://kubernetes.io/) is an easy way to test the system and develop Temporal Applications.
- [Gitpod](#gitpod): One-click deployments are available for Go and TypeScript.

**We do not recommend using any of these methods in a [full (production) environment](/docs/server/production-deployment).**

### Helm charts

Use [Temporal Helm charts](https://github.com/temporalio/helm-charts) to deploy the Temporal Server to a [Kubernetes](https://kubernetes.io/) cluster.

Deploying the Temporal Cluster with Helm is not recommended for a production environment, but it is a great way to test the system while developing Workflows.

### Docker Compose

import DockerCompose from './quick-install/docker-compose.md'

<DockerCompose/>

### Render

[temporal-render-simple](https://github.com/temporalio/temporal-render-simple) translates our docker-compose to Render by using the [Auto-Setup Docker image](https://docs.temporal.io/blog/auto-setup).
We do not recommend using this technique for production because all four Temporal internal services (Frontend, Matching, History, and Worker) are run in one process, but the benefit is one-click deployments.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/temporalio/temporal-render-simple)

### Gitpod

You can run a Temporal Cluster and develop Temporal Applications in your browser using [Gitpod](https://www.gitpod.io/).

One-click deployments are available for the [temporalio/samples-go](https://github.com/temporalio/samples-go) repo and the [temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) repo.

A one-click deployment starts a Temporal Cluster using a Temporal Cluster Docker image, starts a Worker Process, and starts one of the application's sample Workflows.

It can take up to a full minute for the one-click deployments to get fully up and running.
When it is running, you can customize the application samples.
