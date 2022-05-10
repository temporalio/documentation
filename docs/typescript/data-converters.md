---
id: data-converters
title: Data Converters
sidebar_label: Data Converters
description: Learn and customize how data is serialized in the TypeScript SDK
---

> Background reading: [Data Converters in Temporal](/concepts/what-is-a-data-converter/)

Contents:

import TOCInline from '@theme/TOCInline'

<TOCInline
  toc={toc}
  maxHeadingLevel={4}
/>

## Default Data Converter

In TypeScript, the default Data Converter supports:

- `undefined`
- `Uint8Array`
- JSON

## Custom Data Converter

> API doc: [DataConverter](https://typescript.temporal.io/api/interfaces/worker.dataconverter/)

To send values that are not [JSON-serializable](https://en.wikipedia.org/wiki/JSON#Data_types) like `BigInt`s or `Date`s, provide a custom Data Converter to the Client and Worker:

- [`new WorkflowClient({ ..., dataConverter })`](https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions#dataconverter)
- [`Worker.create({ ..., dataConverter })`](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#dataconverter)

Data Converters have [two parts](/concepts/what-is-a-data-converter#payload-codecs):

- [`PayloadConverter`](#payloadconverter): sync methods that sometimes run inside the Workflow isolate (and are thus [limited](/typescript/determinism#imports-in-workflow-code))
- [`PayloadCodec`](#payloadcodec): async methods that are run outside the isolate

```ts
interface DataConverter {
  payloadConverterPath?: string;
  payloadCodec?: PayloadCodec;
}
```

### `PayloadConverter`

> API doc: [PayloadConverter](https://typescript.temporal.io/api/interfaces/common.PayloadConverter)

```ts
interface PayloadConverter {
  /**
   * Converts a value to a {@link Payload}.
   * @param value The value to convert. Example values include the Workflow args sent by the client and the values returned by a Workflow or Activity.
   */
  toPayload<T>(value: T): Payload | undefined;

  /**
   * Converts a {@link Payload} back to a value.
   */
  fromPayload<T>(payload: Payload): T;
}
```

#### Custom implementation

Some example implementations are in the SDK itself:

- [`common/src/converter/payload-converters.ts`](https://github.com/temporalio/sdk-typescript/blob/main/packages/common/src/converter/payload-converters.ts)
- [`common/src/converter/protobuf-payload-converters.ts`](https://github.com/temporalio/sdk-typescript/blob/main/packages/common/src/converter/protobuf-payload-converters.ts)

There's also a sample project that creates an EJSON custom `PayloadConverter`: [samples-typescript/ejson](https://github.com/temporalio/samples-typescript/tree/main/ejson)

It implements `PayloadConverterWithEncoding` instead of `PayloadConverter` so that it could be used with [`CompositePayloadConverter`](https://typescript.temporal.io/api/classes/common.compositepayloadconverter/):

<!--SNIPSTART typescript-ejson-converter-impl -->
<!--SNIPEND-->

Then we instantiate one and export it:

<!--SNIPSTART typescript-ejson-converter -->
<!--SNIPEND-->

We provide it to the Worker and Client:

<!--SNIPSTART typescript-ejson-worker -->
<!--SNIPEND-->

<!--SNIPSTART typescript-ejson-client-setup -->
<!--SNIPEND-->

Then we can use supported data types in arguments:

<!--SNIPSTART typescript-ejson-client -->
<!--SNIPEND-->

And they get parsed correctly for the Workflow:

<!--SNIPSTART typescript-ejson-workflow -->
<!--SNIPEND-->

#### Protobufs

To serialize values as [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers):

- Use [`protobufjs`](https://protobufjs.github.io/protobuf.js/)
- Use runtime-loaded messages (not generated classes) and `MessageClass.create` (not `new MessageClass()`)
- Generate `json-module.js` with a command like:

  ```sh
  pbjs -t json-module -w commonjs -o protos/json-module.js protos/*.proto
  ```

- Patch `json-module.js`:

<!--SNIPSTART typescript-protobuf-root -->
<!--SNIPEND-->

- Generate `root.d.ts` with:

  ```sh
  pbjs -t static-module protos/*.proto | pbts -o protos/root.d.ts -
  ```

- Create a [`DefaultPayloadConverterWithProtobufs`](https://typescript.temporal.io/api/classes/protobufs.defaultpayloadconverterwithprotobufs/):

<!--SNIPSTART typescript-protobuf-converter -->
<!--SNIPEND-->

Alternatively, we can use Protobuf Payload Converters directly, or with other converters. If we know that we only use Protobuf objects, and we want them binary encoded (which saves space over proto3 JSON, but can't be viewed in the Web UI), we could do:

```ts
import { ProtobufBinaryPayloadConverter } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new ProtobufBinaryPayloadConverter(root);
```

Similarly, if we wanted binary encoded Protobufs in addition to the other [default types](#default-data-converter), we could do:

```ts
import {
  BinaryPayloadConverter,
  CompositePayloadConverter,
  JsonPayloadConverter,
  UndefinedPayloadConverter,
} from '@temporalio/common';
import { ProtobufBinaryPayloadConverter } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new CompositePayloadConverter(
  new UndefinedPayloadConverter(),
  new BinaryPayloadConverter(),
  new ProtobufBinaryPayloadConverter(root),
  new JsonPayloadConverter()
);
```

- Provide it to the Worker:

<!--SNIPSTART typescript-protobuf-worker -->
<!--SNIPEND-->

[`WorkerOptions.dataConverter`](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#dataconverter)

- Provide it to the Client:

<!--SNIPSTART typescript-protobuf-client -->
<!--SNIPEND-->

- Use protobufs in our Workflows and Activities:

<!--SNIPSTART typescript-protobuf-workflow -->
<!--SNIPEND-->

<!--SNIPSTART typescript-protobuf-activity -->
<!--SNIPEND-->

### `PayloadCodec`

> API doc: [PayloadCodec](https://typescript.temporal.io/api/interfaces/common.PayloadCodec)

The default `PayloadCodec` does nothing. To create a custom one, we implement this interface:

```ts
interface PayloadCodec {
  /**
   * Encode an array of {@link Payload}s for sending over the wire.
   * @param payloads May have length 0.
   */
  encode(payloads: Payload[]): Promise<Payload[]>;

  /**
   * Decode an array of {@link Payload}s received from the wire.
   */
  decode(payloads: Payload[]): Promise<Payload[]>;
}
```

#### Encryption

> Background: [Data Converter ➡️ Encryption](/concepts/what-is-a-data-converter#encryption)

Here's an example class that implements the `PayloadCodec` interface:

<!--SNIPSTART typescript-encryption-codec -->
<!--SNIPEND-->

The encryption and decryption code is in [`src/crypto.ts`](https://github.com/temporalio/samples-typescript/tree/main/encryption/src/crypto.ts). Since encryption is CPU-intensive, and doing AES with Node's built-in crypto module blocks the main thread, we use `@ronomon/crypto-async`, which uses Node's threadpool.

As before, we provide a custom data converter to the Client and Worker:

<!--SNIPSTART typescript-encryption-client -->
<!--SNIPEND-->

<!--SNIPSTART typescript-encryption-worker -->
<!--SNIPEND-->

When the Client sends `'Alice: Private message for Bob.'` to the Workflow, it gets encrypted on the Client and decrypted in the Worker. The Workflow receives the decrypted message and appends another message. When it returns that longer string, the string gets encrypted by the Worker and decrypted by the Client.

<!--SNIPSTART typescript-encryption-workflow -->
<!--SNIPEND-->
