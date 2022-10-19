---
id: create
title: tctl search-attribute create
sidebar_label: create
description: How to create Search Attributes using tctl.
tags:
  - tctl
---

The `tctl search-attribute create` command adds one or more custom Search Attributes.

```bash
tctl search-attribute create \
    --yes \
    --name CustomKeywordField --type Keyword \
    --name CustomStringField --type Text \
    --name CustomTextField --type Text \
    --name CustomIntField --type Int \
    --name CustomDatetimeField --type Datetime \
    --name CustomDoubleField --type Double \
    --name CustomBoolField --type Bool \
    --name SimulatedFailure --type Bool
```
