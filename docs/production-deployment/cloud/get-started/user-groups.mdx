---
id: user-groups
title: Manage user groups
sidebar_label: Manage user groups
description: Learn how to manage user groups, members, and roles
slug: /cloud/user-groups
toc_max_heading_level: 4
keywords:
  - explanation
  - how-to
  - temporal cloud
  - temporal cloud account
  - user groups
tags:
  - Users
  - User groups
  - Security
  - Temporal Cloud
---

## What are user groups?

User groups can be used to help manage sets of users that should have the same
access. Instead of separately assigning the same role to individual users, a user group can be
created, assigned the desired roles, and then users added to the user group. This
eases the toil of managing individual user permissions and can simplify access management. When
a new role is needed, it can be added to the group once and all users' access will reflect the
new role.

User groups can be assigned both [account-level roles](/cloud/users#account-level-roles) and [namespace-level permissions](/cloud/users#namespace-level-permissions).

One user can be assigned to many groups. In the event that a user's group memberships have multiple roles for the same resource, the user will have an effective role of the most permissive of the permissions. For example if `Group A` grants a read-only role to a namespace, but `Group B` grants a write role to a namespace then a user that belongs to both `Group A` and `Group B` would have the write role to the namespace.

[Service accounts](/cloud/service-accounts) cannot be assigned to user groups.

Only users with the Account Owner or Global Admin account-level [role](/cloud/users#account-level-roles) can manage user groups.

## How SCIM groups work with user groups {#scim-groups}

[SCIM groups](/cloud/scim) work similarly to user groups with respect to role assignment. Unlike a user group, the lifecycle of a SCIM group is fully managed by the SCIM integration which means:

1. SCIM groups cannot be created except through the SCIM integration
1. SCIM groups cannot be deleted except through the SCIM integration
1. SCIM group membership is managed through the SCIM integration

User groups and SCIM groups can be used simultaneously in a single Temporal Cloud account. One user may belong to multiple SCIM groups and to multiple user groups.

Using user group and SCIM groups together can be useful when the groups defined in the identity provider (IDP) don't map cleanly to the access you need to grant in Temporal Cloud. Instead of having to update the IDP (which is often sensitive and time-consuming), you can use Temporal Cloud user groups to manage access.

:::info

All user group administration requires an Account Owner or Global Admin account-level [role](/cloud/users#account-level-roles).

:::

## How to create a user group in your Temporal Cloud account {#create-group}

User group names must be 3-64 characters long and can only contain lowercase letters, numbers, hyphens, and underscores.

<Tabs>

<TabItem value="create-group-webui" label="Web UI">

1. Navigate to the [identities page](https://cloud.temporal.io/settings/identities)
1. Click the Create Group button
1. Name the group
1. Assign an account-level role to the group (you can assign namespace-level permissions after the group is created)
1. Click Save

</TabItem>

<TabItem value="create-group-tcld" label="tcld">
See the [`tcld` user-group create](/cloud/tcld/user-group/#create) command reference for details.
</TabItem>

<TabItem value="create-group-tf" label="Terraform">
See the [Terraform provider documentation](https://registry.terraform.io/providers/temporalio/temporalcloud/latest/docs/resources/group) for details.
</TabItem>

</Tabs>

## How to assign roles to a user group {#assign-group-roles}

<Tabs>
<TabItem value="assign-roles-webui" label="Web UI">

To edit the account role of a group:
  1. Navigate to the [identities page](https://cloud.temporal.io/settings/identities)
  1. Find the group to edit (You can filter the list of identities to only show groups to find the relevant group by clicking the Groups tab on the table)
  1. Click Edit Group
  1. Click the Account Role dropdown
  1. Select a new account role
  1. Click Save

To add namespace permissions to a group:
  1. Navigate to the [identities page](https://cloud.temporal.io/settings/identities)
  1. Find the group to edit (You can filter the list of identities to only show groups to find the relevant group by clicking the Groups tab on the table)
  1. Click Edit Group
  1. Click Add Namespaces
  1. Under Grant Access to a Namespace, search for the namespace you’d like to add permissions for
  1. Select the namespace
  1. Click the pencil to edit the permissions for the selected namespace
  1. Click Save

To edit or remove namespace permissions from a group:
  1. Click Edit Group
  1. Click the pencil on a permission to edit it, or the trash can to delete it
  1. Click Save

</TabItem>

<TabItem value="assign-roles-tcld" label="tcld">
See the [`tcld` user-group set-access](/cloud/tcld/user-group/#set-access) command reference for details.
</TabItem>

<TabItem value="assign-roles-tf" label="Terraform">
See the [Terraform provider documentation](https://registry.terraform.io/providers/temporalio/temporalcloud/latest/docs/resources/group) for details.
</TabItem>

</Tabs>

## How to manage users in a group {#assign-group-members}

<Tabs>
<TabItem value="assign-group-members-webui" label="Web UI">

To add users to the group:
  1. Navigate to the [identities page](https://cloud.temporal.io/settings/identities)
  1. Find the group to edit (You can filter the list of identities to only show groups to find the relevant group by clicking the Groups tab on the table)
  1. Click Edit Group
  1. Under Members, search for the user you’d like to add 
  1. Select the user
  1. Click Save
To remove a user from the group:
  1. Click Edit Group
  1. Under Members, click the X next to the user you’d like to remove
  1. Click Save

</TabItem>

<TabItem value="assign-group-members-tcld" label="tcld">
See the [`tcld` user-group add-users](/cloud/tcld/user-group/#add-users) and the [`tcld` user-group remove-users](/cloud/tcld/user-group/#remove-users) command reference for details.
</TabItem>

<TabItem value="assign-group-members-tf" label="Terraform">
See the [Terraform provider documentation](https://registry.terraform.io/providers/temporalio/temporalcloud/latest/docs/resources/group) for details.
</TabItem>

</Tabs>

## Delete a user group

<Tabs>
<TabItem value="delete-group-webui" label="Web UI">

  1. Navigate to the [identities page](https://cloud.temporal.io/settings/identities)
  1. Find the group to edit (You can filter the list of identities to only show groups to find the relevant group by clicking the Groups tab on the table)
  1. Click the dropdown next to the edit button
  1. Click Delete
  1. Confirm by clicking Delete

</TabItem>

<TabItem value="delete-group-tcld" label="tcld">
See the [`tcld` user-group delete](/cloud/tcld/user-group/#delete) command reference for details.
</TabItem>

<TabItem value="delete-group-tf" label="Terraform">
See the [Terraform provider documentation](https://registry.terraform.io/providers/temporalio/temporalcloud/latest/docs/resources/group) for details.
</TabItem>

</Tabs>



