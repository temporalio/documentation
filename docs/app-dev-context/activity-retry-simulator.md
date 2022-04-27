import RetrySimulator from '/docs/components/RetrySimulator/RetrySimulator';

Below is a tool for experimenting with different Retry Policies.
Suppose you have an Activity that makes an HTTP request, as shown in the code snippet below.
With the below tool, you can configure whether the API request fails, how long the request takes.
You can then configure Activity timeouts and Retry Policy parameters to see how they impact whether the Activity succeeds or fails.

<RetrySimulator />