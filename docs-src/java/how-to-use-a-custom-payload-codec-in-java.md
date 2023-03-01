---
id: how-to-use-a-custom-payload-codec-in-java
title: How to use a custom Payload Codec in Java
sidebar_label: Custom Payload Codec
description: Create a custom implementation of the `PayloadCodec` and use it in a `CodecDataConverter` to set a custom Data Converter.
tags:
  - Java
  - developer-guide
---

**Create a custom Payload Codec**

Create a custom implementation of the [`PayloadCodec`](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.18.1/io/temporal/payload/codec/PayloadCodec.html) and use it in a [`CodecDataConverter`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/CodecDataConverter.html)) to set a custom Data Converter.

The Payload Codec does byte to byte conversion, and must be set with a Data Converter to do the conversion to bytes and values.

Define custom encryption/compression logic in your `encode` method, and decryption/decompression logic in your `decode` method.

```java
public class YourCustomPayloadCodec implements PayloadCodec {
    @NotNull
    @Override
    public List<Payload> encode(@NotNull List<Payload> payloads) {
        //your encryption/compression logic
    }

    @NotNull
    @Override
    public List<Payload> decode(@NotNull List<Payload> payloads) {
        //your decryption/decompression logic
    }
    //...
}
```

You can also create a remote HTTP server (called Codec Server) to run the encryption and decryption through the custom `PayloadCodec`, and expose endpoints that you can use with WebUI and tctl to see decrypted data.

**Set Data Converter to use custom Payload Codec**

Use `CodecDataConverter` with an instance of a Data Converter and the custom `PayloadCodec` in the `WorkflowClient` options that you use in your Worker process and to start your Workflow Executions.

For example, to set a custom `PayloadCodec` implementation with the `DefaultDataConverter`, use:

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
  // client that can be used to start and signal workflows
  WorkflowClient client =
      WorkflowClient.newInstance(
          service,
          WorkflowClientOptions.newBuilder()
              .setDataConverter(
                  new CodecDataConverter(
                      DefaultDataConverter.newDefaultInstance(),
                      Collections.singletonList(new YourCustomPayloadCodec())))
              .build());
```

See the following samples for example implementations:

- [Encrypted Payloads](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [Remote Data Encoder and Codec Server](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
