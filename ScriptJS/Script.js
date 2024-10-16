import { startQuiz } from "./geo-script.js";

let currentUserName;
const inputUser = document.querySelector("#userName");
const geoLauncherButton = document.querySelector(".geoLauncherButton");
const historyLauncherButton = document.querySelector(".historyLauncherButton");
const cultureLauncherButton = document.querySelector(".cultureLauncherButton");
const homePage = document.querySelector(".logo-home");
export const navLinkGeo = document.querySelector(".quiz-geo");
// const currentName = document.querySelector(".currentUserName");

const setVariablesInLocalStorage = (property /*string*/, value) => {
  window.localStorage.setItem(property, value);
};

const getOrSetVariablesInLocalStorage = (property /*string*/) => {
  if (window.localStorage.getItem("userName")) {
    const userNameFromLocalStorage = window.localStorage.getItem("userName"); //get preferences if there are
    currentUserName = userNameFromLocalStorage;
  } else {
    currentUserName = inputUser.value;
    setVariablesInLocalStorage("userName", currentUserName); //save preferences
  }
};

export function runApplication() {
  geoLauncherButton.addEventListener("click", () => {
    currentUserName = inputUser.value;
    setVariablesInLocalStorage("userName", currentUserName); //save preferences
    startQuiz("geoQuiz");
    // navLinkGeo.setAttribute("disabled", true);
    console.log({ userName });
  });
  historyLauncherButton.addEventListener("click", () => {
    currentUserName = inputUser.value;
    setVariablesInLocalStorage("userName", currentUserName); //save preferences
    startQuiz("historyQuiz");
    // navLinkGeo.setAttribute("disabled", true);
    console.log({ userName });
  });
  cultureLauncherButton.addEventListener("click", () => {
    currentUserName = inputUser.value;
    setVariablesInLocalStorage("userName", currentUserName); //save preferences
    startQuiz("cultureQuiz");
    // navLinkGeo.setAttribute("disabled", true);
    console.log({ userName });
  });
}

//NAVBAR BUTTONS
navLinkGeo.addEventListener("click", () => {
  startQuiz("geoQuiz");
  // navLinkGeo.setAttribute("disabled", true);
});

// Bouton Reload
homePage.addEventListener("click", () => {
  location.reload();
});

//PROGRAMM EXECUTION
runApplication();
