# Temporal documentation

Hello, World!

Welcome to Temporal's documentation repository!

This repository contains a large chunk of the Temporal information corpus.

| Resource                                   | Audience                |
|--------------------------------------------|--------------------------|
| [Information architecture](./readme/INFORMATION-ARCHITECTURE.md) | For contributors and maintainers |
| [Contact information](./readme/CONTACT.md)        | For our open source community |
| [Contributing guidance](./readme/CONTRIBUTING.md) | For our open source community |
| [License](./LICENSE.md) | For our open source community |
| [React Component catalog and guidance](./readme/COMPONENTS.md) | For our open source community |
| [Readability tooling guidance](./readme/READABILITY.md) | For repo maintainers |
| [Style guidance](./readme/STYLE.md)               | For our open source community |
| [Utility tooling guidance](./readme/UTILITIES.md) | For repo maintainers |

### Current component versioning philosophy

Temporal includes many different components and core dependencies. Many components are independently versioned, meaning that they document their stability and support for their own dependencies. The [Temporal Go SDK reference](https://pkg.go.dev/go.temporal.io/sdk?tab=versions) provides a good example of document versioning.

The goal of this information set, in regards to versioning, is to remain “current.” That is, this information should serve the needs of Temporal’s user base as best it can based on what is/has recently happened across all the Temporal's components.

Whenever possible, we make explicit call outs to support, stability, and dependency information.
