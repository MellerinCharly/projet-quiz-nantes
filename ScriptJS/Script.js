import { startQuiz } from "./geo-script.js";

export let currentUserName = "";
const inputUser = document.querySelector("#userName");
const geoLauncherButton = document.querySelector(".geoLauncherButton");
const historyLauncherButton = document.querySelector(".historyLauncherButton");
const cultureLauncherButton = document.querySelector(".cultureLauncherButton");
const homePage = document.querySelector(".logo-home");
export const navLinkGeo = document.querySelector(".quiz-geo");
export const currentUserNamePlaces =
  document.querySelectorAll(".currentUserName");

const setVariablesInLocalStorage = (property /*string*/, value) => {
  window.localStorage.setItem(property, value);
};

// const nameLabel = document.querySelector(".nameLabel");
const whatsYrNameForm = document.querySelector(".whatsYrNameForm");
const displayNameFormIfNecesarry = (localStorageProperty /*string*/) => {
  if (window.localStorage.getItem(localStorageProperty)) {
    const userNameFromLocalStorage =
      window.localStorage.getItem(localStorageProperty); //get preferences if there are
    currentUserName = userNameFromLocalStorage;
    currentUserNamePlaces.forEach((place) => {
      place.textContent = currentUserName;
    });
  } else {
    whatsYrNameForm.classList.remove("displaynone");
  }
};

export function runApplication() {
  displayNameFormIfNecesarry("userName");
  console.log({ currentUserName });
  geoLauncherButton.addEventListener("click", () => {
    if (currentUserName === "") {
      currentUserName = inputUser.value;
      setVariablesInLocalStorage("userName", currentUserName); //save preferences
    }
    startQuiz("geoQuiz");
    console.log({ userName });
  });
  historyLauncherButton.addEventListener("click", () => {
    if (currentUserName === "") {
      currentUserName = inputUser.value;
      setVariablesInLocalStorage("userName", currentUserName); //save preferences
    }
    startQuiz("historyQuiz");
    console.log({ userName });
  });
  cultureLauncherButton.addEventListener("click", () => {
    if (currentUserName === "") {
      currentUserName = inputUser.value;
      setVariablesInLocalStorage("userName", currentUserName); //save preferences
    }
    startQuiz("cultureQuiz");
    console.log({ userName });
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

//PROGRAMM EXECUTION
runApplication();
