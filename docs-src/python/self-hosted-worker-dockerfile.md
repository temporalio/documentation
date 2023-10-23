---
id: self-hosted-worker-dockerfile
title: Build and deploy Docker image
description: Build a Docker Image of the Worker and deploy it.
sidebar_label: Dockerfile
tags:
  - docker
  - self-hosted
  - developer guide
  - worker
---

:::note

This Dockerfile is used to containerize the Background Check application so that it can run seamlessly in any environment that supports Docker.

:::

Add a Docker file to the root of your Background Check application project.

Name the file `Dockerfile`, with no extensions, and add the following configuration:

```dockerfile
FROM python:3.11

RUN mkdir /app

COPY . /app

COPY pyproject.toml /app

WORKDIR /app

RUN pip3 install poetry

RUN poetry config virtualenvs.create false

RUN poetry install

CMD [ "poetry", "run", "python", "/app/run_worker.py" ]
```

Then build the Docker image using the following command:

```shell
docker build . -t backgroundcheck-worker-image:latest
```

Now run the Worker on the same network as the Temporal Cluster containers using the following command:

```shell
docker run --network temporal-network backgroundcheck-worker-image:latest
```
