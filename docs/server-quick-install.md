---
id: server-quick-install
title: Install the Temporal Server for local development
sidebar_label: Quick install
---

## Overview

This guide will show you how to quickly install and run Temporal using `docker-compose`.

## Prerequisites

1. [Install Docker](https://docs.docker.com/engine/install)
2. [Install docker-compose](https://docs.docker.com/compose/install)

## Run the Temporal Server

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

If you want to try other configurations using different dependencies, or use a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

## Run application Workflows

You can now run Workflows via the Temporal Server.

Get started quickly by running a [Go sample](https://github.com/temporalio/samples-go), [Java sample](https://github.com/temporalio/samples-java), or write your own using one of the [SDKs](/docs/sdks-introduction).
