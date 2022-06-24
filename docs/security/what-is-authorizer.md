---
id: what-is-authorizer
title: What is Authorizer?
sidebar_label: What is Authorizer?
---

The Authorizer contains a single Authorize method, which is invoked for each incoming API call. Authorize receives information about the API call, along with the role and permission claims of the caller.

Authorizer allows for a wide range of authorization logic, including call target, role/permissions claims, and other data available to the system.

The following arguments must be passed to the Authorizer:

Athorizer then returns one of two decisions: 'decisiondeny' or 'decisionallow'.

Temporal provides a default Authorizer for your use.

Configure the Authorizer when you start the server with temporal.WithAuthorizer.
