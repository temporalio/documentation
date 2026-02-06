---
id: capacity-modes
title: Capacity modes
sidebar_label: Capacity modes
description: Control how limits are assigned to a Namespace with Capacity Modes
slug: /cloud/capacity-modes
toc_max_heading_level: 4
keywords:
  - explanation
  - how-to
  - operations
  - temporal cloud
  - namespaces
  - capacity modes
  - on-demand capacity 
  - provisioned capacity
  - actions per second
  - operations per second
  - requests per second
  - throttling
  - temporal resource units
  - trus
tags:
  - Capacity Modes
  - On-Demand Capacity
  - Provisioned Capacity
  - TRUs
---

Each Namespace in Temporal has a rate limit, which is measure in [Actions](/cloud/pricing#action) per second. 
Temporal offers two different modes for adjusting capacity: On-Demand Capacity or Provisioned Capacity.
With On-Demand Capacity, Namespace capacity is increased automatically along with usage.
With Provisioned Capacity, you can control your capacity limits by requesting Temporal Resource Units (TRUs).

## Namespace Capacity

Namespaces in Temporal can be set to either an **On-Demand** or **Provisioned Capacity** Mode. 
These modes govern how limits are assigned to a Namespace.  

Actions Per Second (APS) is the primary limit for Namespaces and is based on the operating billable Actions that occur each second.
Some Actions can result in multiple back-end operations, so limits are also set on Requests Per Second (RPS) and Operations Per Second (OPS) to maintain reliability.

See [Service-level RPS limits](/references/dynamic-configuration#service-level-rps-limits) for more about RPS.
See the [operations list](/references/operation-list) for the list of operations.
See the [Actions page](/cloud/actions) for the list of actions.

:::tip Measuring throughput with APS, RPS, and OPS

APS, RPS, and OPS are all measures of throughput that apply to different aspects of Temporal.

APS, or Actions Per Second, is specific to Temporal Cloud. 
It measures the rate at which Actions, like starting or signaling a Workflow, can be performed in a specific Namespace. 
Temporal Cloud uses APS to protect the system from sudden major spikes in load. 

RPS, or Requests Per Second, is used in the Temporal Service, both in self-hosted Temporal and Temporal Cloud. 
It measures and controls the rate of gRPC requests to the Service. 
This is a lower-level measure that manages rates at the service level. 

OPS, or Operations per Second, is used by Temporal Cloud. 
An operation is anything a user does directly, or that Temporal does on behalf of the user in the background, that results in load on Temporal Server. 
This is a lower-level measure that manages rates across Temporal cloud services.

In summary, APS is a higher-level measure to limit and mitigate Action spikes in Temporal Cloud. 
RPS and OPS  are lower-level measures to control and balance request rates at the service level.

:::

### What happens when my Actions Rate exceeds my Limit?

When your Action rate exceeds your quota, Temporal Cloud throttles Actions.
Throttling limits the rate at which Actions are performed to prevent the Namespace from exceeding its APS limit.

**How throttling works:**
- Low-priority operations are throttled first; higher-priority operations (like starting or signaling Workflows) continue when possible.
- Rate limiting is not instantaneous, so usage may briefly exceed your limit before throttling takes effect.
- When throttled, the server returns `ResourceExhausted` errors that SDK clients automatically retry.
- If throttling persists beyond the SDK's retry limit, client calls can fail.

**To avoid data loss during throttling:**
- Log any failed client calls (with payloads) so you can retry or backfill later.
- Set up [limit metrics](/cloud/metrics/openmetrics/metrics-reference#limit-metrics) to alert when approaching your limits.

See [Throttling behavior](/cloud/limits#throttling-behavior) for more details.

Your rate limits can be adjusted automatically over time or provisioned manually with Capacity Modes.

We recommend tracking your Actions Rate and Limits using Temporal metrics to assess your use cases specific needs.
See [Monitoring Trends Against Limits](/cloud/service-health#rps-aps-rate-limits) to track usage trends.

:::note Actions that don't count against APS
Actions that are external to the core Temporal service do not contribute to your APS. These Calls include:
* [Export](/cloud/export)
* Capacity Related Actions
:::

## On-Demand Capacity {#on-demand-capacity}

Using On-Demand Capacity, your rate limit grows automatically along with your usage. 


|               | Actions Per Second | Requests Per Second | Operations Per Second|
|---------------|--------------------|---------------------|----------------------|
| Default Limit | 500                | 2000                | 4000                 |


Scaling automatically adjusts based on the lesser of 4 * APS Average or 2 * APS P90 over the past 7 days.

If you experience usage spikes, you may hit a throughput limit. 
In that case, consider switching to [Provisioned Capacity](#provisioned-capacity). 
You can also optimize your workload to remain under the On-Demand limits. See [Best Practices for Managing APS Limits](/best-practices/managing-aps-limits) for more information. 

### What kind of throughput can I get on Temporal Cloud with On-Demand Capacity?

Each Namespace has a rate limit, which is measured in Actions per second (APS). 
A Namespace's default limit is set at 500 APS and automatically adjusts based on a formula that compares your average usage over the last 7 days and your usage at the 90th percentile, or P90. 
Your throughput limit will never fall below the default value. 
Under On-Demand capacity you are only charged for the Actions you use.

For example: If your average APS in the last 7 days was 200 APS, and your P90 was 500 APS, then your limit would be calculated as follows:
Greater of:
* Default limit of 500 APS
* The lesser of:
  * 4 * 200 APS Mean = 800 APS
  * 2 * 500 APS P90 = 1000 APS

This means that your default limit would be 800 APS.

![Usage graph showing increasing APS usage for one month, with occasional spikes, and a rising APS limit](/img/cloud/provisioned-capacity/usage_graph.png)

## Provisioned Capacity {#provisioned-capacity}

:::tip Support, stability, and dependency info

Provisioned Capacity is currently in [pre-release](/evaluate/development-production-features/release-stages#pre-release). 
Please contact your AE or Support to enable this feature.

:::

Provisioned Capacity provides an alternative to On-Demand Capacity by allowing you to control the limits on your Namespace based on your specific need.

|               | Actions Per Second | Requests Per Second | Operations Per Second|
|---------------|--------------------|---------------------|----------------------|
| TRU           | 500                | 2000                | 4000                 |

Customers can set 2, 3, 4, 6, 8, 10, 12 TRUs, subject to availability. TRUs can be adjusted hourly.

See [Capacity Mode Pricing](/cloud/pricing#capacity-modes-pricing) for pricing implications.

### What kind of throughput can I get with Temporal Cloud with Provisioned Capacity?

With Provisioned Capacity, you can set your rate limits by selecting the number of Temporal Resource Units (TRUs) on your Namespace.
Each TRU supports up to 500 APS and can be provisioned in groups of 2, 3, 4, 6, 8, 10, or 12 TRUs if there is capacity available in a region. 
When TRUs are requested we aim to provision the additional capacity within two minutes. 

:::tip Large TRU requests

For Requests in excess of 4 TRUs in regions outside of the US, we recommend submitting a support ticket to ensure capacity availability.

:::

### Provisioned Capacity Availability
The amount of capacity available within a region may vary. 
Temporal will check available capacity at the time of your request and aims to provision requested capacity within two minutes. 
If you need capacity beyond what is self-serviceable or available in a region, please [file a support ticket](https://docs.temporal.io/cloud/support#ticketing) indicating the limit, region, and timeframe that the capacity is needed. 


### When should I use Provisioned Capacity?

Provisioned Capacity works well when you’re aware of specific increases in load on your Namespace. For example:

* Planned events
* Unplanned events/usage spikes
* Known but sudden system spikes
* Load testing
* Migrating workloads

Depending on your usage patterns and your system monitoring, you can use Provisioned Capacity to quickly remedy rate limiting without contacting support.
You can also automate changes in capacity if you have a known event or a recurring usage pattern that produces predictable usage spikes. 

## Setting Capacity Modes
Capacity Modes and TRUs can be set via the Temporal Cloud UI, CLI, or API. 
Capacity modes can be set and adjusted by Global Admin and Namespace Admin. 

### Setting Capacity Modes from the UI

You can set Capacity Modes for an individual Namespace by navigating to the Namespace page in the Temporal Cloud UI (`https://cloud.temporal.io/namespaces/<Namespace ID>`). 
To view your current capacity configuration and change your capacity mode, navigate to the capacity tile and click *Manage Capacity*.

![Manage Capacity button in the Temporal UI](/img/cloud/provisioned-capacity/manage_capacity_button.png)

Under *Manage Capacity* you will be able to select between *On-Demand* and *Provisioned Capacity* modes. 
The *On-Demand* section will display your available On-Demand capacity. 
The *Provisioned* section will display the limit available with selected TRUs and the Included Actions required per hour. [See details on Provisioned Capacity Pricing](/cloud/pricing#capacity-modes-pricing). 

To switch to Provisioned capacity: 

1. Select the *Provisioned* radio button.
1. Specify the requested number of TRUs using the slider.
1. Check the dialog acknowledging potential pricing implications.
1. Click *Confirm*. 

In addition to the Capacity Mode selections, a summary of APS usage over the last seven days is included to help you estimate your current usage. 
For more detailed information, we recommend setting up metrics that track your APS and Limits. 
See [Monitoring Trends Against Limits](/cloud/service-health#rps-aps-rate-limits) to track usage trends.

![Manage Capacity panel in the Temporal UI](/img/cloud/provisioned-capacity/manage_capacity_panel.png)

### Setting Capacity Modes from the CLI

```command
tcld namespace capacity update --namespace <namespace_name> --capacity-mode <on_demand|provisioned> --capacity-value <tru value> [--request–id <request_id> --resource-version <resource-version>]
```

Use this command to specify the Namespace name and configure the capacity settings:

* `--capacity-mode` sets the billing mode for the Namespace. Use `on_demand` for automatic scaling or `provisioned` for a fixed capacity allocation.
* `--capacity-value` sets the throughput value in TRUs (Temporal Resource Units).

Optional flags:

* `--request-id` specifies a request identifier for the asynchronous operation. If not specified, the server assigns one automatically.
* `--resource-version` specifies the resource version (etag) to update from. If not set, the CLI uses the latest version.

If using API key authentication with the `--api-key` flag, you must add it directly after the tcld command and before capacity update.

### Setting Capacity Modes from the API

Call the `UpdateNamespace` API after Namespace creation and define the desired capacity state as part of the capacity spec.
