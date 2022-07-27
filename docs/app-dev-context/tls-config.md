Use the [temporalio/client-certificate-generation](https://hub.docker.com/r/temporalio/client-certificate-generation) to generate Client-side certificates along with their keys and configuration files.
​
This docker image is to be used in conjunction with the Temporal SDK.
Keys and their configuration files are valid for 365 days from creation.
​
**To generate the certificates**:
​

1. Pull the latest image from the registry.
   `docker pull temporalio/client-certificate-generation:latest`
2. Run the following docker command to generate the root CA.
   `docker run -v $PWD:/work -it temporalio/client-certificate-generation ca.sh`
3. Run the following docker command to generate an end-entity certificate.
   `docker run -v $PWD:/work -it temporalio/client-certificate-generation end-entity.sh`
   ​
   ​
   :::warning
   ​
   The client pem and key files are sensitive information and shouldn't be shared with anyone
   ​
   :::

For more information about TLS, see the [Certification]() guide.
