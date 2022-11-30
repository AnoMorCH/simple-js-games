const pointsEnlarger = 5;
const basketCapacity = 2;

const counter = document.getElementById('third-counter');
let count = 0;
counter.innerText = count;

const containers = document.querySelectorAll('.playground');
const playbox = document.getElementById('third-game');
const basket = document.getElementById('basket-div');

const popupHeader = document.getElementById('popup-header');
const popupContent = document.getElementById('popup-content')

const figureAmount = 6;
let figurePositions = [];
let createdFiguresAmount = 0;
let hasEndGameBtnBeenShown = false;
let hasPopupFailBeenShown = false;
let hasPopupSuccessBeenShown = false;
const randomIndexes = getResetedColorsList(figureAmount + 1, colorsDictLength);

let wantedColorId = null;
let wantedColorName = null;
updateConiditionColorData();

const remaniningFigures = document.getElementById('remaining-figures');
updateConditionRemainingFiguresData();

createFigureWithRandomPosition('ball', figureAmount);
createFigureWithRandomPosition('rectangle', figureAmount);
setResetedColors();

const draggables = document.querySelectorAll('.draggable');

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');

        if (isBasketFull()) {
            checkBasket();

            if (!hasEndGameBtnBeenShown) {
                showNextButton('third-move-in-form')
                setupMoveBtn(4);
                hasEndGameBtnBeenShown = true;
            }
        };

        updateConditionRemainingFiguresData();
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

function updateConditionRemainingFiguresData() {
    remaniningFigures.innerText = getRemainingFiguresAmount();
}

function getRemainingFiguresAmount() {
    return basketCapacity - basket.children.length;
}

function updateConiditionColorData() {
    wantedColorId = getRandomColorId();
    wantedColorName = Object.keys(colorsDict)[wantedColorId];

    const conditionColor =
        document.getElementsByClassName('third-game-color-condition');

    Array.from(conditionColor).forEach((condition) => {
        condition.innerText = wantedColorName;
    });
}

function getRandomColorId() {
    return randomIndexes[getRandomInt(1, figureAmount + 1)];
    // As the zero element is always for playbox background.
}

function checkBasket() {
    let areFiguresCorrect = true;

    Array.from(basket.children).forEach((child) => {
        const figureColorId = child.getAttribute('value');

        if (figureColorId != wantedColorId) {
            areFiguresCorrect = false;
        }
    });

    if (areFiguresCorrect) {
        count += pointsEnlarger * pointsForCorrectAnswer;

        if (!hasPopupSuccessBeenShown) {
            showSuccessPopup();
            hasPopupSuccessBeenShown = true;
        }
    } else {
        count += pointsEnlarger * pointsForWrongAnswer;

        if (!hasPopupFailBeenShown) {
            showFailPopup();
            hasPopupFailBeenShown = true;
        }
    }

    counter.innerText = count;
    movePopup.innerText = 'Закончить игру';
    popupContent.children[1].innerText = 'Вы можете либо закончить игру, ' +
        'либо попробовать снова.';

    moveFiguresFromBasketToPlaybox();
    updateConiditionColorData();
}

function showFailPopup() {
    popupHeader.innerText = 'Провал!'
    popupContent.children[0].innerText = 'Вы выбрали неверную пару элементов.';
    showPopup();
}

function showSuccessPopup() {
    popupHeader.innerText = 'Успех!'
    popupContent.children[0].innerText = 'Вы выбрали правильную пару элементов.';
    showPopup();
}

function moveFiguresFromBasketToPlaybox() {
    const basketChildren = Array.from(basket.children);

    for (let i = 0; i < basketCapacity; i++) {
        setFigureForPlaybox(basketChildren[i]);
        playbox.appendChild(basketChildren[i]);
    }
}

function isBasketFull() {
    return basket.children.length == basketCapacity;
}

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