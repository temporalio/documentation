---
id: update
title: tctl namespace update
sidebar_label: update
description: How to update a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace update` command updates a [Namespace](/docs/concepts/what-is-a-namespace).

`tctl namespace update`

The following modifiers control the behavior of the command.

### `--active-cluster`

How to specify the name of the active [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster/) when updating a [Namespace](/docs/concepts/what-is-a-namespace) in tctl.

Alias: `--ac`

**Example**

```
tctl namespace update --active-cluster <name>
```

### `--add-bad-binary`

How to add a binary checksum to use when resetting a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

See also [`--remove-bad-binary`](#--remove-bad-binary).

**Example**

```
tctl namespace update --add-bad-binary <value>
```

### `--clusters`

How to specify a list of [Temporal Clusters](/docs/concepts/what-is-a-temporal-cluster/) when updating a [Namespace](/docs/concepts/what-is-a-namespace) in tctl.

The list contains the names of Clusters (separated by spaces) to which the Namespace can fail over.

This modifier is valid only when the `--global-namespace` modifier is set to true.

Alias `--cl`

**Example**

```
tctl namespace update --clusters <names>
```

### `--description`

How to specify a description when updating a [Namespace](/docs/concepts/what-is-a-namespace) in tctl.

Alias `--desc`

**Example**

```
tctl namespace update --description <value>
```

### `--history-archival-state`

How to set the state of [Archival](/docs/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--has`

**Example**

```
tctl namespace update --history-archival-state <value>
```

### `--history-uri`

How to specify the URI for URI for [Archival](/docs/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--huri`

**Example**

```
tctl namespace update --history-uri <uri>
```

### `--namespace-data`

How to specify data for a [Namespace](/docs/concepts/what-is-a-namespace) in the form of key-value pairs (such as `k1:v1,k2:v2,k3:v3`).

Alias `--dmd`

**Example**

```
tctl namespace update --namespace-data <data>
```

### `--owner-email`

How to specify the email address of the [Namespace](/docs/concepts/what-is-a-namespace) owner.

Alias `--oe`

**Example**

```
tctl namespace update --owner-email <value>
```

### `--reason`

How to specify a reason for updating a [Namespace](/docs/concepts/what-is-a-namespace).

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

How to specify the number of days to retain [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).

Alias `--rd`

**Example**

```
tctl namespace update --retention <value>
```

### `--visibility-archival-state`

How to set the visibility state for [Archival](/docs/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--vas`

**Example**

```
tctl namespace update --visibility-archival-state <value>
```

### `--visibility-uri`

How to specify the visibility URI for [Archival](/docs/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--vuri`

**Example**

```
tctl namespace update --visibility-uri <uri>
```
