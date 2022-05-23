# How to contribute

We encourage contributions from the community.

**Create a [GitHub issue](https://github.com/temporalio/documentation/issues) for any changes beyond typos and small fixes.**

If you do create a pull request (PR), please follow our [style guidance](/STYLE.md).

We review GitHub issues and PRs on a regular schedule.

To ensure that each change is relevant and properly peer reviewed, please adhere to best practices for open-source contributions.
This means that if you are outside the Temporal organization, you must fork the repository and create PRs from branches on your own fork.
The README in GitHub's [first-contributions repo](https://github.com/firstcontributions/first-contributions) provides an example.

## Preview changes locally

The Temporal documentation site uses [Docusaurus 2](https://v2.docusaurus.io/), which is a static website generator.

You can make changes locally without previewing them in the browser.
However, if you want to build the site and preview changes in the browser, do the following:

- Install version 14 or later of [Node.js](https://nodejs.org/en/download/).
  (On a Mac, use the command `brew install node@16`.)
- Download the repository and install dependencies with [`yarn`](https://classic.yarnpkg.com/en/docs/install#mac-stable):

  ```bash
  git clone https://github.com/temporalio/documentation.git
  cd documentation/
  yarn
  ```

- Now you can build and view the site locally:

  ```bash
  yarn start
  ```

  This command starts a local development server and opens a browser window to [localhost:3000](http://localhost:3000/).

### Snipsync

In the documentation files, [snipsync](https://github.com/temporalio/snipsync) snippets appear like this:

```
<!--SNIPSTART typescript-hello-client -->
<!--SNIPEND-->
```

To preview snipsync snippets, run `yarn snipsync`, which inserts the snippet contents (in this case, from [`samples-typescript`](https://github.com/temporalio/samples-typescript/blob/75bdcd613bd24f8f357cb96d1b83051353c5685a/hello-world/src/client.ts#L1)) between the `SNIPSTART` and `SNIPEND` tags.

Before committing, run `yarn snipsync --clear` to remove the snippets.

## Prettier

Before submitting a PR, use Prettier to reformat.

To install:

```
yarn install
```

To reformat:

```
yarn format
```

To reformat incremental changes:

```
yarn prettier --write .prettierrc.json
```

## Guide generation

The guide generation script is an Alpha state.

Each JSON configuration file in [guide-gen/guide-configs](guide-gen/guide-configs) relates to a specific concept and identifies related Markdown files. The [index.js](guide-gen/index.js) script uses these configuration files to generate guides such as [Concepts](https://docs.temporal.io/temporal/#) and [Application development](https://docs.temporal.io/application-development-guide).

To update a guide, make your changes in the source files that are named in the matching configuration file. For example, if you found a typo in the Concept section _What is a Task?_, you would open [docs/concepts/what-is-a-task.md](docs/concepts/what-is-a-task.md) and make the edit directly there. Then rebuild the Concept guide by running the following commands:

```bash
yarn gen
```

To build and view the site locally, run:

```bash
yarn start
```

## Pull requests

You can preview the changes made by your PR by clicking "Details" next to the Netlify deploy-preview check.

![Netlify build preview](static/img/readme/netlifypreview.png)

When we merge your PR, a new build automatically occurs and your changes publish to [https://docs.temporal.io](https://docs.temporal.io).
