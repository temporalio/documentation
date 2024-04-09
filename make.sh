#!/bin/bash
# Run Assembly tasks and, optionally, build and serve the
# updated Website

cleanup() {
    read -p "Shut down workers? (Y/n)" -n 1 yn
    if [[ -z $yn ]]; then yn="Y"; fi
    if [[ $yn =~ [Yy].* ]]; then
        pkill "temporal" > /dev/null 2>&1
        killall "worker.js" > /dev/null 2>&1 # Fixed: Use killall instead of pkill
        killall "npm" > /dev/null 2>&1 # Fixed: Use "npm" instead of "npm run serve" | use killall instead of pkill
        killall "node" > /dev/null 2>&1 # Fixed: Add kill node
    fi
    exit 0
}

# Handle SIGINT
trap 'echo "^C detected. Cleaning up"; cleanup' SIGINT

# Pre-requisite: dprint
if ! command -v dprint > /dev/null 2>&1; then # Fixed: Use command -v instead of which
    echo "Missing: required 'dprint' utility."; exit 0
else
    echo "Required 'dprint' utility: Available"
fi

# Linux and Window Installs
if command -v temporal > /dev/null 2>&1; then # Fixed: Use command -v instead of which
    echo "Temporal command-line tool: Available"
else
    echo "Temporal CLI not found. Installing..."
    case "$(uname -s)" in
        Linux*|Darwin*)
            curl -sSf https://temporal.download/cli.sh | sh ;;
        MINGW*|CYGWIN*|MSYS*)
            echo "Run 'scoop install temporal-cli'" \
            "from your Windows environment."; exit 1 ;;
        *)
            echo "Unsupported OS for automatic installation."
            exit 1 ;;
    esac
fi

# Start Temporal CLI server
if pgrep "temporal" >/dev/null; then
    echo "Temporal development server: Running."
else
    echo "Starting Temporal CLI server"
    temporal server start-dev > /dev/null 2>&1 &
    sleep 1
fi

# Check or start Worker.js
if pgrep "worker.js" >/dev/null; then
    echo "Background worker.js: Running"
else
    echo "Background worker.js: Starting"
    pushd assembly > /dev/null 2>&1
    yarn > /dev/null 2>&1 && node ./worker.js > /dev/null 2>&1 &
    popd > /dev/null 2>&1
fi

echo "Docs assembly: Starting"
node ./assemble.js
yarn format
echo "Docs assembly: Complete"

# Serve the site?
echo; echo "[Optional Web Service]"
read -p "Serve the site (N/y)? " yn
if [[ -z $yn ]]; then yn="N"; fi
if [[ $yn =~ [Nn].* ]]; then cleanup; fi

echo "Site: Building. May take several moments."
pushd websites/docs.temporal.io > /dev/null 2>&1
yarn && yarn build

echo "Site: Serving"
default_port=3000
port=$default_port

# Check if the default port is in use
while nc -z localhost $port >/dev/null 2>&1; do
    port=$((port + 1))
done

# Serve the site on the available port
yarn serve --port $port >/dev/null 2>&1 &

popd > /dev/null 2>&1

if [ "$port" -ne "$default_port" ]; then
    echo "The default port $default_port is in use. Serving the site on port $port instead."
else
    echo "The site is being served on the default port $default_port."
fi

while true; do
    read -p "Finished viewing site (Y/n)? " -n 1 yn
    if [[ -z $yn ]]; then yn="Y"; fi
    if [[ $yn =~ [Yy].* ]]; then
        fuser -k $port/tcp > /dev/null 2>&1 # Kill the Docusaurus server process
        break
    fi
done

cleanup
