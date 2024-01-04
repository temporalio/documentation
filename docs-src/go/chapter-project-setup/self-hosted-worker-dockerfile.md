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

Add a Docker file to the root of your Background Check application project.

Name the file `dockerfile`, with no extensions, and add the following configuration:

```dockerfile
FROM golang:1.20 AS builder

WORKDIR /app

COPY . .

RUN go get
RUN go build -o bin ./self_hosted/main_dacx.go

ENTRYPOINT ["/app/bin"]
```

:::info

Make sure the Golang builder version matches the one used by the Go SDK.
Different versions of the Go SDK may use different versions of Golang.

:::

Then build the Docker image using the following command:

```shell
docker build . -t backgroundcheck-worker-image:latest
```

Now run the Worker on the same network as the Temporal Cluster containers using the following command:

```shell
docker run --network temporal-network backgroundcheck-worker-image:latest
```
