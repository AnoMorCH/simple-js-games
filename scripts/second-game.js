const colorsDictLength = Object.keys(colorsDict).length;

const counter = document.getElementById('second-counter');
let count = 0;
counter.innerText = count;

const playbox = document.getElementById('second-game');

const figureAmount = 6;
createMovingFigure('ball', figureAmount);
createMovingFigure('rectangle', figureAmount);
setResetedColors(figureAmount + 1, colorsDictLength);

function setResetedColors(requiredColorsAmount, colorsDictLength) {
    const randomIndexes = getResetedColorsList(requiredColorsAmount, colorsDictLength);

    playbox.style.backgroundColor = Object.values(colorsDict)[randomIndexes[0]];

    for (let i = 0; i < figureAmount; i++) {
        playbox.children[i].children[0].style.backgroundColor =
            Object.values(colorsDict)[randomIndexes[i + 1]];

        playbox.children[i + figureAmount].children[0].style.backgroundColor =
            Object.values(colorsDict)[randomIndexes[i + 1]];
    }
}

function createMovingFigure(name, amount) {
    for (let i = 0; i < amount; i++) {
        const bounceX = document.createElement('div');
        const bounceXVelocity = getRandomDecimal(1, 2);
        const bounceXStyle = `bounceX ${bounceXVelocity}s linear 0s infinite alternate`;
        bounceX.style.animation = bounceXStyle;

        const bounceY = document.createElement('div');
        const bounceYVelocity = getRandomDecimal(1, 2);
        const bounceYStyle = `bounceY ${bounceYVelocity}s ease-in 0s infinite alternate`;
        bounceY.style.animation = bounceYStyle;
        bounceY.classList.add(name);

        bounceX.appendChild(bounceY);
        playbox.appendChild(bounceX);
    }
}