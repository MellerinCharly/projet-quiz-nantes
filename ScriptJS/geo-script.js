import {
  quizCultureData,
  quizGeoData,
  quizHistoryData,
} from "./Script-reponse.js";
import { currentUserName, currentUserNamePlaces } from "./Script.js";

const quizzes = {
  geoQuiz: quizGeoData,
  historyQuiz: quizHistoryData,
  cultureQuiz: quizCultureData,
};

const USER_CHOICE_INDICATOR = "user-choice";
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
          }
        });
      });
    });
  };

  const getPictureOrStatement = () => {
    if (currentQuizData === quizzes["geoQuiz"]) {
      statement.classList.add("displaynone");
      currentPicture.classList.remove("displaynone");
      currentPicture.classList.remove("loaded");
      currentPicture.src = currentQuestion.picture;
    } else {
      currentPicture.classList.add("displaynone");
      statement.classList.remove("displaynone");
      statement.textContent = currentQuestion.question;
    }
  };

  const goToQuestion = (questionIndex) => {
    removeNextButton();
    currentQuestion = currentQuizData[questionIndex];
    console.log({ currentQuestion });
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
      getPictureOrStatement();
      console.log({ currentQuestionIndex });
    } else {
      stopQuiz();
    }
    currentQuestionIndex++;
  };

  const giveCorrection = (choices) => {
    const goodAnswer = currentQuestion.answers.find(
      (response) => response.correct === true
    );
    const buttonUserChoice = Array.from(choices).find(
      (button) => button.dataset.id === USER_CHOICE_INDICATOR
    );
    if (choiceUser === goodAnswer.choice) {
      buttonUserChoice.style.background = "#6FBB7C";
      score++;
    } else {
      buttonUserChoice.style.background = "#E65C0E";
      const choicesButtons = getChoicesButtons();
      const correctButton = Array.from(choicesButtons).find(
        (btn) => btn.textContent === goodAnswer.choice
      );
      correctButton.style.background = "#6FBB7C";
    }
  };

  const handleClickOnNextButton = () => {
    removeChoicesButtons();
    goToQuestion(currentQuestionIndex);
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
  const giveConfettis = () => {
    const canvas = document.createElement("canvas");
    canvas.id = CONFETTI_CANVAS_ID;
    cardScore.appendChild(canvas);
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    const pumpkin = confetti.shapeFromPath({
      path: "M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z",
      matrix: [
        0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983,
        -5.9016393442622945,
      ],
    });
    const tree = confetti.shapeFromPath({
      path: "M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z",
      matrix: [
        0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669,
        -5.071942446043165,
      ],
    });
    const defaults = {
      scalar: 4,
      spread: 180,
      particleCount: 100,
      origin: { y: -0.1 },
      startVelocity: -35,
    };
    confetti({
      ...defaults,
      shapes: [pumpkin],
      colors: ["#ff9a00", "#ff7400", "#ff4d00"],
    });
    confetti({
      ...defaults,
      shapes: [tree],
      colors: ["#8d960f", "#be0f10", "#445404"],
    });
  };

  const giveScoreUser = () => {
    scorePlace.innerHTML = `${score} / ${currentQuizData.length}`;
    currentUserNamePlaces.forEach((place) => {
      place.textContent = currentUserName;
    });
    giveConfettis();
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
