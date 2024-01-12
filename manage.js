const testsViewer = document.querySelector(".testsViewer")
const template = document.querySelector(".template#test > .test ");
const template_title = document.querySelector(".template#test > .test > .title");
const template_description = document.querySelector(
  ".template#test > .test > .description",
);
const template_manage = document.querySelector(
  ".template#test > .test > .nav > div:nth-child(1)",
);
const template_delete = document.querySelector(
  ".template#test > .test > .nav > div:nth-child(2)",
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


// questions 
const questions = document.querySelector(".questions")
const qtemplate_question = document.querySelector(".template#question > .question")
const qtemplate_number = document.querySelector(".template#question > .question > span")
const tqtemplate_answers = document.querySelectorAll(".template#question > .question > .answers > div > textarea")
const qtemplate_description = document.querySelector(".template#question > .question > .desc > textarea")

const ntest_title = document.querySelector("#newTestTitle")
const ntest_description= document.querySelector("#newTestDescription")


function renderQuestions(description, answers) {
  qtemplate_description.innerHTML = description;
  qtemplate_number.innerHTML = 32;

  answers.forEach((v,i) => {
      tqtemplate_answers[i].innerHTML = v.value;
  })
  let tmp = qtemplate_question.cloneNode(true)

  questions.appendChild(tmp)
}
function createTest() {
  questions.innerHTML = ""
  testsSelection.classList.add("hidden")
  testsManage.classList.remove("hidden")

  localStorage.setItem("mtest", JSON.stringify(DEFAULT_TEST))

  ntest_title.value = DEFAULT_TEST.title;
  ntest_description.value = DEFAULT_TEST.description

  DEFAULT_TEST.questions.forEach(v => {
    renderQuestions(v.description, v.answers) 
  })
}
// test

