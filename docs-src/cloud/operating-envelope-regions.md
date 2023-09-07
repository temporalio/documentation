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

Temporal Cloud currently runs in 11 regions in Amazon Web Services (AWS):

| Area          | Code           | Region            |
| ------------- | -------------- | ----------------- |
| Asia Pacific  | ap-northeast-1 | Tokyo             |
| Asia Pacific  | ap-south-1     | Mumbai            |
| Asia Pacific  | ap-southeast-1 | Singapore         |
| Asia Pacific  | ap-southeast-2 | Sydney            |
| Europe        | eu-central-1   | Frankfurt         |
| Europe        | eu-west-1      | Ireland           |
| Europe        | eu-west-2      | London            |
| North America | ca-central-1   | Central Canada    |
| North America | us-east-1      | Northern Virginia |
| North America | us-east-2      | Ohio              |
| North America | us-west-2      | Oregon            |

Furthermore, it is compatible with applications deployed in any cloud environment or data center.

To reduce latency, we recommend that you create your [Namespace](/concepts/what-is-a-namespace) in a region that is geographically close to where your [Workers](/concepts/what-is-a-worker) are hosted, but your Workers and [Client](/concepts/what-is-a-temporal-client) code don't need to be hosted on AWS.
