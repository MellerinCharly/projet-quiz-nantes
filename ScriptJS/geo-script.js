import { quizGeoData } from "./Script-reponse.js";

const homeSection = document.querySelector(".home-section");
const scoreSection = document.querySelector(".score-section");
const questSection = document.querySelector(".quest-section");

const validationButton = document.querySelector(".validationButton");
const currentPicture = document.querySelector(".image-quest");
const choice1 = document.querySelector(".choice1");
const choice2 = document.querySelector(".choice2");
const choice3 = document.querySelector(".choice3");
const choice4 = document.querySelector(".choice4");
const choices = document.querySelectorAll(".choice");

let currentQuestionIndex = 0;
let currentQuestion = quizGeoData[currentQuestionIndex];
let choiceUser;
let score = 0;

export function startGeoQuiz() {
  homeSection.classList.add("displaynone");
  questSection.classList.remove("displaynone");
  scoreSection.classList.add("displaynone");
  currentQuestionIndex = 0;
  score = 0;
  console.log({ currentQuestion });
  currentPicture.src = currentQuestion.picture;
  console.log(currentPicture.src);
  choice1.textContent = currentQuestion.answers[0].choice1;
  choice2.textContent = currentQuestion.answers[1].choice2;
  choice3.textContent = currentQuestion.answers[2].choice3;
  choice4.textContent = currentQuestion.answers[3].choice4;
  choices.forEach((button) => {
    button.addEventListener("click", () => {
      button.id = "clicked";
      choices.forEach((button) => {
        if (button.id !== "clicked") {
          button.style.background = "#B7B7B7";
        } else {
          choiceUser = button.textContent;
          console.log({ choiceUser });
        }
      });
    });
  });
  validationButton.addEventListener("click", () => {
    const goodAnswer = currentQuestion.answers.find((response) => {
      response.correct === true;
    });
    if(choiceUser === goodAnswer.)
  })
}

function giveCorrection() {}
