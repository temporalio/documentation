# Temporal documentation

Hello, World!

Welcome to Temporal's documentation repository!

**Table of contents**

- [Temporal documentation](#temporal-documentation)
  - [What is the goal of this README?](#what-is-the-goal-of-this-readme)
    - [What is the “Temporal information corpus”?](#what-is-the-temporal-information-corpus)
  - [What is in this repository?](#what-is-in-this-repository)
    - [`/docs-src` information nodes](#docs-src-information-nodes)
    - [`website/docs.temporal.io/docs` generated files for Docusaurus](#websitedocstemporaliodocs-generated-files-for-docusaurus)
    - [`/assembly` Assembly Workflow](#assembly-assembly-workflow)
    - [`/guide-configs` Guide configurations](#guide-configs-guide-configurations)
      - [DACX information node generation tooling](#dacx-information-node-generation-tooling)
    - [Snipsync code synchronization tooling](#snipsync-code-synchronization-tooling)
  - [How to get approval to create a pull request](#how-to-get-approval-to-create-a-pull-request)
  - [How to fix a typo](#how-to-fix-a-typo)
  - [How to make changes to this repository](#how-to-make-changes-to-this-repository)
    - [How to install the dependencies for this repo](#how-to-install-the-dependencies-for-this-repo)
    - [How to follow style guidance](#how-to-follow-style-guidance)
      - [Capitalization of core terms](#capitalization-of-core-terms)
      - [Abbreviation of "identifier"](#abbreviation-of-identifier)
      - [En dashes in ranges](#en-dashes-in-ranges)
      - [Infinitive verb forms in headings](#infinitive-verb-forms-in-headings)
      - [Infinitive verb forms in labels](#infinitive-verb-forms-in-labels)
      - [Sentence casing in headings](#sentence-casing-in-headings)
    - [What is the philosophy around versioning the documentation?](#what-is-the-philosophy-around-versioning-the-documentation)
      - [How to explicitly identify support, stability, and dependency info](#how-to-explicitly-identify-support-stability-and-dependency-info)
    - [How to find broken links](#how-to-find-broken-links)
    - [How to run the Assembly Workflow](#how-to-run-the-assembly-workflow)
    - [How to create a guide configuration](#how-to-create-a-guide-configuration)
    - [How to use DACX](#how-to-use-dacx)
      - [Identify DACX files](#identify-dacx-files)
      - [Write documentation using vanilla Markdown](#write-documentation-using-vanilla-markdown)
      - [Use `@dacx` comments to identify information nodes](#use-dacx-comments-to-identify-information-nodes)
      - [Basic line-selection requirements](#basic-line-selection-requirements)
      - [Use Assembly to generate the info nodes](#use-assembly-to-generate-the-info-nodes)
      - [Add info nodes to an Assembly guide config](#add-info-nodes-to-an-assembly-guide-config)
      - [Run Assembly one more time](#run-assembly-one-more-time)
    - [How to use Snipsync](#how-to-use-snipsync)
    - [How to create a pull request](#how-to-create-a-pull-request)
      - [Assembly Workflow merge conflicts](#assembly-workflow-merge-conflicts)
  - [Autogenerate table of contents](#autogenerate-table-of-contents)
    - [Functions](#functions)
    - [How to preview the site locally](#how-to-preview-the-site-locally)
  - [Local development command reference](#local-development-command-reference)
    - [`yarn`](#yarn)
    - [`yarn build`](#yarn-build)
    - [`yarn start`](#yarn-start)
    - [`yarn assemble`](#yarn-assemble)
      - [`--cloud`](#--cloud)
      - [`--samples`](#--samples)
    - [`yarn format`](#yarn-format)
    - [`yarn snipsync`](#yarn-snipsync)
    - [`--clear`](#--clear)

## What is the goal of this README?

The goal of this README is to empower community contribution to the Temporal information corpus, specifically docs.temporal.io. See [How to make changes to this repository](#how-to-make-changes-to-this-repository).

Maintainers and contributors to this project are expected to conduct themselves in a respectful way. See the [CNCF Community Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md) as a reference.

This repository and its contents are open-source; individual and commercial use are permitted.

[MIT License](https://github.com/temporalio/documentation/blob/main/LICENSE.md)

### What is the “Temporal information corpus”?

It is all Temporal related information.
It includes the relevant information that might not be in this repository but can be found in other locations.

[Adding to this repository](#how-to-make-changes-to-this-repository) is only way to add to the information corpus.

We plan to offer more ways to add to the corpus.

Consider registering your already published information with Temporal IQ and reach out to us in Slack: https://temporalio.slack.com/archives/C05JRT1GKEE.

## What is in this repository?

This repository contains a large chunk of the Temporal information corpus, divided into "source-of-truth" Markdown files and "generated" Markdown files, along with a changelog and an Assembly Workflow.
Each component is explained later in this README.

### `website/docs.temporal.io/docs` generated files for Docusaurus

This directory contains the Markdown files that map directly to what you see in the documentation site. For example, `/docs/concepts/workflows` maps to [docs.temporal.io/workflows](http://docs.temporal.io/workflows).

However, most of these files are generated from `docs-src` information nodes based on the guide configurations in `assembly/guide-configs` .

Generated content has the following note below the metadata:

```html
<!-- THIS FILE IS GENERATED. DO NOT EDIT THIS FILE DIRECTLY -->
```

When suggesting changes to this repository, try not to highlight the errors in generated files.
Please make comments and suggestions in the appropriate source nodes.

### Snipsync code synchronization tooling

This repository is configured for [Snipsync](https://github.com/temporalio/snipsync), which checks in the snippets included throughout our documentation.
For more information, see [How to use Snipsync](#how-to-use-snipsync).

## How to get approval to create a pull request

We absolutely encourage contributions, but we need to know what you plan to change.

If you aren't part of the temporalio GitHub organization, [file a Github issue](https://github.com/temporalio/documentation/issues) to suggest a change.

If you are part of the temporalio organization, use Temporal’s internal tracking system to submit a work task to our team.

In both cases, you must receive approval from us before submitting a pull request. If you submit a pull request without proper approval, we will close it.

## How to fix a typo

**STOP! [Make sure you are eligible to create a pull request!](#how-to-get-approval-to-create-a-pull-request)**

**After receiving approval, follow these steps to make changes to this repository.**

For more information, refer to [How to make changes to this repository](#how-to-make-changes-to-this-repository).

```bash
git clone https://github.com/temporalio/documentation
cd documentation
yarn install
git checkout -b yourfix
```

Find the source node in the `docs-src` directory.

Make your changes in the *source files* named in the configuration file.
For instance, if you find a typo under "What is a Task?" (located in the Workers section of the Temporal docs website), open [docs/concepts/what-is-a-task.md](https://github.com/temporalio/documentation/blob/main/docs/concepts/what-is-a-task.md) and make the edit directly there.

Since the next set of steps requires a local Temporal Cluster, make sure that you have one running before you continue. We recommend executing the `temporal server start-dev` command to start a local cluster if you don't already have one running. If the cluster is not running, then the `./worker.js` command below will fail with a "Connection refused" error.

Open a new terminal. In the `assembly` directory, start the Worker.

```bash
cd assembly
yarn install
./worker.js
```

Open another terminal. Run the Workflow from the root of the repository.

```bash
yarn assemble
```

Optionally, make sure you have a working build (the Github CI tools will check this too):

```bash
cd websites/docs.temporal.io
yarn build
```

Add your changes to the remote repository.

```bash
git add . && git commit -m "change deets"
git push origin yourfix
```

## How to make changes to this repository

**STOP! [Make sure you are eligible to create a pull request!](#how-to-get-approval-to-create-a-pull-request)**

**After receiving approval, follow these steps to make changes to this repository.**

If you want to fix a typo or something minor, check out the [How to fix a typo](#how-to-fix-a-typo) section of this README.

This section provides a higher-level view of the change proposal process, particularly for changes involving embedded code snippets or file generation.

1. Clone the documentation repository.
2. [Install the dependencies](#how-to-install-the-dependencies-for-this-repo).
3. Make changes to the information nodes in `docs-src`. Edit the guide configurations in `assemble/guide-configs` if files were added, deleted, or renamed.
   All changes must [follow our style guidance](#how-to-follow-style-guidance).
   1. See [How to construct a guide config](#how-to-create-a-new-guide-configuration).
   2. See [How to use DACX](#how-to-use-dacx).
   3. See [How to use Snipsync](#how-to-use-snipsync).
4. [Run the Assembly Workflow](#how-to-run-the-assembly-workflow).
5. [Format the files](#how-to-auto-format-files).
6. [Create a pull request](#how-to-create-a-pull-request).

### How to install the dependencies for this repo

**Before proceeding, make sure [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) and [Node.js](https://nodejs.org/en/download/) are installed. Make sure you install the latest version of Node.js (later than 18.0.0).**

On a Mac, use the command `brew install node@18`.

In the root directory of the repository, run `yarn` to install the packages needed to generate the `build` output. This includes the Docusaurus framework.

Change the directory to `assembly`. Run `yarn` to install the Assembly Workflow dependencies needed to generate the information nodes and their resulting guides.

### How to follow style guidance

The content included in the Temporal information corpus follows the [Google developer documentation style guide](https://developers.google.com/style), with deference to the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/) for issues left unanswered by Google.
In addition, we maintain a set of Temporal-specific style guidelines that override certain aspects of the Google and Microsoft guides.

We recommend that you use the Vale extension for your IDE. Vale allows you to configure rulesets in its own configuration file, making it useful for defining Temporal's style guidelines.

If you have Visual Studio Code, we recommend using the Vale VSCode extension.

For more information on general style rules, see the rulesets defined in the `vale/styles` configuration files.

#### Capitalization of core terms

Many of Temporal's core terms can be used in a generic way.

To differentiate one of Temporal's core terms from a generic instance of a term, always treat the Temporal term as a proper noun.

Do not capitalize generic versions of Temporal terms. Use generic versions sparingly to avoid confusion.

- Correct: "Next, register the Activity within the Workflow."

- Incorrect: "Next, register the activity within the workflow."

#### Abbreviation of "identifier"

Do not abbreviate the word "identifier" as "ID", "Id", or "id" unless it is part of a Temporal core term. For core terms, the correct abbreviation is "Id", such as in "Workflow Id" or "Activity Id".

- Correct: "You can provide an order identifier or customer identifier as a Workflow Id."

- Incorrect: "You can provide an order ID or customer id as a Workflow Id."

In code (and when quoting or referring to code in text), follow the conventions of each language.

#### En dashes in ranges

Using an en dash (`&ndash;` or the character `–`) for a range of numbers is acceptable.
However, we recommend using _from_, _to_, and _through_ instead of an en dash when possible.

Be consistent.
If you use an en dash in one range, use en dashes in all ranges.
Do not mix words and en dashes (or hyphens, for that matter).

- Correct: "5 to 10 GB"
- Correct: "5–10 GB"
- Correct: "5-10 GB"
- Incorrect: "from 5-10 GB"

#### Infinitive verb forms in headings

Use questions and infinitive verb forms for titles and headings. People tend to word their search queries with infinitive verb forms; aligning our titles with what's commonly searched improves SEO.

- Correct: "How to install Temporal"
- Incorrect: "Installing Temporal"

#### Infinitive verb forms in labels

Treat labels like headings or titles and use infinitive verb forms when possible.

- Correct: "Install Temporal"
- Incorrect: "Installing Temporal"

#### Sentence casing in headings

Use sentence casing for titles and headings.
Sentence casing means that only proper nouns and the first letter of the first word are capitalized.

- Correct: "How to get started with Temporal"
- Incorrect: "How To Get Started With Temporal"

### What is the philosophy around versioning the documentation?

Temporal includes many different components and core dependencies. Many components are independently versioned, meaning that they document their stability and support for their own dependencies. The [Temporal Go SDK reference](https://pkg.go.dev/go.temporal.io/sdk?tab=versions) provides a good example of document versioning.

The goal of this information set, in regards to versioning, is to remain “current.” That is, this information should serve the needs of Temporal’s user base as best it can based on what is/has recently happened across all the Temporal's components.

Whenever possible, we make explicit call outs to support, stability, and dependency information by using the `ssdi` metadata tag in `docs-src` nodes.

### How to find broken links

[hyperlink](https://www.npmjs.com/package/hyperlink) is a command-line tool to find broken links.

In a terminal, run:

```bash
yarn check-links
```

This command will start the hyperlink checker.

### How to preview the site locally

Run `yarn start`. This command starts a local development server and opens a browser window to [localhost:3000](http://localhost:3000/).

## Local development command reference

The following commands are available to aid in local development:

### `yarn`

This command ensures all the required dependencies are installed.

### `yarn build`

This command triggers a Docusaurus build and results in the browser-consumable JavaScript in the `/build` directory.
Note that the `/build` directory is ignored by Git.

### `yarn start`

This command spins up a local web server and serves the contents of the `/build` directory to [localhost:3000](http://localhost:3000/).

### `yarn format`

This command formats the documents per the `dprint.json` configuration.

### `yarn snipsync`

This command runs the Snipsync tool per the snipsync.config.yaml file.

#### `--clear`

Run `yarn snipsync --clear` to remove the snippets.
