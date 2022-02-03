---
id: quick-install
title: Quick install Temporal Server for testing and local development
sidebar_label: Quick install
---

## Overview

There are three ways to quickly install and run the Temporal Server:

- [Docker](#docker): Using `docker-compose` makes it easy to develop Workflows locally.
- [Render](#render): Our `docker-compose` has been translated to Render.com's Blueprint format for a cloud alternative to local connection.
- [Helm Charts](#helm-charts): Deploying the Server to [Kubernetes](https://kubernetes.io/) is an easy way to test the system and develop Workflows.

We do not recommend using any of these methods in a [full (production) environment](/docs/server/production-deployment).

## Helm Charts

Instructions for using the Temporal Helm Chart is available in the [temporalio/helm-charts repo README](https://github.com/temporalio/helm-charts).

## Docker

### Prerequisites

1. [Install Docker](https://docs.docker.com/engine/install)
2. [Install docker-compose](https://docs.docker.com/compose/install)

### Run the Temporal Server

The following steps will run a local instance of the Temporal Server using the default configuration file:

1. Clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository.
2. Change directory into the root of the project.
3. Run the `docker-compose up` command.

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

After the Temporal Server has started you can view the Temporal Web interface in your browser: [localhost:8088](http://localhost:8088/)

### Alternative configurations

If you want to try other configurations using different dependencies (e.g. different database), or use a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

### Run application Workflows

You can now write and run Workflows via the Temporal Server.

Get started quickly by running a [Go sample](https://github.com/temporalio/samples-go), [Java sample](https://github.com/temporalio/samples-java), or write your own using one of the [SDKs](/application-development).

## Render

[temporal-render-simple](https://github.com/temporalio/temporal-render-simple) translates our docker-compose to Render.com - using the [Auto-Setup Docker image](https://docs.temporal.io/blog/auto-setup). This is not recommended for production, as all 4 Temporal internal services (Frontend, Matching, History, and Worker) are being run out of one process, but the benefit is that we get one click deploys.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
