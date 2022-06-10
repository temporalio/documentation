---
id: what-is-a-codec-server
title: What is a Codec Server?
sidebar_label: Codec Server
description: Explanation and implementation of a remote encryption/decryption server.   
---

## Overview

A codec server provides a means of encrypting and decrypting data between a Temporal application and a customer's remote database.

Codec servers serve as a go-between for the application and the database. Data retrived from the user's remote server is decrypted through a codec server before it can be viewed on the WebUI. Conversely, data from the WebUI is sent to the codec server for encryption before getting sent back to the remote database.

Encrypted data is much more secure to store on the client's servers. In the event of a data breach, any information uncovered would be indecipherable to bad actors.

## Components

Codec servers handle authentication and authorization in a similar manner to what's utilized by Temporal Clusters.


Web UI
Remote server
URL

## Setup

Use the code samples below to build a basic codec server for your projects.
Go and TS

## Usage in Codes

Put BG check here