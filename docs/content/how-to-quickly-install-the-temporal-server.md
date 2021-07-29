---
id: how-to-quickly-install-the-temporal-server
title: How to quickly install the Temporal Server for testing and local development
description: Use `docker-compose` to quickly install and run the Temporal Server locally to test the system while developing Workflows.
tags:
  - guide
---

import RelatedReadList from '../components/RelatedReadList.js'

Use `docker-compose` to quickly install and run the Temporal Server locally to test the system while developing Workflows.

Make sure both Docker and `docker-compose` are installed.

- [Install Docker](https://docs.docker.com/engine/install)
- [Install docker-compose](https://docs.docker.com/compose/install)

Then clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository and run `docker-compose up` from the root of that repo:

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

When the Temporal Server is running, Workflow Executions can be invoked.
The Temporal Server can be kept running in the background while applications are built.
Workflow Execution details can be viewed in the Temporal Web UI via your browser: [localhost:8088](http://localhost:8088/).

The steps above will start the Temporal Server using a default configuration.

To try other configurations (different dependencies and databases), or to try a custom Docker image follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

<RelatedReadList
readliststring="How to deploy the Temporal Server to Kubernetes for testing and development?/docs/content/how-to-deploy-temporal-to-kubernetes-for-testing-and-development?og"
/>
