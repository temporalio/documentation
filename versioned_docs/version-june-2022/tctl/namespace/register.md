---
id: register
title: tctl namespace register
sidebar_label: register
description: How to register a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace register` command registers a [Namespace](/concepts/what-is-a-namespace).

`tctl namespace register`

The following modifiers control the behavior of the command.

### `--active-cluster`

Specify the name of the active [Temporal Cluster](/concepts/what-is-a-temporal-cluster/) when registering a [Namespace](/concepts/what-is-a-namespace).
This value changes for Global Namespaces when a failover occurs.

Alias: `--ac`

**Example**

```bash
tctl namespace register --active-cluster <name>
```

### `--clusters`

Specify a list of [Temporal Clusters](/concepts/what-is-a-temporal-cluster/) when registering a [Namespace](/concepts/what-is-a-namespace).

The list contains the names of Clusters (separated by spaces) to which the Namespace can fail over.
Make sure to include to the currently active Cluster.
This is a read-only setting and cannot be changed.

This modifier is valid only when the `--global-namespace` modifier is set to true.

Alias `--cl`

**Example**

```bash
tctl namespace register --clusters <names>
```

### `--description`

Specify a description when registering a [Namespace](/concepts/what-is-a-namespace).

Alias `--desc`

**Example**

```bash
tctl namespace register --description <value>
```

### `--global-namespace`

Specifies whether a [Namespace](/concepts/what-is-a-namespace) is a [Global Namespace](/namespaces/#global-namespace).
When enabled, it controls the creation of replication tasks on updates allowing the state to be replicated across Clusters.
This is a read-only setting and cannot be changed.

Alias `--gd`

**Example**

```bash
tctl namespace register --global-namespace <boolean>
```

### `--history-archival-state`

Set the state of [Archival](/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--has`

**Example**

```bash
tctl namespace register --history-archival-state <value>
```

### `--history-uri`

Specify the URI for [Archival](/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--huri`

**Example**

```bash
tctl namespace register --history-uri <uri>
```

### `--namespace-data`

Specify data for a [Namespace](/concepts/what-is-a-namespace) in the form of key-value pairs (such as `k1:v1,k2:v2,k3:v3`).

Alias `--dmd`

**Example**

```bash
tctl namespace register --namespace-data <data>
```

### `--owner-email`

Specify the email address of the [Namespace](/concepts/what-is-a-namespace) owner.

Alias `--oe`

**Example**

```bash
tctl namespace register --owner-email <value>
```

### `--retention`

Set the [Retention Period](/clusters#retention-period) for the [Namespace](/concepts/what-is-a-namespace).

The Retention Period applies to Closed [Workflow Executions](/concepts/what-is-a-workflow-execution).

Alias `--rd`

**Example**

```bash
tctl namespace register --retention <value>
```

### `--visibility-archival-state`

Set the visibility state for [Archival](/concepts/what-is-archival).
Valid values are `disabled` and `enabled`.

Alias `--vas`

**Example**

```bash
tctl namespace register --visibility-archival-state <value>
```

### `--visibility-uri`

Specify the visibility URI for [Archival](/concepts/what-is-archival).
The URI cannot be changed after Archival is first enabled.

Alias `--vuri`

**Example**

```bash
tctl namespace register --visibility-uri <uri>
```
