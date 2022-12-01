let localStorageObject = Object.entries(localStorage);
const pathIfError = '../templates/login.html';

checkIfAmountOfUserIsCorrect();

function checkIfAmountOfUserIsCorrect() {
    let authorizedUsersAmount = 0;

    const notEnoughUsers = 0;
    const tooMuchUsers = 2;

    for (let i = 0; i < localStorageObject.length; i++) {
        const parsedUserData = JSON.parse(localStorageObject[i][1]);

        if (parsedUserData['authorized'] == true) {
            authorizedUsersAmount += 1;
        }
    }

    if (authorizedUsersAmount >= tooMuchUsers) {
        for (let i = 0; i < localStorageObject.length; i++) {
            let parsedUserData = JSON.parse(localStorageObject[i][1]);

            if (parsedUserData['authorized'] == true) {
                const username = localStorageObject[i][0];
                localStorage.removeItem(username);
                parsedUserData['authorized'] = false;
                localStorage.setItem(username, JSON.stringify(parsedUserData));
            }
        }
    }

    if (
        authorizedUsersAmount == notEnoughUsers
        || authorizedUsersAmount >= tooMuchUsers
    ) {
        window.location.href = pathIfError;
    }
}