const pointsForCorrectAnswer = 5;
const pointsForWrongAnswer = -2;

let randomIndexes = [];

const colorsDict = {
    'красный': 'rgba(250, 69, 69, 0.8)',
    'оранжевый': 'rgba(250, 155, 69, 0.8)',
    'желтый': 'rgba(250, 239, 69, 0.8)',
    'зеленый': 'rgba(110, 250, 69, 0.8)',
    'голубой': 'rgba(69, 246, 250, 0.8)',
    'синий': 'rgba(69, 121, 250, 0.8)',
    'фиолетовый': 'rgba(197, 69, 250, 0.8)'
}

setPointsBrief();

function getResetedColorsList(requiredColorsAmount, colorsDictLength) {
    randomIndexes.splice(0, randomIndexes.length);

    for (let i = 0; i < requiredColorsAmount; i++) {
        randomIndexes.push(getNonRepeatedRandomInt(0, colorsDictLength, randomIndexes));
    }

    return randomIndexes;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDecimal(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
}

function getNonRepeatedRandomInt(min, max, usedColorIndexes) {
    let index = getRandomInt(min, max);

    while (usedColorIndexes.includes(index)) {
        index = getRandomInt(min, max);
    }

    return index;
}

function setPointsBrief() {
    const correctPoints = document.getElementsByClassName('correct-point');
    const wrongPoints = document.getElementsByClassName('incorrect-point');
    const pointsElementsAmount = correctPoints.length;

    for (let i = 0; i < pointsElementsAmount; i++) {
        correctPoints[i].innerText = pointsForCorrectAnswer;
        wrongPoints[i].innerText = pointsForWrongAnswer;  
    }
}