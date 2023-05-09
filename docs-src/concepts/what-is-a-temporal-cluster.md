---
id: what-is-a-temporal-cluster
title: What is a Temporal Cluster?
sidebar_label: Temporal Cluster
description: A Temporal Cluster is a group of Temporal Services with a Persistence store.
tags:
  - term
  - explanation
---

A Temporal Cluster is the group of services, known as the [Temporal Server](/concepts/what-is-the-temporal-server), combined with persistence stores, that together act as a component of the Temporal Platform.

- [How to quickly install a Temporal Cluster for testing and development](/kb/all-the-ways-to-run-a-cluster)
- [Cluster deployment guide](/cluster-deployment-guide)

![A Temporal Cluster (Server + persistence)](/diagrams/temporal-cluster.svg)

<!-- ### Visibility
Commenting this out because it is out of place. Using the what is visibility concept topic in the guide instead.
Also these details are covered in the Visibility store setup under cluster deployment.

Temporal has built-in [Visibility](/concepts/what-is-visibility) features.
To enhance this feature, Temporal supports an [integration with Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).

- Elasticsearch v8 is supported from Temporal version 1.18.0 onwards
- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported up to Temporal version 1.17.x
- Elasticsearch v6.8 and v7.10 versions are explicitly supported with AWS Elasticsearch -->
