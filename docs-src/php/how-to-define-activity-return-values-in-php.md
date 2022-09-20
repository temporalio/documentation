---
id: how-to-define-activity-return-values-in-php
title: How to define Activity return values in PHP
sidebar_label: Activity return values
description: Activity return values must be serializable and deserializable by the provided `DataConverter`
tags:
  - developer-guide
  - php
---

Return values must be serializable to a byte array using the provided [DataConverter](https://github.com/temporalio/sdk-php/blob/master/src/DataConverter/DataConverterInterface.php) interface.
The default implementation uses a JSON serializer, but an alternative implementation can be easily configured.
Thus, you can return both primitive types:

```php
class GreetingActivity implements GreetingActivityInterface
{
    public function composeGreeting(string $greeting, string $name): string
    {
        return $greeting . ' ' . $name;
    }
}
```

And objects:

```php
class GreetingActivity implements GreetingActivityInterface
{
    public function composeGreeting(string $greeting, string $name): Greeting
    {
        return new Greeting($greeting, $name);
    }
}
```
