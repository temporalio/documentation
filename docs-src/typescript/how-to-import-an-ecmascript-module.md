---
id: how-to-import-an-ecmascript-module
title: How to import an ECMAScript module
sidebar_label: ECMAScript modules
description: See our Fetch ESM sample for the necessary configuration changes.
tags:
  - guide-context
---

The JavaScript ecosystem is quickly moving toward publishing ECMAScript modules (ESM) instead of CommonJS modules.
For example, `node-fetch@3` is ESM, but `node-fetch@2` is CommonJS.

For more information about importing a pure ESM dependency, see our [Fetch ESM](https://github.com/temporalio/samples-typescript/tree/main/fetch-esm) sample for the necessary configuration changes:

- `package.json` must have include the `"type": "module"` attribute.
- `tsconfig.json` should output in `esnext` format.
- Imports must include the `.js` file extension.
