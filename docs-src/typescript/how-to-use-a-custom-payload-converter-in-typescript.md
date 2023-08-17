---
id: how-to-use-a-custom-payload-converter-in-typescript
title: How to use a custom payload converter in TypeScript
description: Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
sidebar_label: Custom payload conversion
tags:
  - guide-context
---

Temporal SDKs provide a [Payload Converter](/concepts/what-is-a-payload-converter) that can be customized to convert a custom data type to a [Payload](/concepts/what-is-a-payload) and back.

Implementing custom Payload conversion is optional.
It is needed only if the [default Data Converter](/concepts/what-is-a-default-data-converter) does not support your custom values.

To support custom Payload conversion, create a [custom Payload Converter](/concepts/what-is-a-payload-converter#custom-payload-conversion) and configure the Data Converter to use it in your Client options.

The order in which your encoding Payload Converters are applied depend on the order given to the Data Converter.
You can set multiple encoding Payload Converters to run your conversions.
When the Data Converter receives a value for conversion, it passes through each Payload Converter in sequence until the converter that handles the data type does the conversion.

To send values that are not [JSON-serializable](https://en.wikipedia.org/wiki/JSON#Data_types) like a `BigInt` or `Date`, provide a custom [Data Converter](https://typescript.temporal.io/api/interfaces/worker.DataConverter/) to the Client and Worker:

- [new WorkflowClient({ ..., dataConverter })](https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions#dataconverter)
- [Worker.create({ ..., dataConverter })](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#dataconverter)

A Data Converter has two parts:

- [Payload Converter](#payload-converter): Sync methods that sometimes run inside the Workflow isolate (and are thus limited).
- [Payload Codec](#payload-codec): Async methods that run outside the isolate.

```ts
interface DataConverter {
  payloadConverterPath?: string;
  payloadCodecs?: PayloadCodec[];
}
```

### Payload Converter

> API documentation: [PayloadConverter](https://typescript.temporal.io/api/interfaces/common.PayloadConverter)

```ts
interface PayloadConverter {
  /**
   * Converts a value to a {@link Payload}.
   * @param value The value to convert. Example values include the Workflow args sent by the client and the values returned by a Workflow or Activity.
   */
  toPayload<T>(value: T): Payload;

  /**
   * Converts a {@link Payload} back to a value.
   */
  fromPayload<T>(payload: Payload): T;
}
```

#### Custom implementation

Some example implementations are in the SDK itself:

- [common/src/converter/payload-converters.ts](https://github.com/temporalio/sdk-typescript/blob/main/packages/common/src/converter/payload-converters.ts)
- [common/src/converter/protobuf-payload-converters.ts](https://github.com/temporalio/sdk-typescript/blob/main/packages/common/src/converter/protobuf-payload-converters.ts)

The sample project [samples-typescript/ejson](https://github.com/temporalio/samples-typescript/tree/main/ejson) creates an EJSON custom `PayloadConverter`.
It implements `PayloadConverterWithEncoding` instead of `PayloadConverter` so that it could be used with [CompositePayloadConverter](https://typescript.temporal.io/api/classes/common.CompositePayloadConverter/):

<!--SNIPSTART typescript-ejson-converter-impl -->
[ejson/src/ejson-payload-converter.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/ejson-payload-converter.ts)
```ts
import {
  EncodingType,
  METADATA_ENCODING_KEY,
  Payload,
  PayloadConverterWithEncoding,
  PayloadConverterError,
} from '@temporalio/common';
import EJSON from 'ejson';
import { decode, encode } from '@temporalio/common/lib/encoding';

/**
 * Converts between values and [EJSON](https://docs.meteor.com/api/ejson.html) Payloads.
 */
export class EjsonPayloadConverter implements PayloadConverterWithEncoding {
  // Use 'json/plain' so that Payloads are displayed in the UI
  public encodingType = 'json/plain' as EncodingType;

  public toPayload(value: unknown): Payload | undefined {
    if (value === undefined) return undefined;
    let ejson;
    try {
      ejson = EJSON.stringify(value);
    } catch (e) {
      throw new UnsupportedEjsonTypeError(
        `Can't run EJSON.stringify on this value: ${value}. Either convert it (or its properties) to EJSON-serializable values (see https://docs.meteor.com/api/ejson.html ), or create a custom data converter. EJSON.stringify error message: ${errorMessage(
          e
        )}`,
        e as Error
      );
    }

    return {
      metadata: {
        [METADATA_ENCODING_KEY]: encode('json/plain'),
        // Include an additional metadata field to indicate that this is an EJSON payload
        format: encode('extended'),
      },
      data: encode(ejson),
    };
  }

  public fromPayload<T>(content: Payload): T {
    return content.data ? EJSON.parse(decode(content.data)) : content.data;
  }
}

export class UnsupportedEjsonTypeError extends PayloadConverterError {
  public readonly name: string = 'UnsupportedJsonTypeError';

  constructor(message: string | undefined, public readonly cause?: Error) {
    super(message ?? undefined);
  }
}
```
<!--SNIPEND-->

Then we instantiate one and export it:

<!--SNIPSTART typescript-ejson-converter -->
[ejson/src/payload-converter.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/payload-converter.ts)
```ts
import { CompositePayloadConverter, UndefinedPayloadConverter } from '@temporalio/common';
import { EjsonPayloadConverter } from './ejson-payload-converter';

export const payloadConverter = new CompositePayloadConverter(
  new UndefinedPayloadConverter(),
  new EjsonPayloadConverter()
);
```
<!--SNIPEND-->

We provide it to the Worker and Client:

<!--SNIPSTART typescript-ejson-worker -->
[ejson/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/worker.ts)
```ts
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'ejson',
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') },
  });
```
<!--SNIPEND-->

<!--SNIPSTART typescript-ejson-client-setup -->
[ejson/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/client.ts)
```ts
  const client = new Client({
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') },
  });
```
<!--SNIPEND-->

Then we can use supported data types in arguments:

<!--SNIPSTART typescript-ejson-client -->
[ejson/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/client.ts)
```ts
  const user: User = {
    id: uuid(),
    // age: 1000n, BigInt isn't supported
    hp: Infinity,
    matcher: /.*Stormblessed/,
    token: Uint8Array.from([1, 2, 3]),
    createdAt: new Date(),
  };

  const handle = await client.workflow.start(example, {
    args: [user],
    taskQueue: 'ejson',
    workflowId: `example-user-${user.id}`,
  });
```
<!--SNIPEND-->

And they get parsed correctly for the Workflow:

<!--SNIPSTART typescript-ejson-workflow -->
[ejson/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/workflows.ts)
```ts
import type { Result, User } from './types';

export async function example(user: User): Promise<Result> {
  const success =
    user.createdAt.getTime() < Date.now() &&
    user.hp > 50 &&
    user.matcher.test('Kaladin Stormblessed') &&
    user.token instanceof Uint8Array;
  return { success, at: new Date() };
}
```
<!--SNIPEND-->

#### Protobufs

To serialize values as [Protocol Buffers](https://protobuf.dev/) (protobufs):

- Use [protobufjs](https://protobufjs.github.io/protobuf.js/).
- Use runtime-loaded messages (not generated classes) and `MessageClass.create` (not `new MessageClass()`).
- Generate `json-module.js` with a command like the following:

  ```sh
  pbjs -t json-module -w commonjs -o protos/json-module.js protos/*.proto
  ```

- Patch `json-module.js`:

  <!--SNIPSTART typescript-protobuf-root -->
[protobufs/protos/root.js](https://github.com/temporalio/samples-typescript/blob/master/protobufs/protos/root.js)
```js
const { patchProtobufRoot } = require('@temporalio/common/lib/protobufs');
const unpatchedRoot = require('./json-module');
module.exports = patchProtobufRoot(unpatchedRoot);
```
<!--SNIPEND-->

- Generate `root.d.ts` with the following command:

  ```sh
  pbjs -t static-module protos/*.proto | pbts -o protos/root.d.ts -
  ```

- Create a [`DefaultPayloadConverterWithProtobufs`](https://typescript.temporal.io/api/classes/protobufs.DefaultPayloadConverterWithProtobufs/):

  <!--SNIPSTART typescript-protobuf-converter -->
[protobufs/src/payload-converter.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/payload-converter.ts)
```ts
import { DefaultPayloadConverterWithProtobufs } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new DefaultPayloadConverterWithProtobufs({ protobufRoot: root });
```
<!--SNIPEND-->

Alternatively, we can use Protobuf Payload Converters directly, or with other converters.
If we know that we only use Protobuf objects, and we want them binary encoded (which saves space over proto3 JSON, but can't be viewed in the Web UI), we could do the following:

```ts
import { ProtobufBinaryPayloadConverter } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new ProtobufBinaryPayloadConverter(root);
```

Similarly, if we wanted binary-encoded Protobufs in addition to the other default types, we could do the following:

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
  new JsonPayloadConverter(),
);
```

- Provide it to the Worker:

  <!--SNIPSTART typescript-protobuf-worker -->
[protobufs/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/worker.ts)
```ts
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'protobufs',
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') },
  });
```
<!--SNIPEND-->

[WorkerOptions.dataConverter](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#dataconverter)

- Provide it to the Client:

  <!--SNIPSTART typescript-protobuf-client -->
[protobufs/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/client.ts)
```ts
import { Client } from '@temporalio/client';
import { v4 as uuid } from 'uuid';
import { foo, ProtoResult } from '../protos/root';
import { example } from './workflows';

async function run() {
  const client = new Client({
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') },
  });

  const handle = await client.workflow.start(example, {
    args: [foo.bar.ProtoInput.create({ name: 'Proto', age: 2 })],
    // can't do:
    // args: [new foo.bar.ProtoInput({ name: 'Proto', age: 2 })],
    taskQueue: 'protobufs',
    workflowId: 'my-business-id-' + uuid(),
  });

  console.log(`Started workflow ${handle.workflowId}`);

  const result: ProtoResult = await handle.result();
  console.log(result.toJSON());
}
```
<!--SNIPEND-->

- Use protobufs in your Workflows and Activities:

  <!--SNIPSTART typescript-protobuf-workflow -->
[protobufs/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/workflows.ts)
```ts
import { proxyActivities } from '@temporalio/workflow';
import { foo, ProtoResult } from '../protos/root';
import type * as activities from './activities';

const { protoActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function example(input: foo.bar.ProtoInput): Promise<ProtoResult> {
  const result = await protoActivity(input);
  return result;
}
```
<!--SNIPEND-->

<!--SNIPSTART typescript-protobuf-activity -->
[protobufs/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/activities.ts)
```ts
import { foo, ProtoResult } from '../protos/root';

export async function protoActivity(input: foo.bar.ProtoInput): Promise<ProtoResult> {
  return ProtoResult.create({ sentence: `${input.name} is ${input.age} years old.` });
}
```
<!--SNIPEND-->

### Payload Codec

> API documentation: [PayloadCodec](https://typescript.temporal.io/api/interfaces/common.PayloadCodec)

The default `PayloadCodec` does nothing. To create a custom one, we implement the following interface:

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

> Background: [Encryption](/dataconversion#encryption)

The following is an example class that implements the `PayloadCodec` interface:

<!--SNIPSTART typescript-encryption-codec -->
[encryption/src/encryption-codec.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/encryption-codec.ts)
```ts
import { webcrypto as crypto } from 'node:crypto';
import { METADATA_ENCODING_KEY, Payload, PayloadCodec, ValueError } from '@temporalio/common';
import { temporal } from '@temporalio/proto';
import { decode, encode } from '@temporalio/common/lib/encoding';
import { decrypt, encrypt } from './crypto';

const ENCODING = 'binary/encrypted';
const METADATA_ENCRYPTION_KEY_ID = 'encryption-key-id';

export class EncryptionCodec implements PayloadCodec {
  constructor(protected readonly keys: Map<string, crypto.CryptoKey>, protected readonly defaultKeyId: string) {}

  static async create(keyId: string): Promise<EncryptionCodec> {
    const keys = new Map<string, crypto.CryptoKey>();
    keys.set(keyId, await fetchKey(keyId));
    return new this(keys, keyId);
  }

  async encode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => ({
        metadata: {
          [METADATA_ENCODING_KEY]: encode(ENCODING),
          [METADATA_ENCRYPTION_KEY_ID]: encode(this.defaultKeyId),
        },
        // Encrypt entire payload, preserving metadata
        data: await encrypt(
          temporal.api.common.v1.Payload.encode(payload).finish(),
          this.keys.get(this.defaultKeyId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
        ),
      }))
    );
  }

  async decode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => {
        if (!payload.metadata || decode(payload.metadata[METADATA_ENCODING_KEY]) !== ENCODING) {
          return payload;
        }
        if (!payload.data) {
          throw new ValueError('Payload data is missing');
        }

        const keyIdBytes = payload.metadata[METADATA_ENCRYPTION_KEY_ID];
        if (!keyIdBytes) {
          throw new ValueError('Unable to decrypt Payload without encryption key id');
        }

        const keyId = decode(keyIdBytes);
        let key = this.keys.get(keyId);
        if (!key) {
          key = await fetchKey(keyId);
          this.keys.set(keyId, key);
        }
        const decryptedPayloadBytes = await decrypt(payload.data, key);
        console.log('Decrypting payload.data:', payload.data);
        return temporal.api.common.v1.Payload.decode(decryptedPayloadBytes);
      })
    );
  }
}

async function fetchKey(_keyId: string): Promise<crypto.CryptoKey> {
  // In production, fetch key from a key management system (KMS). You may want to memoize requests if you'll be decoding
  // Payloads that were encrypted using keys other than defaultKeyId.
  const key = Buffer.from('test-key-test-key-test-key-test!');
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    {
      name: 'AES-GCM',
    },
    true,
    ['encrypt', 'decrypt']
  );

  return cryptoKey;
}
```
<!--SNIPEND-->

The encryption and decryption code is in [src/crypto.ts](https://github.com/temporalio/samples-typescript/tree/main/encryption/src/crypto.ts).
Because encryption is CPU intensive, and doing AES with the crypto module built into Node.js blocks the main thread, we use `@ronomon/crypto-async`, which uses the Node.js thread pool.

As before, we provide a custom Data Converter to the Client and Worker:

<!--SNIPSTART typescript-encryption-client -->
[encryption/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/client.ts)
```ts
  const client = new Client({
    dataConverter: await getDataConverter(),
  });

  const handle = await client.workflow.start(example, {
    args: ['Alice: Private message for Bob.'],
    taskQueue: 'encryption',
    workflowId: `my-business-id-${uuid()}`,
  });

  console.log(`Started workflow ${handle.workflowId}`);
  console.log(await handle.result());
```
<!--SNIPEND-->

<!--SNIPSTART typescript-encryption-worker -->
[encryption/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/worker.ts)
```ts
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'encryption',
    dataConverter: await getDataConverter(),
  });
```
<!--SNIPEND-->

When the Client sends `'Alice: Private message for Bob.'` to the Workflow, it gets encrypted on the Client and decrypted in the Worker.
The Workflow receives the decrypted message and appends another message.
When it returns that longer string, the string gets encrypted by the Worker and decrypted by the Client.

<!--SNIPSTART typescript-encryption-workflow -->
[encryption/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/workflows.ts)
```ts
export async function example(message: string): Promise<string> {
  return `${message}\nBob: Hi Alice, I'm Workflow Bob.`;
}
```
<!--SNIPEND-->
