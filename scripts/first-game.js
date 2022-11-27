const colorsDict = {
    'красный': 'rgba(250, 69, 69, 0.8)',
    'оранжевый': 'rgba(250, 155, 69, 0.8)',
    'желтый': 'rgba(250, 239, 69, 0.8)',
    'зеленый': 'rgba(110, 250, 69, 0.8)',
    'голубой': 'rgba(69, 246, 250, 0.8)',
    'синий': 'rgba(69, 121, 250, 0.8)',
    'фиолетовый': 'rgba(197, 69, 250, 0.8)'
}

const colorsDictLength = Object.keys(colorsDict).length;

const counter = document.getElementById('first-counter');
let count = 0;
counter.innerText = count;

const pointsForCorrectAnswer = 5;
const pointsForWrongAnswer = -2;

const requiredColorsAmount = 3;
let randomIndexes = []

const playbox = document.getElementById('first-game');
const playboxWord = document.getElementById('first-game-word');

resetColors();

const choices = document.getElementsByName('colors');
const form = document.getElementById('first-conditions');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    choices.forEach((choice) => {
        if (choice.checked) {
            if (isAnswerCorrect(choice)) {
                count += pointsForCorrectAnswer;
            } else {
                count += pointsForWrongAnswer;
            }

            counter.innerText = count;
            resetColors();
        }
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getNonRepeatedRandomInt(min, max, usedColorIndexes) {
    let index = getRandomInt(min, max);

    while (usedColorIndexes.includes(index)) {
        index = getRandomInt(min, max);
    }

    return index;
}

function isAnswerCorrect(answer) {
    const correctAnswer = playboxWord.style.color;
    answer = colorsDict[answer.value.toLowerCase()];
    return correctAnswer == answer;
}

function resetColors() {
    randomIndexes.splice(0, randomIndexes.length);

    for (i = 0; i < requiredColorsAmount; i++) {
        randomIndexes.push(getNonRepeatedRandomInt(0, colorsDictLength, randomIndexes));
    }

    playbox.style.backgroundColor = Object.values(colorsDict)[randomIndexes[0]];
    playboxWord.style.color = Object.values(colorsDict)[randomIndexes[1]];
    playboxWord.innerText = Object.keys(colorsDict)[randomIndexes[2]].toUpperCase();
}