---
id: how-to-skip-time-set-up-in-php
title: How to set up time skipping in PHP
sidebar_label: Set up time skipping
description: To set up time skipping, create `bootstrap.php` and add it to `phpunit.xml`.
tags:
  - developer-guide
  - sdk
  - PHP
---

1. In the `tests` folder, create `bootstrap.php` with the following contents:

```php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Temporal\Testing\Environment;

$environment = Environment::create();
$environment->start();
register_shutdown_function(fn () => $environment->stop());
```

If you don't want to run the test server with all of your tests, you can add a condition to start a test only if the `RUN_TEMPORAL_TEST_SERVER` environment variable is present:

```php
if (getenv('RUN_TEMPORAL_TEST_SERVER') !== false) {
    $environment = Environment::create();
    $environment->start('./rr serve -c .rr.silent.yaml -w tests');
    register_shutdown_function(fn() => $environment->stop());
}
```

2. Add `bootstrap.php` and the `TEMPORAL_ADDRESS` environment variable to `phpunit.xml`:

```xml
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.3/phpunit.xsd"
         bootstrap="tests/bootstrap.php"
>
    <php>
        <env name="TEMPORAL_ADDRESS" value="127.0.0.1:7233" />
    </php>
</phpunit>
```

3. Add the test server executable to `.gitignore`:

```gitignore
temporal-test-server
```
