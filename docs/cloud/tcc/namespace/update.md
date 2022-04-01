---
id: update
title: tcc namespace update
description: How to update Namespace attributes in Temporal Cloud using tcc.
tags:
  - reference
  - tcc
---

The `tcc namespace update` command updates one or more attributes of the specified [Namespace](/docs/concepts/what-is-a-namespace) for the specified account in Temporal Cloud.

`tcc namespace update --account <account_id> --namespace <namespace_id>`

The following modifiers control the behavior of the command.

### `--account`

_Required modifier_

Specify an account ID.

Alias: `--a`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --retention-period 14
```

### `--namespace`

_Required modifier_

Specify a Namespace ID.

Alias: `--n`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --retention-period 90
```

### `--request-id`

Specify a request ID.

Alias: `--r`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --request-id <request_id>
```

### `--client-ca`

Specify a CA-signed certificate for the client. The value must be base64 encoded.

Alias: `--ca`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --client-ca <cert>
```

### `--retention-pariod`

Specify a retention period in days.

Alias: `--rp`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --retention-period 45
```

### `--resource-version`

Specify a resource version to update from. The default is the latest version.

Alias: `--v`

**Example**

```bash
tcc namespace update --account <account_id> --namespace <namespace_id> --resource-version <value>
```
