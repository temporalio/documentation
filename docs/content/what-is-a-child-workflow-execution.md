---
id: what-is-a-child-workflow-execution
title: What is a Child Workflow Execution?
description: A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

A Parent Workflow Execution can monitor and impact the life-cycle of a Child Workflow Execution.

<CenteredImage
imagePath="/diagrams/parent-child-workflow-execution.svg"
imageSize="75"
title="Parent & Child Workflow Execution relationship"
legendstring="π?Workflow Execution|
p?Parent|
c?Child"
/>

A Workflow Execution can be both a Parent and a Child Workflow Execution.
A Child Workflow Execution can return to the Parent.
A single Parent can spawn as many Child Workflow Executions as needed.

<RelatedReadList
readliststring="How to spawn a Child Workflow Execution in Go?/docs/content/how-to-spawn-a-child-workflow-execution-in-go?dg"
/>
