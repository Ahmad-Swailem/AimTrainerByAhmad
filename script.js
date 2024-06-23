let score = 0;
let gameActive = true;
let multiplierActive = false;
let multiplier = 1;
document.querySelectorAll('.rami').forEach(rami => {
    rami.style.transform = `translate(${0}px, ${0}px)`;
});
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const ramiButtons = document.querySelectorAll('.rami');
const gameArea = document.getElementById('gameArea');
const multiplierButton = document.getElementById('multiplier');
const buyButton = document.getElementById('buyButton');
function updateScore() {
    if (gameActive) {
        score += multiplier;
        scoreDisplay.textContent = `Punkte: ${score}`;
        moveRami();
        updateButtons();
    }
}

function moveRami() {
    document.querySelectorAll('.rami').forEach(rami => {
        const x = Math.random() * (gameArea.clientWidth - rami.clientWidth);
        const y = Math.random() * (gameArea.clientHeight - rami.clientHeight);
        rami.style.transform = `translate(${x}px, ${y}px)`;
    });
}


function activateMultiplier() {
    if (score >= 20 && !multiplierActive) {
        score -= 20;
        multiplierActive = true;
        multiplier = 2;
        multiplierButton.disabled = true;
        scoreDisplay.textContent = `Punkte: ${score}`;
    }
}

function buyRamiButton() {
    if (score >= 50) {
        score -= 50;
        scoreDisplay.textContent = `Punkte: ${score}`;
        const newRami = document.createElement('div');
        newRami.classList.add('rami');
        newRami.textContent = 'Klick mich';
        newRami.addEventListener('click', updateScore);
        gameArea.appendChild(newRami);
        moveRami();
    }
}

function updateButtons() {
    if (score >= 20 && !multiplierActive) {
        multiplierButton.disabled = false;
    } else {
        multiplierButton.disabled = true;
    }
    if (score >= 50) {
        buyButton.disabled = false;
    } else {
        buyButton.disabled = true;
    }
}

ramiButtons.forEach(rami => {
    rami.addEventListener('click', updateScore);
});
multiplierButton.addEventListener('click', activateMultiplier);
buyButton.addEventListener('click', buyRamiButton);

moveRami();
updateButtons();
