---
id: rpo-rto
title: RPO and RTO
sidebar_label: RPO and RTO
description: Understand the Recovery Point Objective (RPO) and Recovery Time Objective (RTO) in Temporal Cloud.
slug: /cloud/rpo-rto
toc_max_heading_level: 4
keywords:
  - temporal cloud
  - RPO
  - RTO
  - Recovery Point Objective
  - Recovery Time Objective
tags:
  - Recovery Point Objective 
  - Recovery Time Objective
  - Temporal Cloud
---

import { ToolTipTerm } from '@site/src/components';

When a cloud outage disrupts a Namespace, Temporal Cloud takes measures to maintain the Namespace's availability and data durability. The time it takes to recover from the outage is called the "recovery time." The amount of data (event histories) lost is called the "recovery point." A durable system should have a low recovery time and recovery point.

To help users plan for keeping critical Workflows available during a cloud outage, Temporal Cloud publishes goals for the recovery time and recovery point for each kind of outage. These goals are called the Recovery Time Objective (RTO) and Recovery Point Objective (RPO). These objectives are complementary to Temporal Cloud's [Service Level Agreement (SLA)](/cloud/sla).

To achieve the lowest RPO and RTO, Temporal Cloud offers [High Availability](/cloud/high-availability) features that keep Workflows operational with minimal downtime. When High Availability is enabled on a Namespace, the user chooses a region to place a "replica" that will take over in the event of a failure. The location of the replica determines the type of replication used and the type of outages that can be handled. Multi-region Replication is when the active and replica are in different regions on the same cloud (e.g., AWS us-east-1 and AWS us-west-2). Multi-cloud Replication is when the active and replica are in different clouds (e.g., AWS and GCP). Same-region Replication is when the active and replica are in the same region. Temporal always places the active and replica in different [cells](/cloud/overview#cell-based-infrastructure).

As Workflows progress in the active region, history events are asynchronously replicated to the replica.
Because replication is asynchronous, High Availability does not impact the latency or throughput of Workflow Executions in the active region.
If an outage hits the active region or cell, Temporal Cloud will fail over to the replica so that existing Workflow Executions will continue to run and new Workflow Executions can be started.

The Recovery Point Objective and Recovery Time Objective for Temporal Cloud depend on the type of outage and which [High Availability](/cloud/high-availability) feature your Namespace has enabled. Temporal Cloud can only set an RPO and RTO for cases where it has the ability to mitigate the outage. Therefore, the below RPOs and RTOs apply to Namespaces that have the corresponding type of replication and have enabled Temporal-initiated failovers, which comes enabled by default.

1. **Availability zone outage**:
    1. _Applicable Namespaces:_ All Namespaces
    2. _Goals:_ Zero RPO and near-zero RTO
    3. _More details:_ Historically, these have been the most common type of outage in the cloud. Temporal Cloud replicates every Namespace across three availability zones. The failure of a single availability zone is handled automatically by Temporal Cloud behind the scenes, with no potential for data loss, and little-to-no observable downtime to the end user.
2. **Cell outage**: 
    1. _Applicable Namespaces:_ Namespaces with Same-region Replication, Multi-region Replication, or Multi-cloud Replication
    2. _Goals:_ 1-minute RPO and 20-minute RTO
    3. _More details:_ Temporal Cloud runs on a [cell architecture](/cloud/sla). Each cell contains the software and services necessary to host a Namespace. While unlikely, it's possible for a cell to experience a disruption due to uncaught software bugs or sub-component failures (e.g., an outage in the underlying database).
3. **Regional outage**: 
    1. _Applicable Namespaces:_ Namespaces with Multi-region Replication or Multi-cloud Replication
    2. _Goals:_ 1-minute RPO and 20-minute RTO
    3. _More details:_ On [rare occasions](https://temporal.io/blog/how-devs-kept-running-during-the-aws-us-east-1-oct-20-2025), an entire region within a cloud provider will be degraded. Since Namespaces depend on the cloud provider's infrastructure, Temporal Cloud is not immune to these outages.
4. **Cloud-wide outage**: 
    1. _Applicable Namespaces:_ Namespaces with Multi-cloud Replication
    2. _Goals:_ 1-minute RPO and 20-minute RTO
    3. _More details:_ An entire cloud provider has an outage across most or all regions. Since cloud providers strive to keep cloud regions de-coupled, these are the rarest outages of all. Still, they [have happened](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW) in the past.

Notes:

- The above goals are only applicable to Namespaces that have enabled Temporal-initiated failovers, which comes enabled by default. Temporal-initiated failovers are initiated by Temporal's tooling and/or on-call engineers without user action. Users can always initiate a failover on their Namespace, even when Temporal-initiated failovers are enabled. In an outage, a user-initiated failover will not cancel out or accidentally reverse a Temporal-initiated failover.

:::note

Temporal highly recommends keeping Temporal-initiated failovers enabled. When Temporal-initiated failovers are _disabled,_ Temporal Cloud cannot set an RPO and RTO for that Namespace, because it cannot control when or if the user will trigger a failover.

:::

- The above goals are for unplanned cloud outages. They do not apply to user-initiated failovers during healthy periods (e.g., for DR drills). Read about [triggering a failover](/cloud/high-availability/failovers) to see how a Namespace failover should perform during healthy periods.

- As soon as a cloud outage resolves, Temporal's on-call engineers will work to restore service to Namespaces that were not protected by High Availability. A cloud outage can leave lingering effects in Temporal's systems and applications, even after the cloud provider restores the underlying service. Because of this, affected Namespaces may not be immediately available when the underlying service is restored. An affected Namespace's outage may last longer than the cloud provider's outage.

- All Namespaces are backed up every 4 hours. If an outage causes data loss on a Namespace that was not protected by High Availability, then Temporal will use the backup to restore as much data as feasible.


## Minimizing the Recovery Point

Temporal has put extensive work into tools and processes that minimize the recovery point and achieve its RPO for Temporal-initiated failovers, including:

- Best-in-class [data replication technology](https://youtu.be/mULBvv83dYM?si=RDeWb3gVsEtgGM4z&t=334) that keeps the replica up to date with the active.

- Monitoring, alerting, and internal SLOs on the replication lag for every Temporal Cloud Namespace.

However, user actions on a Namespace can affect the recovery point. For example, suddenly spiking into much higher throughput than a Namespace has seen before could create a period of replication lag where the replica falls behind the active. 

Temporal provides a [replication lag](/cloud/high-availability/monitoring#replication-lag-metric) metric for each Namespace. This metric approximates the recovery point the Namespace would achieve in a worst case failure at that given moment.

:::note

Temporal recommends monitoring the replication lag and alerting should it rise too high, e.g., above 1 minute.

:::

## Minimizing the Recovery Time

Temporal has put extensive work into tools and processes that minimize the recovery time and achieve its RTO for Temporal-initiated failovers, including:

- History events are replicated _asynchronously_. This ensures that the Namespace can still run workflows in the active region even if there are networking blips or outages with the replica region.

- Outages are detected automatically. We have extensive internal alerting to detect disruptions to Namespaces, and are ever improving this system.

- Battle-tested Temporal Workflows that execute failovers of all Temporal Cloud Namespaces in a given region quickly.

- Regular drills where we fail over our internal Namespaces to test our tooling.

- Expert engineers on-call 24/7 monitoring Temporal Cloud Namespaces and ready to assist should an outage occur.

To achieve the lowest possible recovery times, Temporal recommends that you:

- Keep Temporal-initiated failovers enabled on your Namespace (the default)
- Invest in a process to detect outages and trigger a manual failover.

Users can trigger manual failovers on their Namespaces even if Temporal-initiated failovers are enabled. There are several benefits to combining a manual failover process with Temporal-initiated failovers:

- You can detect outages that Temporal doesn't. In the cloud, regional outages don't affect all services equally. It's possible that Temporal--and the services it depends on--are unaffected by the outage, even while your Workers or other cloud infrastructure are disrupted. If you [monitor services in your critical path](https://sre.google/sre-book/monitoring-distributed-systems/) and alert on unusual error rates, you may catch outages before Temporal Cloud does.

- You can sequence your failovers in a particular order. Your cloud infrastructure probably contains more pieces than just your Temporal Namespace: Temporal Workers, compute pools, data stores, and other cloud services. If you manually fail over, you can choose the order in which these pieces switch to the replica region. You can then test that ordering with failover drills and ensure it executes smoothly without data consistency issues or bottlenecks.

- You can proactively fail over more aggressively than Temporal. While the 20-minute RTO should be sufficient for most use cases, some may strive to hit an even lower RTO. For workloads like high frequency trading, auctions, or popular sporting events, an outage at the wrong time could cause tremendous lost revenue per minute. You can adopt a posture that fails over more eagerly than Temporal does. For example, you could trigger a manual failover at the first sign of a possible disruption, before knowing whether there's a true regional outage. 

- Even if you have robust tooling to detect an outage and trigger a failover, leaving Temporal-initiated failovers enabled provides a "safety net" in case your automation misses an outage. It also gives Temporal leeway to preemptively fail over your Namespace if we detect that it may be disrupted soon, e.g., by a rolling failure that has impacted other Namespaces but not yours, yet.


## Understanding Temporal's RTO vs. SLA

Temporal has both a Recovery Time Objective (RTO) and a Service Level Agreement (SLA). They serve complementary purposes and apply in different situations.

| Aspect                            | RTO                                                                                                                                                                                                                                                                     | SLA                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| What is it?                       | An objective, or high-priority goal, for the total time that an outage disrupts a Namespace.                                                                                                                                                                            | A contractual agreement that sets an upper bound on the service error rate, with financial repercussions.                                                                                                                                                                                                                                                                                                                                                                      |
| How is it measured?               | The achieved recovery time is measured in terms of minutes per outage.                                                                                                                                                                                              | The achieved service error rate is measured in terms of error rate per month.                                                                                                                                                                                                                                                                                                                                                                                              |
| How is the calculation performed? | The achieved recovery time in a given outage is the total time between when a disruption to a Namespace began and when the Namespace was restored to full functionality, either after a failover to a healthy region or after the outage has been mitigated. | Temporal measures the percentage of requests to Temporal Cloud that fail, and applies a [formula](/cloud/sla) to get the final percentage for the month.                                                                                                                                                                                                                                                                                                                       |
| Do partial degradations count?    | Most outages contain periods of __partial degradation__ where some percentage of Namespace operations fail while the rest complete as normal. When they disrupt a Namespace, periods of partial degradation count in the calculation of the recovery time.                       | Partial degradations only partially count for the service error rate calculation. A 5-minute window with a 10% error rate would count less than a 5-minute window with a 100% error rate.                                                                                                                                                                                                                                                                                      |
| What is excluded?                 | For partial degradations, what counts as a disruption to a Namespace is subject to Temporal's expert judgment, but a good rule of thumb is a service error rate >=10%.                                                                                                | We exclude outages that are out of Temporal's control to mitigate, e.g., a failure of the underlying cloud provider infrastructure that affects a Namespace without High Availability and Temporal-initiated failovers enabled. If a Namespace has the relevant High Availability feature and has Temporal-initiated failovers enabled, then Temporal can act to mitigate the outage and it does usually count against the SLA. Full exclusions on the [SLA page](/cloud/sla). |

The following examples illustrate the RTO and SLA calculations for different types of in a regional outage. These hypothetical Namespaces are based on actual Temporal Cloud performance in a [real-world outage](https://temporal.io/blog/how-devs-kept-running-during-the-aws-us-east-1-oct-20-2025).

Suppose that region `middle-earth-1` experienced a cascading failure starting at 10:00:00 UTC, causing various instances and machines to fail over time. Temporal's automatic failover triggered for all Namespaces and completed at 10:15:00 UTC. 

- Namespace 0 was in the region but its cell was not affected by the outage. The only downtime it had was for a few seconds during the failover operation. It experienced a near-zero Recovery Time, and its service error rate was neglible.  Graceful failover was successful, and this Namespace achieved a recovery point of 0.

- Namespace 1_A was in the region and its cell experienced a partial degradation that caused 10% of requests to fail in the first 5 minutes, 25% in the second five minutes, and 50% in the third five minutes. Since it was significantly impacted from 10:00:00 to 10:15:00, its Recovery Time was 15 minutes. If it had no other service errors that month, then its service error rate for the month would be: ( (1 - 10%) + (1 - 25%) + (1 - 50%) + 8925 * 100% ) / 8928  = 99.990%. (Note: there are 8928 5-minute periods in a 31-day month.)  Graceful failover was successful, and this Namespace achieved a recovery point of 0.

- Namespace 1_B was in the same cell as Namespace 2_A, so it also experienced a partial degradation that caused 10% of requests to fail. However, its owner detected the outage via their own tooling and decided to manually fail over at 10:05:00. This Namespace achieved a recovery time of 5 minutes and a service error rate of ( 1 * (1 - 10%) + 8927 * 100% ) / 8928 = 99.998%. Graceful failover was successful, and this Namespace achieved a recovery point of 0.

- Namespace 2_A was in the region and its cell was fully network partitioned at the start of the outage, causing 100% of requests to fail. Since it was significantly impacted from 10:00:00 to 10:15:00, its Recovery Time was 15 minutes. If it had no other service errors that month, then its service error rate for the month would be: ( 3 * (1 - 100%) + 8928 * 100% ) / 8640 5-minute periods per month = 99.97%. Because the Namespace was network partitioned, graceful failover did not succeed, and forced failover was used. The recovery point achieved was equal to the replication lag at the time of the network partition, which was a few seconds.

- Namespace 2_B was in the region and was fully network partitioned, causing 100% of requests to fail. However, its owner detected the outage via their own tooling and decided to manually fail over at 10:05:00. This Namespace achieved a recovery time of 5 minutes and a service error rate of ( 1 5-minute periods * (1 - 100%) + 8639 5-minute periods * 100% ) / 8640 5-minute periods per month = 99.99%. Because the Namespace was network partitioned, graceful failover did not succeed, and forced failover was used. The recovery point achieved was equal to the replication lag at the time of the network partition, which was a few seconds.

All of the above Namespaces were in the affected region and beat the 1-minute RPO. But they achieved varying recovery times and service error rates. 

- Notice how Namespace 1_A and Namespace 2_A were both automatically failed over with **the same recovery time but different service error rates**. Notice how Namespace 2_B and Namespace 1_A happen to have the **same service error rate but different recovery times**. This illustrates how RTO and SLA can differ, even in the same outage. Both are valuable tools for Temporal Cloud users to measure the availability of their Namespaces.

- Notice how the Namespaces that were manually failed over (Namespace 1_B and Namespace 2_B) achieved lower recovery times than the Namespaces that were automatically failed over (Namespace 1_A and Namespace 2_A). This illustrates how **proactive, aggressive manual failover can achieve a better recovery time than automatic failover**. 
