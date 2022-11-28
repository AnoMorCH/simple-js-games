function firstGame() {
    const colorsDictLength = Object.keys(colorsDict).length;

    const counter = document.getElementById('first-counter');
    let count = 0;
    counter.innerText = count;

    const requiredColorsAmount = 3;

    const playbox = document.getElementById('first-game');
    const playboxWord = document.getElementById('first-game-word');

    setResetedColors(requiredColorsAmount, colorsDictLength);

    const choices = document.getElementsByName('colors');
    const form = document.getElementsByClassName('conditions')[0];

    let hasPopupBeenShown = false;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        choices.forEach((choice) => {
            if (choice.checked) {
                if (isAnswerCorrect(choice)) {
                    count += pointsForCorrectAnswer;

                    if (isThereEnoughPointsToShowPopup(count) && !hasPopupBeenShown) {
                        showPopup();
                        showNextButton();
                        hasPopupBeenShown = true;
                    }
                } else {
                    count += pointsForWrongAnswer;
                }

                counter.innerText = count;
                setResetedColors(requiredColorsAmount, colorsDictLength);
            }
        });
    });

    const stayBtn = document.getElementById('first-stay');

    stayBtn.addEventListener('click', () => {
        hidePopup();
    });

    const moveBtn = document.getElementById('first-move');
    const moveBtnForm = document.getElementById('first-move-in-form');

    moveBtn.addEventListener('click', () => {
        moveToSecondGame();
        hidePopup();
    });

    moveBtnForm.addEventListener('click', () => { moveToSecondGame(); });

    function moveToSecondGame() {
        const task1 = document.getElementById('task1');
        const task2 = document.getElementById('task2');

        task1.style.display = 'none';
        task2.style.display = 'block';
    }

    function showNextButton() {
        const nextButton = document.getElementById('first-move-in-form');
        nextButton.style.display = 'block';
    }

    function isThereEnoughPointsToShowPopup(points) {
        const enoughPointsScore = 15;
        return points >= enoughPointsScore;
    }

    function setResetedColors(requiredColorsAmount, colorsDictLength) {
        const randomIndexes = getResetedColorsList(requiredColorsAmount, colorsDictLength);

        playbox.style.backgroundColor = Object.values(colorsDict)[randomIndexes[0]];
        playboxWord.style.color = Object.values(colorsDict)[randomIndexes[1]];
        playboxWord.innerText = Object.keys(colorsDict)[randomIndexes[2]].toUpperCase();
    }

    function isAnswerCorrect(answer) {
        const correctAnswer = playboxWord.style.color;
        answer = colorsDict[answer.value.toLowerCase()];
        return correctAnswer == answer;
    }
}

export default firstGame;