const popup = document.getElementById('popup1');
const closeButton = document.getElementsByClassName('close')[0];

closeButton.addEventListener("click", function () {
    hidePopup();
});

function showPopup() {
    if (popup.classList.value.includes('overlay-hidden')) {
        popup.classList.add('overlay-shown');
        popup.classList.remove('overlay-hidden');
    }
}

function hidePopup() {
    if (popup.classList.value.includes('overlay-shown')) {
        popup.classList.remove('overlay-shown');
        popup.classList.add('overlay-hidden');
    }
}