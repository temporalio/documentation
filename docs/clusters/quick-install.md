---
id: quick-install
title: How to quickly install a Temporal Cluster for testing and local development
sidebar_label: Quick install
---

## Overview

There are three ways to quickly install and run a Temporal Cluster:

- [Docker](#docker): Using Docker Compose makes it easy to develop your Temporal Application locally.
- [Render](#render): Our [temporalio/docker-compose](https://github.com/temporalio/docker-compose) experience has been translated to Render's Blueprint format for a an alternative cloud connection.
- [Helm Charts](#helm-charts): Deploying a Cluster to [Kubernetes](https://kubernetes.io/) is an easy way to test the system and develop Temporal Applications.

**We do not recommend using any of these methods in a [full (production) environment](/docs/server/production-deployment).**

## Helm Charts

Use [Temporal Helm Charts](https://github.com/temporalio/helm-charts) to deploy the Temporal Server to a [Kubernetes](https://kubernetes.io/) cluster.

Deploying the Temporal Cluster with Helm is not recommended for a production environment, but it is a great way to test the system while developing Workflows.

## Docker Compose

Use Docker Compose and Temporal Cluster Docker Images to quickly install and run a Temporal Cluster locally while developing Workflows.

You must have [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install) installed.

Then clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository and run `docker-compose up` from the root of that repo:

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

When the Temporal Cluster is running the Temporal Web UI becomes available in your browser: [localhost:8088](http://localhost:8088/)

The preceding steps start and run a Temporal Cluster using a default configuration.
To try other configurations (different dependencies and databases), or to try a custom Docker Image follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

## Render

[temporal-render-simple](https://github.com/temporalio/temporal-render-simple) translates our docker-compose to Render - using the [Auto-Setup Docker image](https://docs.temporal.io/blog/auto-setup).
This is not recommended for production, as all 4 Temporal internal services (Frontend, Matching, History, and Worker) are being run out of one process, but the benefit is that we get one click deploys.

<a href="https://render.com/deploy?repo=https://github.com/temporalio/temporal-render-simple">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>
