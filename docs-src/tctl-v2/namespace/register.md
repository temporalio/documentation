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

- [--active-cluster](/tctl-v2/modifiers#--active-cluster)
- [--clusters](/tctl-v2/modifiers#--clusters)
- [--description](/tctl-v2/modifiers#--description)
- [--global-namespace](/tctl-v2/modifiers#--global-namespace)
- [--history-archival-state](/tctl-v2/modifiers#--history-archival-state)
- [--history-uri](/tctl-v2/modifiers#--history-uri)
- [--namespace-data](/tctl-v2/modifiers#--namespace-data)
- [--owner-email](tctl-v2/modifiers#--owner-email)
- [--retention](/tctl-v2/modifiers#--retention)
- [--visibility-archival-state](/tctl-v2/modifiers#--visibility-archival-state)
- [--visibility-uri](/tctl-v2/modifiers#--visibility-uri)
