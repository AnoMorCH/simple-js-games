function results() {
    let localStorageObject = Object.entries(localStorage);

    let finishGameBtns = [document.getElementById('third-move-in-form')];
    finishGameBtns.push(...Array.from(document.querySelectorAll('.finish-game')));

    const ratingPlaceholder = document.getElementById('rating-placeholder');

    let currentUser = getCurrentUser();
    const userName = currentUser[0];
    const userData = JSON.parse(currentUser[1]);

    finishGameBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            addScoreToCurrentUser();
            addUsersToPlaceholder();
            goToResultPage();
            logOut();
        });
    });

    function goToResultPage() {
        const miniGames = Array.from(document.getElementsByClassName('task'));
        
        miniGames.forEach((game) => {
            game.style.display = 'none';
        });

        const result = document.getElementById('task4');
        result.style.display = 'block';
    }

    function getCurrentUser() {
        for (let i = 0; i < localStorageObject.length; i++) {
            const userData = JSON.parse(localStorageObject[i][1]);

            if (userData['authorized'] == true) {
                return localStorageObject[i];
            }
        }
    }

    function logOut() {
        localStorage.removeItem(currentUser[userName]);
        userData['authorized'] = false;
        localStorage.setItem(userName, JSON.stringify(userData));
    }

    function addScoreToCurrentUser() {
        userData['score'] = globalCount;
        localStorage.removeItem(userName);
        localStorage.setItem(userName, JSON.stringify(userData));
        localStorageObject = Object.entries(localStorage);
    }

    function addUsersToPlaceholder() {
        localStorageObject = localStorageObject.sort((a, b) => {
            a = JSON.parse(a[1])['score'];
            b = JSON.parse(b[1])['score'];
            return b - a;
        });

        for (const [userName, userData] of localStorageObject) {
            const userScore = JSON.parse(userData)['score'];

            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.innerText = userName;

            const tdScore = document.createElement('td');
            tdScore.innerText = userScore;

            tr.appendChild(tdName);
            tr.appendChild(tdScore);
            ratingPlaceholder.append(tr);
        }
    }
}

export default results;