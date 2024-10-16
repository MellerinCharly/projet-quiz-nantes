import { startQuiz } from "./geo-script.js";

let userName;
const inputUser = document.querySelector("#userName");
const launcherButton = document.querySelector(".launcherButton");
const homePage = document.querySelector(".logo-home");
export const navLinkGeo = document.querySelector(".quiz-geo");
// const currentName = document.querySelector(".currentUserName");
console.log(launcherButton);

export function runApplication() {
  launcherButton.addEventListener("click", () => {
    userName = inputUser.value;
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
