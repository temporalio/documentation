---
id: package-initializer
title: Node SDK Package Initializer
sidebar_label: Package Initializer
---

# @temporalio/create

[![NPM](https://img.shields.io/npm/v/@temporalio/create)](https://www.npmjs.com/package/@temporalio/create)

Sets up a new Temporal project with a preset skeleton.

> Make sure to follow the [getting started instructions](/docs/node/getting-started/#install-system-dependencies).

### Usage

```
npm init @temporalio /path/to/project [--use-yarn] [--temporal-version TEMPORAL_VERSION] [--sample hello-world|hello-world-mtls]
```

#### Flags

- `--use-yarn` - configure the project with `yarn` (defaults to `npm`).
- `--temporal-version` - use specified SDK version or `@latest` if not provided.

### Project Structure

The generated project consists of 4 sub-projects with typescript [project references][ts-project-references].

```
src/worker/ -> Worker code
src/interfaces/ -> Workflow interfaces
src/workflows/ -> Workflow implementations
src/activities/ -> Activity implementations
```

This code structure is required for enabling Workflows—which run in an [isolated environment](/docs/node/hello-world/#workflows)—to specify a custom `tsconfig.json` than the rest of the project.

#### References

[![](https://mermaid.ink/svg/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBXUksod29ya2VyKSAtLT4gV0ZcbiAgICBXRih3b3JrZmxvd3MpIC0tPiBJXG4gICAgV0YgLS0-IEFcbiAgICBBKGFjdGl2aXRpZXMpIC0tPiBJXG4gICAgV1JLIC0tPiBJXG4gICAgSShpbnRlcmZhY2VzKSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0IiwiZmxvd2NoYXJ0Ijp7ImN1cnZlIjoiYmFzaXMifSwidGhlbWVDU1MiOiIubGFiZWwgZm9yZWlnbk9iamVjdCB7IG92ZXJmbG93OiB2aXNpYmxlOyB9In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBXUksod29ya2VyKSAtLT4gV0ZcbiAgICBXRih3b3JrZmxvd3MpIC0tPiBJXG4gICAgV0YgLS0-IEFcbiAgICBBKGFjdGl2aXRpZXMpIC0tPiBJXG4gICAgV1JLIC0tPiBJXG4gICAgSShpbnRlcmZhY2VzKSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0IiwiZmxvd2NoYXJ0Ijp7ImN1cnZlIjoiYmFzaXMifSwidGhlbWVDU1MiOiIubGFiZWwgZm9yZWlnbk9iamVjdCB7IG92ZXJmbG93OiB2aXNpYmxlOyB9In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

### Working with the created project

The created project comes with some helper package scripts.

- `npm run build` - Compile TypeScript
- `npm run build.watch` - Watch files and compile on change

#### Running the example

- Compile the project with one of the commands above
- Download, install, and run the [Temporal server][local-server] via docker-compose
- Start the worker using `npm start`, or equivalently, `node lib/worker`
- In a new terminal, use the provided client to start a Workflow `node lib/worker/schedule-workflow.js`

[ts-project-references]: https://www.typescriptlang.org/tsconfig#references
[npm-init]: https://docs.npmjs.com/cli/v6/commands/npm-init
[local-server]: /docs/server/quick-install
