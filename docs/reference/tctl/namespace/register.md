---
id: register
title: tctl namespace register
sidebar_label: register
description: How to register a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace register` command registers a Namespace.

`tctl namespace describe`

The following modifiers control the behavior of the command.

### `--active-cluster`

How to specify the name of the active cluster when registering a Namespace in tctl.

Alias: `--ac`

**Example**

```
tctl namespace register --active-cluster <name>
```

### `--clusters`

How to specify a list of clusters when registering a Namespace in tctl.

The list contains the names of clusters (separated by spaces) to which the Namespace can fail over.

This modifier is valid only when the `--global-namespace` modifier is set to true.

Alias `--cl`

**Example**

```
tctl namespace register --clusters <names>
```

### `--description`

How to specify a description when registering a Namespace in tctl.

Alias `--desc`

**Example**

```
tctl namespace register --description <value>
```

### `--global-namespace`

How to specify whether a Namespace is a Global Namespace.

Alias `--gd`

**Example**

```
tctl namespace register --global-namespace <boolean>
```

### `--history-archival-state`

How to set the History Archival state. Valid values are `disabled` and `enabled`.

Alias `--has`

**Example**

```
tctl namespace register --history-archival-state <value>
```

### `--history-uri`

How to specify the URI for History Archival. The URI cannot be changed after Archival is first enabled.

Alias `--huri`

**Example**

```
tctl namespace register --history-uri <uri>
```

### `--namespace-data`

How to specify data for a Namespace in the form of key-value pairs (such as `k1:v1,k2:v2,k3:v3`).

Alias `--dmd`

**Example**

```
tctl namespace register --namespace-data <data>
```

### `--owner-email`

How to specify the email address of the Namespace owner.

Alias `--oe`

**Example**

```
tctl namespace register --owner-email <value>
```

### `--retention`

How to specify the number of days to retain Workflow Executions. 

Alias `--rd`

**Example**

```
tctl namespace register --retention <value>
```

### `--visibility-archival-state`

How to set the visibility Archival state. Valid values are `disabled` and `enabled`.

Alias `--vas`

**Example**

```
tctl namespace register --visibility-archival-state <value>
```

### `--visibility-uri`

How to specify the URI for visibility Archival. The URI cannot be changed after Archival is first enabled.


Alias `--vuri`

**Example**

```
tctl namespace register --visibility-uri <uri>
```
