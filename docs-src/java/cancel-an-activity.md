---
id: cancel-an-activity
title: Cancel an Activity
description: If an Activity is supposed to react to Cancellation, you can test whether it reacts correctly by canceling it.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

Activity cancellation lets Activities know they don't need to continue work and gives time for the Activity to clean up any resources it's created. You can cancel Java-based activities if they emit Heartbeats. To test an Activity that reacts to Cancellations, make sure that the Activity reacts correctly and cancels.
