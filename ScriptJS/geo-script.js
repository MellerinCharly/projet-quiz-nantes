import { quizGeoData } from "./Script-reponse.js";
const quizzes = {
  geoQuiz: quizGeoData,
  cultureQuiz: [],
  historyQuiz: [],
};

//TODO: In my JS setNameUser in LocalStorage, confettis
//TODO: In HTML add quizzes buttons choices before the let's go button
//TODO: In JS general add eventListener on quizes choices links of the nav to startQuiz(nameOfTheQuiz) + let underline on clicked link

const USER_CHOICE_INDICATOR = "user-choice"; //conventions => for all importants constants who doesn't change -> in capital
//and avoid to copy paste the new value if it changes in all the programm
//and allow devs to use it in the whole programm

export function startQuiz(quizName) {
  // VARIABLES DEFINITIONS
  const currentQuizData = quizzes[quizName];

  const homeSection = document.querySelector(".home-section");
  const scoreSection = document.querySelector(".score-section");
  const questSection = document.querySelector(".quest-section");

  const validationButton = document.querySelector(".validationButton");
  const currentPicture = document.querySelector(".image-quest");
  const cardQuest = document.querySelector(".card-quest");
  const replayButton = document.querySelector(".replayButton");

  const cardScore = document.querySelector(".card-score");
  const scoreContainer = document.querySelector("#userScore");
  const scorePlace = scoreContainer.querySelector("span");
  console.log({ scoreplace: scorePlace });

  //HELPER
  const getChoicesButtons = () => document.querySelectorAll(".choice");

  let currentQuestionIndex = 0;
  let currentQuestion = currentQuizData[currentQuestionIndex];
  let choiceUser;
  let score = 0;

  const displayQuest = () => {
    homeSection.classList.add("displaynone");
    questSection.classList.remove("displaynone");
    scoreSection.classList.add("displaynone");
    validationButton.classList.remove("displaynone");
  };

  const addListenerOnChoicesButtons = () => {
    const choices = document.querySelectorAll(".choice");
    choices.forEach((button) => {
      button.addEventListener("click", () => {
        button.dataset.id = USER_CHOICE_INDICATOR;
        choices.forEach((button) => {
          if (button.dataset.id !== USER_CHOICE_INDICATOR) {
            button.style.background = "#B7B7B7";
          } else {
            choiceUser = button.textContent;
            console.log({ choiceUser });
          }
        });
      });
    });
  };

  const goToQuestion = (questionIndex) => {
    const nextButton = document.querySelector(".next-button");
    if (nextButton) {
      nextButton.remove();
    }
    currentQuestion = currentQuizData[questionIndex];
    console.log({ lengthData: currentQuizData.length });
    console.log({ lengthQuestionPassed: questionIndex });
    if (questionIndex !== currentQuizData.length) {
      validationButton.classList.remove("displaynone");
      const choicesWrapper = document.querySelector(".choices-wrapper");
      currentQuestion.answers.forEach((answer) => {
        const choiceButton = document.createElement("button");
        choiceButton.classList.add("choice");
        choiceButton.textContent = answer.choice;
        choicesWrapper.append(choiceButton);
      });
      addListenerOnChoicesButtons();
      currentPicture.src = currentQuestion.picture;
      currentQuestionIndex++;
    } else {
      stopQuiz();
    }
  };

  const giveCorrection = (choices) => {
    const goodAnswer = currentQuestion.answers.find(
      (response) => response.correct === true
    );
    const buttonUserChoice = Array.from(choices).find(
      (button) => button.dataset.id === USER_CHOICE_INDICATOR
    );
    console.log(buttonUserChoice);
    if (choiceUser === goodAnswer.choice) {
      buttonUserChoice.style.background = "#6FBB7C";
      score++;
      console.log({ scoreUser: score });
    } else {
      buttonUserChoice.style.background = "#E65C0E";
    }
  };

  const handleClickOnNextButton = () => {
    const choices = getChoicesButtons();
    choices.forEach((buttonChoice) => {
      buttonChoice.remove();
    });
    goToQuestion(currentQuestionIndex + 1);
  };

  const createNextButton = () => {
    const nextButton = document.createElement("button");
    validationButton.classList.add("displaynone");
    nextButton.classList.add("cta", "quest", "next-button");
    nextButton.textContent = "Suivant";
    cardQuest.appendChild(nextButton);
    nextButton.addEventListener("click", handleClickOnNextButton);
  };

  //CONFETTIS

  function giveConfettis() {
    if (canvas) {
      canvas.remove();
    }
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    cardScore.appendChild(canvas);
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 100,
      spread: 160,
    });
  }

  const giveScoreUser = () => {
    scorePlace.innerHTML = `${score} / ${currentQuizData.length}`;
    giveConfettis();
  };

  const stopQuiz = () => {
    questSection.classList.add("displaynone");
    scoreSection.classList.remove("displaynone");
    giveScoreUser();
  };

  const replayQuiz = () => {
    startQuiz("geoQuiz");
  };

  // PROGRAM EXECUTION
  displayQuest();
  goToQuestion(currentQuestionIndex);
  validationButton.addEventListener("click", () => {
    giveCorrection(getChoicesButtons());
    createNextButton(getChoicesButtons());
  });
  replayButton.addEventListener("click", replayQuiz);
}
