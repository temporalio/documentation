---
id: environment-configuration
title: Environment configuration
sidebar_label: Environment configuration
description: Configure Temporal Clients using environment variables and TOML configuration files
tags:
  - Temporal Client
  - Configuration
  - Environment Variables
  - TOML
---

import { LANGUAGE_TAB_GROUP, getLanguageLabel } from '@site/src/constants/languageTabs';
import SdkTabs from '@site/src/components';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Temporal CLI and SDKs support configuring a Temporal Client using environment variables and TOML configuration files,
rather than setting connection options programmatically in your code. This decouples connection settings from
application logic, making it easier to manage different environments such as development, staging, and production
without code changes.

For a list of all available configuration settings, their corresponding environment variables, and TOML file paths,
refer to [Temporal Client Environment Configuration Reference](../references/client-environment-configuration).

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Environment configuration is in
[Public Preview](../evaluate/development-production-features/release-stages.mdx#public-preview) in the Temporal Go,
Python, Ruby, TypeScript, and .NET SDKs, as well as the Temporal CLI.

:::

## Configuration methods

You can configure your client using a TOML file, environment variables, or a combination of both. The configuration is
loaded with a specific order of precedence:

1. Environment variables: These have the highest precedence. If an environment variable defines a setting, it will
   always override any value set in a configuration file. This makes it easy to provide secrets in dynamic environments.
2. TOML configuration file: A TOML file can be used to define one or more configuration profiles. This file is located
   by checking the following sources in order:
   1. The path specified by the `TEMPORAL_CONFIG_FILE` environment variable.
   2. The default configuration path for your operating system:
      - Linux: `~/.config/temporalio/temporal.toml`
      - macOS: `$HOME/Library/Application Support/temporalio/temporal.toml`
      - Windows: `%AppData%\temporalio\temporal.toml`

## TOML file configuration

You can use configuration profiles to maintain separate configurations within a single file for different environments.
The Temporal client uses the `default` profile unless you specify another via the `TEMPORAL_PROFILE` environment
variable or in the SDK's load options. If a requested profile doesn't exist, the application will return an error.

Here is an example `temporal.toml` file that defines two profiles: `default` for local development and `prod` for
production.

```toml
# Default profile for local development
[profile.default]
address = "localhost:7233"
namespace = "default"

# Optional: Add custom gRPC headers
[profile.default.grpc_meta]
my-custom-header = "development-value"
trace-id = "dev-trace-123"

# Production profile for Temporal Cloud
[profile.prod]
address = "your-namespace.a1b2c.tmprl.cloud:7233"
namespace = "your-namespace"
api_key = "your-api-key-here"

# TLS configuration for production
[profile.prod.tls]
# TLS is auto-enabled when this TLS config or API key is present, but you can configure it explicitly
# disabled = false
# Use certificate files for mTLS
client_cert_path = "/etc/temporal/certs/client.pem"
client_key_path = "/etc/temporal/certs/client.key"

# Custom headers for production
[profile.prod.grpc_meta]
environment = "production"
service-version = "v1.2.3"

# Staging profile with inline certificate data
[profile.staging]
address = "staging.temporal.example.com:7233"
namespace = "staging"

[profile.staging.tls]
# Example of providing certificate data directly (base64 or PEM format)
client_cert_data = """-----BEGIN CERTIFICATE-----
MIICertificateDataHere...
-----END CERTIFICATE-----"""
client_key_data = """-----BEGIN PRIVATE KEY-----
MIIPrivateKeyDataHere...
-----END PRIVATE KEY-----"""
```

## CLI integration

The Temporal CLI tool includes `temporal config` commands that allow you to read and write to the TOML configuration
file. This provides a convenient way to manage your connection profiles without manually editing the file. Refer to
[Temporal CLI Reference - `temporal config`](../cli/config.mdx) for more details.

- `temporal config get <property>`: Reads a specific value from the current profile.
- `temporal config set <property> <value>`: Sets a property in the current profile.
- `temporal config delete <property>`: Deletes a property from the current profile.
- `temporal config list`: Lists all available profiles in the config file.

These CLI commands directly manipulate the `temporal.toml` file. This differs from the SDKs, which only _read_ from the
file and environment at runtime to establish a client connection. You can select a profile for the CLI to use with the
`--profile` flag. For example, `temporal --profile prod ...`.

The following code blocks provide copy-paste-friendly examples for setting up CLI profiles for both local development
and Temporal Cloud.

<Tabs groupId="cli-profile-setup" defaultValue="api-key-basic">
  <TabItem value="api-key-basic" label="Local + Prod with Cloud API key">

This example shows how to set up a default profile for local development and a `prod` profile for Temporal Cloud using
an API key.

```bash
# (Optional) initialize the default profile for local development
temporal config set --prop address --value "localhost:7233"
temporal config set --prop namespace --value "default"

# Configure a Temporal Cloud profile that authenticates with an API key
temporal --profile prod config set --prop address --value "<region>.<cloud_provider>.api.temporal.io:7233"
temporal --profile prod config set --prop namespace --value "<namespace_id>.<account_id>"
temporal --profile prod config set --prop api_key --value "<your-api-key>"
```

  </TabItem>
  <TabItem value="api-key-advanced" label="API key + advanced options">

This example shows how to set up a more advanced Temporal Cloud profile with TLS overrides and custom gRPC metadata.

```bash
# Base API key properties (replace the placeholders)
temporal --profile prod config set --prop address --value "<region>.<cloud_provider>.api.temporal.io:7233"
temporal --profile prod config set --prop namespace --value "<namespace_id>.<account_id>"
temporal --profile prod config set --prop api_key --value "<your-api-key>"

# Optional TLS overrides (only needed when you must pin certs or tweak SNI)
temporal --profile prod config set --prop tls.server_name --value "<namespace_id>.<account_id>"
temporal --profile prod config set --prop tls.ca_cert_path --value "/path/to/ca.pem"

# Optional gRPC metadata for observability or routing
temporal --profile prod config set --prop grpc_meta.environment --value "production"
temporal --profile prod config set --prop grpc_meta.service-version --value "v1.2.3"
```

  </TabItem>
</Tabs>

## Load configuration profile and environment variables

If you don't specify a profile, the SDKs load the `default` profile and the environment variables. If you haven't set
`TEMPORAL_CONFIG_FILE`, the SDKs will look for the configuration file in the default location. Refer to
[Configuration methods](#configuration-methods) for the default locations for your operating system.

No matter what profile you choose to load, environment variables are always loaded when you use the APIs in the
environment configuration package to load Temporal Client connection options. They always take precedence over TOML file
settings in the profiles.

<SdkTabs hideUnsupportedLanguages>
  <SdkTabs.Python>

To load the `default` profile along with any environment variables in Python, use the `ClientConfigProfile.load()`
method from the `temporalio.envconfig` package.

```python {7-8}
import asyncio
from temporalio.client import Client
from temporalio.envconfig import ClientConfigProfile

async def main():
    # Load the "default" profile from default locations and environment variables.
    default_profile = ClientConfigProfile.load()
    connect_config = default_profile.to_client_connect_config()

    # Connect to the client using the loaded configuration.
    client = await Client.connect(**connect_config)
    print(f"✅ Client connected to {client.service_client.config.target_host} in namespace '{client.namespace}'")

if __name__ == "__main__":
    asyncio.run(main())
```

  </SdkTabs.Python>
  <SdkTabs.Go>

To load the `default` profile along with any environment variables in Go, use the
`envconfig.MustLoadDefaultClientOptions()` function from the `temporalio.envconfig` package.

```go {13}
package main

import (
	"fmt"
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/contrib/envconfig"
)

func main() {
	// Loads the "default" profile from the standard location and environment variables.
	c, err := client.Dial(envconfig.MustLoadDefaultClientOptions())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer c.Close()

	fmt.Printf("✅ Connected to Temporal Service")
}
```

  </SdkTabs.Go>
  <SdkTabs.Ruby>

To load the `default` profile along with any environment variables in Ruby, use the
`EnvConfig::ClientConfig.load_client_connect_options()` method from the `temporalio.env_config` package.

```Ruby {16-18}
require 'temporalio/client'
require 'temporalio/env_config'

def main
  puts '--- Loading default profile from config.toml ---'

  # For this sample to be self-contained, we explicitly provide the path to
  # the config.toml file included in this directory.
  # By default though, the config.toml file will be loaded from
  # ~/.config/temporalio/temporal.toml (or the equivalent standard config directory on your OS).
  config_file = File.join(__dir__, 'config.toml')

  # load_client_connect_options is a helper that loads a profile and prepares
  # the configuration for Client.connect. By default, it loads the
  # "default" profile.
  args, kwargs = Temporalio::EnvConfig::ClientConfig.load_client_connect_options(
    config_source: Pathname.new(config_file)
  )

  puts "Loaded 'default' profile from #{config_file}."
  puts "  Address: #{args[0]}"
  puts "  Namespace: #{args[1]}"
  puts "  gRPC Metadata: #{kwargs[:rpc_metadata]}"

  puts "\nAttempting to connect to client..."
  begin
    client = Temporalio::Client.connect(*args, **kwargs)
    puts '✅ Client connected successfully!'
    sys_info = client.workflow_service.get_system_info(Temporalio::Api::WorkflowService::V1::GetSystemInfoRequest.new)
    puts "✅ Successfully verified connection to Temporal server!\n#{sys_info}"
  rescue StandardError => e
    puts "❌ Failed to connect: #{e}"
  end
end
```

  </SdkTabs.Ruby>

  <SdkTabs.DotNet>

To load the `default` profile along with any environment variables in .NET C#, use the
`ClientEnvConfig.LoadClientConnectOptions()` method from the `Temporalio.Client.EnvConfig` package.

```csharp {22,27-30}
using Temporalio.Client;
using Temporalio.Client.EnvConfig;

namespace TemporalioSamples.EnvConfig;

/// <summary>
/// Sample demonstrating loading the default environment configuration profile
/// from a TOML file.
/// </summary>
public static class LoadFromFile
{
    public static async Task RunAsync()
    {
        Console.WriteLine("--- Loading default profile from config.toml ---");

        try
        {
            // For this sample to be self-contained, we explicitly provide the path to
            // the config.toml file included in this directory.
            // By default though, the config.toml file will be loaded from
            // ~/.config/temporalio/temporal.toml (or the equivalent standard config directory on your OS).
            var configFile = Path.Combine(Directory.GetCurrentDirectory(), "config.toml");

            // LoadClientConnectOptions is a helper that loads a profile and prepares
            // the config for TemporalClient.ConnectAsync. By default, it loads the
            // "default" profile.
            var connectOptions = ClientEnvConfig.LoadClientConnectOptions(new ClientEnvConfig.ProfileLoadOptions
            {
                ConfigSource = DataSource.FromPath(configFile),
            });

            Console.WriteLine($"Loaded 'default' profile from {configFile}.");
            Console.WriteLine($"  Address: {connectOptions.TargetHost}");
            Console.WriteLine($"  Namespace: {connectOptions.Namespace}");
            if (connectOptions.RpcMetadata?.Count > 0)
            {
                Console.WriteLine($"  gRPC Metadata: {string.Join(", ", connectOptions.RpcMetadata.Select(kv => $"{kv.Key}={kv.Value}"))}");
            }

            Console.WriteLine("\nAttempting to connect to client...");

            var client = await TemporalClient.ConnectAsync(connectOptions);
            Console.WriteLine("✅ Client connected successfully!");

            // Test the connection by checking the service
            var sysInfo = await client.Connection.WorkflowService.GetSystemInfoAsync(new());
            Console.WriteLine("✅ Successfully verified connection to Temporal server!\n{0}", sysInfo);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            Console.WriteLine($"❌ Failed to connect: {ex.Message}");
        }
    }
}
```

  </SdkTabs.DotNet>

  <SdkTabs.TypeScript>
To load the `default` profile along with any environment variables in TypeScript, use the `loadClientConnectConfig` helper from `@temporalio/envconfig` package.

{/* SNIPSTART typescript-env-config-load-default-profile {"highlightedLines": "17-19,28-29"} */}
[env-config/src/load-from-file.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-from-file.ts)

```ts {17-19,28-29}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
  console.log('--- Loading default profile from config.toml ---');

  // For this sample to be self-contained, we explicitly provide the path to
  // the config.toml file included in this directory.
  // By default though, the config.toml file will be loaded from
  // ~/.config/temporalio/temporal.toml (or the equivalent standard config directory on your OS).
  const configFile = resolve(__dirname, '../config.toml');

  // loadClientConnectConfig is a helper that loads a profile and prepares
  // the configuration for Connection.connect and Client. By default, it loads the
  // "default" profile.
  const config = loadClientConnectConfig({
    configSource: { path: configFile },
  });

  console.log(`Loaded 'default' profile from ${configFile}.`);
  console.log(`  Address: ${config.connectionOptions.address}`);
  console.log(`  Namespace: ${config.namespace}`);
  console.log(`  gRPC Metadata: ${JSON.stringify(config.connectionOptions.metadata)}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

{/* SNIPEND */}

  </SdkTabs.TypeScript>

  <SdkTabs.Java>

To load the `default` profile along with any environment variables in Java, use the `ClientConfigProfile.load` method
from the `envconfig` package. This method will load the `default` profile from the default location and any environment
variables. Environment variables take precedence over the configuration file settings.

Then use `profile.toWorkflowServiceStubsOptions` and `profile.toWorkflowClientOptions` to convert the profile to
`WorkflowServiceStubsOptions` and `WorkflowClientOptions` respectively. Then use `WorkflowClient.newInstance` to create
a Temporal Client.

```java
import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.envconfig.ClientConfigProfile;
import io.temporal.envconfig.LoadClientConfigProfileOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import java.nio.file.Paths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoadFromFile {

  private static final Logger logger = LoggerFactory.getLogger(LoadFromFile.class);

  public static void main(String[] args) {
    try {

      ClientConfigProfile profile = ClientConfigProfile.load(LoadClientConfigProfileOptions.newBuilder().build());

      WorkflowServiceStubsOptions serviceStubsOptions = profile.toWorkflowServiceStubsOptions();
      WorkflowClientOptions clientOptions = profile.toWorkflowClientOptions();

      try {
        // Create the workflow client using the loaded configuration
        WorkflowClient client =
            WorkflowClient.newInstance(
                WorkflowServiceStubs.newServiceStubs(serviceStubsOptions), clientOptions);

        // Test the connection by getting system info
        var systemInfo =
            client
                .getWorkflowServiceStubs()
                .blockingStub()
                .getSystemInfo(
                    io.temporal.api.workflowservice.v1.GetSystemInfoRequest.getDefaultInstance());

        logger.info("✅ Client connected successfully!");
        logger.info("   Server version: {}", systemInfo.getServerVersion());

      } catch (Exception e) {
        logger.error("❌ Failed to connect: {}", e.getMessage());
      }

    } catch (Exception e) {
      logger.error("Failed to load configuration: {}", e.getMessage(), e);
      System.exit(1);
    }
  }
}
```

  </SdkTabs.Java>
</SdkTabs>

## Load configuration from a custom path

To load configuration from a non-standard file location without relying on the `TEMPORAL_CONFIG_FILE` environment
variable, you can use a function from the `temporalio.envconfig` package. The specific method you need to call depends
on the SDK you are using.

This is useful if you store application-specific configurations separately. Loading connection options using this method
will still respect environment variables, which take precedence over the file settings.

<SdkTabs hideUnsupportedLanguages>

<SdkTabs.Python>

To load a specific profile from a custom path in Python, use the `ClientConfig.load_client_connect_config()` method with
the `config_file` parameter. In this example, we construct the path to a `config.toml` file located in the same
directory as the script.

After loading the connection options, you can override specific settings programmatically before passing them to
`Client.connect()`.

```py {12-13,21-23}
import asyncio
from pathlib import Path
from temporalio.client import Client
from temporalio.envconfig import ClientConfig

async def main():
    """
    Demonstrates loading a named profile and overriding values programmatically.
    """
    print("--- Loading 'staging' profile with programmatic overrides ---")

    config_file = Path(__file__).parent / "config.toml"
    profile_name = "staging"

    print(
        "The 'staging' profile in config.toml has an incorrect address (localhost:9999)."
    )
    print("We'll programmatically override it to the correct address.")

    # Load the 'staging' profile.
    connect_config = ClientConfig.load_client_connect_config(
        profile=profile_name,
        config_file=str(config_file),
    )

    # Override the target host to the correct address.
    # This is the recommended way to override configuration values.
    connect_config["target_host"] = "localhost:7233"

    print(f"\nLoaded '{profile_name}' profile from {config_file} with overrides.")
    print(
        f"  Address: {connect_config.get('target_host')} (overridden from localhost:9999)"
    )
    print(f"  Namespace: {connect_config.get('namespace')}")

    print("\nAttempting to connect to client...")
    try:
        await Client.connect(**connect_config)  # type: ignore
        print("✅ Client connected successfully!")
    except Exception as e:
        print(f"❌ Failed to connect: {e}")


if __name__ == "__main__":
    asyncio.run(main())
```

</SdkTabs.Python>

<SdkTabs.Go>

To load a specific profile from a custom filepath in Go, use the `envconfig.LoadClientOptions()` function with the
`ConfigFilePath` field set in the `LoadClientOptionsRequest` struct. Use the `ConfigFileProfile` field to specify the
profile name.

After loading the connection options, you can override specific settings programmatically before passing them to
`client.Dial()`. Refer to the [GO SDK API documentation](https://pkg.go.dev/go.temporal.io/sdk/contrib/envconfig) for
all available options.

```go {14-16}
package main

import (
	"fmt"
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/contrib/envconfig"
)

func main() {
  // Load a specific profile from the TOML config file.
  // This requires a [profile.prod] section in your config.
  opts, err := envconfig.LoadClientOptions(envconfig.LoadClientOptionsRequest{
    ConfigFileProfile: "prod",
    ConfigFilePath:    "/Users/yourname/.config/my-app/temporal.toml",
  })
  if err != nil {
    log.Fatalf("Failed to load 'prod' profile: %v", err)
  }

  // Programmatically override the Namespace value.
  opts.Namespace = "new-namespace"

  c, err := client.Dial(opts)
  if err != nil {
    log.Fatalf("Failed to connect using 'prod' profile: %v", err)
  }
  defer c.Close()

  fmt.Printf("✅ Connected to Temporal namespace %q on %s using 'prod' profile\n", c.Options().Namespace, c.Options().HostPort)
}
```

</SdkTabs.Go>

<SdkTabs.Ruby>

To load a specific profile from a custom path in Ruby, use the `EnvConfig::ClientConfig.load_client_connect_options()`
method with the `config_source` parameter. In this example, we construct the path to a `config.toml` file located in the
same directory as the script. Use the `profile` parameter to specify the profile name.

After loading the connection options, you can override specific settings programmatically before passing them to
`Client.connect()`. Refer to the [Ruby SDK API documentation](https://ruby.temporal.io/Temporalio/EnvConfig.html) for
all available options.

```Ruby {7-8,14-16}
require 'temporalio/client'
require 'temporalio/env_config'

def main
  puts "--- Loading 'staging' profile with programmatic overrides ---"

  config_file = File.join(__dir__, 'config.toml')
  profile_name = 'staging'

  puts "The 'staging' profile in config.toml has an incorrect address (localhost:9999)."
  puts "We'll programmatically override it to the correct address."

  # Load the 'staging' profile.
  args, kwargs = Temporalio::EnvConfig::ClientConfig.load_client_connect_options(
    profile: profile_name,
    config_source: Pathname.new(config_file)
  )

  # Override the target host to the correct address.
  # This is the recommended way to override configuration values.
  args[0] = 'localhost:7233'

  puts "\nLoaded '#{profile_name}' profile from #{config_file} with overrides."
  puts "  Address: #{args[0]} (overridden from localhost:9999)"
  puts "  Namespace: #{args[1]}"

  puts "\nAttempting to connect to client..."
  begin
    client = Temporalio::Client.connect(*args, **kwargs)
    puts '✅ Client connected successfully!'
    sys_info = client.workflow_service.get_system_info(Temporalio::Api::WorkflowService::V1::GetSystemInfoRequest.new)
    puts "✅ Successfully verified connection to Temporal server!\n#{sys_info}"
  rescue StandardError => e
    puts "❌ Failed to connect: #{e}"
  end
end

main if $PROGRAM_NAME == __FILE__
```

</SdkTabs.Ruby>

<SdkTabs.DotNet>

To load a specific profile from a custom path in .NET C#, use the `ClientEnvConfig.LoadClientConnectOptions()` method
with the `ProfileLoadOptions` parameter. Use the `Profile` property to specify the profile name and the `ConfigSource`
property to specify the file path.

After loading the connection options, you can override specific settings programmatically before passing them to
`TemporalClient.ConnectAsync()`. Refer to the
[C# SDK API documentation](https://dotnet.temporal.io/api/Temporalio.Common.EnvConfig.html) for all available options.

```csharp {18-19,25-28}
using Temporalio.Client;
using Temporalio.Client.EnvConfig;

namespace TemporalioSamples.EnvConfig;

/// <summary>
/// Sample demonstrating loading a named environment configuration profile and
/// programmatically overriding its values.
/// </summary>
public static class LoadProfile
{
    public static async Task RunAsync()
    {
        Console.WriteLine("--- Loading 'staging' profile with programmatic overrides ---");

        try
        {
            var configFile = Path.Combine(Directory.GetCurrentDirectory(), "config.toml");
            var profileName = "staging";

            Console.WriteLine("The 'staging' profile in config.toml has an incorrect address (localhost:9999).");
            Console.WriteLine("We'll programmatically override it to the correct address.");

            // Load the 'staging' profile
            var connectOptions = ClientEnvConfig.LoadClientConnectOptions(new ClientEnvConfig.ProfileLoadOptions
            {
                Profile = profileName,
                ConfigSource = DataSource.FromPath(configFile),
            });

            // Override the target host to the correct address.
            // This is the recommended way to override configuration values.
            connectOptions.TargetHost = "localhost:7233";

            Console.WriteLine($"\nLoaded '{profileName}' profile from {configFile} with overrides.");
            Console.WriteLine($"  Address: {connectOptions.TargetHost} (overridden from localhost:9999)");
            Console.WriteLine($"  Namespace: {connectOptions.Namespace}");

            Console.WriteLine("\nAttempting to connect to client...");

            var client = await TemporalClient.ConnectAsync(connectOptions);
            Console.WriteLine("✅ Client connected successfully!");

            // Test the connection by checking the service
            var sysInfo = await client.Connection.WorkflowService.GetSystemInfoAsync(new());
            Console.WriteLine("✅ Successfully verified connection to Temporal server!\n{0}", sysInfo);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            Console.WriteLine($"❌ Failed to connect: {ex.Message}");
        }
    }
}
```

</SdkTabs.DotNet>

<SdkTabs.TypeScript>

To load a specific profile from a custom path in TypeScript, use the `loadClientConnectConfig` helper from
`@temporalio/envconfig` package with the `profile` and `configFile` options.

{/* SNIPSTART typescript-env-config-load-default-profile {"highlightedLines": "17-19,28-29"} */}
[env-config/src/load-from-file.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-from-file.ts)

```ts {17-19,28-29}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
  console.log('--- Loading default profile from config.toml ---');

  // For this sample to be self-contained, we explicitly provide the path to
  // the config.toml file included in this directory.
  // By default though, the config.toml file will be loaded from
  // ~/.config/temporalio/temporal.toml (or the equivalent standard config directory on your OS).
  const configFile = resolve(__dirname, '../config.toml');

  // loadClientConnectConfig is a helper that loads a profile and prepares
  // the configuration for Connection.connect and Client. By default, it loads the
  // "default" profile.
  const config = loadClientConnectConfig({
    configSource: { path: configFile },
  });

  console.log(`Loaded 'default' profile from ${configFile}.`);
  console.log(`  Address: ${config.connectionOptions.address}`);
  console.log(`  Namespace: ${config.namespace}`);
  console.log(`  gRPC Metadata: ${JSON.stringify(config.connectionOptions.metadata)}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

{/* SNIPEND */}

</SdkTabs.TypeScript>

<SdkTabs.Java>

To load a profile configuration file from a custom path in Java, use the `ClientConfigProfile.load` method from the
`envconfig` package with the `ConfigFilePath` parameter. This method will load the profile from the custom path and any
environment variables. Environment variables take precedence over the configuration file settings.

```java {21-25}
import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.envconfig.ClientConfigProfile;
import io.temporal.envconfig.LoadClientConfigProfileOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import java.nio.file.Paths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoadFromFile {

  private static final Logger logger = LoggerFactory.getLogger(LoadFromFile.class);

  public static void main(String[] args) {
    try {

      String configFilePath =
          Paths.get(LoadFromFile.class.getResource("/config.toml").toURI()).toString();

      ClientConfigProfile profile =
          ClientConfigProfile.load(
              LoadClientConfigProfileOptions.newBuilder()
                  .setConfigFilePath(configFilePath)
                  .build());

      WorkflowServiceStubsOptions serviceStubsOptions = profile.toWorkflowServiceStubsOptions();
      WorkflowClientOptions clientOptions = profile.toWorkflowClientOptions();

      try {
        // Create the workflow client using the loaded configuration
        WorkflowClient client =
            WorkflowClient.newInstance(
                WorkflowServiceStubs.newServiceStubs(serviceStubsOptions), clientOptions);

        // Test the connection by getting system info
        var systemInfo =
            client
                .getWorkflowServiceStubs()
                .blockingStub()
                .getSystemInfo(
                    io.temporal.api.workflowservice.v1.GetSystemInfoRequest.getDefaultInstance());

        logger.info("✅ Client connected successfully!");
        logger.info("   Server version: {}", systemInfo.getServerVersion());

      } catch (Exception e) {
        logger.error("❌ Failed to connect: {}", e.getMessage());
      }

    } catch (Exception e) {
      logger.error("Failed to load configuration: {}", e.getMessage(), e);
      System.exit(1);
    }
  }
}
```

</SdkTabs.Java>

</SdkTabs>
