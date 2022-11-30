function firstGame() {
    const counter = document.getElementById('first-counter');
    let count = 0;
    counter.innerText = count;
    
    let hasPopupBeenShown = false;
    const requiredColorsAmount = 3;

    const playbox = document.getElementById('first-game');
    const playboxWord = document.getElementById('first-game-word');
    const choices = document.getElementsByName('colors');
    const form = document.getElementsByClassName('conditions')[0];
    
    setResetedColors(requiredColorsAmount, colorsDictLength);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        choices.forEach((choice) => {
            if (choice.checked) {
                if (isAnswerCorrect(choice)) {
                    count += pointsForCorrectAnswer;
                    globalCount += pointsForCorrectAnswer;

                    if (
                        isScoreEnoughToShowPopup(count, 15) &&
                        !hasPopupBeenShown
                    ) {
                        showPopup();
                        setupMoveBtn(2);
                        showNextButton('first-move-in-form');
                        hasPopupBeenShown = true;
                    }
                } else {
                    count += pointsForWrongAnswer;
                    globalCount += pointsForCorrectAnswer;
                }

                counter.innerText = count;
                setResetedColors(requiredColorsAmount, colorsDictLength);
            }
        });
    });

    function setResetedColors(requiredColorsAmount, colorsDictLength) {
        const randomIndexes = getResetedColorsList(
            requiredColorsAmount,
            colorsDictLength
        );

        playbox.style.backgroundColor =
            Object.values(colorsDict)[randomIndexes[0]];

        playboxWord.style.color =
            Object.values(colorsDict)[randomIndexes[1]];

        playboxWord.innerText =
            Object.keys(colorsDict)[randomIndexes[2]].toUpperCase();
    }

    function isAnswerCorrect(answer) {
        const correctAnswer = playboxWord.style.color;
        answer = colorsDict[answer.value.toLowerCase()];
        return correctAnswer == answer;
    }
}

export default firstGame;