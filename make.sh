#!/bin/bash

PERSIST=false
START=false

# Parse command-line arguments
for arg in "$@"
do
    case $arg in
        --persist)
        PERSIST=true
        shift
        ;;
        --start)
        START=true
        shift
        ;;
    esac
done

# Function to check if a command exists
command_exists() {
    type "$1" &> /dev/null
}

# Function to kill the temporal server process
kill_temporal_server() {
    echo "Attempting to kill the Temporal server..."
    PID=$(ps aux | grep 'temporal server start-dev' | grep -v grep | awk '{print $2}')
    if [ -n "$PID" ]; then
        kill "$PID"
        echo "Temporal server process killed."
    else
        echo "No Temporal server process found."
    fi
}

# Function to kill the worker.js process
kill_worker_process() {
    echo "Attempting to kill worker.js..."
    PID=$(ps aux | grep 'node ./worker.js' | grep -v grep | awk '{print $2}')
    if [ -n "$PID" ]; then
        kill "$PID"
        echo "worker.js process killed."
    else
        echo "No worker.js process found."
    fi
}

cleanup() {
    echo "Interrupt received, cleaning up..."
    # Put any cleanup commands here
    kill_worker_process
    kill_temporal_server
    echo "🤖 Cleanup complete. ✨"
    exit 1
}


trap cleanup SIGINT



# Kill existing Temporal server if --persist is not passed
if [ "$PERSIST" = false ]; then
    kill_temporal_server
fi

# Function to check if Temporal CLI is installed
is_temporal_installed() {
    TEMPORAL_VERSION=$(temporal --version 2>&1)
    if [[ $TEMPORAL_VERSION == temporal\ version* ]]; then
        return 0
    else
        return 1
    fi
}

# Check if 'temporal' command exists (skipped if --persist is true)
if [ "$PERSIST" = false ] || [ "$START" ]; then
    if command_exists temporal && is_temporal_installed; then
        echo "Temporal command-line tool is already present."
        temporal --version
    else
        echo "Temporal command-line tool not found. Installing..."

        # Detect OS and install accordingly
        case "$(uname -s)" in
            Linux*|Darwin*)
                curl -sSf https://temporal.download/cli.sh | sh
                ;;
            MINGW*|CYGWIN*|MSYS*)
                echo "Please run 'scoop install temporal-cli' in your Windows environment."
                exit 1
                ;;
            *)
                echo "Unsupported OS for automatic installation."
                exit 1
                ;;
        esac
    fi
fi

# Start Temporal server in development mode
if [ "$PERSIST" = false ] || [ "$START" ]; then
    echo "Starting Temporal server in development mode..."
    temporal server start-dev > /dev/null 2>&1 &
    SERVER_PID=$! # Capture the PID of the Temporal server process
    echo "Waiting for the server to initialize..."
    sleep 1
fi

if [ "$PERSIST" = false ] || [ "$START" ]; then
    # Execute worker.js in the background and get its PID
    echo "Starting worker.js in the background"
    cd assembly &&
    yarn &&
    node  ./worker.js > /dev/null 2>&1 &
    WORKER_PID=$!
fi

if [ "$START" = true ]; then
    echo "Starting Temporal server in development mode..."
    temporal server start-dev > /dev/null 2>&1 &
    echo "Starting worker.js in the background"
    cd assembly &&
    node  ./worker.js > /dev/null 2>&1 &
    WORKER_PID=$!
fi

# Execute assemble.js and then run dprint fmt
echo "Executing assemble.js and running dprint fmt"
node ./assemble.js > /dev/null 2>&1 && dprint fmt > /dev/null 2>&1


if [ "$PERSIST" = false ] || [ "$START" ]; then
    echo "Killing worker.js process..."
    kill "$WORKER_PID"
    echo "Killing Temporal server process..."
    kill "$SERVER_PID"
fi




if [ "$PERSIST" = false ] && [ "$START" = false ]; then
    echo "Executing yarn build..."
    cd websites/docs.temporal.io && yarn build



    echo "Serving your website..."
    yarn serve

    echo "Finished."

    echo "🤖 I have completed my task."
else
    echo "🤖 Persisting the worker and Temporal server in the background."
fi



