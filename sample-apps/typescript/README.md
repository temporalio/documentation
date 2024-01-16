# Code Repository for Temporal Documentation Samples in TypeScript

This repository provides code used for samples in the [TypeScript Developer's Guide](https://docs.temporal.io/dev-guide/typescript).

## Running Locally

Run Temporal Server:

```sh
brew install temporal
temporal server start-dev --ui-port 8080 --db-filename clusterdata.db
```

Use Node version 16+:

- Install Node 16:
  - Mac: `brew install node@16`
  - Other: [nodejs.org/en/download/](https://nodejs.org/en/download/)
- Or use a Node version manager: [`fnm`](https://github.com/Schniz/fnm#readme)
