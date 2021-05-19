# Getting started

Follow the instructions below for setting up a local development environment.

## Step 0: Install dependencies

This project requires nodejs LTS version 14 (or later).

Furthermore, you will need to install [node-gyp](https://github.com/nodejs/node-gyp#installation).

If you run into errors during installation it is likely your environment is not properly set up.

<details>
<summary>
The Worker package embeds the [Temporal Core SDK](https://github.com/temporalio/sdk-core) which requires the Rust toolchain to compile.
</summary>
  

We've provided prebuilt binaries for the Worker for:

- Mac with an Intel chip: `x86_64-apple-darwin`
- Mac with an Apple chip: `aarch64-apple-darwin`
- Linux with x86_64 architecture: `x86_64-unknown-linux-gnu`
- Windows with x86_64 architecture: `x86_64-pc-windows-gnu` (Windows is not yet supported but it is a [priority for us](https://github.com/temporalio/sdk-node/issues/12)).

If you need to compile the Worker yourself, set up the Rust toolchain by following the instructions [here](https://rustup.rs/).

</details>


:::note

Brew installation of NodeJS>=15 does not work with the SDK, install Node with [`nvm`](https://github.com/nvm-sh/nvm) instead.

:::

:::note

Make sure you also have Temporal Server running. If you haven't set it up yet, we recommend following the [Temporal Server Quick Install via docker-compose](https://docs.temporal.io/docs/server/quick-install).

:::

## Step 1: Create a new project

Use the [package initializer](./package-initializer) to create a new project.

```sh
npm init @temporalio ./example
cd ./example
```

:::note

`init` triggers native module compilation which might take a while, npm 7 hides the compilation output so it may appear that the installation is stuck, to see the compilation progress export `NPM_CONFIG_FOREGROUND_SCRIPTS=true`.

:::

## Step 2: Compile Typescript

Use one of the provided helper package scripts to compile Typescript.

```bash
npm run build.watch # Watch files and compile on change (recommended because it's most convenient).
## OR  npm run build # Compile Typescript once (you will need to rerun this every time you edit the code).
```

:::note

`ts-node` does not work with our project structure since it changes `__dirname` which affects the automatic Workflow and Activity [registration](/docs/node/hello-world/#worker) and we don't support running typescript directly in the [Workflow v8 isolates](/docs/node/determinism/#how-a-workflow-is-executed).

:::

## Step 3: Run your Workflow

```sh
npm start                             # Run the Worker
node lib/worker/schedule-workflow.js  # Run a Workflow
```
