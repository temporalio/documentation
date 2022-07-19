---
id: index
title: How to use the Temporal PHP SDK
description: Add the Temporal PHP SDK to your project.
tags:
  - developer-guide
  - php
---

[![CI Status](https://github.com/temporalio/php-sdk/workflows/Unit/badge.svg)](https://github.com/temporalio/php-sdk/actions)
[![Stable Release](https://poser.pugx.org/temporal/sdk/version)](https://packagist.org/packages/temporal/sdk)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftemporalio%2Fsdk-php.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftemporalio%2Fsdk-php?ref=badge_shield)

The Temporal PHP SDK is available as composer package and can be installed using the following command in a root of your project:

```bash
composer require temporal/sdk
```

The Temporal PHP SDK requires the RoadRunner 2.0 application server and supervisor to run Activities and Workflows in a scalable way.

Install RoadRunner manually by downloading its binary from the [release page](https://github.com/roadrunner-server/roadrunner/releases/tag/v1.9.2).

Or install RoadRunner through the CLI:

```bash
composer require spiral/roadrunner:v2.0 nyholm/psr7
./vendor/bin/rr get-binary
```
