const colors = [
    'rgba(250, 69, 69, 0.8)',
    'rgba(250, 155, 69, 0.8)',
    'rgba(250, 239, 69, 0.8)',
    'rgba(110, 250, 69, 0.8)',
    'rgba(69, 246, 250, 0.8)',
    'rgba(69, 121, 250, 0.8)',
    'rgba(197, 69, 250, 0.8)'
]

const colorsName = [
    'КРАСНЫЙ',
    'ОРАНЖЕВЫЙ',
    'ЖЕЛТЫЙ',
    'ЗЕЛЕНЫЙ',
    'ГОЛУБОЙ',
    'СИНИЙ',
    'ФИОЛЕТОВЫЙ'
]

const requiredColorsAmount = 3;
let randomIndexes = []

for (i = 0; i < requiredColorsAmount; i++) {
    randomIndexes.push(getNonRepeatedRandomInt(0, colors.length, randomIndexes));
}

const playbox = document.getElementById('first-game');
playbox.style.backgroundColor = colors[randomIndexes[0]];

const playboxWord = document.getElementById('first-game-word');
playboxWord.style.color = colors[randomIndexes[1]];

playboxWord.innerText = colorsName[randomIndexes[2]];

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