---
id: what-is-a-heartbeat-timeout
title: What is a Heartbeat Timeout?
description: todo
---

import CenteredImage from "../components/CenteredImage.js"

A Heartbeat Timeout is the maximum time between [Activity Heartbeats](/docs/content/what-is-an-activity-heartbeat).

<CenteredImage
imagePath="/diagrams/heartbeat-timeout.svg"
imageSize="100"
title="Heartbeat Timeout periods"
/>

If this timeout is reached, the Activity Execution changes to a [Failed](#) status, and will retry if a Retry Policy dictates it.
