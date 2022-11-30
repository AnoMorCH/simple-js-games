let localStorageObject = Object.entries(localStorage);

let currentUser = null;
let currentUserId = -1;
updateCurrentUserAndHisId();

const userName = currentUser[0];
const userPassword = currentUser[1];

const finishGameBtn = document.getElementById('third-move-in-form');
const ratingPlaceholder = document.getElementById('rating-placeholder');

finishGameBtn.addEventListener('click', () => {
    parseLocalStorage();
    addUsersToPlaceholder();
});

function updateCurrentUserAndHisId() {
    while (
        currentUser == null &&
        currentUserId < localStorageObject.length - 1
    ) {
        currentUserId += 1;

        try {
            JSON.parse(userData);
        } catch {
            currentUser = localStorageObject[currentUserId];
        }
    }
}

function parseLocalStorage() {
    const userData = {
        'password': userPassword,
        'score': globalCount
    }

    const jsonUserData = JSON.stringify(userData);

    localStorage.removeItem(userName);
    localStorage.setItem(userName, jsonUserData);
    localStorageObject = Object.entries(localStorage);
}

function addUsersToPlaceholder() {
    for (const [userName, userData] of localStorageObject) {
        const li = document.createElement('li');
        const userScore = JSON.parse(userData)['score'];
        li.innerHTML = `${userName} - ${userScore}`;
        ratingPlaceholder.appendChild(li);
    }
}