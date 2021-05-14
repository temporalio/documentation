---
id: signals
title: Signals in Java
sidebar_label: Signals
---

Workflows can listen to external events and save the state accordingly.

```java
import io.temporal.workflow.SignalMethod;
import io.temporal.workflow.Workflow;
import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;
import org.slf4j.Logger;

import java.util.Objects;

public class GettingStarted {

    private static Logger logger = Workflow.getLogger(GettingStarted.class);

    @WorkflowInterface
    public interface HelloWorld {
        @WorkflowMethod
        void sayHello(String name);

        @SignalMethod
        void updateGreeting(String greeting);
    }

    public static class HelloWorldImpl implements HelloWorld {

        private String greeting = "Hello";

        @Override
        public void sayHello(String name) {
            int count = 0;
            while (!"Bye".equals(greeting)) {
                logger.info(++count + ": " + greeting + " " + name + "!");
                String oldGreeting = greeting;
                Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
            }
            logger.info(++count + ": " + greeting + " " + name + "!");
        }

        @Override
        public void updateGreeting(String greeting) {
            this.greeting = greeting;
        }
    }

}
```

The Workflow interface now has a method annotated with @SignalMethod.
It is a callback method that is invoked every time a new Signal of `HelloWorld.updateGreeting` is delivered to the Workflow.
The Workflow interface can have only one @WorkflowMethod which is the main function of the Workflow, but can have as many Signal methods as needed.

This Workflow implementation demonstrates a few important Temporal concepts:

- The Workflow is stateful and can have fields of any complex type.
- `Workflow.await` blocks until it receives a parameter that evaluates to true.
The condition is going to be evaluated only on Workflow state changes, so it is not a busy wait, in traditional sense.
