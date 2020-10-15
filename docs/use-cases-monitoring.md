---
id: use-cases-monitoring
title: Monitoring and Periodic Execution
sidebar_label: Monitoring
---


## Motivation

There is often a need for monitoring and periodic maintenance of IT systems on top of [infrastructure provisioning](/docs/use-cases-provisioning). **Polling** is executing a regular action to check for a state change, for example:

- Pinging a host to make sure it's online and responsive.
- Once-per-minute health checks of a production deployment.
- Polling an API for a specific resource to become available.
- Triggering and executing periodic backups.
- Pushing configuration updates when they become available.
- Failing over in an active-passive setup when the primary instance becomes unhealthy.

As monitoring is often an example of periodic execution of business logic, it can benefit from Temporal's **distributed cron** engine.

## Benefits of Temporal

Temporal provides guaranteed execution with exactly-once semantics with automatic retries.

Polling configuration can be as straightforward or sophisticated as needed:

- Workflows can run on a cron schedule with a single configuration setting.
- Alternatively, you can manually control the delays between intervals with `sleep` commands. For example, you can switch to more frequent executions in case of detected downtime.

The history service provides visibility into history for periodic workflow executions.

Scalability is another crucial advantage of using Temporal for periodic execution. Many use cases require periodic execution for a large number of entities. At Uber, some applications run recurring workflows for each customer. Imagine 100s of millions parallel cron jobs that don't require a separate batch processing framework.

Temporal support for long-running activities and unlimited retries also makes it a great fit for monitoring use cases.

## Example: Cluster Lifecycle Workflow

Imagine a system that manages a large number of compute clusters. It monitors that a cluster is up and running, its CPU and network utilization, run backups and software upgrades.

You can model these operational activities as one indefinitely long workflow per cluster which can be alive anywhere from minutes to years, depending on the cluster lifetime. Each workflow would run periodic activities, react to user commands via signals, and coordinate multiple potentially conflicting operations.

## Next Steps

Learn more about cron jobs in Temporal:

- [Cron example in Go](https://github.com/temporalio/temporal-go-samples/tree/master/cron)
- [Cron example in Java](https://github.com/temporalio/temporal-java-samples/blob/master/src/main/java/io/temporal/samples/hello/HelloCron.java)
- [Periodic execution example in Java](https://github.com/temporalio/temporal-java-samples/blob/master/src/main/java/io/temporal/samples/hello/HelloPeriodic.java)
- [Go SDK docs](/docs/go-distributed-cron)
- [Java SDK docs](/docs/java-distributed-cron)
