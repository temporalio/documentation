---
id: what-is-an-activity-execution
title: What is an Activity Execution?
description: An Activity Execution is the full chain of Activity Task Executions.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as HowToSpawnAnActivityExecutionInGo from '../go/how-to-spawn-an-activity-execution-in-go.md'

An Activity Execution is the full chain of [Activity Task Executions](/docs/content/what-is-an-activity-task-execution).

<CenteredImage
imagePath="/diagrams/activity-execution.svg"
imageSize="50"
title="Activity Execution"
/>

<CenteredImage
imagePath="/diagrams/activity-execution-with-retry.svg"
imageSize="100"
title="Activity Execution with retries"
/>

Temporal guarantees that Activities are executed _at least once_.

<RelatedReadContainer>
  <RelatedReadItem page={HowToSpawnAnActivityExecutionInGo} />
</RelatedReadContainer>
