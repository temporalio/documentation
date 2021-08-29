# Getting started

You can run "Hello Temporal" locally in under 5 minutes.

## Step 0: Prerequisites

### Node.js

This project requires Node.js version 14 or later.

<details>
<summary>
macOS users: Brew installation of Node.js versions 15.0 to 16.4 does not work with the SDK; instead install the latest Node.js version or use nvm
</summary>

```bash
brew update
brew upgrade node
```

-- OR --

```bash
nvm use 16
```

If you don’t have `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)), you can [install](https://github.com/nvm-sh/nvm#install--update-script) it with:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 16
nvm use 16
```

</details>

### node-gyp

Install node-gyp:

```bash
npm install -g node-gyp
```

You may have to install some system dependencies first as documented [here](https://github.com/nodejs/node-gyp#installation).

_`node-gyp` is a requirement of [`isolated-vm`](https://github.com/laverdet/isolated-vm) the V8 Isolate library which powers this SDK's [deterministic runtime](/docs/node/determinism)_.

### Temporal Core SDK

<details>
<summary>
The Worker package embeds the <a href="https://github.com/temporalio/sdk-core">Temporal Rust Core SDK</a>, it comes pre-compiled for most installations.
</summary>

We've provided pre-compiled binaries for:

- Mac with an Intel chip: `x86_64-apple-darwin`
- Mac with an Apple chip: `aarch64-apple-darwin`
- Linux with x86_64 architecture: `x86_64-unknown-linux-gnu`
- Windows with x86_64 architecture: `x86_64-pc-windows-gnu` (Windows is not yet supported but it is a [priority for us](https://github.com/temporalio/sdk-node/issues/12)).

If you need to compile the Worker yourself, set up the Rust toolchain by following the instructions [here](https://rustup.rs/).

</details>

### Temporal Server

Run Temporal Server (requires [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install/)):

```bash
git clone https://github.com/temporalio/docker-compose.git temporal
cd temporal
docker-compose up
```

## Step 1: Create a new project

> If you run into errors during installation, it is likely your environment is not properly set up (see [Step 0](#step-0-prerequisites)).

Use the [package initializer](./package-initializer) to create a new project:

```bash
npx @temporalio/create@latest ./example
cd example
```

This will set up with [the basic Hello World sample](https://github.com/temporalio/sdk-node/blob/main/packages/create-project/samples/client.ts).
If you want a [sample for connecting to a Temporal Server instance secured with mTLS](https://github.com/temporalio/sdk-node/blob/main/packages/create-project/samples/client-mtls.ts), you can use ` npx @temporalio/create@latest ./example --sample hello-world-mtls`.

:::note

`npx` triggers native module compilation which might take a while, `npm` 7 hides the compilation output so it may appear that the installation is stuck, to see the compilation progress export `NPM_CONFIG_FOREGROUND_SCRIPTS=true`.

:::

## Step 2: Compile TypeScript

Use one of the provided helper package scripts to compile TypeScript.

```bash
# Watch files and compile on change
# (recommended because it’s most convenient)
npm run build.watch

## OR compile TypeScript once
## (you’ll need to rerun this every time you edit the code)
# npm run build
```

:::note

`ts-node` does not work with our project structure since it changes `__dirname` which affects the automatic Workflow and Activity [registration](/docs/node/hello-world/#worker) and we don't support running typescript directly in the [Workflow v8 isolates](/docs/node/determinism/#how-a-workflow-is-executed).

:::

## Step 3: Run your Workflow

Run the Worker:

```bash
$ npm start # this runs node lib/worker

# example successful output:
2021-05-19T17:27:33.176Z [INFO] asset main.js 4.78 MiB [emitted] (name: main)
2021-05-19T17:27:33.178Z [INFO] runtime modules 891 bytes 4 modules
2021-05-19T17:27:33.178Z [INFO] modules by path ./node_modules/ 4.66 MiB
2021-05-19T17:27:33.178Z [INFO]   modules by path ./node_modules/@temporalio/ 4.54 MiB 14 modules
2021-05-19T17:27:33.178Z [INFO]   modules by path ./node_modules/protobufjs/ 51.2 KiB
2021-05-19T17:27:33.178Z [INFO]     modules by path ./node_modules/protobufjs/src/*.js 28.8 KiB 7 modules
2021-05-19T17:27:33.178Z [INFO]     modules by path ./node_modules/protobufjs/src/util/*.js 17.7 KiB 2 modules
2021-05-19T17:27:33.178Z [INFO]     2 modules
2021-05-19T17:27:33.178Z [INFO]   modules by path ./node_modules/@protobufjs/ 23.7 KiB 7 modules
2021-05-19T17:27:33.178Z [INFO]   ./node_modules/long/src/long.js 39.2 KiB [built] [code generated]
2021-05-19T17:27:33.178Z [INFO]   ./node_modules/ms/index.js 2.95 KiB [built] [code generated]
2021-05-19T17:27:33.178Z [INFO] modules by path ../../../../../src/ 686 bytes
2021-05-19T17:27:33.178Z [INFO]   ../../../../../src/main.js 362 bytes [built] [code generated]
2021-05-19T17:27:33.178Z [INFO] ./lib/workflows/example.js 398 bytes [built] [code generated]
2021-05-19T17:27:33.178Z [INFO] webpack 5.37.1 compiled successfully in 1058 ms
2021-05-19T17:27:33.408Z [INFO] Worker state changed { state: 'RUNNING' }
```

> If this step fails, make sure you have the correct version of Node and other [dependencies](#step-0-prerequisites).

Then start your Workflow:

```bash
$ node lib/worker/schedule-workflow.js
Hello, Temporal!
```

This "Hello, Temporal!" message comes from the combination of:

- [`schedule-workflow.js`](https://github.com/temporalio/sdk-node/blob/03b0b3cd354da309aa6be1b1ff939f5fae007de2/packages/create-project/samples/client.ts) passing `'Temporal'` as an argument to the Workflow.
- The [Workflow](https://github.com/temporalio/sdk-node/blob/main/packages/create-project/samples/workflow.ts) passing the argument to the Activity.
- The [Activity](https://github.com/temporalio/sdk-node/blob/main/packages/create-project/samples/activity.ts) taking the argument as `name` and returning `Hello, ${name}!`.

as compiled from your `/src` to `/lib` folder by TypeScript.

You can verify this via the INPUT and RESULT fields in Temporal Web (available at [`localhost:8088`](http://localhost:8088/) on the default [`docker-compose`](https://github.com/temporalio/docker-compose)):

![image](https://user-images.githubusercontent.com/6764957/118865735-d7255f80-b913-11eb-8ace-a7dbdc351f8e.png)

## Next Steps

For a full code walkthrough of the Hello World example that you have spun up here, see our [Hello World documentation](/docs/node/hello-world).
