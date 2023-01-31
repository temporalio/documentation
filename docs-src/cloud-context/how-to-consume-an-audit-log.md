---
id: how-to-consume-an-audit-log
title: How to consume an Audit Log
sidebar_label: Consume an Audit Log
description: You must implement your own consumer of the Kinesis stream.
tags:
  - guide-context
---

After you create an Audit Log sink, wait for the logs to flow into the Kinesis stream.
You should see the first logs 2–10 minutes after you configure the sink.
Subsequent logs arrive every 2 minutes if any actions occurred during that 2-minute window.

:::note

You must configure and implement your own consumer of the Kinesis stream.
For an example, see [Example of consuming an Audit Log](/#example-of-consuming-an-audit-log).

:::

### Example of an Audit Log

The following example shows the contents of an Audit Log.

```json
{"emit_time":"2023-10-24T08:19:41Z","level":"LOG_LEVEL_INFO","user_email":"zhengbo@example.com","operation":"UpdateAccount","details":{"client_ca_fingerprints":["5bb99d14fa602f7d39b7d048674a2251"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
{"emit_time":"2023-10-25T21:16:42Z","level":"LOG_LEVEL_INFO","user_email":"alex@example.com","operation":"DeleteUser","details":{"target_users":["0b741c47-e093-47d1-9b74-f2359129f78f"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
{"emit_time":"2023-11-03T19:31:45Z","level":"LOG_LEVEL_INFO","user_email":"matt@example.com","operation":"InviteUsers","details":{"target_users":["matthkim@gmail.com"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
{"emit_time":"2023-11-08T08:06:40Z","level":"LOG_LEVEL_INFO","user_email":"zhengbo@example.com","operation":"UpdateUser","details":{"target_users":["zhengbo@example.net"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
{"emit_time":"2023-11-08T08:14:09Z","level":"LOG_LEVEL_INFO","user_email":"zhengbo@example.com","operation":"UpdateNamespace","details":{"namespace":"audit-log-test.example-dev","client_ca_fingerprints":["f186d0bd971ff7d52dc6cc9d9b6f7644"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
{"emit_time":"2023-11-08T09:20:22Z","level":"LOG_LEVEL_INFO","user_email":"zhengbo@example.com","operation":"UpdateUserNamespacePermissions","details":{"namespace":"audit-log-test.example-dev","search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
**********
```

### Example of consuming an Audit Log

The following Go code is an example of consuming Audit Logs from a Kinesis stream and delivering them to an S3 bucket.

```go
func main() {
   fmt.Println("print audit log from S3")
   cfg, err := config.LoadDefaultConfig(context.TODO(),
      config.WithSharedConfigProfile("your_profile"),
   )
   if err != nil {
      fmt.Println(err)
   }
   s3Client := s3.NewFromConfig(cfg)
   response, err := s3Client.GetObject(
      context.Background(),
      &s3.GetObjectInput{
         Bucket: aws.String("your_bucket_name"),
         Key:    aws.String("your_s3_file_path")})
   if err != nil {
      fmt.Println(err)
   }
   defer response.Body.Close()

   content, err := io.ReadAll(response.Body)

   fmt.Println(string(content))
}
```

The preceding code also prints the logs in the terminal.
The following is a sample result.

```json
{"emit_time":"2022-11-14T07:56:55Z","level":"LOG_LEVEL_INFO","user_email":"zhengbo@temporal.io","operation":"DeleteUser","details":{"target_users":["d7dca96f-adcc-417d-aaec-e8f5d2ba9fe1"],"search_attribute_update":{},"additional_message":"finished unary call with code OK"},"status":"OK","category":"LOG_CATEGORY_ADMIN"}
```
