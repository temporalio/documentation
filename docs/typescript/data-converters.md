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
[ejson/src/ejson-payload-converter.ts](https://github.com/temporalio/samples-typescript/blob/master/ejson/src/ejson-payload-converter.ts)
```ts
import {
  EncodingType,
  errorMessage,
  METADATA_ENCODING_KEY,
  Payload,
  PayloadConverterWithEncoding,
  str,
  u8,
} from '@temporalio/common';
import { PayloadConverterError } from '@temporalio/internal-workflow-common';
import EJSON from 'ejson';

/**
 * Converts between values and [EJSON](https://docs.meteor.com/api/ejson.html) Payloads.
 */
export class EjsonPayloadConverter implements PayloadConverterWithEncoding {
  public encodingType = 'ejson/plain' as EncodingType;

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
        [METADATA_ENCODING_KEY]: u8('ejson/plain'),
      },
      data: u8(ejson),
    };
  }

  public fromPayload<T>(content: Payload): T {
    return content.data ? EJSON.parse(str(content.data)) : content.data;
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
  const client = new WorkflowClient(new Connection().service, {
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

  const handle = await client.start(example, {
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

To serialize values as [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers):

- Use [`protobufjs`](https://protobufjs.github.io/protobuf.js/)
- Use runtime-loaded messages (not generated classes) and `MessageClass.create` (not `new MessageClass()`)
- Generate `json-module.js` with a command like:

  ```sh
  pbjs -t json-module -w commonjs -o protos/json-module.js protos/*.proto
  ```

- Patch `json-module.js`:

<!--SNIPSTART typescript-protobuf-root -->
[protobufs/protos/root.js](https://github.com/temporalio/samples-typescript/blob/master/protobufs/protos/root.js)
```js
const { patchProtobufRoot } = require('@temporalio/common/lib/converter/patch-protobuf-root');
const unpatchedRoot = require('./json-module');
module.exports = patchProtobufRoot(unpatchedRoot);
```
<!--SNIPEND-->

- Generate `root.d.ts` with:

  ```sh
  pbjs -t static-module protos/*.proto | pbts -o protos/root.d.ts -
  ```

- Create a [`DefaultPayloadConverterWithProtobufs`](https://typescript.temporal.io/api/classes/protobufs.defaultpayloadconverterwithprotobufs/):

<!--SNIPSTART typescript-protobuf-converter -->
[protobufs/src/payload-converter.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/payload-converter.ts)
```ts
import { DefaultPayloadConverterWithProtobufs } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new DefaultPayloadConverterWithProtobufs({ protobufRoot: root });
```
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

[`WorkerOptions.dataConverter`](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#dataconverter)

- Provide it to the Client:

<!--SNIPSTART typescript-protobuf-client -->
[protobufs/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/protobufs/src/client.ts)
```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { v4 as uuid } from 'uuid';
import { foo, ProtoResult } from '../protos/root';
import { example } from './workflows';

async function run() {
  const client = new WorkflowClient(new Connection().service, {
    dataConverter: { payloadConverterPath: require.resolve('./payload-converter') },
  });

  const handle = await client.start(example, {
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

- Use protobufs in our Workflows and Activities:

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
[encryption/src/encryption-codec.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/encryption-codec.ts)
```ts
import { METADATA_ENCODING_KEY, Payload, PayloadCodec, str, u8, ValueError } from '@temporalio/common';
import { coresdk } from '@temporalio/proto/lib/coresdk';
import { decrypt, encrypt } from './crypto';

const ENCODING = 'binary/encrypted';
const METADATA_ENCRYPTION_KEY_ID = 'encryption-key-id';

export class EncryptionCodec implements PayloadCodec {
  constructor(protected readonly keys: Map<string, Buffer>, protected readonly defaultKeyId: string) {}

  static async create(keyId: string): Promise<EncryptionCodec> {
    const keys = new Map<string, Buffer>();
    keys.set(keyId, await fetchKey(keyId));
    return new this(keys, keyId);
  }

  async encode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => ({
        metadata: {
          [METADATA_ENCODING_KEY]: u8(ENCODING),
          [METADATA_ENCRYPTION_KEY_ID]: u8(this.defaultKeyId),
        },
        // Encrypt entire payload, preserving metadata
        data: await encrypt(
          coresdk.common.Payload.encodeDelimited(payload).finish(),
          this.keys.get(this.defaultKeyId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
        ),
      }))
    );
  }

  async decode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => {
        if (!payload.metadata || str(payload.metadata[METADATA_ENCODING_KEY]) !== ENCODING) {
          return payload;
        }
        if (!payload.data) {
          throw new ValueError('Payload data is missing');
        }

        const keyIdBytes = payload.metadata[METADATA_ENCRYPTION_KEY_ID];
        if (!keyIdBytes) {
          throw new ValueError('Unable to decrypt Payload without encryption key id');
        }

        const keyId = str(keyIdBytes);
        let key = this.keys.get(keyId);
        if (!key) {
          key = await fetchKey(keyId);
          this.keys.set(keyId, key);
        }
        const decryptedPayloadBytes = await decrypt(payload.data, key);
        console.log('Decrypting payload.data:', payload.data);
        return coresdk.common.Payload.decodeDelimited(decryptedPayloadBytes);
      })
    );
  }
}

async function fetchKey(_keyId: string): Promise<Buffer> {
  // In production, fetch key from a key management system (KMS). You may want to memoize requests if you'll be decoding
  // Payloads that were encrypted using keys other than defaultKeyId.
  return Buffer.from('test-key-test-key-test-key-test!');
}
```
<!--SNIPEND-->

The encryption and decryption code is in [`src/crypto.ts`](https://github.com/temporalio/samples-typescript/tree/main/encryption/src/crypto.ts). Since encryption is CPU-intensive, and doing AES with Node's built-in crypto module blocks the main thread, we use `@ronomon/crypto-async`, which uses Node's threadpool.

As before, we provide a custom data converter to the Client and Worker:

<!--SNIPSTART typescript-encryption-client -->
[encryption/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/client.ts)
```ts
  const client = new WorkflowClient(new Connection().service, {
    dataConverter: await getDataConverter(),
  });

  const handle = await client.start(example, {
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

When the Client sends `'Alice: Private message for Bob.'` to the Workflow, it gets encrypted on the Client and decrypted in the Worker. The Workflow receives the decrypted message and appends another message. When it returns that longer string, the string gets encrypted by the Worker and decrypted by the Client.

<!--SNIPSTART typescript-encryption-workflow -->
[encryption/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/encryption/src/workflows.ts)
```ts
export async function example(message: string): Promise<string> {
  return `${message}\nBob: Hi Alice, I'm Workflow Bob.`;
}
```
<!--SNIPEND-->
