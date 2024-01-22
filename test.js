const testViewer = document.querySelector(".testsViewer")

const ttest = document.querySelector(".template > .test")
const ttest_title = document.querySelector(".template > .test > .title")
const ttest_description = document.querySelector(".template > .test > .description")



/** @type {{id:number, title:string, description:string, questions: {id:number}[]}[]} */
let tests = JSON.parse(localStorage.getItem("tests"))


tests.forEach((v) => {
    ttest_title.innerHTML = v.title;
    ttest_description.innerHTML = v.description;
    let tmp = ttest.cloneNode(true)

    testViewer.appendChild(tmp)

    let button = tmp.childNodes[5].childNodes[1]
    button.addEventListener("click", () => {
        console.log(v.id)
    })
})
