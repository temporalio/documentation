---
id: installing-server
title: Installing Temporal
sidebar_label: Installing Temporal
---

### Prerequisites

Follow the Docker installation instructions found here: [https://docs.docker.com/engine/install](https://docs.docker.com/engine/install)

Follow the docker-compose installation instructions found here: [https://docs.docker.com/compose/install](https://docs.docker.com/compose/install)

### Run Temporal Server Using docker-compose

Download the Temporal docker-compose file to preferred location (i.e. `quick_start` directory):

```bash
curl -L https://github.com/temporalio/temporal/releases/download/v0.23.1/docker.tar.gz | tar -xz --strip-components 1 docker/docker-compose.yml

ls
# docker-compose.yml
```

Start Temporal Service:

```bash
docker-compose up
```

The output should look similar to:

```
Creating network "quick_start_default" with the default driver
Pulling temporal (temporalio/temporal-auto-setup:0.23.1)...
...
...
temporal_1   | Description: Default namespace for Temporal Server
temporal_1   | OwnerEmail:
temporal_1   | NamespaceData: map[string]string(nil)
temporal_1   | Status: NamespaceStatusRegistered
temporal_1   | RetentionInDays: 1
temporal_1   | EmitMetrics: false
temporal_1   | ActiveClusterName: active
temporal_1   | Clusters: active
temporal_1   | HistoryArchivalStatus: Enabled
temporal_1   | HistoryArchivalURI: file:///tmp/temporal_archival/development
temporal_1   | VisibilityArchivalStatus: Disabled
temporal_1   | Bad binaries to reset:
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | | BINARY CHECKSUM | OPERATOR | START TIME | REASON |
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | + echo 'Default namespace registration complete.'
temporal_1   | Default namespace registration complete.
```

At this point Temporal Server is running! You can also see the web interface on [localhost:8088](http://localhost:8088/)

## Write Workflows and Activities using Client SDK

Try out [Java SDK](../java-quick-start/).
 
Try out [Go SDK](../go-quick-start/). 
