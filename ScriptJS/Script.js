import { startQuiz } from "./geo-script.js";

let userName;
const inputUser = document.querySelector("#userName");
const launcherButton = document.querySelector(".launcherButton");
console.log(launcherButton);

export function runApplication() {
  launcherButton.addEventListener("click", () => {
    userName = inputUser.value;
    startQuiz("geoQuiz");
    console.log({ userName });
  });
}

runApplication();
