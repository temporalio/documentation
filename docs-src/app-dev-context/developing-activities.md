---
id: developing-activities
title: How to develop a basic Activity
description: One of the primary things that Workflows do is orchestrate the execution of Activities.
sidebar_label: Develop Activities
tags:
  - guide-context
---

One of the primary things that Workflows do is orchestrate the execution of Activities.
An Activity is a normal function or method execution that's intended to execute a single, well-defined action (either short or long-running), such as making a calculation, calling a third-party API, or transcoding a media file.
An Activity can interact with world outside the Temporal Platform or use a Temporal Client to interact with a Cluster.
For the Workflow to be able to execute the Activity, we must define the [Activity Definition](/concepts/what-is-an-activity-definition).
