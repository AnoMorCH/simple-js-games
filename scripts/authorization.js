const btn = document.getElementById('sumbit-btn');
const form = document.getElementById('login-form');
const username = document.getElementById('name');
const passwordElement = document.getElementById('password');
const errorElement = document.getElementById('error');

const pathIfRequestIsSuccessful = '../templates/game.html';

form.addEventListener('submit', (e) => {
    const userData = localStorage.getItem(username.value);
    let userDataParsed = JSON.parse(userData);

    if (userDataParsed == null) {
        userDataParsed = {
            'password': `${passwordElement.value}`,
            'authorized': true
        }

        localStorage.setItem(`${username.value}`, `${JSON.stringify(userDataParsed)}`);
    } else {
        if (userDataParsed['password'] == passwordElement.value) {
            localStorage.removeItem(`${username.value}`);
            userDataParsed['authorized'] = true;
            localStorage.setItem(`${username.value}`, `${JSON.stringify(userDataParsed)}`);
        } else {
            e.preventDefault();
            errorElement.innerHTML = 
                '<span style="font-weight: bold;">Ошибка!</span>' +
                '<br> Неверный пароль';
        }
    }

    // if (localStorage.getItem(username.value) == passwordElement.value) {
    //     window.location.href = pathIfRequestIsSuccessful;
    // } else if (localStorage.getItem(username.value) == null) {
    //     localStorage.setItem(`${username.value}`, `${passwordElement.value}`);
    //     window.location.href = pathIfRequestIsSuccessful;
    // } else {
    //     e.preventDefault();
    //     errorElement.innerHTML = 
    //         '<span style="font-weight: bold;">Ошибка!</span>' +
    //         '<br> Неверный пароль';
    // }
});
