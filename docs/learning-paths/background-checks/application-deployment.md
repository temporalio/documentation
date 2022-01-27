---
id: application-deployment
title: How do we deploy the Background Check application?
sidebar_label: Deploying the application
description: This project is deployed using Docker.
---

This project is deployed using Docker.

The following Docker Images are spun up into a Container stack using [Docker Compose](https://docs.docker.com/compose/):

- Temporal Server
- PostgreSQL
- Elasticsearch
- Temporal Web UI
- Grafana
- Prometheus
- Mailhog
- App UI
- App API
- App Temporal Worker
- App CLI tools

The project uses existing Docker Images for Temporal Server, PostgreSQL, Elasticsearch, Grafana, Prometheus, and Mailhog with some minor configuration tweaks.
Everything is wired together using environment variables and hardcoded hostnames.
You can review the implementation in the Docker Compose files:

- [docker-compose.yml](https://github.com/temporalio/background-checks/blob/main/docker-compose.yml)
- [docker-compose.override.yml](https://github.com/temporalio/background-checks/blob/main/docker-compose.override.yml)
