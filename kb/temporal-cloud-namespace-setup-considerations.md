---
slug: cloud-namespace-naming-considerations
title: Temporal Cloud Namespace naming considerations
tags:
  - cloud
  - namespaces
date: 2023-04-20T00:00:00Z
---

This article provides general guidance for organizing [Namespaces](/namespaces) across use cases, services, applications, or domains.
Temporal Cloud provides Namespace–as-a-service, so the Namespace is the endpoint.
Customers should consider not only a Namespace naming convention but also how to group or isolate workloads using the Namespace as a boundary.

<!-- truncate -->

## Constraints and limitations

Before considering an appropriate Namespace configuration, you should be aware of the following constraints:

- Each Temporal account has a default limit of 10 Namespaces.
  You can request an increase by [creating a ticket for Temporal Support](/cloud/how-to-create-a-ticket-for-temporal-support).
- Cross-Namespace communications between [Workflows](/workflows) is not yet supported.
  For now, you can use the [SDK client](/temporal#temporal-client) from within an [Activity](/activities) as a workaround.
- Each Namespace has a rate limit ("throttling").
  The default rate limit is 200 Actions per second but can be increased via a support ticket.
- Each Namespace has a service-level agreement (SLA) of 99.9% uptime.
- For now, Namespaces are single-region only.
- A Namespace is a security isolation boundary.
  Access to Temporal by [Worker Processes](/workers#worker-process) is permitted at the Namespace level.
  Isolating applications or environments (development, test, staging, production) should take this into consideration.
- A Namespace is an endpoint.
  To access a Namespace from a Temporal Client requires mTLS authorization, which requires [CA certificates](cloud/how-to-manage-certificates-in-temporal-cloud#ca-certificates).
- [Workflow Id](/workflows#workflow-id) uniqueness is per Namespace.
- [Task Queue](/workers#task-queue) names are unique per Namespace.
- Closed Workflow retention is per Namespace.
- RBAC [permissions](/cloud/#namespace-level-permissions) are implemented at the Namespace level.

## General Guidance

Namespace configuration requires some consideration.
Following are some general guidelines to consider.

- Namespaces are usually defined per use case.
  A use case can encompass a broad range of Workflow types and a nearly unlimited scale of concurrent [Workflow Executions](/workflows#workflow-execution).
- Namespaces can be split along additional boundaries such as service, application, domain or even sub-domain.
- Environments such as production and development usually have requirements for isolation.
  We recommend that each environment has its own Namespace.
- Namespaces should be used to reduce the "blast radius" for mission-critical applications.
- Workflows that need to communicate with each other should (for now) be in the same Namespace.
- If you need to share Namespaces across team or domain boundaries, be sure to ensure the uniqueness of Workflow Ids.

## Examples

Following are some ideas about how to organize Namespaces.

### Example 1: Namespace per use case and environment

We recommend using one Namespace for each use case and environment combination for simple configurations in which multiple services and team or domain boundaries don't exist.

Sample naming convention:

<pre>
&lt;use-case>_&lt;environment>
</pre>

### Example 2: Namespace per use case, service, and environment

We recommend using one Namespace for each use case, service, and environment combination when multiple services that are part of same use case communicate externally to Temporal via API (HTTP/gRPC).

Sample naming convention:

<pre>
&lt;use-case>_&lt;service>_&lt;environment>
</pre>

### Example 3: Namespace per use case, domain, and environment

We recommend using one namespace per use case, domain, and environment combination when multiple services that are part of the same use case need to communicate with each another via [Signals](/workflows#signal) or by starting [Child Workflows](/workflows#child-workflow).
In this case, though, you must be mindful about Workflow Id uniqueness by prefixing each Workflow Id with a service-specific string.
The name of each Task Queue must also be unique.
If multiple teams are involved, the domain could also represent a team boundary.

Sample naming convention:

<pre>
&lt;use-case>_&lt;domain>_&lt;environment>
</pre>

Sample workflowId convention:

<pre>
&lt;service-string>_&lt;workflow-id>
</pre>
