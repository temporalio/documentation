function addFilterEvent() {
  const tagSelect = document.getElementById("tag-select");
  const glossaryEntries = document.getElementsByClassName("glossary-entry");

  tagSelect.addEventListener("change", function () {
    const selectedTag = this.value;

    for (let i = 0; i < glossaryEntries.length; i++) {
      const entry = glossaryEntries[i];
      const termClassList = entry.getElementsByClassName("term-name")[0].getElementsByTagName("span")[0].classList;
      const classListArray = Array.from(termClassList);
      const termTags = classListArray.join(",");

      if (selectedTag === "all" || termTags.includes(selectedTag)) {
        entry.style.display = "block";
      } else {
        entry.style.display = "none";
      }
    }
  });
}

addFilterEvent();
