---
id: kubernetes-controller
title: Temporal Worker Controller
sidebar_label: Worker Controller
description: Use Temporal's provided Kubernetes controller to programmatically scale your Worker deployments.
slug: /production-deployment/worker-deployments/kubernetes-controller
toc_max_heading_level: 4
keywords:
  - kubernetes
  - scaling
  - helm
  - workers
  - scaling
  - versioning
tags:
  - Temporal Service
  - Durable Execution
---

The [Temporal Worker Controller](https://github.com/temporalio/temporal-worker-controller) provides automation to enable rainbow deployments of your Workers by simplifying the tracking of which versions still have active Workflows, managing the lifecycle of versioned Worker deployments, and calling Temporal APIs to update the routing config of Temporal Worker Deployments.
The Temporal Worker Controller makes it simple and safe to deploy Temporal Workers on Kubernetes.

### Why adopt the Worker Controller?

The traditional approach to revising Temporal Workflows is to add branches using the [Versioning APIs](/workflow-definition#workflow-versioning).
Over time these checks can become a source of technical debt, as safely removing them from a codebase is a careful process that often involves querying all running Workflows.

[Worker Versioning](/production-deployment/worker-deployments/worker-versioning) is a Temporal feature that allows you to pin Workflows to individual versions of your Workers, which are called Worker Deployment Versions.
Using pinning, you will not need to add branching to your Workflows to avoid non-determinism errors.
This allows you to bypass the other Versioning APIs.

The Worker Controller gives you direct, programmatic control over your Worker deployments, and integrates with the [Temporal CLI](/production-deployment/worker-deployments/worker-versioning#rolling-out-changes-with-the-cli).
You do not need to use the Worker Controller to use Worker Versioning, but when used together, Worker Versioning and the Worker Controller can provide more graceful deployments and upgrades, and less need to manually tune your Workers.

Note that in Temporal, **Worker Deployment** is sometimes referred to as **Deployment**, but since the Worker Controller makes significant references to Kubernetes Deployment resource, within this page we will stick to these terms:

- [**Worker Deployment**](/worker-versioning#deployments): A Worker Deployment is a logical service that groups similar Workers together for unified management. Each Deployment has a name (such as your service name) and supports versioning through a series of Worker Deployment Versions.
- [**Worker Deployment Version**](/worker-versioning#deployment-versions): A Worker Deployment Version represents an iteration of a Worker Deployment. Each Deployment Version consists of Workers that share the same code build and environment. When a Worker starts polling for Workflow and Activity Tasks, it reports its Deployment Version to the Temporal Server.
- **Deployment**: A Kubernetes Deployment resource. A Deployment is "versioned" if it is running versioned Temporal workers/pollers.

### Features

- Registration of new Temporal Worker Deployment Versions
- Creation of versioned Deployment resources (that manage the Pods that run your Temporal pollers)
- Deletion of resources associated with drained Worker Deployment Versions
- `Manual`, `AllAtOnce`, and `Progressive` rollouts of new versions
- Ability to specify a "gate" Workflow that must succeed on the new version before routing real traffic to that version
- [Autoscaling](/develop/worker-performance#recommended-approach) of versioned Deployments

Refer to the [Temporal Worker Controller repo](https://github.com/temporalio/temporal-worker-controller/) for usage details.

## Configuring Worker Lifecycles

To use the Temporal Worker Controller, tag your Workers following the guidance for using [Worker Versioning](/production-deployment/worker-deployments/worker-versioning).

Here is an example of a progressive rollout strategy gated on the success of the `HelloWorld` Workflow:

```
rollout:
  strategy: Progressive
  steps:
    - rampPercentage: 1
      pauseDuration: 30s
    - rampPercentage: 10
      pauseDuration: 1m
  gate:
    workflowType: "HelloWorld"
```

As you ship new deployment versions, the Worker Controller automatically detects them and gradually makes that version the new **Current Version** of the Worker deployment it is a part of.
As older pinned Workflows finish executing and deprecated deployment versions become drained, the Worker Controller also frees up resources by sunsetting the `Deployment` resources polling those versions.

## Running the Temporal Worker Controller

You can install the Temporal Worker Controller using our Helm chart:

```bash
RELEASE=temporal-worker-controller
NAMESPACE=temporal-system
VERSION=1.0.0

helm install $RELEASE oci://docker.io/temporalio/helm-charts/temporal-worker-controller \
  --version $VERSION \
  --namespace $NAMESPACE \
  --create-namespace
  
helm install temporal-worker-controller ./helm/temporal-worker-controller \
  --namespace $NAMESPACE \
  --create-namespace 
```

Refer to [GitHub](https://github.com/temporalio/temporal-worker-controller/tree/main/helm/temporal-worker-controller/templates) for other Worker Controller deployment templates.
