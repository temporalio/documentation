**Development**

The following section describes to how to add the

- Install the system dependencies:

  - Python >=3.7
  - [pipx](https://github.com/pypa/pipx#install-pipx) (only needed for installing the two dependencies below)
  - [poetry](https://github.com/python-poetry/poetry) `pipx install poetry`
  - [poe](https://github.com/nat-n/poethepoet) `pipx install poethepoet`

- Clone the [Temporal Python SDK](https://github.com/temporalio/sdk-typescript) repo to your preferred location:

```sh
git clone https://github.com/temporalio/sdk-python.git
cd sdk-python
```

- Initialize the Core SDK submodule:

```sh
git submodule update --init --recursive
```

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
