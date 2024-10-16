import { startQuiz } from "./geo-script.js";

let currentUserName;
const inputUser = document.querySelector("#userName");
const launcherButton = document.querySelector(".launcherButton");
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
    console.log({ userName });
  });
}

runApplication();
