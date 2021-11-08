---
id: what-is-the-temporal-platform
title: What is the Temporal Platform?
description: TODO
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

<!-- prettier-ignore -->
import * as WhatIsATemporalCluster from '../content/what-is-a-temporal-cluster.md'
import * as WhatIsAWorker from '../content/what-is-a-worker.md'

The Temporal Platform consists of a <preview page={WhatIsATemporalCluster}>Temporal Cluster</preview> and <preview page={WhatIsAWorker}>Worker Processes</preview>.
Together these components create a runtime for Workflow Executions.

<CenteredImage
imagePath="/diagrams/temporal-platform-simple.svg"
imageSize="75"
title="The Temporal Platform (runtime)"
/>

The Temporal Cluster is open source and can be operated by you.
The Temporal Cloud is a set of Clusters operated by us.

Worker Processes are hosted by you and execute your code.
They communicate with a Temporal Cluster via gRPC.
