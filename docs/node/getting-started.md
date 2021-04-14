# Getting started

Follow the instructions below for setting up a local development environment.

### Install system dependencies

This project requires nodejs LTS version 12 (or later).

Furthermore, you will need a C++ compiler installed (instuctions [here](https://github.com/nodejs/node-gyp)).
If you run into errors during installation it is likely your environment is not properly set up.

The worker package embeds the Temporal Core SDK which requires the Rust toolchain to compile.
We've provided prebuilt binaries for the worker for:

- Mac with an Intel chip: `x86_64-apple-darwin`
- Mac with an Apple chip: `aarch64-apple-darwin`
- Linux with x86_64 architecture: `x86_64-unknown-linux-gnu`
- Windows with x86_64 architecture: `x86_64-pc-windows-gnu` (Windows is not yet supported but it is a [priority for us](https://github.com/temporalio/sdk-node/issues/12)).

If you need to compile the worker yourself, set up the Rust toolchain by following the instructions [here](https://rustup.rs/).

> NOTE: Macs with an Apple chip require NodeJS 15 installed from source, the easiest way to install it is using [`nvm`](https://github.com/nvm-sh/nvm).

### Create a new project

Use the [package initializer](./package-initializer) to create a new project.

```sh
npm init @temporalio ./example
cd ./example
```

> NOTE: `init` triggers native module compilation which might take a while, npm 7 hides the compilation output so it may appear that the installation is stuck, to see the compilation progress export `NPM_CONFIG_FOREGROUND_SCRIPTS=true`.

### Compile Typescript

```
npm run build
```

#### Run the Temporal server

Download, install, and run the [Temporal server](https://docs.temporal.io/docs/server-quick-install) via docker-compose. It is easy to do and you can keep it running in the background while you build applications.

#### Test your workflow

- Run the worker

  ```sh
  node lib/worker
  ```

- Run a workflow

  ```sh
  node lib/worker/test.js
  ```
