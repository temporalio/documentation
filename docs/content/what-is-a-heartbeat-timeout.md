---
id: what-is-a-heartbeat-timeout
title: What is a Heartbeat Timeout?
description: A Heartbeat Timeout is the maximum time between Activity Heartbeats.
tags:
  - explanation
  - timeouts
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Heartbeat Timeout is the maximum time between [Activity Heartbeats](/docs/content/what-is-an-activity-heartbeat).

<CenteredImage
imagePath="/diagrams/heartbeat-timeout.svg"
imageSize="75"
title="Heartbeat Timeout periods"
/>

If this timeout is reached, the Activity Execution changes to a [Failed](#) status, and will retry if a Retry Policy dictates it.

<RelatedReadList
readlist={[
["How to set a Heartbeat Timeout in Go","/docs/go/how-to-set-activityoptions-in-go/#heartbeattimeout","developer guide"],
]}
/>
