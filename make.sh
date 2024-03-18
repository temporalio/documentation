#!/bin/bash
# My adaptation of Patrick's script

cleanup() {
    read -p "Shut down workers? (Y/n)" -n 1 yn
    if [[ -z $yn ]]; then yn="Y"; fi
    if [[ $yn =~ [Yy].* ]]; then 
        pkill "temporal" > /dev/null 2>&1
        pkill "worker.js" > /dev/null 2>&1
        pkill "npm run serve" > /dev/null 2>&1
    fi
    exit 0
}

# Handle SIGINT
trap 'echo "^C detected. Cleaning up"; cleanup' SIGINT

# Pre-requisite: dprint
if [ -z "$(which dprint)" ]; then
    echo "Missing: required 'dprint' utility."; exit 0
else
    echo "Required 'dprint' utility: Available"
fi

# Linux and Window Installs
if [ -n "$(which temporal)" ]; then
    echo "Temporal command-line tool: Available"
else
    echo "Temporal CLI not found. Installing..."
    case "$(uname -s)" in
        Linux*|Darwin*)
            curl -sSf https://temporal.download/cli.sh | sh ;;
        MINGW*|CYGWIN*|MSYS*)
            echo "Run 'scoop install temporal-cli'" \
            "from your Windows environment."; exit 1 ;;
        Darwin)
            echo "Use Homebrew to install temporal on macOS" ;;
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
    `which temporal` server start-dev > /dev/null 2>&1 &
    sleep 1 # From Patrick's script, a pause to start up
fi

# Check or start Worker.js
if pgrep "worker.js" >/dev/null; then
    echo "Background worker.js: Running"
else
    echo "Background worker.js: Starting"
    pushd assembly > /dev/null 2>&1
    yarn > /dev/null 2>&1 && node  ./worker.js > /dev/null 2>&1 &
    popd > /dev/null 2>&1
fi

echo "Docs asssembly: Starting"
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
npm run serve > /dev/null 2>&1 &
popd > /dev/null 2>&1

while true; do
    read -p "Finished viewing site (Y/n)? " -n 1 yn
    if [[ -z $yn ]]; then yn="Y"; fi
    if [[ $yn =~ [Yy].* ]]; then break; fi
done 

cleanup
