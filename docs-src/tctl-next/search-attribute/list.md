---
id: list
title: tctl search-attribute list
sidebar_label: list
description: How to list Search Attributes using tctl.
tags:
  - tctl
---

The `tctl search-attribute list` command lists all [Search Attributes](/concepts/what-is-a-search-attribute) that can be used in the `--query` modifier of the [`tctl workflow list`](/tctl-next/workflow/list) command.

**Example:**

```bash
tctl search-attribute list
```

The command has no modifiers.

Example output:

```text
           Name               Type
BatcherNamespace            Keyword
BatcherUser                 Keyword
BinaryChecksums             Keyword
CloseTime                   Datetime
CustomBoolField             Bool
CustomDatetimeField         Datetime
CustomDoubleField           Double
CustomIntField              Int
CustomKeywordField          Keyword
CustomStringField           Text
CustomTextField             Text
ExecutionDuration           Int
ExecutionStatus             Keyword
ExecutionTime               Datetime
HistoryLength               Int
RunId                       Keyword
StartTime                   Datetime
StateTransitionCount        Int
TaskQueue                   Keyword
TemporalChangeVersion       Keyword
TemporalNamespaceDivision   Keyword
TemporalSchedulePaused      Bool
TemporalScheduledById       Keyword
TemporalScheduledStartTime  Datetime
WorkflowId                  Keyword
WorkflowType                Keyword
```
