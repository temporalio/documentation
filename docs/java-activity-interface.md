---
id: java-activity-interface
title: Activity Interface
---

An Activity is a manifestation of a particular task in the business logic.

Activities are defined as methods of a plain Java interface annotated with `@ActivityInterface`.
Each method defines a single Activity type. A single Workflow can use more than one Activity interface and call more
that one Activity method from the same interface.
The only requirement is that Activity method arguments and return values are serializable to a byte array using the provided
[DataConverter](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html)
interface. The default implementation uses a JSON serializer, but an alternative implementation can be easily configured.

Following is an example of an interface that defines four Activities:

```java
@ActivityInterface
public interface FileProcessingActivities {

    void upload(String bucketName, String localName, String targetName);

    String download(String bucketName, String remoteName);

    @ActivityMethod(name="transcode_file")
    String processFile(String localName);

    void deleteLocalFile(String fileName);
}

```
We recommend to use a single value type argument for Activity methods. In this way, adding new arguments as fields
to the value type is a backwards-compatible change.

An optional `@ActivityMethod` annotation can be used to override a default Activity name.
