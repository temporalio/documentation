document.addEventListener("click", function (event) {
  if (event.target.matches("[data-event='clickable-copycode-info']")) {
    const clickableChevron = event.target;
    const str = clickableChevron.id;
    const iD = `copycode-info-${str.substring(2)}`;
    const targetElement = document.getElementById(iD);

    if (targetElement.style.display === "none" || targetElement.style.display === "") {
      targetElement.style.display = "block";
      clickableChevron.style.transform = "rotate(180deg)";
    } else {
      targetElement.style.display = "none";
      clickableChevron.style.transform = "rotate(0deg)";
    }
  }
});
