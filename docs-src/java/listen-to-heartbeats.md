---
id: listen-to-heartbeats
title: Listen to Heartbeats
description: When an Activity sends a Heartbeat, be sure that you can see the Heartbeats in your test code so that you can verify them.
sidebar_label: Listen to Heartbeats
tags:
  - guide-context
---

Activities usually issue periodic Heartbeats, a feature that broadcasts recurring proof-of-life updates.
Each ping shows that an Activity is making progress and the Worker hasn't crashed.
Heartbeats may include details that report task progress in the event an Activity Worker crashes.

When testing Activities that support Heartbeats, make sure you can see those Heartbeats in your test code.
Provide appropriate test coverage.
This enables you to verify both the Heartbeat's content and behavior.
