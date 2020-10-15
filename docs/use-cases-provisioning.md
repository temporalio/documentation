---
id: use-cases-provisioning
title: Infrastructure Provisioning
sidebar_label: Infrastructure Provisioning
---

## Motivation

Provisioning resources depends on a series of potentially long-running operations with many possibilities for intermittent failures. While existing deployment tools support simple operations, many scenarios may still require a custom provisioning flow:

- Automatic infrastructure provisioning for a new customer in multi-tenant environments.
- Particularly large deployments when tens or even hundreds of thousands of resources should be configured.
- Provisioning of custom resources that are not supported by off-the-shelf tools.
- Complex configuration logic that is determined at deployment time.

It's beneficial to have a single workflow engine to manage all the various tasks: spinning up the cluster, long term monitoring, managing upgrades, database schema migrations, automated staged rollout of new features.

Some provisioning operations may take dozens of minutes or even hours to complete. Ad-hoc solutions may fail in the middle and leave the system in an undefined state.

## Benefits of Temporal

Temporal Workflows can express complex decision trees using a general-purpose programming language. Support for long-running operations, polling, responding to events, automatic retries are excellent building blocks for a robust provisioning flow. If a lengthy provisioning Workflow fails in the middle, Temporal would handle the error and restart the flow at the right spot.

Temporal can route activity execution to a specific process or host, which is useful for many provisioning scenarios.

Many resource management operations require locking to ensure that only one mutation is executed on any given resource at a time. Temporal provides a strong guarantee of uniqueness via the operation identifier. This primitive enables the implementation of locking behavior in a fault-tolerant and scalable manner.

## Example Scenarios

**CI/CD**. Implementing CI/CD pipelines and deploying applications to containers or virtual or physical machines is a non-trivial process. The logic has to deal with complex requirements around rolling upgrades, canary deployments, and rollbacks. Temporal is a perfect platform for building a deployment solution because it provides all the necessary guarantees and abstractions, allowing developers to focus on business logic.

Temporal can assist and augment existing DevOps automation, deployments, load testing, orchestration of real-time analytics, builds, and integration testing.

**Managed deployments**. Imagine that you have to create a self-operating database similar to Amazon RDS. Multiple projects use Temporal to automate managing and automatic recovery of various products like MySQL, Elasticsearch, Apache Cassandra, and HashiCorp Consul.

**Kubernetes provisioning**. Kubernetes deployments involve managing components on multiple levels. A Workflow could create virtual machines, join them in a Kubernetes cluster, and install certain components like autoscaler. You may want to support this Workflow on multiple cloud providers, so you'd have to deal with their specifics and still have a resilient pipeline for those infrastructure management tasks.

## Next Steps

Here are some real-world use cases of infrastructure provisioning:

 * [Using Temporal Workflows to spin up Kubernetes](https://banzaicloud.com/blog/introduction-to-cadence/), a blog post by Banzai Cloud
 * [Using Temporal to orchestrate cluster lifecycle in HashiCorp Consul](https://www.youtube.com/watch?v=kDlrM6sgk2k&feature=youtu.be&t=1188), a video by HashiCorp
