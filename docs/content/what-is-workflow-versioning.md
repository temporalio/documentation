---
id: what-is-workflow-versioning
title: What is Workflow Versioning
description: TODO
tags:
  - explanation
---

The definition code of a Temporal Workflow must be deterministic because Temporal uses event sourcing
to reconstruct the Workflow state by replaying the saved history event data on the Workflow
definition code. This means that any incompatible update to the Workflow definition code could cause
a non-deterministic issue if not handled correctly.

Because we design for potentially long running workflows at scale, versioning with Temporal works differently than with other workflow systems. We explain more in this optional 30 minute introduction:

import { ResponsivePlayer } from '../../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=kkP899WxgzY' />
