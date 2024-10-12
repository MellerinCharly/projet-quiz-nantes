import { startQuiz } from "./geo-script.js";

const launcherButton = document.querySelector(".launcherButton");
console.log(launcherButton);

export function runApplication() {
  launcherButton.addEventListener("click", () => startQuiz("geoQuiz"));
}

runApplication();
