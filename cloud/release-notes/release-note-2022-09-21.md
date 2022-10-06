---
slug: release-note-2022-09-21
title: Temporal Cloud UI and self-service features in public beta
tags:
  - feature
date: 2022-09-21T00:00:00Z
---

We are excited to announce the public beta of the Temporal Cloud UI at [cloud.temporal.io](https://cloud.temporal.io/).
Users with a Temporal Cloud account can now access our latest Cloud UI and self-service features.

<!-- truncate -->

- [Invite users](/cloud/how-to-get-started-with-temporal-cloud/#invite-users) and update user Roles and permissions.
- [Create, manage, and list Namespaces](/cloud/how-to-manage-namespaces-in-temporal-cloud/).
- [Add and update certificates](/cloud/how-to-manage-certificates-in-temporal-cloud/).
- Add and update custom Search Attributes.
- [Monitor Temporal Cloud metrics](/cloud/how-to-monitor-temporal-cloud-metrics/) via a Prometheus Query Language (PromQL) endpoint.
- Review usage reports for your Namespace, including Actions and storage.

The Cloud UI and self-service features are in beta. During this transition phase, you can still use the current [Web UI](https://docs.temporal.io/web-ui) to access your Namespaces if you prefer not to participate in the beta.

## Known issues

### Roles and permissions

For accounts created prior to the public beta, be sure to review the Roles assigned to your users.
All users are now Global Admins, and we strongly recommend selecting only a couple of individuals to be Global Admins.
Other users should be assigned either Developer or Read-Only Roles.
For more information, see [Account-level Roles](/cloud/#account-level-roles).

To update account-level Roles and Namespace-level permissions, a dedicated Temporal Global Admin can browse to cloud.temporal.io and perform the following steps.

1. Click **Settings** > **Users**.
1. Click the user you want to edit, click **Edit Users**, and update the account Role.
1. Navigate to each Namespace the user should have access to.
1. Click **Edit**.
1. Under **Email**, add the user email address and select the appropriate [Namespace-level permission](/cloud/#namespace-level-permissions).

You can also open a support ticket with us to do a bulk update of Roles and permissions on your behalf.

### Namespace regions and Retention Periods

The region and Retention Period for a Namespace can be configured only when the Namespace is created.
If you need to change the Retention Period of a Namespace and can't create a separate one, open a support ticket.

### Namespace deletion

Namespace deletion isn't supported at this time. The feature is in active development.

### Namespace quota

By default, each account has a quota of 10 Namespaces.
If you want to increase this limit, open a support ticket.
