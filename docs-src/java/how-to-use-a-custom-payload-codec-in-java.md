---
id: how-to-use-a-custom-payload-codec-in-java
title: How to use a custom Payload Codec in Java
sidebar_label: Custom Payload Codec
description: Create a custom implementation of `PayloadCodec` and use it in `CodecDataConverter` to set a custom Data Converter.
tags:
  - Java
  - developer-guide
---

**Create a custom Payload Codec**

Create a custom implementation of [`PayloadCodec`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/payload/codec/PayloadCodec.html) and use it in [`CodecDataConverter`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/CodecDataConverter.html) to set a custom Data Converter.

The Payload Codec does byte-to-byte conversion and must be set with a Data Converter.

Define custom encryption/compression logic in your `encode` method, and decryption/decompression logic in your `decode` method.

The following example from the [Java encryption sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/encryptedpayloads/CryptCodec.java) shows how to implement encryption and decryption logic on your payloads in your `encode` and `decode` methods.

```java
class YourCustomPayloadCodec implements PayloadCodec {
  //...

  // See the linked sample for details on the methods called here.
  @NotNull
  @Override
  public List<Payload> encode(@NotNull List<Payload> payloads) {
    return payloads.stream().map(this::encodePayload).collect(Collectors.toList());
  }

  @NotNull
  @Override
  public List<Payload> decode(@NotNull List<Payload> payloads) {
    return payloads.stream().map(this::decodePayload).collect(Collectors.toList());
  }

  private Payload encodePayload(Payload payload) {
    String keyId = getKeyId(); // Get a fixed key Id from the getKeyId method. See the sample for details.
    SecretKey key = getKey(keyId); // Get an AES key defined in the getKey method. See sample for details.

    byte[] encryptedData;
    try {
      encryptedData = encrypt(payload.toByteArray(), key);
    } catch (Throwable e) {
      throw new DataConverterException(e);
    }
    // Apply metadata to the encoded payload that you can verify in your decode method before decoding.
    // See the sample for details on the metadata values set.
    return Payload.newBuilder()
        .putMetadata(EncodingKeys.METADATA_ENCODING_KEY, METADATA_ENCODING)
        .putMetadata(METADATA_ENCRYPTION_CIPHER_KEY, METADATA_ENCRYPTION_CIPHER)
        .putMetadata(METADATA_ENCRYPTION_KEY_ID_KEY, ByteString.copyFromUtf8(keyId))
        .setData(ByteString.copyFrom(encryptedData))
        .build();
  }

  private Payload decodePayload(Payload payload) {
    // Verify the incoming encoded payload metadata before applying decryption.
    if (METADATA_ENCODING.equals(
        payload.getMetadataOrDefault(EncodingKeys.METADATA_ENCODING_KEY, null))) {
      String keyId;
      try {
        keyId = payload.getMetadataOrThrow(METADATA_ENCRYPTION_KEY_ID_KEY).toString(UTF_8);
      } catch (Exception e) {
        throw new PayloadCodecException(e);
      }
      SecretKey key = getKey(keyId); // Gets the AES key defined in the getKey method which was used for the encryption. See sample for details.

      byte[] plainData;
      Payload decryptedPayload;

      try {
        plainData = decrypt(payload.getData().toByteArray(), key);
        decryptedPayload = Payload.parseFrom(plainData);
        return decryptedPayload;
      } catch (Throwable e) {
        throw new PayloadCodecException(e);
      }
    } else {
      return payload;
    }
  }
  //...
}
```

**Set Data Converter to use custom Payload Codec**

Use `CodecDataConverter` with an instance of a Data Converter and the custom `PayloadCodec` in the `WorkflowClient` options that you use in your Worker process and to start your Workflow Executions.

For example, to set a custom `PayloadCodec` implementation with the `DefaultDataConverter`, use the following code:

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
  // Client that can be used to start and signal Workflows
  WorkflowClient client =
      WorkflowClient.newInstance(
          service,
          WorkflowClientOptions.newBuilder()
              .setDataConverter(
                  new CodecDataConverter(
                      DefaultDataConverter.newDefaultInstance(),
                      Collections.singletonList(new YourCustomPayloadCodec()))) // Sets the custom Payload Codec created in the previous example with an instance of the default Data Converter.
              .build());
```

See the following samples for example implementations:

- [Encrypted Payloads](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [Remote Data Encoder and Codec Server](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
