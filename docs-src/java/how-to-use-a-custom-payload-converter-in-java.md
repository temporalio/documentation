---
id: how-to-use-a-custom-payload-converter-in-java
title: How to use a custom Payload Converter in Java
sidebar_label: Custom Payload Converter
description: Create a custom implementation of a `PayloadConverter` interface and use it to override the default Data Converter behavior.
tags:
  - Java
  - developer-guide
---

Create a custom implementation of a [`PayloadConverter`](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/PayloadConverter.html) interface and set it with `withPayloadConverterOverrides` to override specific default Data Converter behavior.

The `PayloadConverter` serializes and deserializes method parameters that need to be sent over the wire.
You can create a custom implementation of the `PayloadConverter` for custom formats, as shown in the following example:

```java
/** Payload Converter specific to your custom object */
public class YourCustomPayloadConverter implements PayloadConverter {
 //...
  @Override
  public String getEncodingType() {
    return "json/plain"; //the encoding type is used to determine what default conversion behavior to override
  }

  @Override
  public Optional<Payload> toData(Object value) throws DataConverterException {
      //your convert-to logic here
  }

  @Override
  public <T> T fromData(Payload content, Class<T> valueClass, Type valueType)
      throws DataConverterException {
    //your convert-from logic here.
  }
//...
}
```

You can also use the following implementation classes provided in the Java SDK:

- [ByteArrayPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/ByteArrayPayloadConverter.html)
- [GsonJsonPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/GsonJsonPayloadConverter.html)
- [JacksonJsonPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/JacksonJsonPayloadConverter.html)
- [NullPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/NullPayloadConverter.html)
- [ProtobufJsonPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/ProtobufJsonPayloadConverter.html)
- [ProtobufPayloadConverter](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/common/converter/ProtobufPayloadConverter.html)

For example, to create a custom `JacksonJsonPayloadConverter`, use the following:

```java
private static JacksonJsonPayloadConverter yourCustomJacksonJsonPayloadConverter() {
  ObjectMapper objectMapper = new ObjectMapper();
  // your custom conversion logic
  return new JacksonJsonPayloadConverter(objectMapper);
}
```

To set your custom `PayloadConverter`, use [`withPayloadConverterOverrides`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DefaultDataConverter.html#withPayloadConverterOverrides(io.temporal.common.converter.PayloadConverter...)) with a new instance of the `DefaultDataConverter` to override default behavior with the custom `PayloadConverter` in your `WorkflowClient` options that you use in your Worker process and to start your Workflow Executions.

The following example shows how to set a custom `YourCustomPayloadConverter` Payload Converter.

```java
DefaultDataConverter ddc =
        DefaultDataConverter.newDefaultInstance()
            .withPayloadConverterOverrides(new YourCustomPayloadConverter());

    WorkflowClientOptions workflowClientOptions =
        WorkflowClientOptions.newBuilder().setDataConverter(ddc).build();
```
