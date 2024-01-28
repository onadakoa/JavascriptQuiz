/** @type {HTMLDivElement} */
const testsSection = document.querySelector("#testsSection");
/** @type {HTMLDivElement} */
const answersSection = document.querySelector("#answersSection");
/** @type {HTMLDivElement} */
const statSection = document.querySelector("#statSection");

const testViewer = document.querySelector(".testsViewer");

const ttest = document.querySelector(".template > .test");
const ttest_title = document.querySelector(".template > .test > .title");
const ttest_description = document.querySelector(
  ".template > .test > .description",
);

const qdescription = document.querySelector("#qdesc");
const qanswers = document.querySelectorAll(".answers");
const qanswersInput = document.querySelectorAll(".answers > .answer > input");
const qanswersDiv = document.querySelectorAll(".answers > .answer > div");
const qnextQuestion = document.querySelector("#nextQ");
const qnav = document.querySelector(".qnav");

/** @type {Test[]} */
let tests = JSON.parse(localStorage.getItem("tests"));

tests.forEach((v) => {
  ttest_title.innerHTML = v.title;
  ttest_description.innerHTML = v.description;
  let tmp = ttest.cloneNode(true);

  testViewer.appendChild(tmp);

  let button = tmp.childNodes[5].childNodes[1];
  button.addEventListener("click", () => {
    testsSection.classList.add("hidden");
    answersSection.classList.remove("hidden");

    startTest(v);
  });
});

/** @type {number} */
let startTime;

/** @type {Test} */
let startedTest;

/** @type {Question[]} */
let questions;
let questionsI = -1;

/** @param {Test} test  */
function startTest(test) {
  rateButton.classList.remove("hidden")

  startTime = Date.now();
  startedTest = test;
  questionsI = 0;

  /** @type {Question[]} */
  let tmp = copyObj(test.questions);
  questions = [];
  while (tmp.length != 0) {
    let ran = tmp[random(tmp.length)];
    questions.push(ran);
    tmp = tmp.filter((v) => v != ran);
  }

  setQuestion(0);
}

function setQuestion(i) {
  let answers = document.querySelectorAll(".answers > .answer > input:checked");
  let answersDiv = document.querySelectorAll(
    ".answers > .answer > input:checked ~ div",
  );

  if (answers.length > 0) {
    questions[questionsI].chosen = [];
    answers.forEach((v, vi) => {
      questions[questionsI].chosen.push({
        value: answersDiv.item(vi).innerText,
      });
      v.checked = false;
    });
  }

  questionsI = i;
  let q = questions[questionsI];
  qdescription.innerHTML = q.description;

  let ranArr = [];
  qanswersDiv.forEach((v) => ranArr.push(v));
  let qranD = [];
  while (ranArr.length > 0) {
    let c = ranArr[random(ranArr.length)]; // -1?
    qranD.push(c);
    ranArr = ranArr.filter((l) => l != c);
  }

  qranD.forEach((v, i) => {
    v.innerHTML = q.answers[i].value;

    if (q.chosen == undefined) return;

    q.chosen.forEach((b) => {
      if (q.answers[i].value.toString() == b.value.toString()) {
        qanswersInput[i].checked = true;
      }
    });
  });

  renderQNav();
}

function nextQuestion() {
  if (questions.length - 1 <= questionsI) {
    return setQuestion(0);
  }
  setQuestion(questionsI + 1);
}

function renderQNav() {
  qnav.innerHTML = "";
  questions.forEach((v, i) => {
    let tmp = document.createElement("div");
    tmp.innerHTML = i + 1;
    tmp.onclick = () => {
      setQuestion(i);
    };
    if (i == questionsI) {
      tmp.classList.add("selected");
    }
    if (v.chosen != undefined) {
      tmp.classList.add("answered");
    }
    qnav.appendChild(tmp);
  });
}

const testResult = document.querySelector("div.testResult");
const tquestion = document.querySelector(".template > .question");
const tqdescription = document.querySelector(
  ".template > .question > .description",
);
const tqanswers = document.querySelector(".template > .question > .answers");

const correctCounter = document.querySelector("#correctCounter");

const rateButton = document.querySelector("#rateButton")

function rateTest() {
  setQuestion(0);
  rateButton.classList.add("hidden")

  testsSection.classList.add("hidden");
  answersSection.classList.add("hidden");
  statSection.classList.remove("hidden");

  let counter = 0;

  questions.forEach((v) => {
    tqdescription.innerText = v.description;
    tqanswers.innerHTML = "";
    v.answers.forEach((b, i) => {
      let div = document.createElement("div");
      div.innerText = b.value;
      tqanswers.appendChild(div);

      if (i == 0) {
        div.classList.add("correct");
      }
      if (v.chosen == undefined) return;
      v.chosen.forEach((o) => {
        if (o.value == b.value) {
          div.classList.add("selected");
        }
      });
    });
    if (v.chosen != undefined && v.chosen.length == 1) {
      if (v.chosen[0].value == v.answers[0].value) {
        counter++;
      }
    }

    let tmp = tquestion.cloneNode(true);
    testResult.appendChild(tmp);
  });
  correctCounter.innerHTML = `${counter}/${questions.length}`;
}
