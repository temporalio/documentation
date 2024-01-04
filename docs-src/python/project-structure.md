---
id: project-structure
title: Boilerplate Temporal Application project code
sidebar_label: Boilerplate project
description: Discover the minimum code I need to create a boilerplate Temporal Application.
tags:
  - python sdk
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

For example, your project structure could look like this:

```text
/monorepo
    /shared_activities
        | payment.py
        | send_email.py
    /background_check
        /workflows
            | background_check_workflow.py
        /activities
            | ssn_trace_activity.py
        /worker
            | main.py
    /loan_application
        /workflows
            | loan_application_workflow.py
        /activities
            | credit_check_activity.py
        /worker
            | main.py
    /tests
       | pytest.ini
	   | workflow_tests.py
       | activity_tests.py
```

If you are following along with this guide, your project will look like this:

```text
/backgroundcheck
    /workflows
        | background_check_workflow.py
    /activities
        | ssn_trace_activity.py
    /worker
        | main.py
    /tests
       | pytest.ini
	   | workflow_tests.py
       | activity_tests.py
```

### Initialize Python project dependency framework

In Python, you’d typically use `pip` and `virtualenv` or `venv` for dependency management and environment isolation.

For more information, see [Creating Virtual Environments](https://packaging.python.org/en/latest/tutorials/installing-packages/#creating-virtual-environments).

Set up a virtual environment for the project and initialize it using `pip`.

```bash
mkdir background_check
cd background_check
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install temporalio
```

After activation, any Python command you run will use the virtual environment's isolated Python interpreter and libraries.
Remember to always activate the virtual environment when working on this project.
