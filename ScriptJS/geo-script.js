import {
  quizCultureData,
  quizGeoData,
  quizHistoryData,
} from "./Script-reponse.js";
import {
  currentUserName,
  currentUserNamePlaces,
  navLinkGeo,
} from "./Script.js";

const quizzes = {
  geoQuiz: quizGeoData,
  historyQuiz: quizHistoryData,
  cultureQuiz: quizCultureData,
};

//TODO: In JS LocalStorage

const USER_CHOICE_INDICATOR = "user-choice"; //conventions => for all importants constants who doesn't change -> in capital
//and avoid to copy paste the new value if it changes in all the programm
//and allow devs to use it in the whole programm
const CONFETTI_CANVAS_ID = "confetti-canvas";

export function startQuiz(quizName) {
  // VARIABLES DEFINITIONS
  const currentQuizData = quizzes[quizName];
  const currentQuizName = quizName;
  const homeSection = document.querySelector(".home-section");
  const scoreSection = document.querySelector(".score-section");
  const questSection = document.querySelector(".quest-section");

  const validationButton = document.querySelector(".validationButton");
  const currentPicture = document.querySelector(".image-quest");
  const statement = document.querySelector(".statement");
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

  const removeConfettisCanvas = () => {
    const canvas = document.querySelector(`#${CONFETTI_CANVAS_ID}`);
    if (canvas) {
      canvas.remove();
    }
  };

  const removeNextButton = () => {
    const nextButton = document.querySelector(".next-button");
    if (nextButton) {
      nextButton.remove();
    }
  };

  const removeChoicesButtons = () => {
    const choices = getChoicesButtons();
    choices.forEach((buttonChoice) => {
      buttonChoice.remove();
    });
  };

  const updateCardQuest = () => {
    homeSection.classList.add("displaynone");
    questSection.classList.remove("displaynone");
    scoreSection.classList.add("displaynone");
    validationButton.classList.remove("displaynone");
    removeNextButton();
    removeChoicesButtons();
    // navLinkGeo.setAttribute("disabled", true);
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
    removeNextButton();
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
      if (currentQuizData === quizzes["geoQuiz"]) {
        statement.classList.add("displaynone");
        currentPicture.classList.remove("displaynone");
        currentPicture.src = currentQuestion.picture;
      } else {
        currentPicture.classList.add("displaynone");
        statement.textContent = currentQuestion.question;
      }
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
    removeChoicesButtons();
    goToQuestion(currentQuestionIndex + 1);
  };

  const createNextButton = () => {
    removeNextButton();
    const nextButton = document.createElement("button");
    validationButton.classList.add("displaynone");
    nextButton.classList.add("cta", "quest", "next-button");
    nextButton.textContent = "Suivant";
    cardQuest.appendChild(nextButton);
    nextButton.addEventListener("click", handleClickOnNextButton);
  };

  //CONFETTIS

  function giveConfettis() {
    const canvas = document.createElement("canvas");
    canvas.id = CONFETTI_CANVAS_ID;
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
    currentUserNamePlaces.forEach((place) => {
      place.textContent = currentUserName;
    });
    giveConfettis();
    navLinkGeo.setAttribute("disabled", false);
  };

  const stopQuiz = () => {
    questSection.classList.add("displaynone");
    scoreSection.classList.remove("displaynone");
    giveScoreUser();
  };

  const replayQuiz = () => {
    startQuiz(currentQuizName);
  };

  // PROGRAM EXECUTION
  removeConfettisCanvas();
  updateCardQuest();
  goToQuestion(currentQuestionIndex);
  validationButton.addEventListener("click", () => {
    giveCorrection(getChoicesButtons());
    createNextButton(getChoicesButtons());
  });
  replayButton.addEventListener("click", replayQuiz);
}

// BOUTON ACCUEIL
