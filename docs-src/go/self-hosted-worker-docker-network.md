---
id: self-hosted-worker-docker-network
title: Run a Self-hosted Worker
<<<<<<< HEAD
description: Build a Docker Image of the Worker and deploy it on your network.
=======
description: Build a Docker image of the Worker and deploy it on your network.
>>>>>>> main
sidebar_label: Dockerfile
tags:
  - docker
  - self-hosted
  - developer guide
  - worker
---

<<<<<<< HEAD
To deploy a Self-hosted Worker to your Docker environment you will need to configure your Worker with the appropriate IP address and port.
=======
To deploy a self-hosted Worker to your Docker environment, you need to configure your Worker with the appropriate IP address and port.
>>>>>>> main

#### Confirm network

The default `docker-compose.yml` file in the `temporalio/docker-compose` repo has the Temporal Server exposed on port 7233 on the `temporal-network`.

```yml
services:
  # ...
  temporal:
    container_name: temporal
    # ...
    networks:
      - temporal-network
    ports:
      - 7233:7233
    # ...
  # ...
```

<<<<<<< HEAD
If you are using a different or customized docker compose file, you can see the available networks using:
=======
If you are using a different or customized docker compose file, you can see the available networks by using the following command:
>>>>>>> main

```shell
docker network ls
```

#### Confirm IP address

Get the IP address of the Docker network that the containers are using.

To do that, first inspect the network:

```shell
docker network inspect temporal-network
```

Look for the container named `temporal`.

Example output:

```json
[
  {
    "Name": "temporal-network",
    // ...
    "Containers": {
      // ...
      "53cf62f0cc6cfd2a9627a2b5a4c9f48ffe5a858f0ef7b2eaa51bf7ea8fd0e86f": {
        "Name": "temporal",
        // ...
        "IPv4Address": "172.18.0.4/16"
        // ...
      }
      // ...
    }
    // ...
  }
]
```

Copy the IP address part.
