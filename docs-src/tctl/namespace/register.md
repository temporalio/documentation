---
id: register
title: tctl namespace register
sidebar_label: register
description: How to register a Namespace using tctl.
tags:
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

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--active-cluster](/tctl/modifiers/active-cluster)
- [--clusters](/tctl/modifiers/clusters)
- [--description](/tctl/modifiers/description)
- [--global-namespace](/tctl/modifiers/global-namespace)
- [--history-archival-state](/tctl/modifiers/history-archival-state)
- [--history-uri](/tctl/modifiers/history-uri)
- [--namespace-data](/tctl/modifiers/namespace-data)
- [--owner-email](tcvtl/modifiers/owner-email)
- [--retention](/tctl/modifiers/retention)
- [--visibility-archival-state](/tctl/modifiers/visibility-archival-state)
- [--visibility-uri](/tctl/modifiers/visibility-uri)
