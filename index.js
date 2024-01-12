

const testCount = document.querySelector("#testCount");

if (localStorage.getItem("tests") == null) {
  localStorage.setItem("tests", JSON.stringify([DEFAULT_TEST]));
}

let tests = JSON.parse(localStorage.getItem("tests"));
testCount.innerHTML = tests.length;

function resetTests() {
  localStorage.removeItem("tests");
  localStorage.setItem("tests", JSON.stringify([DEFAULT_TEST]));
  tests = JSON.parse(localStorage.getItem("tests"));
  testCount.innerHTML = tests.length;
  console.log("tests has been reseted to initial state")
}
