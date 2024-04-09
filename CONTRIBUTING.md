# Contributing to Temporal documentation

Maintainers and contributors to this project are expected to conduct themselves in a respectful way. See the [CNCF Community Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md) as a reference.

This repository and its contents are open-source; individual and commercial use are permitted.

[MIT License](./LICENSE.md)

# Documentation content lives in `/docs`

All of the content served up to `docs.temporal.io` lives in the `/docs` directory of this repository.

# File a Github Issue

If you aren't part of the `temporalio` organization, we respectfully request that you [file a Github issue](https://github.com/temporalio/documentation/issues) as part of your change request.

# Sign the CLA

When you submit a Pull Request for the first time, you will be prompted to sign a CLA. Please sign this ASAP.
We won't be able to merge in your changes unless you sign the Contributor License Agreement.

# Style guidance

See [STYLE.md](./STYLE.md) for style guidance.

# Preview changes

You can preview how your changes will appear on the website locally on your machine.

**Make sure you have [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) and [Node.js](https://nodejs.org/en/download/) installed. Make sure you install the latest version of Node.js (later than 20.0.0).**

Run `yarn` to install the site dependencies.

Run `yarn start` to start the website on local port.

Run `yarn build` to see if there are any build warnings or errors.

# Automatic formatting

Use `yarn format` to format changes automatically.

# Broken links

[hyperlink](https://www.npmjs.com/package/hyperlink) is a command-line tool to find broken links.

In a terminal, run:

```bash
yarn check-links
```

This command will start the hyperlink checker.

# Snipsync

This repository is configured for [Snipsync](https://github.com/temporalio/snipsync), which checks in the snippets included throughout our documentation.

If you are making changes to code surrounded by Snipsync wrappers, i.e. `<--SNIPSTART someid --->` && `<!--SNIPEND-->` then you will want to make those edits to the actual source code.
The location of the source code is written just inside the wrappers.

After you have edited the source code, then you can run `yarn snipsync` to update that code snippet.

# Local development command reference

The following commands are available to aid in local development:

## `yarn`

This command ensures all the required dependencies are installed.

## `yarn build`

This command triggers a Docusaurus build and results in the browser-consumable JavaScript in the `/build` directory.
Note that the `/build` directory is ignored by Git.

## `yarn start`

This command spins up a local web server and serves the contents of the `/build` directory to [localhost:3000](http://localhost:3000/).

## `yarn format`

This command formats the documents per the `dprint.json` configuration.

## `yarn snipsync`

This command runs the Snipsync tool per the snipsync.config.yaml file.

### `--clear`

Run `yarn snipsync --clear` to remove the snippets.
