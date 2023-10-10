---
id: install-cli
title: Install the Temporal CLI
description: Download and install the Temporal CLI for Mac, Linux, or Windows.
sidebar_label: Install CLI
tags:
  - temporal cli
  - dev guide
---

**How to download and install the Temporal CLI**

The Temporal CLI is available on MacOS, Windows, and Linux.

### MacOS

**How to install the Temporal CLI on Mac OS**

Choose one of the following install methods to install the Temporal CLI on MacOS:

**Install the Temporal CLI with Homebrew**

```bash
brew install temporal
```

**Install the Temporal CLI with cURL**

```bash
curl -sSf https://temporal.download/cli.sh | sh
```

**Install the Temporal CLI from CDN**

1. Select the platform and architecture needed.

  - Download for Darwin amd64: https://temporal.download/cli/archive/latest?platform=darwin&arch=amd64
  - Download for Darwin arm64: https://temporal.download/cli/archive/latest?platform=darwin&arch=arm64

2. Extract the downloaded archive.

3. Add the `temporal` binary to your PATH.

### Linux

**How to install the Temporal CLI on Linux**

Choose one of the following install methods to install the Temporal CLI on Linux:

**Install the Temporal CLI with cURL**

```bash
curl -sSf https://temporal.download/cli.sh | sh
```

**Install the Temporal CLI from CDN**

1. Select the platform and architecture needed.

  - Download for Linux amd64: https://temporal.download/cli/archive/latest?platform=linux&arch=amd64
  - Download for Linux arm64: https://temporal.download/cli/archive/latest?platform=linux&arch=arm64

2. Extract the downloaded archive.

3. Add the `temporal` binary to your PATH.

### Windows

**How to install the Temporal CLI on Windows**

Follow these instructions to install the Temporal CLI on Windows:

**Install the Temporal CLI from CDN**

1. Select the platform and architecture needed and download the binary.

  - Download for Windows amd64: https://temporal.download/cli/archive/latest?platform=windows&arch=amd64
  - Download for Windows arm64: https://temporal.download/cli/archive/latest?platform=windows&arch=arm64

2. Extract the downloaded archive.

3. Add the `temporal.exe` binary to your PATH.
