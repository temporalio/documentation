---
id: index
title: How to use the Temporal Python SDK
description: Add the Temporal Python SDK to your project.
tags:
  - developer-guide
  - python
---

The Temporal Python SDK provides a framework for Temporal Application development in the Python language.
The SDK contains the following tools:

- A Temporal Client to communicate with a Temporal Cluster.
- APIs to use within your Workflows.
- APIs to create and manage Worker Entities and Worker Processes.

**Update Python**

Update `pip`:

```bash
python -m install -U pip
```

**Get the SDK**

To install the Python SDK, choose from the following options:

- Install the Temporal Python package from [PyPI](https://pypi.org/project/temporalio/)

```bash
python -m pip install temporalio
```

```bash
pip install temporalio
```

- Clone the [Temporal Python SDK](https://github.com/temporalio/sdk-typescript) repo to your preferred location:
  ```sh
  git clone https://github.com/temporalio/sdk-python.git
  cd sdk-python
  ```
- Initialize the Core SDK submodule:
  ```sh
  git submodule update --init --recursive
  ```
- **Troubleshooting**: if you receive the `The authenticity of host 'github.com (192.30.252.123)' can't be established.` error, run `ssh-keyscan github.com >> ~/.ssh/known_hosts` and retry.

**Development**

- Install the system dependencies:

  - Python >=3.7
  - [pipx](https://github.com/pypa/pipx#install-pipx) (only needed for installing the two dependencies below)
  - [poetry](https://github.com/python-poetry/poetry) `pipx install poetry`
  - [poe](https://github.com/nat-n/poethepoet) `pipx install poethepoet`

- Use a local virtual env environment (helps IDEs and Windows):

  ```bash
  poetry config virtualenvs.in-project true
  ```

- Install the package dependencies (requires Rust):

  ```bash
  poetry install
  ```

- Build the project (requires Rust):

  ```bash
  poe build-develop
  ```

- Run the tests (requires Go):

  ```bash
  poe test
  ```

**Are there executable code samples?**

You can find a complete list of executable code samples in the [samples library](https://github.com/temporalio/samples-python), which includes Temporal Python SDK code samples from the [temporalio/samples-python](https://github.com/temporalio/samples-python) repo.
Additionally, each of the Python SDK Tutorials is backed by a fully executable template application.
