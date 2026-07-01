# Contribute to Temporal Documentation Locally 

1. **Fork the Repository**
   Create a fork of this repository.
   *This creates a copy of this repository to your github account*

2. **Clone the Repository**  
   Run the following commands in your terminal to clone the repository and navigate into it:
   ```bash
   git clone https://github.com/YOUR_USERNAME/documentation.git
   cd documentation
   ```

3. **Open the Repository in Your IDE**  
   Open the project in your preferred IDE, such as Visual Studio Code. Locate the `/docs` directory, which contains all the content served on `docs.temporal.io`. Identify the changes you want to make.

4. **Create a New Branch**  
   If you're creating a pull request, create a new branch and switch to it:  
   ```bash
   git checkout -b my-documentation-contribution
   ```

5. **Understand the docs architecture and follow the style guide**  
   Refer to [INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) to understand where content belongs and what form it should take. Refer to [STYLE.md](./STYLE.md) for the documentation style guidelines.

6. **Preview Your Changes Locally**  
   Run the following commands to preview the site locally:
   ```bash
   yarn            # Install site dependencies
   yarn start      # Start the website on a local port
   yarn build      # Check for build warnings or errors
   ```

7. **Stage Your Changes**  
   Use the following commands to stage and commit your changes:
   ```bash
   git status                         # Check the status of your changes
   git add <file-name>                # Stage files individually
   git commit -m "Documentation Change"           # Commit your changes
   git push origin my-documentation-contribution  # Push changes
   ```

8. **Create a Pull Request**  
   - After pushing, GitHub provides a link in the terminal to create a PR. Open the link or navigate to your fork on GitHub.
   - Click the option to create a Pull Request (PR).
   - Provide a descriptive PR title and explanation.
   - Submit the PR and wait for feedback.
  
# Contributing Through the GitHub UI

For small changes like fixing typos, you can edit files directly on GitHub.

1. **Open the Temporal Docs Repository**

   Go to temporalio/documentation.

2. **Find and Edit the File**

   Navigate to the file, click its name, and use the pencil icon to make edits.

3. **Commit Your Changes**

   Add a brief commit message, create a new branch (e.g., fix-typo), and commit your changes.

4. **Create a Pull Request (PR)**

   Follow GitHub’s prompt to open a PR. Add a clear title and description.

5. **Verify and Tag**

   Verify your changes and tag as community-contribution. 

6. **Wait for Feedback**

    Once approved, your change goes live! 🎉


Maintainers and contributors to this project are expected to conduct themselves in a respectful way. See the [CNCF Community Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md) as a reference.

This repository and its contents are open-source; individual and commercial use are permitted.

[MIT License](./LICENSE.md)


# File a Github Issue

If you aren't part of the `temporalio` organization, you may also [file a Github issue](https://github.com/temporalio/documentation/issues) as part of your change request.

# Sign the CLA

When you submit a Pull Request for the first time, you will be prompted to sign a CLA. Please sign this ASAP.
We won't be able to merge in your changes unless you sign the Contributor License Agreement.

# Style guidance

See [STYLE.md](./STYLE.md) for style guidance.

# Preview changes

You can preview how your changes will appear on the website locally on your machine.

**Make sure you have [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) and [Node.js](https://nodejs.org/en/download/) installed. Make sure you install the latest version of Node.js (later than 24.0.0).**

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

The reason we use Snipsync is because this repo does not lint or build code samples directly, but the [samples repos](https://github.com/search?q=org%3Atemporalio+samples-&type=repositories) used throughout our organization do. As a general rule, we prefer all code samples presented in docs to be directly extracted from a CI-enabled code repo using Snipsync to benefit from this. While this may not be practical for every single line of code embedded in docs, it is a best practice.

If you are making changes to code surrounded by Snipsync wrappers, i.e. `<!--SNIPSTART someid-->` && `<!--SNIPEND-->` then you will want to make those edits to the actual source code.
The location of the source code is written just inside the wrappers.

After you have edited the source code, then you can run `yarn snipsync` to update that code snippet.

# How page routing works

Here is the hierarchy of how the canonical URLs work:

1. Vercel redirects in `vercel.json`
   - Old URL → destination URL, before Docusaurus page routing.

2. Docusaurus route generation
   - routeBasePath: `"/"` in docusaurus.config.js, so docs live at root, not `/docs/*`.

3. Markdown front matter `slug` field
   - Overrides the generated URL path for that doc page.

4. File path fallback
   - If no `slug` exists, URL comes from `docs/<path>/<file>.mdx`.

5. Sidebar hierarchy
   - Controls nav placement only; it does not determine the canonical URL.

We do not encourage the use of the `slug` field in the frontmatter for a page. This field will override the URL and could potentially cause issues with redirects and the sidebar nav.

If you are considering using a custom slug, answer these questions first:

- Does the page _need_ a custom URL? If so, why?
- Did you already check the redirects in `vercel.json`?
- Is it in the page in a folder under the topic that makes the most sense?

# Local development command reference

The following commands are available to aid in local development:

## `yarn`

This command ensures all the required dependencies are installed.

## `yarn build`

This command triggers a Docusaurus build and results in the browser-consumable JavaScript in the `/build` directory.
Note that the `/build` directory is ignored by Git.

## `yarn start`

This command spins up a local web server and serves the contents of the `/build` directory to [localhost:3000](http://localhost:3000/).

## `yarn snipsync`

This command runs the Snipsync tool per the snipsync.config.yaml file.

### `--clear`

Run `yarn snipsync --clear` to remove the snippets.
