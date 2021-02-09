---
id: server-production-deployment
title: Production self-hosted deployment of Temporal Server
sidebar_label: Production deployment
---

## Overview

There is a lot of nuance to a production deployment of Temporal Server, because it is highly use-case and infrastructure dependent. 

It is impossible for us to document every permutation, so we instead focus on giving you what you need to know to deploy Temporal Server from first principles.
We remain accessible to you via the [Community forum](https://community.temporal.io/) or [Slack](https://join.slack.com/t/temporalio/shared_invite/zt-kfgfjuye-L8gCQVRhPykA2td8pk7eTQ) 
for further questions.

1. **Prerequisites**:  Temporal Server is a Go application which [you can import](https://docs.temporal.io/docs/server-options) or run as a binary. 
    The other minimum requirement is a database - we support Cassandra, MySQL, or PostgreSQL. 
    
    Further dependencies are only needed to support optional features: enhanced workflow search (with ElasticSearch), 
monitoring & observability (Prometheus & Grafana), and multi-cluster replicaiton
    
    Please see our [versions & dependencies doc](https://docs.temporal.io/docs/server-versions-and-dependencies/) for 
precise versions we support together with their features.

2. **Configuration**: A full configuration reference is available [here](https://docs.temporal.io/docs/server-configuration).
3. ???

## Further Reading

A full understanding of [Temporal Server Architecture](https://docs.temporal.io/docs/server-architecture/) will help you 
debug and troubleshoot production deployment issues.


## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- ECS runbook (pending)
- EKS runbook (pending)
