---
id: register
title: tctl namespace register
sidebar_label: register
description: How to register a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace register` command registers a [Namespace](/concepts/what-is-a-namespace).

`tctl namespace register`

By default, Temporal uses a "default" Namespace.
Create and register a new Namespace with the following command:

```bash
tctl --namespace your-namespace namespace register
# OR using short alias
tctl --ns your-namespace n re
```

The following modifiers control the behavior of the command.

<!--ActiveCluster-->

import AC from '../../references/modifiers/active-cluster.md'

<AC />

<!--Clusters-->

import Clusters from '../../references/modifiers/clusters.md'

<Clusters />

<!--Description-->

import Description from '../../references/modifiers/description.md'

<Description />

<!--GlobalNamespace-->

import GN from '../../references/modifiers/global-namespace.md'

<GN />

<!--HistoryArchivalState-->

import HAS from '../../references/modifiers/history-archival-state.md'

<HAS />

<!--HistoryUri-->

import HURI from '../../references/modifiers/history-uri.md'

<HURI />

<!--NamespaceData-->

import ND from '../../references/modifiers/namespace-data.md'

<ND />

<!--OwnerEmail-->

import OwnerEmail from '../../references/modifiers/owner-email.md'

<OwnerEmail />

<!--Retention-->

import Retention from '../../references/modifiers/retention.md'

<Retention />

<!--VisibilityArchivalState-->

import VAS from '../../references/modifiers/visibility-archival-state.md'

<VAS />

<!--VisibilityUri-->

import VURI from '../../references/modifiers/visibility-uri.md'

<VURI />
