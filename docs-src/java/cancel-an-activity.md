---
id: cancel-an-activity
title: Cancelling an Activity
description: If an Activity should to react to Cancellation, you can test whether it reacts correctly by canceling it.
sidebar_label: Cancelling an Activity
tags:
  - guide-context
---

Activity Cancellation lets Activities know they don't need to continue work and gives time for the Activity to clean up any resources it's created. You can cancel Java-based activities if they emit Heartbeats. To test an Activity that reacts to Cancellations, make sure that the Activity reacts correctly and cancels.
