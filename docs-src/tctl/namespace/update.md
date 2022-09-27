---
id: update
title: tctl namespace update
sidebar_label: update
description: How to update a Namespace using tctl.
tags:
  - tctl
---

The `tctl namespace update` command updates a [Namespace](/concepts/what-is-a-namespace).

`tctl namespace update`

The following modifiers control the behavior of the command.

### `--active-cluster`

Specify the name of the active [Temporal Cluster](/concepts/what-is-a-temporal-cluster/) when updating a [Namespace](/concepts/what-is-a-namespace).

Alias: `--ac`

**Example**

```bash
tctl namespace update --active-cluster <value>
```

### `--add-bad-binary`

Add a binary checksum to use when resetting a [Workflow Execution](/concepts/what-is-a-workflow-execution).
Temporal will not dispatch any [Commands](/concepts/what-is-a-command) to the given binary.

See also [`--remove-bad-binary`](#--remove-bad-binary).

**Example**

```bash
tctl namespace update --add-bad-binary <value>
```

<!--Clusters-->

import Clusters from '../../tctl/modifiers/clusters.md'

<Clusters />

<!--Description-->

import Description from '../../tctl/modifiers/description.md'

<Description />

<!--HistoryArchivalState-->

import HAS from '../../tctl/modifiers/history-archival-state.md'

<HAS />

<!--HistoryUri-->

import HURI from '../../tctl/modifiers/history-uri.md'

<HURI />

<!--NamespaceData-->

import ND from '../../tctl/modifiers/namespace-data.md'

<ND />

<!--OwnerEmail-->

import OwnerEmail from '../../tctl/modifiers/owner-email.md'

<OwnerEmail />

### `--promote-namespace`

Converts a local Namespace into a global Namespace.

**Example**

```bash
tctl namespace update --promote-namespace <value>
```

<!--Reason-->

import Reason from '../../tctl/modifiers/reason.md'

<Reason />

### `--remove-bad-binary`

Remove a binary checksum.

See also [`--add-bad-binary`](#--add-bad-binary).

**Example**

```bash
tctl namespace update --remove-bad-binary <value>
```

<!--Retention-->

import Retention from '../../tctl/modifiers/retention.md'

<Retention />

<!--VisibilityArchivalState-->

import VAS from '../../tctl/modifiers/visibility-archival-state.md'

<VAS />

<!--VisibilityUri-->

import VURI from '../../tctl/modifiers/visibility-uri.md'

<VURI />
