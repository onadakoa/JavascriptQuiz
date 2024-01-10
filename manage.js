const testsViewer = document.querySelector(".testsViewer")
const template = document.querySelector(".template > .test ");
const template_title = document.querySelector(".template > .test > .title");
const template_description = document.querySelector(
  ".template > .test > .description",
);
const template_manage = document.querySelector(
  ".template > .test > .nav > div:nth-child(1)",
);
const template_delete = document.querySelector(
  ".template > .test > .nav > div:nth-child(2)",
);

/** @type {HTMLDivElement} */
const testsManage = document.querySelector("#testsManage")
/** @type {HTMLDivElement} */
const testsSelection = document.querySelector("#testsSelection")

function renderTestView(title, description, onManage, onDelete) {
  template_title.innerHTML = title;
  template_description.innerHTML = description;
  template_manage.addEventListener("click", onManage);
  template_delete.addEventListener("click", onDelete);

  let tmp = template.cloneNode(true);
  tmp.childNodes[5].childNodes[1].addEventListener("click", onManage);
  tmp.childNodes[5].childNodes[3].addEventListener("click", onDelete);
  testsViewer.appendChild(tmp);
}

let tests = JSON.parse(localStorage.getItem("tests"));
tests.forEach((e) => {
  renderTestView(e.title, e.description, () => {}, () => {});
});



function createTest() {
  testsSelection.classList.add("hidden")
  testsManage.classList.remove("hidden")

}