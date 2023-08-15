---
id: operating-envelope-regions
title: Where is Temporal Cloud hosted and running?
sidebar_label: Regions
description: Temporal Cloud currently runs in 10 regions in AWS.
tags:
  - operations
  - temporal cloud
  - explanation
---

Temporal Cloud currently runs in 10 regions in Amazon Web Services (AWS):

| Code           | Region                   |
| -------------- | ------------------------ |
| ap-northeast-1 | Asia Pacific (Tokyo)     |
| ap-southeast-1 | Asia Pacific (Singapore) |
| ap-southeast-2 | Asia Pacific (Sydney)    |
| ca-central-1   | Canada (Central)         |
| eu-central-1   | EU (Frankfurt)           |
| eu-west-1      | EU (Ireland)             |
| eu-west-2      | EU (London)              |
| us-east-1      | US East (N. Virginia)    |
| us-east-2      | US East (Ohio)           |
| us-west-2      | US West (Oregon)         |

Furthermore, it is compatible with applications deployed in any cloud environment or data center.

To reduce latency, we recommend that you create your [Namespace](/concepts/what-is-a-namespace) in a region that is geographically close to where your [Workers](/concepts/what-is-a-worker) are hosted, but your Workers and [Client](/concepts/what-is-a-temporal-client) code don't need to be hosted on AWS.
