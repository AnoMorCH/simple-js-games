import firstGame from "./modules/first-game.js";
import secondGame from "./modules/second-game.js";
import thirdGame from "./modules/third-game.js";
import results from "./modules/results.js"

window.addEventListener("DOMContentLoaded", () => {
    firstGame();
    secondGame();
    thirdGame();
    results();
});