---
id: how-to-use-a-custom-payload-converter-in-python
title: How to use a custom Payload Converter in Python
sidebar_label: Custom Payload Converter
description: Use a `CompositeDataConverter` to apply custom `PayloadConverter` in a specified order.
tags:
  - python sdk
  - developer-guide-doc-type
  - data converter
  - payload converter
  - how-to-doc-type
---

Data Converters convert raw Temporal payloads to/from actual Python types.
A custom Data Converter of type `temporalio.converter.DataConverter` can be set via the `data_converter` client parameter.

The default Data Converter supports converting multiple types including:

- `None`
- `bytes`
- `google.protobuf.message.Message` - As JSON when encoding, but has ability to decode binary proto from other languages
- Anything that can be converted to JSON including:
  - Anything that [`json.dump`](https://docs.python.org/3/library/json.html#json.dump) supports natively
  - [dataclasses](https://docs.python.org/3/library/dataclasses.html)
  - Iterables including ones JSON dump may not support by default, e.g. `set`
  - Any class with a `dict()` method and a static `parse_obj()` method, e.g.
    [Pydantic models](https://pydantic-docs.helpmanual.io/usage/models)
    - The default data converter is deprecated for Pydantic models and will warn if used since not all fields work.
      See [this sample](https://github.com/temporalio/samples-python/tree/main/pydantic_converter) for the recommended
      approach.
  - [IntEnum, StrEnum](https://docs.python.org/3/library/enum.html) based enumerates
  - [UUID](https://docs.python.org/3/library/uuid.html)

This notably doesn't include any `date`, `time`, or `datetime` objects, as they may not work across SDKs.

Users are strongly encouraged to use a single `dataclass` for parameter and return types so fields with defaults can be easily added without breaking compatibility.
Classes with generics may not have the generics properly resolved.
The current implementation does not have generic type resolution. Users should use concrete types.

### Custom Type Data Conversion

When converting from JSON, Workflow and Activity type hints are taken into account to convert to the proper types.
All common Python typings including `Optional`, `Union`, all forms of iterables and mappings, and `NewType` are supported in addition the regular JSON values mentioned before.

In Python, Data Converters contain a reference to a Payload Converter class that is used to convert input and output payloads.
By default, the Payload Converter is a `CompositePayloadConverter` which contains multiple `EncodingPayloadConverter`s to try to serialize/deserialize payloads.
Upon serialization, each `EncodingPayloadConverter` is used in order until one succeeds.

To implement a custom encoding for a custom type, a new `EncodingPayloadConverter` can be created.
For example, to support `IPv4Address` types:

```python
class IPv4AddressEncodingPayloadConverter(EncodingPayloadConverter):
    @property
    def encoding(self) -> str:
        return "text/ipv4-address"

    def to_payload(self, value: Any) -> Optional[Payload]:
        if isinstance(value, ipaddress.IPv4Address):
            return Payload(
                metadata={"encoding": self.encoding.encode()},
                data=str(value).encode(),
            )
        else:
            return None

    def from_payload(self, payload: Payload, type_hint: Optional[Type] = None) -> Any:
        assert not type_hint or type_hint is ipaddress.IPv4Address
        return ipaddress.IPv4Address(payload.data.decode())

class IPv4AddressPayloadConverter(CompositePayloadConverter):
    def __init__(self) -> None:
        # Just add ours as first before the defaults
        super().__init__(
            IPv4AddressEncodingPayloadConverter(),
            *DefaultPayloadConverter.default_encoding_payload_converters,
        )

my_data_converter = dataclasses.replace(
    DataConverter.default,
    payload_converter_class=IPv4AddressPayloadConverter,
)
```

This is good for many custom types. However, you might need to override the behavior of the just the existing JSON encoding payload converter to support a new type.
It is already the last encoding data converter in the list, so it's the fall-through behavior for any otherwise unknown type.
Customizing the existing JSON converter has the benefit of making the type work in lists, unions, etc.
The conversion can be customized for serialization with a custom `json.JSONEncoder` and deserialization with a custom `JSONTypeConverter`.
For example, to support `IPv4Address` types in existing JSON conversion:

```python
class IPv4AddressJSONEncoder(AdvancedJSONEncoder):
    def default(self, o: Any) -> Any:
        if isinstance(o, ipaddress.IPv4Address):
            return str(o)
        return super().default(o)
class IPv4AddressJSONTypeConverter(JSONTypeConverter):
    def to_typed_value(
        self, hint: Type, value: Any
    ) -> Union[Optional[Any], _JSONTypeConverterUnhandled]:
        if issubclass(hint, ipaddress.IPv4Address):
            return ipaddress.IPv4Address(value)
        return JSONTypeConverter.Unhandled

class IPv4AddressPayloadConverter(CompositePayloadConverter):
    def __init__(self) -> None:
        # Replace default JSON plain with our own that has our encoder and type
        # converter
        json_converter = JSONPlainPayloadConverter(
            encoder=IPv4AddressJSONEncoder,
            custom_type_converters=[IPv4AddressJSONTypeConverter()],
        )
        super().__init__(
            *[
                c if not isinstance(c, JSONPlainPayloadConverter) else json_converter
                for c in DefaultPayloadConverter.default_encoding_payload_converters
            ]
        )

my_data_converter = dataclasses.replace(
    DataConverter.default,
    payload_converter_class=IPv4AddressPayloadConverter,
)
```

Now `IPv4Address` can be used in type hints including collections, optionals, etc.
