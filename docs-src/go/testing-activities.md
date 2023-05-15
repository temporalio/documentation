---
id: testing-activities
title: Testing Activities
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test Activities
tags:
  - guide-context
---

An Activity can be tested with a mock Activity environment, which provides a way to mock the Activity context, listen to Heartbeats, and cancel the Activity.
This behavior allows you to test the Activity in isolation by calling it directly, without needing to create a Worker to run the Activity.
