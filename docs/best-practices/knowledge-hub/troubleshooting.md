---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
description: How to observe and troubleshoot Temporal Workflows and Workers across environments.
toc_max_heading_level: 3
keywords:
  - temporal troubleshooting
  - temporal debugging
  - temporal observability
  - temporal alerts
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

:::note
Define the escalation path so developers know how to get help when issues arise.
:::

This article documents how to observe and troubleshoot Temporal Workflows and Workers across environments (i.e. `dev`, `prd`).

## Detection

The first step to troubleshooting is collecting Temporal Workflow telemetry and understanding the issue.

:::note
Link to your monitoring dashboard so developers can self-diagnose Workflow issues.
:::

At ABC Financial, the following observability tools are supported for Temporal Cloud:

| Tool | Purpose | What it answers |
| :---- | :---- | :---- |
| [Temporal Cloud UI](https://cloud.temporal.io/) | Source of truth for Temporal Workflow Event History, status, and traces.  | *What happened to the Workflow?*  *What is the current Workflow status?* |
| Grafana | Provides a single-pane-of-glass monitoring for logs, metrics, and traces across ABC Financial applications.  | *Are the Workers healthy and sufficiently scaled?*  *What happened to the upstream and downstream services?* |

### Gather context

Before troubleshooting, collect this information:

* **Namespace:** Which Temporal Cloud namespace?
* **Workflow ID:** Specific Workflow instance(s) affected
* **Time window**: When did the issue start? Is it ongoing or intermittent?
* **Recent changes**: Any recent deployments or configuration updates?
* **Impact Scope**: Single Workflow, specific Workflow Type, or entire Namespace?

### Quick health checks

Perform these checks before detailed investigation:

1. **Is Temporal Cloud healthy?**
   1. Check [status.temporal.io](https://status.temporal.io).
2. **Are Workers healthy?**
   1. Grafana → Infrastructure → Filter by `service:temporal`
3. **Are there recent deployments?**
   1. Check Slack channel.

## Respond

:::note
Add runbooks for common issues so developers can resolve problems independently.
:::

### Common issues and troubleshooting steps

#### 1. Workflow not starting

**Symptoms**: Workflow appears in Temporal Cloud UI as `Running`, but the Workflow is not executing.

**Troubleshooting**:

1. **Check Worker Registration**
   * Datadog → Logs → Filter: `service:temporal "Registered workflow"`
   * Verify your Workflow Type appears in Worker startup logs
2. **Verify Task Queue**
   * Temporal UI → Search for Workflows on your Task Queue
   * Confirm Task Queue name matches exactly (case-sensitive) between Temporal Client and Worker
3. **Check Client Connection**
   * Datadog → Filter by your application service name
   * Search for: `"Temporal"` AND `"connection"` OR `"authentication"`
   * Look for API key or connection errors

**Fix**:

* Redeploy Worker if Workflow not registered.
* Correct Task Queue name mismatch in code.
* Contact Temporal Platform team for API key issues.

## Escalation

:::note
Define escalation procedures and contact information for the platform team.
:::

Escalate to the Temporal platform team when the issue persists after following the troubleshooting steps above.

Include the following information in your request:

```
1. Temporal Cloud Namespace
2. Workflow ID(s) and time window
3. Description of the issue
4. Context collected (from the Detection section)
5. Troubleshooting steps already attempted
6. Other helpful information (e.g. screenshots)
```

### Response time SLA

:::note
Set response time expectations so developers know when to expect help.
:::

* P1 (Production outage): 30 minutes
* P2 (Degraded performance): 4 hours
* P3 (Non-urgent issues): 1 business day

## Alerts

It is the application team's responsibility to detect Temporal issues. Hence, it is recommended that you create appropriate alerts to proactively catch issues early.

:::note
Add alert examples that developers can copy for their Workflows.
:::

Here are some example alerts:

| Alert name | Metric  | Condition | Channel |
| :---- | :---- | :---- | :---- |
| High Workflow failure rate | `temporal.workflow.failed` | > 10% failure rate over 10 minutes | Page |
| High Activity Schedule-to-Start latency | `temporal.activity.schedule_to_start_latency` (p95) | > 30 seconds for 15 minutes | Slack |
| High Worker CPU utilization | `kubernetes.cpu.usage.pct` | > 80% for 10 minutes | Slack |

## Need help?

:::note
Specify the Slack channel or support portal for developers to reach the platform team.
:::

* Learn [how the Temporal platform can support you](./support.md).
* Reach out to the Temporal platform team via Slack.
