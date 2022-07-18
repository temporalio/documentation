---
id: how-to-install-tcld
title: How to install tcld
sidebar_label: Install tcld
description: You can install tcld by using Homebrew or building from source.
tags:
  - operation-guide
  - tcld
---

You can install [tcld](/cloud/tcld) in two ways.

### Install tcld by using Homebrew

```bash
brew install temporalio/brew/tcld
```

### Build tcld from source

1. Verify that you have Go 1.18 or later installed.

   ```bash
   go version
   ```

   If Go 1.18 or later is not installed, follow the [Download and install](https://go.dev/doc/install) instructions on the Go website.

1. Clone the tcld repository and run make.

   ```bash
   git clone https://github.com/temporalio/tcld.git
   cd tcld
   make
   ```

1. Copy the tcld executable to any directory that appears in the PATH environment variable, such as `/usr/local/bin`.

   ```bash
   cp tcld /usr/local/bin/tcld
   ```

1. Verify that tcld is installed.

   ```bash
   tcld version
   ```
