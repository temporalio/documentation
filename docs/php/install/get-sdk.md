The Temporal PHP SDK is available as composer package and can be installed using the following command in a root of your project:

```bash
composer require temporal/sdk
```

The Temporal PHP SDK requires the RoadRunner 2.0 application server and supervisor to run Activities and Workflows in a scalable way.

Install RoadRunner manually by dowloading its binary from the [release page](https://github.com/roadrunner-server/roadrunner/releases/tag/v1.9.2).

Or install RoadRunner through the CLI:

```bash
composer require spiral/roadrunner:v2.0 nyholm/psr7
./vendor/bin/rr get-binary
```
