---
id: how-to-use-a-custom-payload-codec-in-python
title: How to use a custom Payload Codec in Python
sidebar_label: Custom Payload Codec
description: Create a custom `PayloadCodec` implementation and define your encryption/compression and decryption/decompression logic in the `encode` and `decode` functions.
tags:
  - python
  - developer-guide
---

**Create a custom Payload Codec**

Custom Data Converters can change the default Temporal Data Conversion behavior by adding hooks, sending payloads to external storage, or performing different encoding steps.
If you only need to change the encoding performed on your payloads -- by adding compression or encryption -- you can override the default Data Converter using by creating a new `PayloadCodec`.

The `PayloadCodec` needs to implement `encode()` and `decode()` functions at a minimum.
These should loop through all of a Workflow's payloads, perform all of your necessary marshalling, compression, or encryption steps in order, and set an `"encoding"` metadata field.
Here is an example that marshals and then compresses a payload using Python's [cramjam](https://github.com/milesgranger/cramjam/tree/master/cramjam-python) library to provide `snappy` compression:

```python
import cramjam
from temporalio.api.common.v1 import Payload
from temporalio.converter import PayloadCodec

class EncryptionCodec(PayloadCodec):

async def encode(self, payloads: Iterable[Payload]) -> List[Payload]:
	return [
		Payload(
			metadata={
				"encoding": b"binary/snappy",
			},
			data=(bytes(cramjam.snappy.compress(p.SerializeToString()))),
		)
		for p in payloads
	]
```

The `decode()` function should implement the `encode()` logic in reverse.

```python
async def decode(self, payloads: Iterable[Payload]) -> List[Payload]:
	ret: List[Payload] = []
	for p in payloads:
		if p.metadata.get("encoding", b"").decode() != "binary/snappy":
			ret.append(p)
			continue
		ret.append(Payload.FromString(bytes(cramjam.snappy.decompress(p.data))))
	return ret
```

This example verifies that an encoded payload matches the `binary/snappy` filetype -- i.e., that it was encoded using the same custom `encode()` function -- and if so, performs decompression followed by unmarshaling.

**Set Data Converter to use custom Payload Codec**

Add a `data_converter` parameter to your `Client.connect()` options that overrides the default Converter with your Payload Codec:

```python
from codec import EncryptionCodec

client = await Client.connect(
	"localhost:7233",
	data_converter=dataclasses.replace(
		temporalio.converter.default(), payload_codec=EncryptionCodec()
	),
)
```

For reference, see the following samples:

- [Custom converter](https://github.com/temporalio/samples-python/tree/main/custom_converter)
- [Encryption](https://github.com/temporalio/samples-python/tree/main/encryption)
