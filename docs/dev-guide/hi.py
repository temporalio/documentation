import os

titles = [
    "Core application",
    "Temporal Clients",
    "Test suites",
    "Failure detection",
    "Messages",
    "Runtime safeguards",
    "Cancellation",
    "Asynchronous Activity Completion",
    "Versioning",
    "Observability",
    "Debugging",
    "Schedules",
    "Data encryption",
    "Side Effects",
    "Child Workflows",
    "Continue-As-New",
    "Timers",
    "Interrupt a Workflow Execution"
]

# Create a directory to store the .mdx files
os.makedirs("mdx", exist_ok=True)

for index, title in enumerate(titles, start=1):
    file_name = title.lower().replace(" ", "_") + ".mdx"
    file_path = os.path.join("mdx", file_name)

    with open(file_path, "w") as file:
        # Write metadata
        file.write("---\n")
        file.write(f"id: {title.lower().replace(' ', '-')}\n")
        file.write(f"title: {title}\n")
        file.write(f"sidebar_label: {title}\n")
        file.write(f"sidebar_position: {index}\n")
        file.write("description: \n")
        file.write(f"slug: /dev-guide/python/{file_name[:-4]}\n")
        file.write("toc_max_heading_level: 2\n")
        file.write("keywords:\n")
        file.write(f"  - {title.lower().replace(' ', '-')}\n")
        file.write("tags:\n")
        file.write(f"  - {title.lower().replace(' ', '-')}\n")
        file.write("---\n\n")

        # Write title and content placeholder
        file.write(f"# {title}\n\n")
        file.write("{/* Content goes here */}\n")

print("MDX files created successfully.")