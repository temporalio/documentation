---
id: how-to-develop-an-activity-definition-in-java
title: How to develop an Activity Definition in Java
sidebar_label: Activity Definition
description: In the Temporal Java SDK programming model, Activities are classes which implement the Activity Interface.
tags:
  - java
  - developer-guide
---

An [Activity Definition](/docs/concepts/what-is-an-activity) is a combination of the Temporal Java SDK [Activity](https://www.javadoc.io/static/io.temporal/temporal-sdk/0.19.0/io/temporal/activity/Activity.html) Class implementing a specially annotated interface.

An Activity definition constitutes an Activity interface and the Activity implementation that implements the interface.
You can also directly implement a dynamic Activity to handle Activity types that do not have an explicitly registered handler.
