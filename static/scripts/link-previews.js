document.addEventListener("click", function (event) {
  if (event.target.matches(".clickable-link-preview")) {
    const element = event.target;
    const str = element.id;
    const iD = `preview-modal-${str.substring(2)}`;
    const targetElement = document.getElementById(iD);

    if (targetElement.style.display === "none" || targetElement.style.display === "") {
      targetElement.style.display = "block";
    } else {
      targetElement.style.display = "none";
    }
  }
});
