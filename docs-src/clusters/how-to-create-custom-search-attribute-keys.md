---
id: how-to-create-custom-search-attribute-keys
title: How to create custom Search Attributes
sidebar_label: Create custom Search Attributes
description: Add custom Search Attributes to your Visibility store using `tctl` for self-hosted Temporal Cluster, and `tcld` for Temporal Cloud.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

Add custom Search Attributes to your Visibility store using `tctl` for self-hosted Temporal Cluster, and `tcld` for Temporal Cloud.

Creating a custom Search Attribute in your Visibility store makes it available to use in your [Workflow metadata](/application-development/observability#search-attributes) and [List Filters](/concepts/what-is-a-list-filter).

**On Temporal Cloud**

To create custom Search Attributes on Temporal Cloud, use [`tcld namespace search-attributes add`](/cloud/tcld/namespace#search-attributes).
For example, to add a custom Search Attributes "CustomSA" to your Temporal Cloud Namespace "YourNamespace", run the following command.
`tcld namespace search-attributes add --namespace YourNamespace --search-attribute "CustomSA"`

**On self-hosted Temporal Cluster**

If you're self-hosting your Temporal Cluster, verify whether your [Visibility database](/clusters/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) version supports Advanced Visibility features.

To create custom Search Attributes in your self-hosted Temporal Cluster Visibility store, use [`tctl search-attribute create`](/tctl-next/search-attribute#create) with `--name` and `--type` modifiers.

For example, to create a Search Attribute called `CustomSA` of type `Keyword`, run the following command:

`tctl search-attribute create --name CustomSA --type Keyword`

Note that if you use a SQL database with Advanced Visibility capabilities, you are required to specify a Namespace when creating a custom Search Attribute.
For example: `tctl --ns yournamespace search-attribute create --name CustomSA --type Keyword`

You can also create multiple custom Search Attributes when you set up your Visibility store.

For example, the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script that is used to set up your local [docker-compose Temporal Cluster](https://github.com/temporalio/docker-compose) creates custom Search Attributes in the Visibility store, as shown in the following code snippet from the script (for SQL databases).

```bash
add_custom_search_attributes() {
    until temporal operator search-attribute list --namespace "${DEFAULT_NAMESPACE}"; do
      echo "Waiting for namespace cache to refresh..."
      sleep 1
    done
    echo "Namespace cache refreshed."

    echo "Adding Custom*Field search attributes."

    temporal operator search-attribute create --namespace "${DEFAULT_NAMESPACE}" --yes \
        --name CustomKeywordField --type Keyword \
        --name CustomStringField --type Text \
        --name CustomTextField --type Text \
        --name CustomIntField --type Int \
        --name CustomDatetimeField --type Datetime \
        --name CustomDoubleField --type Double \
        --name CustomBoolField --type Bool
}
```

Note that this script has been updated for Temporal Server v1.20, which requires associating every custom Search Attribute with a Namespace when using a SQL database.

For Temporal Server v1.19 and earlier, or if using Elasticsearch for Advanced Visibility, you can create custom Search Attributes without a Namespace association, as shown in the following example.

```bash
add_custom_search_attributes() {
       echo "Adding Custom*Field search attributes."
       tctl --auto_confirm admin cluster add-search-attributes \
           --name CustomKeywordField --type Keyword \
           --name CustomStringField --type Text \
           --name CustomTextField --type Text \
           --name CustomIntField --type Int \
           --name CustomDatetimeField --type Datetime \
           --name CustomDoubleField --type Double \
           --name CustomBoolField --type Bool
 }
```

When your Visibility store is set up and running, these custom Search Attributes are available to use in your Workflow code.
