---
id: rotate-api-keys
title: Rotate API Keys
sidebar_label: Rotate API Keys
description: Rotate API Keys.
tags:
  - how to
---

**How to rotate API Keys**

Rotating API Keys is a good practice. Because API Keys are immutable, they cannot change once created, rotating an API Key means creating a new key and then deleting the old one.

To rotate an API Key

1. Create a new key to replace the old key
   1. API Keys can share the same name
2. Securely save the new key’s secret
3. Replace the expiring key with the new key and secret
