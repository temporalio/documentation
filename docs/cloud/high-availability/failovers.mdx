---
id: failovers
title: Configure and trigger failovers
sidebar_label: Configure and trigger failovers
slug: /cloud/high-availability/failovers
description: How automatic and manual failovers work with Temporal Cloud HA
tags:
  - Temporal Cloud
  - Production
  - High Availability
keywords:
  - availability
  - explanation
  - failover
  - high-availability
  - replication
  - namespaces
  - temporal-cloud
  - term
---

import { ToolTipTerm, DiscoverableDisclosure, CaptionedImage } from '@site/src/components';

In case of an incident or an outage, Temporal will automatically <ToolTipTerm term="fail over" src="failover" /> your Namespace from the primary to the replica.
This lets Workflow Executions continue with minimal interruptions or data loss.
You can also [manually initiate failovers](/cloud/high-availability/failovers) based on your situational monitoring or for testing.

Returning control from the replica to the primary is called a <ToolTipTerm term="failback" />.
The replica is active for a brief duration during an incident.
After the incident, Temporal fails back to the primary.

## Failovers

Occasionally, a Namespace may become temporarily unavailable due to an unexpected incident.
Temporal Cloud detects these issues using regular health checks.

### Health checks

Temporal Cloud monitors error rates, latencies, and infrastructure problems, such as request timeouts.
If it finds unhealthy conditions where indicators exceed the allowed thresholds, Temporal automatically switches the primary to the replica.
In most cases, the replica is unaffected by the issue.
This process is known as failover.

### Automatic failovers

Failovers prevent data loss and application interruptions.
Existing Workflows continue, and new Workflows start as the incident is addressed.
Once the incident is resolved, Temporal Cloud performs a "failback," shifting Workflow Execution processing back to the original Namespace.

Temporal Cloud handles failovers automatically, ensuring continuity without manual intervention.

<CaptionedImage src="/img/cloud/high-availability/failover.png" title="On failover, the replica becomes active and the Namespace endpoint directs access to it." />

