---
id: application-deployment
title: How do we deploy the Background Check application?
sidebar_label: Deploying the application
description: The application and anything the application needs for the demo is deployed using Docker Compose.
tags:
  - learning-path
---

The application and anything the application needs for the demo is deployed using Docker Compose.

The following Docker Images are spun up into a Container stack using [Docker Compose](https://docs.docker.com/compose/):

- Temporal Server: Services that facilitate the Temporal Event Loop. The Temporal Server is one half of what makes up a Temporal Cluster.
- PostgreSQL: Database to persist the state of each Workflow Execution. The Database is the other half of what makes up a Temporal Cluster.
- Elasticsearch: Database to manage Search Attributes. Optional component of a Temporal Cluster.
- Temporal Web UI: Browser-based UI that provides Visibility tooling.
- Grafana: So we can show Dashboards from the metrics.
- Prometheus: So we can ingest metrics.
- Mailhog: SMTP server and a browser based inbox. So users can experience receiving emails as part of the demonstration.
- Third party API: Provides the HTTP API endpoints that our will provide data for some of the Searches in the Background Check.
- App UI: Browser-based UI used to simulate parts of the application demonstration.
- App API: HTTP endpoints that provide access to a Temporal Client which is used to interact with the application.
- App Temporal Worker: Worker Process that executes our application code.
- App CLI tools: Process listening for commands that call the application APIs.
- Dataconverter: Process that runs the Data Converter encryption command.

The project uses existing Docker Images for the Temporal Server, PostgreSQL, Elasticsearch, Grafana, Prometheus, and Mailhog with some minor configuration tweaks.
Everything is wired together using environment variables and hardcoded hostnames.
The implementation can be viewed in these Docker Compose files:

- [docker-compose.yml](https://github.com/temporalio/background-checks/blob/main/docker-compose.yml)
- [docker-compose.override.yml](https://github.com/temporalio/background-checks/blob/main/docker-compose.override.yml)
