# Product Documentation Style Guide

<aside>
💡 Last updated September 10, 2024

</aside>

# Methodologies

## Diátaxis Documentation Model

This framework provides clear guidance on types of content and clear definitions of those types. This informs how we think about content within documentation as well.

[Diátaxis Document Model](https://www.notion.so/Di-taxis-Document-Model-d788b688c5c244f2ad33d74a2415f2c0?pvs=21)

# Style

Style guide adapted from [DigitalOcean’s style guide for tutorials](https://www.digitalocean.com/community/tutorials/digitalocean-s-technical-writing-guidelines), as of August 2022, which is under a [Creative Commons Non-Commercial Share-Alike](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

The style for Temporal content reflects our purpose in publishing the content: to provide quality learning information for developers, architects, and customers.

We strive to ensure that all content is

- **Comprehensive and written for all experience levels**
- **Technically detailed and correct**
- **Practical, hands-on, and self-contained**
- **Friendly but formal**

These principles guide authors to create articles, tutorials, reference guides, technical documentation, and other learning materials that help people solve their problems and grow as developers.

### Comprehensive and written for all experience levels

Our content is written to be as clear and detailed as possible without making assumptions about the reader’s background knowledge.

We explicitly include every command a reader needs to go from their first command that creates the project directory to the final, working project. We also provide readers with all of the explanations and background information they need to understand the content. The goal is for our readers to understand the concepts, not just copy and paste code and commands.

We avoid words like "simple,” "straightforward,” “easy,” “simply,” “obviously,” and “just,” as these words make assumptions about the reader’s knowledge. While authors use these words to encourage and motivate readers to push through challenging topics, they often have the opposite effect; a reader who hears that something is “easy” may be frustrated when they encounter an issue. Instead, we encourage our readers by providing the explanations they need to be successful. 

**Avoid overly technical jargon**: When explaining SDK behavior or technical concepts, avoid using highly specialized terms that most developers won't be familiar with. Instead, describe the actual behavior in plain language. For example, instead of using technical terms like "yield points" (specific to JavaScript/TypeScript async internals), describe what actually happens: "operations that pause execution" or "using `await`." This makes the content more accessible without sacrificing technical accuracy. 

### Technically detailed and correct

Developers use our learning resources to level up their skills with Temporal, and that means that the content we publish must be technically correct in both code and explanations.

Our content is written to be as clear and detailed as possible without making assumptions about the reader’s background knowledge. We don’t provide large blocks of configuration or program code and ask readers to paste it into their text editor, trusting us that it works and is safe. We provide all the details necessary for the readers to understand and trust the content.

We explicitly include every command a reader needs to go from their first command that creates the project directory to the final, working project. We also provide readers with all of the explanations and background information they need to understand the content. The goal is for our readers to understand the concepts, not just copy and paste code and commands.

Every command should have a detailed explanation, including options and flags as necessary. Every block of code should be followed by prose explanations that describe what it does and why it works that way. When you ask the reader to execute a command or modify a configuration file, first explain what it does and why you’re asking the reader to make those changes. These details give readers the information they need to grow their skills.

### Practical, hands-on, and self-contained

When a learner completes a tutorial, they will have built a project or completed a real-world activity. This helps them gain confidence with the platform. We emphasize a practical approach: at the end of an article, the reader should have a usable environment or an example to build upon.

- Keep examples concrete and real-world whenever possible.
- Relate examples to prior knowledge whenever possible.
- Introduce conceptual content alongside hands-on activities.
- Provide new information "just in time." Explain new concepts when you have the learner apply them, rather than providing many heavy explanations all at once.
- Encourage practice and active learning, rather than passive explanations when possible.

The article should cover the topic thoroughly. Authors should link to existing Temporal articles as prerequisites that readers will follow before beginning the content and link to available Temporal articles to provide additional information in the body of the content. Authors should only send readers offsite to gather information if there’s no existing Temporal article and the information can’t be added to the article directly in a short summary.

### Friendly and inclusive, but formal.

Our content aims for a friendly but formal tone. This means that articles do not include jargon, memes, excessive slang, emoji, or jokes. As we’re writing for a global audience, we aim for a tone that works across language and cultural boundaries.

Unlike blog posts, we do not use the first person singular (e.g., “I think …”). Instead, we encourage the use of the second person (e.g., “You will implement …”) to keep the focus on the reader and what they’ll accomplish. In some cases, we’ll use the first person plural (e.g., “We will examine …”).

We encourage motivational language focused on outcomes. For example, instead of “You will learn how to send a Signal to a Workflow,” try “In this tutorial, you will send a Signal to a Workflow.” This approach motivates the reader and focuses on the goal they need to accomplish.

Finally, the language of our content honors diverse human experiences and follows our [Community Code of Conduct](https://temporal.io/code-of-conduct). That means we avoid offensive language or other content that is in reference to (but not limited to) age, disability, ethnicity, gender identity or expression, level of experience, nationality, neurodiversity, personal appearance, race, religion, political affiliation, sexual orientation, socioeconomic status, or technology choices.

## General Style

In general, Temporal content follows the [Google developer documentation style guide](https://developers.google.com/style). When the Google guide is silent about an issue, we follow the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

We have a few Temporal-specific style guidelines that override the Google and Microsoft guides:

### Capitalization of core terms

Many of Temporal's core terms can be used in a generic way. To differentiate one of Temporal's core terms from a generic instance of a term, always treat the Temporal term as a proper noun in documentation.
Generic versions of the same term should not be capitalized and should be used sparingly to avoid confusion.

- Correct: "Next, register the Activity within the Workflow."
- Incorrect: "Next, register the activity within the workflow."

All terms that require initial capitalization can be found in https://github.com/temporalio/documentation/blob/main/vale/styles/Temporal/terms.yml.

### Addressing the learner

Use "You/your" or the Imperative instead of "We/our"". Keep focus on the reader.

- Correct: In the next step you'll add the Workflow.
- Incorrect: In the next step we'll add the Workflow.

In most cases when providing direct instruction, the imperative works better.

- Correct: Next, add the following code:
- Incorrect: Next, we add the following code:

### Avoid "should" in user instructions

When giving instructions to users, use the imperative mood directly rather than saying users "should" do something. This makes instructions clearer and more direct.

- Correct: "Provide a reason when resetting, as it will be recorded in the Event History."
- Incorrect: "You should provide a reason when resetting."

Note: It's acceptable to use "should" when describing general best practices, system behavior, or outcomes (e.g., "the reader should have a usable environment").

### Avoid unnecessary parentheses

Avoid using parentheses in almost all cases. When adding clarifying or supplementary information, prefer using commas or restructure into separate sentences. This keeps the text flow more natural and readable.

**Use commas for examples and clarifications:**
- Correct: "Reset only works if you've fixed the underlying issue, such as removing non-deterministic code."
- Incorrect: "Reset only works if you've fixed the underlying issue (such as removing non-deterministic code)."

**Remove optional clarifications entirely if not essential:**
- Correct: "Select the Event ID to reset to"
- Incorrect: "Select the Event ID to reset to (typically a `WorkflowTaskCompleted` event before the failure)"

**Restructure into separate sentences for "otherwise" statements:**
- Correct: "By default, the command resets the latest workflow execution. Use `--run-id` to reset a specific run."
- Incorrect: "Use `--run-id` to reset a specific run (otherwise resets the latest run)."

**Very limited exceptions where parentheses are acceptable:**
- Abbreviations on first use: "Transport Layer Security (TLS)"
- Technical specifications: "at least 2048-bit RSA"

If you find yourself wanting to use parentheses, step back and restructure the sentence using commas or split it into multiple sentences instead.

### Focus on specific outcomes rather than "Learn to/Learn how to" language.

Focus on the skill the learner will gain rather than the act of gaining the skill. Look for "learn to/learn how to" and remove them and you'll have tighter sentences.

- Correct: In this tutorial you will build a Workflow..."
- Incorrect: In this tutorial you will learn how to build a workflow...."

### Abbreviation of "identifier"

In text, do not abbreviate the word "identifier" as  "Id", or "id". Use ID.

- Correct: "You can provide an order identifier or customer identifier as a Workflow ID."
- Incorrect: "You can provide an order ID or customer id as a Workflow Id."

In code (and when quoting or referring to code in text), follow the conventions of each language.

### En dashes in ranges

Using an en dash (`&ndash;` or the character `–`) in a range of numbers is acceptable.
Even better is to use words such as *from*, *to*, and *through*.

Be consistent.

If you use an en dash in one range, use en dashes in all ranges.
Do not mix words and en dashes (or hyphens, for that matter).

- Correct: "5 to 10 GB"
- Correct: "5–10 GB"
- Correct: "5-10 GB"
- Incorrect: "from 5-10 GB"

### Users, hostnames, and domains

The default hostname is `your_server`, though you may want to choose something more descriptive in multi-server setups, such as `matching_service_1`.

The default domain is `your_domain`. For multi-server setups, you can choose something like `primary-1.your_domain` or `replica-1.your_domain`. While `example.com` is a valid domain for documentation, using `your_domain` in tutorials makes clear that the reader should change the domain in examples.

### IP addresses and URLs

`your_server_ip`, with in-line code formatting is the default way to show an IP address. You can show multiple IP addresses with names like `primary_private_ip` and `replica_private_ip`. If you need to illustrate more realistic IP addresses, use an address in the [one of the two blocks reserved for documentation as per RFC-5737](https://tools.ietf.org/html/rfc5737). Specifically, we recommend `203.0.113.0/24` for example public addresses and `198.51.100.0/24` for example private addresses.

### Software

Use the official website’s capitalization of the name of their software. If the product web site is not consistent with their capitalization, be consistent within a single article.

Link to the software’s home page when you first mention the software.

## Word usage

[Word Usage](https://www.notion.so/Word-Usage-daa9711ca0974d688dbd3329a0fdcb64?pvs=21) 

# Structure

Sections of our documentation follow a specific structure.

## Evaluation content

Evaluation content includes the following:

- A definition or summary of what the feature does
- Why this feature exists.
- Its primary use case(s).
- How it relates to other parts of the system.
- A brief mention of where the user might encounter this feature (e.g., in configuration, during specific workflows).
- Links to the specific feature guides or encyclopedia entries to learn more.

## Developer Feature Guide

TBA

## Encyclopedia entries

Encyclopedia entries have a title, an introduction, and a conclusion, but they might not have a prerequisites section.

- Title (Level 1 heading)
- Introduction (Level 3 heading)
- Prerequisites (optional) (Level 2 heading)
- Subtopic 1 (Level 2 heading)
- Subtopic 2 (Level 2 heading)
- …
- Subtopic n (Level 2 heading)

## Documentation components explained

### Title

The title helps readers know where they are and where they are going. Try to include the goal in the title, not the tools or features the reader will use to accomplish that goal. Ideally, titles will be under 60 characters long.

- Titles should start with a verb.
- They should focus on the goal.
    - Build an Email Drip Campaign with Temporal and Python
    - Manage AWS Infrastructure with Temporal Workflows and the Go SDK

A title that focuses on the goal tends to perform better especially in search queries.

### Introduction

The first section of every article is the **Introduction**, which is usually one to three paragraphs long. The purpose of the introduction is to explain the purpose and scope of the page.

An introduction will address these points:

- A definition or summary of what the feature does
- Why this feature exists.
- Its primary use case(s).
- How it relates to other parts of the system.
- A brief mention of where the user might encounter this feature (e.g., in configuration, during specific workflows).
- Typical scenarios where it is useful.
- Dependencies (Is this part of a broader framework or API?).
- Anything the reader needs to be familiar with first.

When creating the intro:

- Keep the intro concise, ideally one to two paragraphs.
- Avoid including code or too many technical specifics in the intro—this should remain high-level.
- Use present tense and clear, direct language.
- Use bullet points or short paragraphs for clarity, if needed.
- Ensure each section of the intro logically transitions to the next.

**When documenting destructive operations:** If documenting an operation that terminates/destroys existing resources and then creates new ones, lead with the destructive aspect first to set proper expectations. For example, when documenting workflow reset: "Resetting a Workflow Execution terminates the current workflow execution and starts a new Workflow Execution from a point you specify..." rather than "Resetting a Workflow Execution resumes it from an earlier point..."

This helps the reader understand why they might need this reference material and sets them up to absorb the technical details that follow.

### Sections and subsections

Each section contains commands, code listings, and output blocks, and provides explanations that not only explain **what to do** but also **why you’re doing it this way.**

In tutorials, you'll divide the content into logical sections or steps to provide "signposts" for your learners so they know where they are in the process.

Sections:

- use a Level 2 heading.
- start with a verb and explains what the reader will accomplish in that section.

Format headings using sentence case, but capitalize all Temporal terms.

Examples:

- Create the Workflow
- Define the Activity
- Test the application

Use subsections when sections are long enough to be broken down into multiple subsections; you need more than one subsection in a section to justify using subsections. Do not use subsections to "break up the text".

### Transitions

Each level 2 section should have an introductory paragraph that introduces the section. This paragraph describes what the reader will do in the step and what role it plays in achieving the overall goal of the tutorial. Focus on the reader. Instead of phrases like “We will learn” or “I will explain,” use phrases like “You will build” or “you will create.”

At the end of each section, add a transition that wraps up the section and carries the reader to the next section. Transitions guide the reader and provide important context for what's coming next, as well as how what they just did fits into the process. 

Introductions and transitions guide the reader and provide important context for instructions, commands, and output. To avoid repetition, vary the language used for these sentences so that it does not reiterate the step titles.

Here’s an example transition:

> You've completed the logic for the application; you have a Workflow and an Activity defined. Next, you'll write code to configure and launch a Worker so you can communicate with the Temporal Service and execute your Workflow and Activity code.
> 

In this example, the author summarized what the reader achieved, introduced the next task, and explained how the two steps are connected.

Framing each step in this way helps readers learn and motivates them to keep going.

### Commands in sections

All commands a reader must run should be on their own line in their own code block, and each command should be preceded by a description that explains what the command does. After the command, provide additional details about the command, such as what the arguments do and why your reader is using them.

The following Markdown example demonstrates this pattern:

```markdown
Execute the following command to start the local development server:

```command
temporal server start-dev --db-filename your_temporal.db

```
The `--db-filename` option lets you specify a local database file so you can retain your Event History between runs.
```

In this example, you can clearly see:

- The initial explanation
- The command itself
- Additional explanation of the options.

Display the output of commands and programs using a separate code block, such as the following example:

```markdown
Run the `worker.ts` program:

```command
npm start worker
```

The program's output appears in the terminal:

```output
> temporal-hello-world@0.1.0 start
> ts-node src/worker.ts workflow.watch

2023-11-22T04:38:12.091Z [INFO] Creating worker {
...
```
```

The output block is separated from the command with some text that explains the output. Separating the commands from the output makes it more clear to readers where the command ends and the output begins.

If readers will be moving between directories, be sure to provide the command(s) necessary for those movements.

### Opening, creating, and viewing files

Explicitly tell the user to create or open each file you’ll have them use.

Like commands, always introduce code by describing its general purpose, then explain any changes that the reader will be making in the file. Without these explanations, readers won’t be able to customize, update, or troubleshoot issues.

For tutorials where the reader is not expected to use the command-line interface, such as front-end development tutorials, you can omit the command to open the file. However, be sure to tell the reader which file to open explicitly:

> Open the file src/App.js in your editor.
> 

### Code blocks

Treat all code as an opportunity for learning. If you’re asking the reader to write code, follow the same approach as for commands: 

- Introduce the code block with a high-level explanation of what it does.
- Then show the code,
- Then call out any important details.

Sometimes you’ll open a file and ask the reader to change something specific. When you do this, show the relevant parts of the file and use highlighting to make it clear what should change:

Be sure to explain what the change does and why it’s necessary.

### The conclusion

The **Conclusion** of your tutorial should summarize what the reader has accomplished by following your tutorial. Instead of using phrases like “we learned how to,” use phrases like “you configured” or “you built.” Avoid congratulating the learner for finishing the project, as this can come across as patronizing.

The conclusion should also describe what the learner can do next, which can include a description of use cases or features the learner can explore, links to other tutorials with additional setup or configuration, and links to documentation or other code samples.

Optionally add a review activity.

# Formatting

Our tutorials use Markdown, and we have some custom formatting we support. You’ll find examples of this formatting in the following sections.

## Headings

Each section of our documentation has a corresponding header: the title should be an H1 header and subsequent sections use H2 headings

Although the following guidance is provided by both the Google and Microsoft guides, we want to emphasize how we style headings:

### Verb forms in headings

Titles and headings should use base verb forms, rather than the gerund. This aligns with Temporal’s documentation style.

- Correct: "Install Temporal"
- Incorrect: "Installing Temporal"

### Sentence casing in headings

Use sentence casing for titles and headings.Sentence casing means that only the first letter of the first word and proper nouns are capitalized.

- Correct: "How to get started with Temporal"
- Incorrect: "How To Get Started With Temporal"

### Avoid redundant bold text after headings

Don't add bold text immediately after a heading that repeats or restates what the heading already says. The heading provides sufficient structure and emphasis.

- Correct: `## Reset a Workflow Execution {#reset}`
  
  Followed directly by the explanation text.

- Incorrect: `## Reset a Workflow Execution {#reset}`
  
  `**How to reset a Workflow Execution**`
  
  The bold text is redundant with the heading.

### Subheadings

Use H3 headers sparingly, and avoid H4 headers. If you need to use subheaders, make sure there are two or more headers of that level within that section of the tutorial. Alternatively, consider making multiple steps. 

## Line-level formatting

Use **Bold text** for:

- Visible GUI text.
- Hostnames and usernames.
- Term lists.
- Emphasis when changing context for a command, like switching to a new server or user.

*Italics* should only be used when introducing technical terms. For example, the Nginx server will be our *load balancer*.

Use in-line code formatting for:

- Command names, like `temporal`
- Package names, like `mysql-server`
- Optional commands
- File names and paths, like `~/.ssh/authorized_keys`
- Example URLs, like `http://your_domain`
- Ports, like `:3000`
- Key presses, which should be in ALL CAPS, like `ENTER`. If the reader needs to press keys simultaneously, use a plus symbol (**+**), such as `CTRL+C`.
- Class, method, or function names (or any other language specific container, such as structs, interfaces, etc.)

## Lists

- Make sure the purpose of the list is clear. Introduce the list with a heading, a complete sentence, or a fragment that ends with a colon.
- Use a bulleted list for things that have something in common but don’t need to appear in a particular order.
- Use a numbered list for sequential items (like a procedure) or prioritized items (like a top 10 list).
- Begin each item in a list with a capital letter unless there's a reason not to (for example, it’s a command that's always lowercase). If necessary, rewrite the list item so that all items begin with capital letters or all items begin with lowercase words.

**For bulleted lists:**
- Don’t use semicolons, commas, or conjunctions (like *and* or *or*) at the end of list items.
- Don’t use a period at the end of list items unless they’re complete sentences, even if the complete sentence is very short.
- If the list is introduced by a sentence fragment that ends with a colon, end all the items in the list with a period if any item forms a complete sentence when combined with the introduction.

**For numbered procedural lists (step-by-step instructions):**
- Add a comma at the end of each list item except the last one.
- Add a period at the end of the last list item.
- Example:
  ```
  1. Navigate to the Workflow Execution details page,
  2. Click the **Reset** button in the top right dropdown menu,
  3. Select the Event ID to reset to,
  4. Provide a reason for the reset,
  5. Confirm the reset.
  ```

## Code blocks

Use code blocks for:

- Code Listings
- Commands the reader needs to execute to complete the tutorial.
- Terminal output.
- Interactive dialogues that are in text

If most of a file can be left with the default settings, we typically show just the section that needs to be changed. 

Indicate excerpts and omissions in files with ellipses (**. . .**). 

**Do not** use screenshots to show code blocks.

### Code listings

Store source code in GitHub repositories and link it through Snipsync whenever possible. Otherwise, place code in code fences and specify the programming language so it's properly highlighted.

Treat all code as an opportunity for learning. If you’re asking the reader to write code, follow the same approach as for commands: 

- Introduce the code block with a high-level explanation of what it does.
- Then show the code,
- Then call out any important details.

Sometimes you’ll open a file and ask the reader to change something specific. When you do this, show the relevant parts of the file and use highlighting to make it clear what should change:

Be sure to explain what the change does and why it’s necessary.

### Commands

All commands a reader must run should be on their own line in their own code block, and each command should be preceded by a description that explains what the command does. After the command, provide additional details about the command, such as what the arguments do and why your reader is using them.

**Do not** use screenshots to show terminal commands.

Use the `command` language. Do not include the command prompt (`$` or `#`) in the code block. The command will be displayed with the prompt character when rendered.

If readers will be moving between directories, be sure to provide the command(s) necessary for those movements.

The following Markdown example demonstrates this pattern:

```markdown
Execute the following command to start the local development server:

```command
temporal server start-dev --db-filename your_temporal.db

```
The `--db-filename` option lets you specify a local database file so you can retain your Event History between runs.
```

In this example, you can clearly see:

- The initial explanation
- The command itself
- Additional explanation of the options.

### Terminal output

**Do not** use screenshots to show terminal output.

Display the output of commands and programs using a separate code block with the `output` language type, such as the following example:

```markdown
Run the `worker.ts` program:

```command
npm start worker
```

The program's output appears in the terminal:

```output
> temporal-hello-world@0.1.0 start
> ts-node src/worker.ts workflow.watch

2023-11-22T04:38:12.091Z [INFO] Creating worker {
...
```
```

In this example, the output block is separated from the command with some text that explains the output. Separating the commands from the output makes it more clear to readers where the command ends and the output begins.

## Opening, creating, and viewing files

Explicitly tell the user to create or open each file you’ll have them use.

Like commands, always introduce code by describing its general purpose, then explain any changes that the reader will be making in the file. Without these explanations, readers won’t be able to customize, update, or troubleshoot issues.

For content where the reader is not expected to use the command-line interface, such as front-end development tutorials, you can omit the command to open the file. However, be sure to tell the reader which file to open explicitly:

> Open the file src/App.js in your editor.
> 

This ensures that people clearly understand what file they are meant to open or edit.

## Notes, Tips, and other admonitions

Notes, tips, and other admonitions can help you call out important and helpful information.

When using these admonitions, follow these guidelines:

- Include a title for the note using sentence case.
- Keep the contents brief.
- Don't overuse admonitions. One per section is more than enough.

Here’s a Markdown example of a `tip` admonition:

```jsx
:::tip Change the Web UI port

The Temporal Web UI may be on a different port in some examples or tutorials. To change the port for the Web UI, use the `--ui-port` option when starting the server:

```command
temporal server start-dev --ui-port 8080
```

The Temporal Web UI will now be available at [`http://localhost:8080`](http://localhost:8080/).

:::
```

The preceding `tip` renders into style shown in the following image. The lightbulb icon is automatically added, along with the bold green line on the left.

![ChangeWebUIPort.png](../General/09b6ad0966254c828e07edac5ad64279/Developer%20Relations%20(DevRel)/Archive%20Developer%20Education/Technical%20Article%20Style%20and%20Guidelines/ChangeWebUIPort.png)

In the preceding example, the title “Change the Web UI port” is automatically uppercased and styled with the role-specific icon. This replaces the name of the icon (**TIP**) with wording you supply.

Each admonition plays a distinct role:

![Untitled](../General/09b6ad0966254c828e07edac5ad64279/Developer%20Relations%20(DevRel)/Archive%20Developer%20Education/Technical%20Article%20Style%20and%20Guidelines/Untitled.png)

**Notes** (spelled `:::note`) add supplemental information that is not cautionary. They are the least important of the call out styles and reserved for use only when another, more fitting, style can’t be found.

**Tips** (spelled `:::tip`) play the role of hints to the user, to enhance the efficiency of their work with optional improvements.

**Info** (spelled `:::info`) adds background context to the documentation so the user better understands why and how features work and were developed. An **Info** item may point out related documentation to serve this mission.

**Important** (spelled `:::important`) is rarely used. It specifies conditions that must be met to provide the proper operation of the reader’s tooling. The **Important** call out renders as  **Info.**

## User variables

Highlight any items that the reader needs to change, like example URLs, version numbers, or modified lines in configuration files. Use code font for these.

## Function/class/method/object/variable names

Use code font for functions, classes, methods, objects, and other variable names.

## Images and other assets

Images can illustrate a point or provide additional clarification in a step. Use images for screenshots of GUIs, interactive dialogue, and diagrams of server setups, system architecture, or other concepts  You’re encouraged to use Images especially when showing parts of the UI. Diagrams are helpful for providing a visual overview of your concepts.

Images and screenshots should enhance your explanations, not replace them.

**Don’t use images for screenshots of code, configuration files, output, or anything that can be copied and pasted into the article.**

When including images in your tutorial, please follow these guidelines:

- Introduce screenshots with prose.
- Include descriptive alt text so readers using a screen reader can rely on the alt text rather than the image.
- Include a brief caption to contextualize the image within the context of the article (the caption will typically be shorter than alt text).
- Use the `.png` file format for screenshots and line art.
- Use the `.jpg` file format for photographs.
- Make the image with as short a height as possible.
- Crop your screenshots as tight to the subject as possible so learners focus only on the components that matter.
- Avoid showing any sensitive data like keys, customer usernames, IP addresses, payment information, addresses, etc. Replace them before taking the screen shot or obscure them in the screenshot.
- Avoid showing dates when possible. Dates can make content look outdated quickly.
- Do not add borders or drop shadow to the image.

Here’s a Markdown example for including images in your tutorial:

```markdown
![Descriptive alt text for screen readers](http://temporal.io/your_image_url “Brief caption here”)
```

When showing a screenshot of a form that requires learners to fill in information, provide the information as text in addition to the screenshot.

### Assets

Occasionally, you will want the reader to have access to a configuration file that is too long to display in the main body of the tutorial. This should be in the associated GitHub repository for the tutorial, so you can link to the file with a standard link.

# Technical Best Practices

## Software Installation

Many tutorials will rely on existing tutorials as prerequisites. Put all prerequisites for the article (including any nested prerequisites for the prerequisites) into the article, rather than having deeply nested prereq lists.

### Preferred sources

1. The **project recommended method**, when evaluated to be best. Many projects change quickly and recommend going beyond the official repositories, but some installations (like `curl | bash` patterns) require a judgement call on whether or not to use them.
2. The **official package repositories** for the current distribution and release.
3. **Language-specific official packages** (NPM, CPAN, PIP, RubyGems, Composer, etc.)
4. **Project-specific package repositories** (e.g. Nginx provides its own repos for up-to-date versions) or, on Ubuntu, a trusted PPA. Make sure these are from a well-trusted source, like the project’s developers or the Debian/Ubuntu package maintainers.
5. **Binaries from the project’s GitHub releases page** or a similar official web source.
6. **`wget` or `curl` install scripts** piped to the shell, with an appropriate warning about inspecting scripts.

## Preferred installation location

In general, avoid unnecessary complication. For unpackaged software installed from source or binaries, you should generally accept the default installation prefix unless it’s very unusual or introduces conflicts.

An init script, conforming to official recommendations for the distribution, should be given for service-oriented software, if not provided by the package or other installation method.

On Linux systems, put self-contained binaries or directories in `/opt` and standalone scripts in `/usr/local/bin`.

## Software and system maintenance

Ubuntu and Debian systems should have `unattended-upgrades` with at least security updates installed and configured. We recommend no auto-reboot or auto-update all, given context.

We generally recommend using the `apt` command for Ubuntu. When updating `apt` commands, do not use the `-y` flag; readers should be guided through any necessary inputs and prompts.

For CentOS and Rocky Linux tutorials, we recommend using `dnf`, which has superseded `yum` and provides better performance.

If a tutorial relies on the latest updates, call `update` and `upgrade` during setup or as needed. Call `update` first so that your server pulls the latest versions of packages. When including `upgrade`, which downloads and installs new versions for every package, please be aware that some users may choose to keep certain packages at a lower version.

### Service management

Make sure to use native init system commands, even when legacy compatibility commands are available. For instance, use `sudo systemctl start [service_name]` even though `sudo service [service_name] start` will work.

Provide information about how to enable or disable the service from starting at boot. Indicate how to inspect outcome of service-related commands when not clearly indicated by the interface (`journalctl -u`, `systemctl status`, etc).

Prefer restarts over reloads for services as a rule of thumb. In most cases, it’s more important to ensure a known state than avoid a split-second service interruption, and restarts are also more useful in the case of a complete service failure.

### Bootstrapping systems

Unless it’s part of a config management workflow, prefer user-data scripts, and prefer cloudinit scripts to bash scripts in user-data in most cases.

## Logging and troubleshooting

Explain where and how to access logs for installed services.  Where relevant, explain `systemctl` and `journalctl` commands for checking service status and log output. Where possible, offer concise suggestions for diagnosing common failure cases.

Make sure to handle log rotation for any cases where it’s not handled by packages or other installation mechanisms.

For following plaintext log files, use `tail -F`, not `tail -f`, as the latter will not track a file across renames and might cause confusion if logs are rotated while a user is watching them.

## User and Group management

Create `sudo` users instead of using root directly.  Reference the appropriate initial server setup guides which explain this task as a prerequisite.

On Debian-based distributions, add and remove users with `adduser temporal` and `deluser --remove-home temporal` respectively; on RHEL-based distributions, use `adduser temporal` (set a password with `passwd temporal` if necessary) and `userdel -r temporal`.

Grant `sudo` privileges with `usermod -aG sudo temporal` on Ubuntu. CentOS is a little more complicated. Modern versions use `usermod -aG wheel temporal`, but some versions require `visudo` to uncomment `wheel` group permissions first. Specifically, on CentOS 5, `sudo` needs to be installed and the **wheel** group needs to be uncommented with `visudo`; on CentOS 6, `sudo` is already installed, but **wheel** needs to be uncommented; CentOS 7 has `sudo` and the **wheel** group is already set up.

When using privilege escalated commands, make sure to test them as written. To pass environment variables through `sudo`, use `sudo -E command_to_run` (if trusted with entire environment) or `sudo FOO=BAR command_to_run`. For instances that require a root shell, use `sudo -i`. For instances that require redirection, use `tee -a` to append to rather than replace the destination file: `[sudo] command_to_run | sudo tee [-a] file_to_change`.

## Preferred tools

For interactive shells, assume Bash on GNU/Linux systems, mentioned explicitly when relevant. 

For text editors, we include the copy “use [preferred] or your favorite text editor”, and include the following beginner-friendly editors in commands for those copy and pasting. On Linux, default to `nano`; on FreeBSD, we default to `ee`. vi(m) is permissible, but avoid it in introductory topics where it might present a stumbling block for beginners.

For file transfer, we generally recommend `sftp` in most cases for its interactive and scp-alike uses, though it lacks push functionality, so `scp` is acceptable as well. `rsync` is useful for backups and large transfers (or many small files). Do not use FTP under any circumstances. We also make an effort to standardize on `curl` over `wget` because of its robustness. `wget`’s advantage is mostly recursive download (i.e. a special use case which is not common for our kind of content).

Use `iproute2` utilities, as the `net-tools` suite is [considered obsolete](http://lartc.org/howto/lartc.iproute2.html). In general, `iproute2` utilities like `ss` will have better support for multiple interfaces, IPv6, new kernel functionality, etc. So likewise, use `ip route` over `route`, `ip addr show` over `ifconfig`, etc. Sometimes the older utilities output is a bit cleaner by default, but the output itself is a bit less trustworthy since they don’t handle edge cases as well. When possible,  control the more verbose output using available flags.

## Scripting

Within the context of systems administration tutorials, generally avoid lengthy custom scripts and long shell scripts.

Author-written scripts (and possibly other resources) should live in a per-article repository in the do-community GitHub account, with a link back to the published tutorial. Follow good scripting practices in general. For example, put any variables the user will have to fill in at the top of the script, preferably in a well-marked section. Provide in-line comments where needed to provide human-readable scripts. Ensure that your descriptions of the code are not exclusively provided in comments, but that you also provide prose descriptions with further explanation than appears in comments.

Prefer `/bin/sh` to `bash` and avoid Bash-specific features when portability or cross-platform reuse are a concern. Use the shell and coreutils/standard Unix tools for small tasks; avoid introducing new dependencies purely for glue-language tasks unless the benefits are substantial. Prefer `#!/usr/bin/env interpreter` to `#!/path/to/interpreter`.

## Filesystem locations

When a tutorial relies on a specific directory, be sure to provide the `cd` commands that route the reader to that directory before they run commands.

When downloading scripts or data, ensure that the user is in a writeable directory or paths are explicitly specified. For files which should be available for reference or reuse, use the user’s home directory, unless they belong in some standard well-defined path elsewhere on the filesystem (such as `/opt` or `/etc`). For throwaway files, use `/tmp`.

## Security

Encrypt and authenticate all connections between systems. Do not encourage (explicitly or implicitly) users to send credentials or transmit non-public data in the clear.

Specifically, passwords and key material must not be transmitted over unsecured connections. Database connections, logging, cluster management, and other services should ideally be encrypted at all times.

Web-based control panels must be [served over HTTPS connections](https://www.digitalocean.com/community/tags/let-s-encrypt?type=tutorials), and TLS/SSL should be used for services where it’s supported. All web servers should be HTTPS-enabled (or capable, at least). Use a certbot prerequisite to provide SSL certification. Public-facing services like plain HTTP are permissible, as users may still want or need to offer them, but should be strongly discouraged in the general case, especially for dynamic content. For articles that provide a plain HTTP connection, add a note or warning label to discourage plain HTTP and encourage HTTPS.

Avoid practices which constitute low- benefit security through obscurity or theatrics, like changing the default SSH port. Do configure a firewall. Our distro-specific recommendations are `ufw` for Ubuntu, `iptables` for Debian, and `firewalld` for CentOS. However, `iptables` is most consistent across platforms, and has many tools that hook into it.

### SSH

Maintain the default SSH port as a norm. Changing the port should only be done in specific situations where that is a primary concern.

Disable password authentication and use key-only authentication for root or, alternatively, disable root login completely. Use strong SSH keys: at least 2048-bit RSA but recommended 4096; ECDSA is no longer recommended for technical reasons; and Ed25519 and elliptic curve algorithms are not widely supported enough.

Use passphrases for any interactive keys, but not for non-interactive processes. Set up or copy and change ownership on SSH keys from the root account to the user home directory. Install fail2ban where it’s practical.

Note that while SSH Agent Forwarding is necessary for normal workflows on platforms like CoreOS, it comes with some security concerns. Essentially, anyone with permissions on your host will be able to use the forwarding socket to connect to your local ssh-agent.

### SSL/TLS

We strongly encourage the use of Let’s Encrypt for ease of use, and recommend TLS. Do use strong SSL security; look at [https://cipherli.st/](https://cipherli.st/) (both modern and legacy recommendations).

For hosts without a domain name, we suggest a self-signed certificate of adequate strength.

## Web servers

We recommend the Debian-style configuration directories for distributions that don’t structure it that way by default.  Always test configuration changes (Apache uses `sudo apachectl configtest`, and Nginx uses `sudo nginx -t`). `/var/www/html` should be used as the document root for all web servers. Nginx’s `/usr/share/nginx/html` default should be changed because that directory is owned by and can potentially be modified by package updates.  This is no longer a problem in Ubuntu 16.04, but will remain relevant for previous releases.

Use dedicated virtual host blocks instead of editing the default config files. This route can avoid common mistakes and maintain the default files as the fallback configuration as intended.

### VPN

We recommend VPNs as a solution for general encrypted communication between servers. VPNs become increasingly valuable when multiple services need to be protected between servers; instead of encrypting each service individually, all internal communication can be piped to the VPN. This approach is particularly useful if the services in question don’t support native encryption.