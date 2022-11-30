const finishGameBtn = document.getElementById('third-move-in-form');

finishGameBtn.addEventListener('click', () => {
    const result1 = document.getElementById('result-1');
    result1.innerText = globalCount;
});
