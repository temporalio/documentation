---
id: what-is-a-workflow-type
title: What is a Workflow Type?
description: A Workflow Type is a name that maps to a Workflow Definition.
tags:
  - question
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Type is a name that maps to a Workflow Definition.

A single Workflow Type can be instantiated as multiple Workflow Executions.

While not recommended, Workflow Definitions in different languages _could be_ registered as the same Workflow Type. Though it is strictly implied that these Workflow Definitions would have the same input parameters, provide the same result type, and perform the same exact logical operations.

However it is common to have multiple Workflow Definitions in the same language represent different versions of a Workflow Type.

<CenteredImage
imagePath="/diagrams/workflow-type-cardinality.svg"
imageSize="75"
title="Workflow Type cardinality with Workflow Definitions and Workflow Executions"
/>
