const showAnswer = document.querySelectorAll("#show-answer");
const question = document.querySelector("#added-question");
const answer = document.querySelector("#added-answer");
const questionsContainer = document.querySelector("#questions-container");

let allQuestions = [];

let id = 0;
let tempID = 0;

//uniqe id generator
function idGenerator() {
  if (allQuestions != 0) {
    id = allQuestions.reduce((sum, cur) => {
      return (sum += Number(cur.id));
    }, 0);
  }
  id++;
  console.log(id);
}

//Adds a question
function addQuestion() {
  // id++;
  if (question.value != "" && answer.value != "") {
    // allQuestions.push(new Questions(question.value, answer.value, id));
    const div = document.createElement("div");
    div.classList.add("question");
    div.id = id;
    div.innerHTML = `<span class="question-title">${question.value}</span>
            <label id="show-answer">Show/Hide Answer</label>
            <p class="answer" id="answer">${answer.value}</p>
            <div class="btns-container">
              <button class="edit" id="edit">Edit</button
              ><button class="delete" id="delete">Delete</button>
            </div>`;
    allQuestions.push(div);
    // questionsContainer.appendChild(div);
    question.value = "";
    answer.value = "";
    document.querySelector(".overlay").style.display = "none";
  }
  updateQuestions(allQuestions);
}

//Edits question
function editQuestion(elementID) {
  [...document.getElementById(`${elementID}`).children].forEach((element) => {
    if (element.classList.contains("question-title")) {
      element.innerText = document.querySelector("#editted-question").value;
    }
    if (element.classList.contains("answer")) {
      element.innerText = document.querySelector("#editted-answer").value;
    }
  });
  document.querySelector(".edit-overlay").style.display = "none";
  updateAllQuestions();
}

//Deletes question
function deleteQuestion(element) {
  questionsContainer.removeChild(element.parentNode.parentNode);
  updateAllQuestions();
}

// gets all divs with data from "allQuestions variable up top and post it to UI"
function updateQuestions(questions) {
  questions.forEach((cur) => {
    questionsContainer.appendChild(cur);
  });
}

//This function belows to edit event listener
function editEventListener(e) {
  let elementID = e.target.parentNode.parentNode.id;

  document.querySelector(".edit-overlay").style.display = "flex";
  [...document.getElementById(`${elementID}`).children].forEach((element) => {
    if (element.classList.contains("question-title")) {
      document.querySelector("#editted-question").value = element.innerText;
    }
    if (element.classList.contains("answer")) {
      document.querySelector("#editted-answer").value = element.innerText;
    }
  });
  tempID = Number(elementID);
  return tempID;
}

//update data
function updateAllQuestions() {
  allQuestions = [...document.querySelectorAll(".questions")];
}

//All event listeners
function eventListeners() {
  document.querySelector(".container").addEventListener("click", (e) => {
    if (e.target.id == "add-question-btn") {
      document.querySelector(".overlay").style.display = "flex";
      idGenerator();
    }
    if (e.target.id == "delete") {
      deleteQuestion(e.target);
      updateAllQuestions();
    }
    if (e.target.id == "edit") {
      editEventListener(e);
    }
    if (e.target.id == "show-answer") {
      e.target.nextElementSibling.classList.toggle("show-answer");
    }
  });

  document.querySelector(".overlay").addEventListener("click", (e) => {
    if (e.target.id == "close") {
      document.querySelector(".overlay").style.display = "none";
    }
    if (e.target.id == "save") {
      addQuestion();
    }
  });

  document.querySelector(".edit-overlay").addEventListener("click", (e) => {
    if (e.target.id == "close-edit") {
      document.querySelector(".edit-overlay").style.display = "none";
    }
    if (e.target.id == "save-edit") {
      editQuestion(tempID);
    }
  });
}

idGenerator();
eventListeners();
updateAllQuestions();
