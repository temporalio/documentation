---
id: web
title: tctl dataconverter web
sidebar_label: web
description: How to specify the WebSocket URL of a custom Data Converter using tctl.
tags:
  - reference
  - tctl
---

The `tctl dataconverter web` command specifies the WebSocket URL of a custom [Data Converter](/docs/concepts/what-is-a-data-converter) to use with Temporal Web.

`tctl dataconverter web --web-ui-url <url>`

The following modifiers control the behavior of the command.

### `port`

Specify a port for the WebSocket URL of a custom [Data Converter](/docs/concepts/what-is-a-data-converter).
The default value is 0.

**Example**

```bash
tctl dataconverter web --web-ui-url <url> --port <value>
```

### `--web-ui-url`

_Required modifier_

Specify the WebSocket URL of a custom [Data Converter](/docs/concepts/what-is-a-data-converter).

**Example**

```bash
tctl dataconverter web --web-ui-url <url>
```
