---
id: toggle
title: tcld feature toggle
sidebar_label: toggle
description: How to toggle a new feature in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld feature toggle-*` command turns on or off the `*` feature in Temporal Cloud.

:::note

The `*` symbol represents the name of the feature.
Replace `*` with the name of the available feature to toggle.

:::

Alias: `tak`

`tcld feature toggle-*`

The command has no modifiers.

**Example**

`tcld feature toggle-apikey`

The following is an example output:

```json
Feature flag enable-apikey is now true
```

:::note

The feature `apikey` is an example.
Update the feature name to toggle a different feature.

:::
