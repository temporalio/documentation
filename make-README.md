# README for Temporal Development Environment Script

## Overview

This script provides a streamlined method for setting up and managing a local development environment for a project that uses Temporal (a workflow orchestration platform) and associated node.js processes.
It is designed to automate several tasks, including the installation of necessary tools, starting a local Temporal server, running node.js worker processes, and building a website.

## Prerequisites

To run this script, you will need:
- Bash shell environment (Linux, MacOS, or a Unix-like environment on Windows such as WSL, Cygwin, or MinGW).
- Node.js installed on your system.
- `yarn` package manager.
- `dprint` for code formatting.
- Internet access for downloading Temporal CLI and other dependencies.

## Features

1. **Temporal CLI Installation**: Automatically installs the Temporal command-line tool if it's not already installed.

2. **Development Server Management**: Can start/stop the Temporal server and worker.js process based on the flags provided.

3. **Signal Handling**: Gracefully handles interrupt signals (SIGINT) to clean up running processes.

4. **Assembly and Formatting**: Executes a node.js script (`assemble.js`) and formats code using `dprint`.

5. **Building and Serving Documentation**: Builds and serves a documentation website using `yarn`.

## How It Works

- **Initialization**: The script begins by setting default values for control flags and parses command-line arguments to modify these flags.
- **Command and Process Management**: It includes functions to check for the existence of commands (`command_exists`), and to kill specific processes (like the Temporal server or a worker process).
- **Temporal CLI Management**: Checks for Temporal CLI and installs it if missing. It also manages the Temporal server process based on the flags passed.
- **Signal Handling**: Uses a `trap` to catch SIGINT signals for a graceful shutdown.
- **Execution and Building**: Runs `assemble.js` and `dprint` for assembling and formatting. It also handles building the documentation site and serving it using `yarn`.

## Usage

**Default Mode (Temporary Setup)**:
- Simply run the script without any flags. This will start the necessary processes, execute tasks, and then clean up, shutting down all processes before exiting.
- Use: `yarn make`

## Notes

- It's important to have administrative or sufficient permissions to install software and manage processes on your system.
- Ensure all dependencies (like Node.js, yarn) are installed before running the script.