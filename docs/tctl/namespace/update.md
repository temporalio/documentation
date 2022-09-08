---
id: update
title: tctl namespace update
sidebar_label: update
description: How to update a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace update` command updates a [Namespace](/concepts/what-is-a-namespace).

`tctl namespace update`

The following modifiers control the behavior of the command.

### `--active_cluster`

Specify the name of the active [Temporal Cluster](/concepts/what-is-a-temporal-cluster/) when updating a [Namespace](/concepts/what-is-a-namespace).

Alias: `--ac`

**Example**

```bash
tctl namespace update --active_cluster <name>
```

### `--add_bad_binary`

Add a binary checksum to use when resetting a [Workflow Execution](/concepts/what-is-a-workflow-execution).
Temporal will not dispatch any [Commands](/concepts/what-is-a-command) to the given binary.

See also [`--remove_bad_binary`](#--remove_bad_binary).

**Example**

```bash
tctl namespace update --add_bad_binary <value>
```

### `--clusters`

Specify a list of [Temporal Clusters](/concepts/what-is-a-temporal-cluster/) when updating a [Namespace](/concepts/what-is-a-namespace).

The list contains the names of Clusters (separated by spaces) to which the Namespace can fail over.

This modifier is valid only when the `--global_namespace` modifier is set to true.

Alias `--cl`

**Example**

```bash
tctl namespace update --clusters <names>
```

### `--description`

Specify a description when updating a [Namespace](/concepts/what-is-a-namespace).

Alias `--desc`

**Example**

```bash
tctl namespace update --description <value>
```

### `--history_archival_state`

Set the state of [Archival](/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--has`

**Example**

```bash
tctl namespace update --history_archival_state <value>
```

### `--history_uri`

Specify the URI for URI for [Archival](/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--huri`

**Example**

```bash
tctl namespace update --history_uri <uri>
```

### `--namespace_data`

Specify data for a [Namespace](/concepts/what-is-a-namespace) in the form of key-value pairs (such as `k1:v1,k2:v2,k3:v3`).

Alias `--dmd`

**Example**

```bash
tctl namespace update --namespace_data <data>
```

### `--owner_email`

Specify the email address of the [Namespace](/concepts/what-is-a-namespace) owner.

Alias `--oe`

**Example**

```bash
tctl namespace update --owner_email <value>
```

### `--reason`

Specify a reason for updating a [Namespace](/concepts/what-is-a-namespace).

**Example**

```bash
tctl namespace update --reason <value>
```

### `--remove_bad_binary`

Remove a binary checksum.

See also [`--add_bad_binary`](#--add_bad_binary).

**Example**

```bash
tctl namespace update --remove_bad_binary <value>
```

### `--retention`

Specify the number of days to retain [Workflow Executions](/concepts/what-is-a-workflow-execution).

Alias `--rd`

**Example**

```bash
tctl namespace update --retention <value>
```

### `--visibility_archival_state`

Set the visibility state for [Archival](/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--vas`

**Example**

```bash
tctl namespace update --visibility_archival_state <value>
```

### `--visibility_uri`

Specify the visibility URI for [Archival](/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--vuri`

**Example**

```bash
tctl namespace update --visibility_uri <uri>
```