For more control over the failover process, you can [disable automated failovers](/cloud/high-availability/failovers#disabling-temporal-initiated).

:::tip

You can test the failover of Namespace with High Availability features by manually triggering a failover using the UI or the 'tcld' CLI utility.
In most scenarios, we recommend you let Temporal handle failovers for you.

After failover, be aware of the following points:

- When working with Multi-region Namespaces, your CNAME may change.
  For example, it may switch from aws-us-west-1.region.tmprl.cloud to aws-us-east-1.region.tmprl.cloud.
  This change doesn't affect same-region Namespaces.

- Your Namespace endpoint _will not change_.
  If it is `my_namespace.my_account.tmprl.cloud:7233` before failover, it will be `my_namespace.my_account.tmprl.cloud:7233` after failover.

:::

### The failover process {#failover-process}

Temporal's automated failover process works as follows:

- During normal operation, the primary asynchronously copies operations and metadata to its replica, keeping them in sync.
- If the primary becomes unavailable, Temporal detects the issue through health checks.
  It automatically switches to the replica, using one of its available [failover scenarios](#scenarios).
- The replica takes over the active role and becomes the primary.
  Operations continue with minimal disruption.
- When the original primary recovers, the roles can either switch back (failback, by default) or remain as they are, based on your Namespace settings.
  Automatic role switching with failover and failback minimizes downtime for consistent availability.

:::info

A Namespace failover, which updates the "active region" field in the Namespace record, is a metadata update.
This update is replicated through the Namespace metadata mechanism.

:::

## Failover scenarios {#scenarios}

The Temporal Cloud failover mechanism supports several modes for executing Namespace failovers.
These modes include graceful failover ("handover"), forced failover, and a hybrid mode.
The hybrid mode is Temporal Cloud’s default Namespace behavior.

### Graceful failover (handover) {#graceful-failover}

In this mode, Temporal Cloud fully processes and drains replication Tasks.
Temporal Cloud pauses traffic to the Namespace before the failover.
Graceful failover prevents the loss of progress and avoids data conflicts.

During graceful failover, the Namespace may experience a brief period of unavailability. 
This duration can be limited by the caller and defaults to 10 seconds. 
If the system is unable to reach a consistent state within this timeout, the failover attempt is aborted and the Namespace reverts to its previous state.
During this unavailable period:

- Existing Workflows stop progress.
- Temporal Cloud returns a "Service unavailable error".
  This error is retryable by the Temporal SDKs.
- State transitions will not happen and tasks are not dispatched.
- User requests like start/signal Workflow are rejected.
- Operations are paused during handover.

This mode favors _consistency_ over availability.

### Forced failover {#forced-failover}

In this mode, a Namespace immediately activates in the replica.
Events not replicated due to replication lag undergo conflict resolution upon reaching the new active Namespace.

This mode prioritizes _availability_ over consistency.

### Hybrid failover mode {#hybrid-failover}

While graceful failovers are preferred for consistency, they aren’t always practical.
Temporal Cloud’s hybrid failover mode (the default mode) limits the initial graceful failover attempt to 10 seconds or less.

During this period:

- Existing Workflows stop progress.
- Temporal Cloud returns a "Service unavailable error", which is retried by SDKs.

If the graceful approach doesn’t resolve the issue, Temporal Cloud automatically switches to a forced failover.

This strategy balances _consistency_ and _availability_ requirements.

### Scenario summary

| Failover Scenario            | Characteristics                                         |
| ---------------------------- | ------------------------------------------------------- |
| Graceful failover (handover) | Favors _consistency_ over availability.                 |
| Forced failover              | Prioritizes _availability_ over consistency.            |
| Hybrid failover mode         | Balances _consistency_ and _availability_ requirements. |

## Network partitions

At any time only the primary or the replica is active.
The only exception occurs in the event of a [network partition](https://en.wikipedia.org/wiki/Network_partition), when a Network splits into separate subnetworks.
Should this occur, you can promote a replica to active status.
**Caution:** This temporarily makes both regions active.
After the network partition is resolved and communication between the isolation domains/regions is restored, a conflict resolution algorithm determines whether the primary or replica remains active.

:::tip

In traditional active/active replication, multiple nodes serve requests and accept writes simultaneously, ensuring strong synchronous data consistency.
In contrast, with a Temporal Cloud Namespace with High Availability Features, only the primary accepts requests and writes at any given time.
Workflow History Events are written to the primary first and then asynchronously replicated to the replica, ensuring that the replica remains in sync.

:::

## Conflict resolution {#conflict-resolution}

Namespaces with replicas rely on asynchronous event replication.
Updates made to the primary may not immediately be reflected in the replica due to <ToolTipTerm term="replication lag" />, particularly during failovers.
In the event of a non-graceful failover, replication lag may cause a temporary setback in Workflow progress.

Namespaces that aren't replicated can be configured to provide _at-most-once_ semantics for Activities execution when a retry policy's [maximum attempts](https://docs.temporal.io/retry-policies#maximum-attempts) is set to 0.
High Availability Namespaces provide _at-least-once_ semantics for execution of Activities.
Completed Activities _may_ be re-dispatched in a newly active Namespace, leading to repeated executions.

When a Workflow Execution is updated in a newly active replica following a failover, events from the previously active Namespace that arrive after the failover can't be directly applied.
At this point, Temporal Cloud has forked the Workflow History.

After failover, Temporal Cloud creates a new branch history for execution, and begins its <ToolTipTerm term="conflict resolution"/> process.
The Temporal Service ensures that Workflow Histories remain valid and are replayable by SDKs post-failover or after conflict resolution.
This capability is crucial for ensuring Workflow Executions continue forward without losing progress, and for maintaining consistency across replication, even during incidents that cause disruptions in replication.


## Perform a manual failover {#triggering-failovers}

For some users, Temporal's automated health checks and failovers don't provide sufficient nuance and control.
For this reason, you can manually trigger failovers based on your own custom alerts and for testing purposes.
This section explains how and what to expect afterward.

:::warning Check Your Replication Lag

Always check the <ToolTipTerm term="replication lag" /> before initiating a failover.
A forced failover when there is a significant replication lag has a higher likelihood of rolling back Workflow progress.

:::

### Trigger the failover {#manual-failovers}

You can trigger a failover manually using the Temporal&nbsp;Cloud<br />Web&nbsp;UI or the tcld CLI, depending on your preference and setup.
The following instructions outline the steps for each method:

<Tabs>

<TabItem value="webui" label="Web UI">

1. Visit the [Namespace page](https://cloud.temporal.io/namespaces) on the Temporal Cloud Web UI.
1. Navigate to your Namespace details page and select the **Trigger a failover** option from the menu.
1. Confirm your action.
   After confirmation, Temporal initiates the failover.

</TabItem>

<TabItem value="tcldcli" label="tcld">

To manually trigger a failover, run the following command in your terminal:

```
tcld namespace failover \
    --namespace <namespace_id>.<account_id> \
    --region <target_region>
```

If using API key authentication with the `--api-key` flag, you must add it directly after the tcld command and before `namespace failover`.

</TabItem>

</Tabs>

Temporal fails over the primary to the replica.
When you're ready to fail back, follow these failover instructions to move the primary back to the original.

### Post-failover event information {#info}

After any failover, whether triggered by you or by Temporal, an event appears in both the [Temporal Cloud Web UI](https://cloud.temporal.io/namespaces) (on the Namespace detail page) and in your audit logs.
The audit log entry for Failover uses the `"operation": "FailoverNamespace"` event.
After failover, the replica becomes active, taking over in the isolation domain or region.

You don't need to monitor Temporal Cloud's failover response in real time.
Whenever there is a failover event, Temporal Cloud [notifies you via email](/cloud/notifications#admin-notifications)

### Returning to the primary with failbacks

After Temporal-initiated failovers, Temporal Cloud shifts Workflow Execution processing back to the original region or isolation domain that was active before the incident once the incident is resolved.
This is called a "failback".

:::note

To failback a manually-initiated failover, follow the [Manual Failover](#manual-failovers) directions to failover back to the original primary.

:::

## Disabling Temporal-initiated failovers {#disabling-temporal-initiated}

When you add a replica to a Namespace, in the event of an incident or an outage Temporal Cloud automatically fails over the Namespace to its replica.
_This is the recommended and default option._

However if you prefer to disable Temporal-initiated failovers and handle your own failovers, you can do so by following these instructions:

<Tabs>

<TabItem value="webui" label="Web UI">

1. Navigate to the Namespace detail page in Temporal Cloud.
1. Choose the "Disable Temporal-initiated failovers" option.

</TabItem>

<TabItem value="tcldcli" label="tcld">

To disable Temporal-initiated failovers, run the following command in your terminal:

```
tcld namespace update-high-availability \
    --namespace <namespace_id>.<account_id> \
    --disable-auto-failover=true
```

If using API key authentication with the `--api-key` flag, you must add it directly after the tcld command and before `namespace update-high-availability`

</TabItem>

</Tabs>

Temporal Cloud disables its health-check initiated failovers.
To restore the default behavior, unselect the option in the WebUI or change `true` to `false` in the CLI command.

## Best practices: Workers and failovers {#worker}

Enabling High Availability for Namespaces doesn't require specific Worker configuration.
The process is invisible to the Workers.
When a Namespace fails over to the replica, the DNS redirection orchestrated by Temporal ensures that your existing Workers continue to poll the Namespace without interruption.

When a Namespace fails over to a replica in a different region, Workers will be communicating cross-region.

- If your application can’t tolerate this latency, deploy a second set of Workers in the replica's region or opt for a replica in the same region:
- In the case of a complete regional outage, Workers in the original region may fail alongside the original Namespace.
  To keep Workflows moving during this level of outage, deploy a second set of Workers to the secondary region.

:::tip

Temporal Cloud enforces a maximum connection lifetime of 5 minutes.
This offers your Workers an opportunity to re-resolve the DNS.

:::

## Best practices: scheduled failover testing {#testing}

Microservices and external dependencies will fail at some point.
Testing failovers ensures your app can handle these failures effectively.
Temporal recommends regular and periodic failover testing for mission-critical applications in production.
By testing in non-emergency conditions, you verify that your app continues to function, even when parts of the infrastructure fail.

<DiscoverableDisclosure label="Why test?">

:::tip Safety First

If this is your first time performing a failover test, run it with a test-specific namespace and application.
This helps you gain operational experience before applying it to your production environment.
Practice runs help ensure the process runs smoothly during real incidents in production.

:::

Failover testing (also known as "<ToolTipTerm term="trigger testing" />)" can:

- **Validate replicated deployments**:
  In multi-region setups, failover testing ensures your app can run from another region when the primary region experiences outages.
  In standard setups, failover testing instead works with an isolation domain.
  This maintains high availability in mission-critical deployments.
  Manual testing confirms the failover mechanism works as expected, so your system handles incidents effectively.

- **Assess replication lag**:
  In multi-region deployment, monitoring [replication lag](/cloud/high-availability/monitoring#replication-lag-metric) between regions is crucial.
  Check the lag before initiating a failover to avoid rolling back Workflow progress.
  This is less important when using isolation domains as failover is usually instantaneous.
  Manual testing helps you practice this critical step and understand its impact.

- **Assess recovery time**:
  Manual testing helps you measure actual recovery time.
  You can check if it meets your expected Recovery Time Objective (RTO) of 20 minutes or less, as stated in the [High Availability Namespace SLA](/cloud/sla).

- **Identify potential issues**:
  Failover testing uncovers problems not visible during normal operation.
  This includes issues like [backlogs and capacity planning](https://temporal.io/blog/workers-in-production#testing-failure-paths-2438) and how external dependencies behave during a failover event.

- **Validate fault-oblivious programming**:
  Temporal uses a "fault-oblivious programming" model, where your app doesn’t need to explicitly handle many types of failures.
  Testing failovers ensures that this model works as expected in your app.

- **Operational readiness**:
  Regular testing familiarizes your team with the failover process, improving their ability to handle real incidents when they arise.

Testing failovers regularly ensures your Temporal-based applications remain resilient and reliable, even when infrastructure fails.

</DiscoverableDisclosure>
