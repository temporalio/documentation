---
id: web
title: tctl data-converter web
sidebar_label: web
description: How to specify the WebSocket URL of a custom Data Converter using tctl.
tags:
  - reference
  - tctl
---

The `tctl data-converter web` command specifies the WebSocket URL of a custom [Data Converter](/docs/content/what-is-a-data-converter) to use with Temporal Web.

`tctl data-converter web --web-ui-url <url>`

The following modifiers control the behavior of the command.

### `port`

How to specify a port for the WebSocket URL of a custom [Data Converter](/docs/content/what-is-a-data-converter).
The default value is 0.

**Example**

```
tctl data-converter web --web-ui-url <url> --port <value>
```

### `--web-ui-url`

_Required modifier_

How to specify the WebSocket URL of a custom [Data Converter](/docs/content/what-is-a-data-converter).

**Example**

```
tctl data-converter web --web-ui-url <url>
```
