--
id: describe
title: tctl taskqueue describe
description: How to operate Task Queues using tctl.
tags:

- reference
- tctl

---

<!-- prettier-ignore -->
import * as WhatIsATaskQueue from '/docs/content/what-is-a-task-queue.md'

The `tctl taskqueue describe` command describes the poller information of a <preview page={WhatIsATaskQueue}>Task Queue</preview>.

`tctl taskqueue describe <options> <arguments...>`

The following options modify the behavior of the command.

### `--taskqueue`

How to specify the description of the <preview page={WhatIsATaskQueue}>Task Queue</preview>.

Alias: `--tq`

**Example**

```
tctl taskqueue describe --taskqueue <value>
```

### `--taskqueuetype`

How to specify the type of the <preview page={WhatIsATaskQueue}>Task Queue</preview>. The type can be `workflow` or `activity`. The default is `workflow`.

Alias: `--tqt`

**Example**

```
tctl taskqueue describe --taskqueuetype <type>
```
