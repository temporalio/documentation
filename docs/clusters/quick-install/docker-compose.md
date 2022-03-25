Use Docker Compose and Temporal Cluster Docker images to quickly install and run a Temporal Cluster locally while developing Workflows.

You must have [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install) installed.

Then clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository and run `docker-compose up` from the root of that repo:

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

When the Temporal Cluster is running, the Temporal Web UI becomes available in your browser: [localhost:8088](http://localhost:8088/)

The preceding steps start and run a Temporal Cluster using a default configuration.
To try other configurations (different dependencies and databases), or to try a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).
