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
FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json /app

RUN npm ci

COPY tsconfig.json /app/
COPY src /app/src

RUN npm run build

# Reinstall without dev dependencies now that the application is built
RUN npm ci --omit dev

FROM gcr.io/distroless/nodejs20-debian11

ENV WORKFLOW_BUNDLE_PATH=/app/workflow-bundle.js

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/lib /app/lib
COPY --from=build $WORKFLOW_BUNDLE_PATH $WORKFLOW_BUNDLE_PATH

CMD ["/app/lib/worker.js"]
```


Then build the Docker image using the following command:

```shell
docker build . -t backgroundcheck-worker-image:latest
```

Now run the Worker on the same network as the Temporal Cluster containers using the following command:

```shell
docker run --network temporal-network backgroundcheck-worker-image:latest
```
