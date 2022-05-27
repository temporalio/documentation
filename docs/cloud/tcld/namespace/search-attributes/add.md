---
id: add
title: tcld namespace search-attributes add
sidebar_label: add
description: How to add custom Search Attributes to a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace search-attributes add` command adds custom [Search Attributes](/concepts/what-is-a-search-attribute) to a Namespace in Temporal Cloud.

`tcld namespace search-attributes add --search-attribute <value>`

Alias: `a`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace search-attributes add --namespace <namespace_id> --search-attribute <value>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace search-attributes add --request-id <request_id> --search-attribute <value>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace search-attributes add --resource-version <etag> --search-attribute <value>
```

### `--search-attribute`

_Required modifier; can be specified more than once_

Specify a custom Search Attribute in the form "_name_=_type_". Valid values for _type_ are as follows:

- Bool
- Datetime
- Double
- Int
- Keyword
- Text

Alias: `--sa`

**Example**

```bash
tcld namespace search-attributes add --search-attribute "YourSearchAttribute1=Text" --search-attribute "YourSearchAttribute2=Double"
```
