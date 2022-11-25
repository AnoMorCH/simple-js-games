const btn = document.getElementById('sumbit-btn');
const form = document.getElementById('login-form');
const username = document.getElementById('name');
const password = document.getElementById('password');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let errorMessage = null;
    e.preventDefault();

    if (localStorage.getItem(username.value) == password.value) {
        window.location.href = 'game.html';
    } else if (localStorage.getItem(username.value) == null) {
        localStorage.setItem(`${username.value}`, `${password.value}`);
        window.location.href = 'game.html';
    } else {
        errorMessage = 'Неверный пароль!';
        errorElement.innerText = errorMessage;
    }
});
