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

Define custom encryption/compression logic in your `encode` method and decryption/decompression logic in your `decode` method.

The following example from the [Java encryption sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/encryptedpayloads/CryptCodec.java) shows how to implement encryption and decryption logic on your payloads in your `encode` and `decode` methods.

```java
class YourCustomPayloadCodec implements PayloadCodec {

  static final ByteString METADATA_ENCODING =
      ByteString.copyFrom("binary/encrypted", StandardCharsets.UTF_8);

  private static final String CIPHER = "AES/GCM/NoPadding";

  // Define constants that you can add to your encoded Payload to create a new Payload.
  static final String METADATA_ENCRYPTION_CIPHER_KEY = "encryption-cipher";

  static final ByteString METADATA_ENCRYPTION_CIPHER =
      ByteString.copyFrom(CIPHER, StandardCharsets.UTF_8);

  static final String METADATA_ENCRYPTION_KEY_ID_KEY = "encryption-key-id";

  private static final Charset UTF_8 = StandardCharsets.UTF_8;

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
    String keyId = getKeyId();
    SecretKey key = getKey(keyId);

    byte[] encryptedData;
    try {
      encryptedData = encrypt(payload.toByteArray(), key); // The encrypt method contains your custom encryption logic.
    } catch (Throwable e) {
      throw new DataConverterException(e);
    }
    // Apply metadata to the encoded Payload that you can verify in your decode method before decoding.
    // See the sample for details on the metadata values set.
    return Payload.newBuilder()
        .putMetadata(EncodingKeys.METADATA_ENCODING_KEY, METADATA_ENCODING)
        .putMetadata(METADATA_ENCRYPTION_CIPHER_KEY, METADATA_ENCRYPTION_CIPHER)
        .putMetadata(METADATA_ENCRYPTION_KEY_ID_KEY, ByteString.copyFromUtf8(keyId))
        .setData(ByteString.copyFrom(encryptedData))
        .build();
  }

  private Payload decodePayload(Payload payload) {
    // Verify the incoming encoded Payload metadata before applying decryption.
    if (METADATA_ENCODING.equals(
        payload.getMetadataOrDefault(EncodingKeys.METADATA_ENCODING_KEY, null))) {
      String keyId;
      try {
        keyId = payload.getMetadataOrThrow(METADATA_ENCRYPTION_KEY_ID_KEY).toString(UTF_8);
      } catch (Exception e) {
        throw new PayloadCodecException(e);
      }
      SecretKey key = getKey(keyId);
      byte[] plainData;
      Payload decryptedPayload;

      try {
        plainData = decrypt(payload.getData().toByteArray(), key); // The decrypt method contains your custom decryption logic.
        decryptedPayload = Payload.parseFrom(plainData);
        return decryptedPayload;
      } catch (Throwable e) {
        throw new PayloadCodecException(e);
      }
    } else {
      return payload;
    }
  }

  private String getKeyId() {
    // Currently there is no context available to vary which key is used.
    // Use a fixed key for all payloads.
    // This still supports key rotation as the key ID is recorded on payloads allowing
    // decryption to use a previous key.

    return "test-key-test-key-test-key-test!";
  }

  private SecretKey getKey(String keyId) {
    // Key must be fetched from KMS or other secure storage.
    // Hard coded here only for example purposes.
    return new SecretKeySpec(keyId.getBytes(UTF_8), "AES");
  }

  //...
}
```

**Set Data Converter to use custom Payload Codec**

Use `CodecDataConverter` with an instance of a Data Converter and the custom `PayloadCodec` in the `WorkflowClient` options that you use in your Worker process and to start your Workflow Executions.

For example, to set a custom `PayloadCodec` implementation with `DefaultDataConverter`, use the following code:

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

For example implementations, see the following samples:

- [Encrypted Payloads](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [Remote Data Encoder and Codec Server](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
