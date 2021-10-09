---
id: what-is-a-workflow-type
title: What is a Workflow Type?
description: A Workflow Type is a name that maps to a Workflow Definition.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

A Workflow Type is a name that maps to a Workflow Definition.

- A single Workflow Type can be instantiated as multiple Workflow Executions.
- A Workflow Type is scoped by a Task Queue.
  It is acceptable to have the same Workflow Type name map to different Workflow definitions if they are using completely different Workers.

<CenteredImage
imagePath="/diagrams/workflow-type-cardinality.svg"
imageSize="75"
title="Workflow Type cardinality with Workflow Definitions and Workflow Executions"
/>
