---
id: how-to-set-registeractivityoptions-in-go
title: How to set RegisterActivityOptions in Go
sidebar_label: RegisterActivityOptions
description: TODO
tags:
  - developer-guide
---

Options for registering an activity

| Field | Required | Type |
| ----- | -------- | ---- |
| [`Name`](#name) | No | `string` |
| [`DisableAlreadyRegisteredCheck`](#disablealreadyregisteredcheck) | No | `bool` |
| [`SkipInvalidStructFunctions`](#skipinvalidstructfunctions) | No | `bool` |

### `Name`

- Type: `string`
- Default:

Sets the activity name (if other than function name needs to be set)

### `DisableAlreadyRegisteredCheck`

- Type: `bool`
- Default:

Sets if already registered check should be disabled | bool |

### `SkipInvalidStructFunctions`

- Type: `bool`
- Default:

Sets to panic or skip when registering struct with activities and are not valid | bool |
