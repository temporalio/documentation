--
id: list-partition
title: tctl taskqueue list-partition
description: How to list Task Queue partitions and the hostname for partitions using tctl.
tags:

- reference
- tctl

---

<!-- prettier-ignore -->
import * as WhatIsATaskQueue from '/docs/content/what-is-a-task-queue.md'

The `tctl taskqueue list-partition` command lists the partitions of a <preview page={WhatIsATaskQueue}>Task Queue</preview> and the hostname for the partitions.

`tctl taskqueue list-partition <options> <arguments...>`

The following option modifies the behavior of the command.

### `taskqueue`

How to specify a <preview page={WhatIsATaskQueue}>Task Queue</preview>.

Alias: `--tq`

**Example**

```
tctl taskqueue list-partition --taskqueue <value>
```
