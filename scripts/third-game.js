const counter = document.getElementById('third-counter');
let count = 0;
counter.innerText = count;

const playbox = document.getElementById('third-game');

const figureAmount = 3;
let figurePositions = [];
let createdFiguresAmount = 0;
const randomIndexes = getResetedColorsList(figureAmount + 1, colorsDictLength);

createFigureWithRandomPosition('ball', 3);
createFigureWithRandomPosition('rectangle', 3);
setResetedColors();

const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.playground');

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');

        if (isContainerPlaybox(container)) {
            setFigureForPlaybox(draggable);
        } else {
            setFigureForBasket(draggable);
        }

        container.appendChild(draggable);
    });
});

function isContainerPlaybox(container) {
    return container.id == 'third-game';
}

function setResetedColors() {
    playbox.style.backgroundColor =
        Object.values(colorsDict)[randomIndexes[0]];

    for (let i = 0; i < figureAmount; i++) {
        updatePlayboxChild(i, i);
        updatePlayboxChild(i, i + figureAmount);
    }

    function updatePlayboxChild(i, figureId) {
        playbox.children[figureId].style.backgroundColor =
            Object.values(colorsDict)[randomIndexes[i + 1]];

        playbox.children[figureId].setAttribute(
            'value',
            randomIndexes[i + 1]
        );
    }
}

function setFigurePositions(figure) {
    figure.setAttribute('id', `third-game-figure-${createdFiguresAmount}`);
    figurePositions.push({
        'margin-left': `${getRandomInt(0, 26)}vw`,
        'margin-top': `${getRandomInt(0, 26)}vw`
    });

    figure.style.marginLeft = 
        figurePositions[createdFiguresAmount]['margin-left'];
    figure.style.marginTop = 
        figurePositions[createdFiguresAmount]['margin-top'];

    createdFiguresAmount += 1;
}

function createFigureWithRandomPosition(name, amount) {
    for (let i = 0; i < amount; i++) {
        const figure = document.createElement('div');

        figure.classList.add(name);
        figure.classList.add('draggable');
        figure.draggable = true;
        setFigurePositions(figure);
        setFigureForPlaybox(figure);

        playbox.appendChild(figure);
    }
}

function setFigureForPlaybox(figure) {
    const patternLength = 'third-game-figure-'.length;
    const figureId = figure.id.substring(patternLength);

    figure.style.position = 'absolute';
    figure.style.marginLeft = figurePositions[figureId]['margin-left'];
    figure.style.marginTop = figurePositions[figureId]['margin-top'];
}

function setFigureForBasket(figure) {
    figure.style.position = 'static';
    figure.style.marginLeft = 0;
    figure.style.marginTop = 0;
}