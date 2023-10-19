---
id: project-structure
title: Boilerplate Temporal Application project code
sidebar_label: Boilerplate project
description: Discover the minimum code I need to create a boilerplate Temporal Application.
tags:
  - java sdk
  - developer guide
  - project setup
---

**What is the minimum code I need to create a boilerplate Temporal Application?**

Let’s start with a single Activity Workflow and register those functions with a Worker.

After we get the Worker running and have started a Workflow Execution, we will add a testing framework.

### Project structure

You can organize Temporal Application code to suit various needs in a way that aligns with the idiomatic style of the language you are working in.
This includes structuring your files according to your organization's best practices.

However, there are some general ways to think about organizing code.

The best practice is to group Workflows together, Activities together, and separate your Worker process into a standalone file.
Often this happens respectively per use case, business process, or domain.

For monorepo-style organizational techniques, consider a designated Workflow directory for each use case and place each Workflow in its own file, but also maintain a dedicated place for shared Activities.

For example, your project structure could look like this (the upper sections of the package structure, ex: `com.example.mycorp`, has been omitted for simplicity):

```text
/monorepo
    /src
        /main
            /java
                /sharedactivities
                    | PaymentActivities.java
                    | PaymentActivitiesImpl.java
                    | SendEmailActivities.java
                    | SendEmailActivitiesImpl.java
                /backgroundcheck
                    /workflows
                        | BackgroundCheckWorkflow.java
                        | BackgroundCheckWorkflowImpl.java
                    /activities
                        | SsnTraceActivities.java
                        | SsnTraceActivitiesImpl.java
                    /worker
                        | BackgroundCheckWorker.java
                /loanapplication
                    /workflows
                        | LoanApplicationWorkflow.java
                        | LoanApplicationWorkflowImpl.java
                    /activities
                        | CreditCheckActivities.java
                        | CreditCheckActivitiesImpl.java
                    /worker
                        | LoanApplicationWorker.java
            /resources
                | logback.xml
        /test
            /java
                /sharedactivities
                    | PaymentActivitiesTest.java
                    | SendEmailActivitiesTest.java
                /backgroundcheck
                    /workflows
                        | BackgroundCheckWorkflowTest.java
                        | BackgroundCheckWorkflowIntegrationTest.java
                    /activities
                        | SsnTraceActivitiesTest.java
                /loanapplication
                    /workflows
                        | LoanApplicationWorkflowTest.java
                        | LoanApplicationWorkflowIntegrationTest.java
                    /activities
                        | CreditCheckActivitiesTest.java
```

If you are following along with this guide, your project will look like this:

```text
/backgroundcheck
    /src
        /main
            /java
                /backgroundcheckboilerplate
                    / workers
                        | CloudWorker.java
                        | DevServerWorker.java
                        | SelfHostedWorker.java
                    | BackgroundCheckBoilerplateActivities.java
                    | BackgroundCheckBoilerplateActivitiesImpl.java
                    | BackgroundCheckBoilerplateWorkflow.java
                    | BackgroundCheckBoilerplateWorkflowImpl.java
        /test
            /java
                /backgroundcheckboilerplate
                    | BackgroundCheckBoilerplateActivitiesTest.java
                    | BackgroundCheckBoilerplateWorkflowIntegrationTest.java
                    | BackgroundCheckBoilerplateWorkflowTest.java
```

### Initialize a Java project with Maven

If you have created a similar project structure as noted earlier and are using
Maven as your dependency management tool, ensure that the `compiler.source`
and `compiler.target` properties in your `pom.xml` are set to at least `1.8`.

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

Next, including the following dependencies in the `dependencies` section of your
`pom.xml` to install the Temporal SDK and necessary testing packages for this guide.

```xml
<dependency>
    <groupId>io.temporal</groupId>
    <artifactId>temporal-sdk</artifactId>
    <version>1.20.1</version>
</dependency>
```

Finally, run `mvn clean compile` to perform the first compilation and pull in
the dependencies.

### Initialize a Java project with Gradle

If you are using Gradle as your dependency manager, add the Temporal SDK
to the `dependencies` section of your `build.gradle` file

```text
dependencies {
    implementation group: 'io.temporal', name: 'temporal-sdk', version: '1.20.1'
}
```

Next, run `./gradlew build` to perform a test build of your application and download
the dependencies.
