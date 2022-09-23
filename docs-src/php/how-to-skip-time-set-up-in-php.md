---
id: how-to-skip-time-set-up-in-php
title: How to set up Skip Time in PHP
sidebar_label: Set up Skip Time
description: Set up Skip Time
tags:
  - developer-guide
  - sdk
  - PHP
---

1. Create `bootstrap.php` in `tests` folder with the following contents:

```php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Temporal\Testing\Environment;

$environment = Environment::create();
$environment->start();
register_shutdown_function(fn () => $environment->stop());
```

If you don't want to run temporal test server with all of your tests you can set, for example,
add condition to start it only if `RUN_TEMPORAL_TEST_SERVER` environment variable is present:

```php
if (getenv('RUN_TEMPORAL_TEST_SERVER') !== false) {
    $environment = Environment::create();
    $environment->start('./rr serve -c .rr.silent.yaml -w tests');
    register_shutdown_function(fn() => $environment->stop());
}
```

2. Add environment variable and `bootstrap.php` to your `phpunit.xml`:

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

3. Add test server executable to `.gitignore`:

```gitignore
temporal-test-server
```
