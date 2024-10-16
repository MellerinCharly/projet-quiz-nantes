import { startQuiz } from "./geo-script.js";

let currentUserName;
const inputUser = document.querySelector("#userName");
const launcherButton = document.querySelector(".launcherButton");
const homePage = document.querySelector(".logo-home");
export const navLinkGeo = document.querySelector(".quiz-geo");
// const currentName = document.querySelector(".currentUserName");
console.log(launcherButton);

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
  launcherButton.addEventListener("click", () => {
    currentUserName = inputUser.value;
    setVariablesInLocalStorage("userName", currentUserName); //save preferences
    startQuiz("geoQuiz");
    navLinkGeo.setAttribute("disabled", true);
    console.log({ userName });
  });
}
// export function runApplication() {
navLinkGeo.addEventListener("click", () => {
  startQuiz("geoQuiz");
  // navLinkGeo.setAttribute("disabled", true);
});

// Bouton Reload
homePage.addEventListener("click", () => {
  location.reload();
});

// UserName
// currentName.innerHTML = userName;

runApplication();
