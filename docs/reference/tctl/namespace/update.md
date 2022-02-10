---
id: update
title: tctl namespace update
sidebar_label: update
description: How to update a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace update` command updates a Namespace.

`tctl namespace update`

The following modifiers control the behavior of the command.

### `--active-cluster`

How to specify the name of the active cluster when updating a Namespace in tctl.

Alias: `--ac`

**Example**

```
tctl namespace update --active-cluster <name>
```

### `--add-bad-binary`

How to add a binary checksum to use when resetting a Workflow Execution.

See also [`--remove-bad-binary`](#--remove-bad-binary).

**Example**

```
tctl namespace update --add-bad-binary <value>
```

### `--clusters`

How to specify a list of clusters when updating a Namespace in tctl.

The list contains the names of clusters (separated by spaces) to which the Namespace can fail over.

This modifier is valid only when the `--global-namespace` modifier is set to true.

Alias `--cl`

**Example**

```
tctl namespace update --clusters <names>
```

### `--description`

How to specify a description when updating a Namespace in tctl.

Alias `--desc`

**Example**

```
tctl namespace update --description <value>
```

### `--history-archival-state`

How to set the History Archival state. Valid values are `disabled` and `enabled`.

Alias `--has`

**Example**

```
tctl namespace update --history-archival-state <value>
```

### `--history-uri`

How to specify the URI for History Archival. The URI cannot be changed after Archival is first enabled.

Alias `--huri`

**Example**

```
tctl namespace update --history-uri <uri>
```

### `--namespace-data`

How to specify data for a Namespace in the form of key-value pairs (such as `k1:v1,k2:v2,k3:v3`).

Alias `--dmd`

**Example**

```
tctl namespace update --namespace-data <data>
```

### `--owner-email`

How to specify the email address of the Namespace owner.

Alias `--oe`

**Example**

```
tctl namespace update --owner-email <value>
```

### `--reason`

How to specify a reason for updating a Namespace.

**Example**

```
tctl namespace update --reason <value>
```

### `--remove-bad-binary`

How to remove a binary checksum.

See also [`--add-bad-binary`](#--add-bad-binary).

**Example**

```
tctl namespace update --remove-bad-binary <value>
```

### `--retention`

How to specify the number of days to retain Workflow Executions.

Alias `--rd`

**Example**

```
tctl namespace update --retention <value>
```

### `--visibility-archival-state`

How to set the visibility Archival state. Valid values are `disabled` and `enabled`.

Alias `--vas`

**Example**

```
tctl namespace update --visibility-archival-state <value>
```

### `--visibility-uri`

How to specify the URI for visibility Archival. The URI cannot be changed after Archival is first enabled.

Alias `--vuri`

**Example**

```
tctl namespace update --visibility-uri <uri>
```
