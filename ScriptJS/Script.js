import { startQuiz } from "./geo-script.js";

export let currentUserName = "";
const inputUser = document.querySelector("#userName");
const homePage = document.querySelector(".logo-home");
export const navLinkGeo = document.querySelector(".quiz-geo");
export const currentUserNamePlaces =
  document.querySelectorAll(".currentUserName");

const setVariablesInLocalStorage = (property /*string*/, value) => {
  window.localStorage.setItem(property, value);
};

const whatsYrNameFormContainer = document.querySelector(
  ".whatsYrNameFormContainer"
);
const displayNameFormIfNecesarry = (localStorageProperty /*string*/) => {
  if (window.localStorage.getItem(localStorageProperty)) {
    const userNameFromLocalStorage =
      window.localStorage.getItem(localStorageProperty); //get preferences if there are
    currentUserName = userNameFromLocalStorage;
    currentUserNamePlaces.forEach((place) => {
      place.textContent = currentUserName;
    });
    const launchButtons = document.querySelectorAll("button[data-quiz]");
    Array.from(launchButtons).forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.title = "Démarrer le quiz";
    });
  } else {
    whatsYrNameFormContainer.classList.remove("displaynone");
  }
};

export function runApplication() {
  displayNameFormIfNecesarry("userName");
  const quizzesButtons = document.querySelectorAll("button[data-quiz]");
  quizzesButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (currentUserName === "") {
        currentUserName = inputUser.value;
        setVariablesInLocalStorage("userName", currentUserName); // save preferences
      }
      startQuiz(btn.dataset.quiz);
      quizzesButtons.forEach((quizBtn) => {
        quizBtn.classList.remove("active");
      });
      event.currentTarget.classList.add("active");
    });
  });
}

//NAVBAR BUTTONS
navLinkGeo.addEventListener("click", () => {
  startQuiz("geoQuiz");
});

// Bouton Reload
homePage.addEventListener("click", () => {
  location.reload();
});

// Bug : Ne fonctionne toujours à rechecker
// const mandatoryName = document.querySelector("input");

// mandatoryName.addEventListener("keydown", (e) => {
//   if (!e.repeat) {
//     console.log("coucou");b
//     geoLauncherButton.classList.toggle("disabledChoices");
//     mandatoryName.classList.remove("mandatory");
//   }
// });

inputUser.addEventListener("input", (e) => {
  const launchButtons = document.querySelectorAll("button[data-quiz]");
  if (inputUser.value.trim().length > 2) {
    //trim() for cancel spaces + .length for min char, and so empty string is purchased
    inputUser.classList.remove("mandatory");
    Array.from(launchButtons).forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.title = "Démarrer le quiz";
    });
  } else {
    inputUser.classList.add("mandatory");
    Array.from(launchButtons).forEach((btn) => {
      btn.setAttribute("disabled", true);
      btn.title = "Entrez d'abord votre nom avant de commencer un quiz.";
    });
  }
});

console.log(
  `⢀⠔⠊⠉⠑⢄⠀⠀⣀⣀⠤⠤⠤⢀⣀⠀⠀⣀⠔⠋⠉⡄⠀
⡎⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠘⡄
⣧⢢⠀⠀⠀⠀⠀⠀⠀⠀⣀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣆⡗
⠘⡇⠀⢀⠆⠀⠀⣀⠀⢰⣿⣿⣧⠀⢀⡀⠀⠀⠘⡆⠀⠈⡏⠀
⠀⠑⠤⡜⠀⠀⠈⠋⠀⢸⣿⣿⣿⠀⠈⠃⠀⠀⠀⠸⡤⠜⠀⠀
⠀⠀⠀⣇⠀⠀⠀⠀⠀⠢⣉⢏⣡⠀⠀⠀⠀⠀⠀⢠⠇⠀⠀⠀
⠀⠀⠀⠈⠢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢨⠃⠀⢀⠀⢀⠔⡆⠀⠀⠀⠀⠻⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡎⠀⠀⠧⠬⢾⠊⠀⠀⢀⡇⠀⠀⠟⢆⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡇⠀⠀⡞⠀⠀⢣⣀⡠⠊⠀⠀⠀⢸⠈⣆⡀⠀⠀
⠀⠀⡠⠒⢸⠀⠀⠀⡇⡠⢤⣯⠅⠀⠀⠀⢀⡴⠃⠀⢸⠘⢤⠀
⠀⢰⠁⠀⢸⠀⠀⠀⣿⠁⠀⠙⡟⠒⠒⠉⠀⠀⠀⠀⠀⡇⡎⠀
⠀⠘⣄⠀⠸⡆⠀⠀⣿⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⢀⠟⠁⠀
⠀⠀⠘⠦⣀⣷⣀⡼⠽⢦⡀⠀⠀⢀⣀⣀⣀⠤⠄⠒⠁⠀⠀⠀

MADE WITH LOVE BY TEAM KIPIK`
);

runApplication();
