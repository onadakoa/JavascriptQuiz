const testsViewer = document.querySelector(".testsViewer");
const template = document.querySelector(".template#test > .test ");
const template_title = document.querySelector(
  ".template#test > .test > .title",
);
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
const testsManage = document.querySelector("#testsManage");
/** @type {HTMLDivElement} */
const testsSelection = document.querySelector("#testsSelection");

/** @type {{id:number, title:string, description:string, questions: {id:number}[]}[]} */
let tests = JSON.parse(localStorage.getItem("tests"));
function saveTests() {
  localStorage.setItem("tests", JSON.stringify(tests));
  window.location.reload();
}

function deleteTest(id) {
  tests = tests.filter((v) => v.id != id);
  saveTests();
}
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

tests.forEach((e) => {
  renderTestView(e.title, e.description, () => {
    manageTest(e.id);
  }, () => {
    deleteTest(e.id);
  });
});

// questions
const questions = document.querySelector(".questions");
const qtemplate_question = document.querySelector(
  ".template#question > .question",
);
const qtemplate_number = document.querySelector(
  ".template#question > .question > span",
);
const tqtemplate_answers = document.querySelectorAll(
  ".template#question > .question > .answers > div > textarea",
);
const qtemplate_description = document.querySelector(
  ".template#question > .question > .desc > textarea",
);

const ntest_title = document.querySelector("#newTestTitle");
const ntest_description = document.querySelector("#newTestDescription");

/** @type {{node: HTMLDivElement,id: number,description: string, answers: {value: string}[]}[]} */
let equestions = [];

function renderQuestions(description, answers, obj) {
  qtemplate_description.innerHTML = description;
  qtemplate_number.innerHTML = obj.id;

  answers.forEach((v, i) => {
    tqtemplate_answers[i].innerHTML = v.value;
  });
  let tmp = qtemplate_question.cloneNode(true);

  /**
   * @type {{value: string}[]}
   */
  let ans = [];
  let desc = tmp.childNodes[5].childNodes[1];

  tmp.childNodes[7].childNodes.forEach((v, i) => {
    if (i % 2 == 0) return;
    ans.push(v.childNodes[3]);
  });

  tmp.childNodes[3].addEventListener("click", () => {
    tmp.remove();
    equestions = equestions.filter((v) => v.id != obj.id);
  });
  equestions.push({ id: obj.id, description: desc, answers: ans, node: tmp });

  questions.appendChild(tmp);
}

function createQuestion() {
  let nq = copyObj(NEW_QUESTION);
  equestions.forEach((v) => {
    if (v.id >= nq.id) {
      nq.id = v.id + 1;
    }
  });
  renderQuestions(nq.description, nq.answers, nq);
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
function createTest() {
  let i = 0;
  tests.forEach((v) => {
    if (v.id >= i) i = v.id + 1;
  });
  let mtest = JSON.parse(JSON.stringify(DEFAULT_TEST));
  mtest.id = i;
  tests.push(mtest);

  manageTest(i);
}
function manageTest(id) {
  questions.innerHTML = "";
  testsSelection.classList.add("hidden");
  testsManage.classList.remove("hidden");

  let managedTest = tests.find((v) => v.id == id);

  ntest_title.value = managedTest.title;
  ntest_description.value = managedTest.description;

  managedTest.questions.forEach((v) => {
    renderQuestions(v.description, v.answers, v);
  });
  // console.log(equestions);

  localStorage.setItem("mtest", JSON.stringify(managedTest));
}

function cancelManage() {
  localStorage.removeItem("mtest");
  window.location.reload();
}
function saveManage() {
  /** @type {{id:number, title:string, description:string, questions: {id:number, description: string, answers: {value: string}[]}[]}} */
  let mtest = JSON.parse(localStorage.getItem("mtest"));
  if (mtest == null || equestions.length === 0) window.location.reload();

  mtest.title = ntest_title.value;
  mtest.description = ntest_description.value;

  mtest.questions = [];
  equestions.forEach((v) => {
    mtest.questions.push({
      id: v.id,
      description: v.description.value,
      answers: v.answers.map((v) => {
        return { value: v.value };
      }),
    });
  });

  tests = tests.filter((v) => v.id != mtest.id);
  tests.push(mtest);

  saveTests();
}
