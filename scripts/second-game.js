
const counter = document.getElementById('second-counter');
let count = 0;
counter.innerText = count;

const figureAmount = 3;
let foundFiguresAmount = 0;
const colorsDictLength = Object.keys(colorsDict).length;
const randomIndexes = getResetedColorsList(figureAmount + 1, colorsDictLength);

const playbox = document.getElementById('second-game');
const conditionColor = document.getElementsByClassName('color-condition');

let usedColorsAmount = 0;
let wantedColorId = null;
let wantedColorName = null;

let hasPopupBeenShown = false;

updateConditionColorData();

createMovingFigure('ball', figureAmount);
createMovingFigure('rectangle', figureAmount);
setResetedColors(figureAmount + 1, colorsDictLength);

for (let i = 0; i < figureAmount; i++) {
    playbox.children[i].children[0].addEventListener(
        'click',
        () => { checkChoosenFigure(i); }
    );

    playbox.children[i + figureAmount].children[0].addEventListener(
        'click',
        () => { checkChoosenFigure(i + figureAmount); }
    );
}

const moveBtn = document.getElementById('second-move');
const moveBtnForm = document.getElementById('second-move-in-form');

moveBtn.addEventListener('click', () => {
    hidePopup();
    moveToThirdGame();
});

moveBtnForm.addEventListener('click', () => { moveToThirdGame(); });

function showNextButton() {
    const nextButton = document.getElementById('second-move-in-form');
    nextButton.style.display = 'block';
}

function moveToThirdGame() {
    const task2 = document.getElementById('task2');
    const task3 = document.getElementById('task3');

    task2.style.display = 'none';
    task3.style.display = 'block';
}

function checkChoosenFigure(figureId) {
    const choosenFigure = playbox.children[figureId].children[0];
    const figureColorId = choosenFigure.getAttribute('value');

    if (figureColorId == wantedColorId) {
        count += pointsForCorrectAnswer;
        counter.innerText = count;
        foundFiguresAmount += 1;
        choosenFigure.style.display = 'none';

        if (isScoreEnoughToShowPopup() && !hasPopupBeenShown) {
            hasPopupBeenShown = true;
            showPopup();
            showNextButton();
        }

        if (
            !isScoreMax() &&
            isFoundEnoughFiguresToChangeConditions(foundFiguresAmount)
        ) {
            foundFiguresAmount = 0;
            updateConditionColorData();
        }
    } else {
        count += pointsForWrongAnswer;
        counter.innerText = count;
    }

    function isFoundEnoughFiguresToChangeConditions(foundFiguresAmount) {
        const enoughFigures = 2;
        return foundFiguresAmount == enoughFigures;
    }

    function isScoreEnoughToShowPopup() {
        const enoughScore = 15;
        return count >= enoughScore;
    }

    function isScoreMax() {
        const maxScore = figureAmount * pointsForCorrectAnswer * 2;
        return count == maxScore;
    }
}

function updateConditionColorData() {
    usedColorsAmount += 1;
    wantedColorId = randomIndexes[usedColorsAmount];
    wantedColorName = Object.keys(colorsDict)[wantedColorId];

    Array.from(conditionColor).forEach((element) => {
        element.innerText = wantedColorName;
    });
}

function setResetedColors() {
    playbox.style.backgroundColor = Object.values(colorsDict)[randomIndexes[0]];

    for (let i = 0; i < figureAmount; i++) {
        updatePlayboxChild(i, i);
        updatePlayboxChild(i, i + figureAmount);
    }

    function updatePlayboxChild(i, figureId) {
        playbox.children[figureId].children[0].style.backgroundColor =
            Object.values(colorsDict)[randomIndexes[i + 1]];

        playbox.children[figureId].children[0].setAttribute(
            'value',
            randomIndexes[i + 1]
        );
    }
}

function createMovingFigure(name, amount) {
    for (let i = 0; i < amount; i++) {
        const bounceX = document.createElement('div');
        const bounceXVelocity = getRandomDecimal(3, 10);
        const bounceXStyle =
            `bounceX ${bounceXVelocity}s linear 0s infinite alternate`;
        bounceX.style.animation = bounceXStyle;

        const bounceY = document.createElement('div');
        const bounceYVelocity = getRandomDecimal(3, 10);
        const bounceYStyle =
            `bounceY ${bounceYVelocity}s ease-in 0s infinite alternate`;
        bounceY.style.animation = bounceYStyle;
        bounceY.classList.add(name);

        bounceX.appendChild(bounceY);
        playbox.appendChild(bounceX);
    }
}