const launcherButton = document.querySelector(".launcherButton");
const scoreSection = document.querySelector(".score-section");

export function validation() {
  launcherButton.addEventListener("click", () => {
    scoreSection.classList.remove("displaynone");
  });
}
