---
id: temporal-client-login-with-tcld
title: Authenticate your Development System
sidebar_label: Authenticate with tcld
description: Authenticate your development system using the 'tcld' Command Line tool.
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

In this step, you use 'tcld', the CLI utility, to connect to Temporal Cloud.
It lets you authenticate your development machine (called a "device" here) for use.
Issue the following command from the Terminal command line:

```
tcld login
```

The response shows a Web URL.
If your browser does not automatically open to this link, copy and paste the URL.

```
login via this url https://login.tmprl.cloud/activate?user_code=XXXX-XXXX
```

If you're working at a command line via secure shell, you may not have access to a Web browser on that system.
You can still authenticate.
Copy the URL and open it on your other system.

Confirm that the code from the command-line matches the code displayed on the Web page.
If they match, click 'Confirm' to activate the originating system you first ran 'tcld login' from.

```
Successfully logged in!
```

Confirmation also appears on the Web page.
