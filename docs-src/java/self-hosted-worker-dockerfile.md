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
# Use an official image of OpenJDK as the base image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files to the container
COPY src src/
COPY pom.xml .

# Build the Maven project to a JAR file
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean compile

# Set the entry point for the application
CMD ["mvn", "exec:java", "-Dexec.mainClass='backgroundcheck.workers.SelfHostedWorker']
```

:::info

Make sure the Java version matches the one you used when developing your
application and is version `1.8` or greater.

:::

Then build the Docker image using the following command:

```shell
docker build . -t backgroundcheck-worker-image:latest
```

Now run the Worker on the same network as the Temporal Cluster containers using the following command:

```shell
docker run --network temporal-network backgroundcheck-worker-image:latest
```
