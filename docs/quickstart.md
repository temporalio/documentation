---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

## Install Temporal Server Locally

### Install docker

Follow the Docker installation instructions found here: [https://docs.docker.com/engine/install](https://docs.docker.com/engine/install)

### Install docker-compose

Follow the docker-compose installation instructions found here: [https://docs.docker.com/compose/install](https://docs.docker.com/compose/install)

### Run Temporal Server Using docker-compose

Download the Temporal docker-compose file to preferred location (i.e. `quick_start` directory):
```bash
> curl -L https://github.com/temporalio/temporal/releases/download/v0.21.1/docker.tar.gz | tar -xz --strip-components 1 docker/docker-compose.yml
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   604  100   604    0     0   6357      0 --:--:-- --:--:-- --:--:--  6291
100  7294  100  7294    0     0  12909      0 --:--:-- --:--:-- --:--:-- 12909
> ls
docker-compose.yml
```

Start Temporal Service:
```bash
> docker-compose up
Creating network "quick_start_default" with the default driver
Pulling temporal (temporalio/temporal-auto-setup:0.21.1)...
...
...
<skip docker-compose output>
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

Note that a default namespace is created upon first cluster start.

## Write Workflows and Activities using Client SDK

Try out [Java SDK](06_java_sdk/01_quick_start#).
 
Try out [Go SDK](07_go_sdk/001_quick_start#). 
