---
id: activity-return-values
title: How to define Activity return values
sidebar_label: Activity return values
description: All data returned from an Activity must be serializable.
tags:
  - guide-context
---

All data returned from an Activity must be serializable.

There is no explicit limit to the amount of data that can be returned by an Activity, but keep in mind that all return values are recorded in a [Workflow Execution Event History](/concepts/what-is-an-event-history).
