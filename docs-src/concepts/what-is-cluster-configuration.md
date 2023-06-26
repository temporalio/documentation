---
id: what-is-cluster-configuration
title: What is Cluster configuration?
sidebar_label: Cluster configuration
description: Cluster Configuration is the setup and configuration details of your Temporal Cluster, defined using YAML.
tags:
  - term
  - explanation
---

Cluster configuration is the setup and configuration details of your self-hosted Temporal Cluster, defined using YAML.
You must define your Cluster configuration when setting up your self-hosted Temporal Cluster.

For details on using Temporal Cloud, see [Temporal Cloud documentation](/cloud).

Cluster configuration is composed of two types of configuration: [Static configuration](#static-configuration) and [Dynamic configuration](#dynamic-configuration).

### Static configuration

Static configuration contains details of how the Cluster should be set up.
The static configuration is read just once and used to configure service nodes at startup.
Depending on how you want to deploy your self-hosted Temporal Cluster, your static configuration must contain details for setting up:

- Temporal Services—Frontend, History, Matching, Worker
- Membership ports for the Temporal Services
- Persistence (including History Shard count), Visibility and Advanced Visibility, Archival store setups.
- TLS, authentication, authorization
- Server log level
- Metrics
- Cluster metadata
- Dynamic config Client

Static configuration values cannot be changed at runtime.
Some values, such as the Metrics configuration or Server log level can be changed in the static configuration but require restarting the Cluster for the changes to take effect.

For details on static configuration keys, see [Cluster configuration reference](/references/configuration).

For static configuration examples, see <https://github.com/temporalio/temporal/tree/master/config>.

### Dynamic configuration

Dynamic configuration contains configuration keys that you can update in your Cluster setup without having to restart the server processes.

All dynamic configuration keys provided by Temporal have default values that are used by the Cluster.
You can override the default values by setting different values for the keys in a YAML file and setting the [dynamic configuration client](/references/configuration#dynamicconfigclient) to poll this file for updates.
Setting dynamic configuration for your Cluster is optional.

Setting overrides for some configuration keys updates the Cluster configuration immediately.
However, for configuration fields that are checked at startup (such as thread pool size), you must restart the server for the changes to take effect.

Use dynamic configuration keys to fine-tune your self-deployed Cluster setup.

For details on dynamic configuration keys, see [Dynamic configuration reference](/references/dynamic-configuration).

For dynamic configuration examples, see <https://github.com/temporalio/temporal/tree/master/config/dynamicconfig>.
