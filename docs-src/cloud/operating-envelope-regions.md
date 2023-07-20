---
id: operating-envelope-regions
title: Where is Temporal Cloud hosted and running?
sidebar_label: Regions
description: Temporal Cloud currently runs in 10 regions in AWS.
tags:
  - Operations concept
  - Location
  - Explanation archetype
---

Temporal Cloud currently runs in 10 regions in Amazon Web Services (AWS).
Although Temporal Cloud currently runs only on AWS, it works with applications running in any cloud or data center.

To reduce latency, we recommend that you create your [Namespace](/concepts/what-is-a-namespace) in a region that is geographically close to where your [Workers](/concepts/what-is-a-worker) are hosted, but your Workers and [Client](/concepts/what-is-a-temporal-client) code don't need to be hosted on AWS.
