const btn = document.getElementById('sumbit-btn');
const form = document.getElementById('login-form');
const username = document.getElementById('name');
const password = document.getElementById('password');
const errorElement = document.getElementById('error');

const pathIfRequestIsSuccessful = '../game/index.html';

form.addEventListener('submit', (e) => {
    let errorMessage = null;
    e.preventDefault();

    if (localStorage.getItem(username.value) == password.value) {
        window.location.href = pathIfRequestIsSuccessful;
    } else if (localStorage.getItem(username.value) == null) {
        localStorage.setItem(`${username.value}`, `${password.value}`);
        window.location.href = pathIfRequestIsSuccessful;
    } else {
        errorMessage = 'Неверный пароль!';
        errorElement.innerText = errorMessage;
    }
});
