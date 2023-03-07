---
id: how-to-create-custom-search-attribute-keys
title: How to create custom Search Attributes
sidebar_label: Create custom Search Attributes
description: Add custom Search Attributes to your Visibility store using `tctl`.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

Before you create [custom Search Attributes](/concepts/what-is-a-search-attribute#custom-search-attribute), verify whether your [Visibility database](/clusters/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) version supports Advanced Visibility features.

To create custom Search Attributes in your Visibility store, use [`tctl search-attribute create`](/tctl-next/search-attribute#create) with `--name` and `--type` modifier.

For example, to create a Search Attribute called `CustomSA` of type `Keyword`, run:

`tctl --ns yournamespace search-attribute create --name CustomSA --type Keyword`

You can also create a list of custom Search Attributes at the time of setting up your Visibility store.

For example, the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script that is used to set up your local [docker-compose Temporal Cluster](https://github.com/temporalio/docker-compose) creates a list of custom Search Attributes in the Visibility store (that are handy for testing locally), as shown in the following code snippet from the script.

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

Note that this script has been updated for Temporal Server v1.20, which requires associating every custom Search Attribute with a Namespace.

For Temporal Server v1.19 and earlier, you can create custom Search Attributes without a Namespace association, as shown in the following example.

```bash
add_custom_search_attributes() {
    until temporal operator search-attribute list --namespace "${DEFAULT_NAMESPACE}"; do
      echo "Waiting for namespace cache to refresh..."
      sleep 1
    done
    echo "Namespace cache refreshed."

    echo "Adding Custom*Field search attributes."
tctl --auto_confirm admin cluster add-search-attributes \
           --name CustomKeywordField --type Keyword \
           --name CustomStringField --type Text \
           --name CustomTextField --type Text \
           --name CustomIntField --type Int \
           --name CustomDatetimeField --type Datetime \
           --name CustomDoubleField --type Double \
           --name CustomBoolField --type Bool
```

Once your Visibility store is set up and running, these custom Search Attributes are available to use in your Workflow code.
