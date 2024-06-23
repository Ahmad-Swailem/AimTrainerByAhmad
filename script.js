let score = 0;
let multiplier = 1;
let multiplierCost = 20;

const scoreDisplay = document.getElementById('score');
const ramiButtons = document.querySelectorAll('.rami');
const gameArea = document.getElementById('gameArea');
const multiplierButton = document.getElementById('multiplier');
const buyButton = document.getElementById('buyButton');
const languageSelector = document.getElementById('languageSelector');
const flags = document.querySelectorAll('.flag');

const translations = {
    de: {
        score: 'Punkte: ',
        clickMe: 'Klick mich',
        multiplier: 'Punkte-Multiplikator (Kosten: ',
        buyButton: 'Kaufe Knopf (Kosten: '
    },
    en: {
        score: 'Score: ',
        clickMe: 'Click me',
        multiplier: 'Points Multiplier (Cost: ',
        buyButton: 'Buy Button (Cost: '
    }
};

function updateScore() {
    score += multiplier;
    scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
    moveRami();
    updateButtons();
}

function moveRami() {
    document.querySelectorAll('.rami').forEach(rami => {
        const x = Math.random() * (gameArea.clientWidth - rami.clientWidth);
        const y = Math.random() * (gameArea.clientHeight - rami.clientHeight);
        rami.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function activateMultiplier() {
    if (score >= multiplierCost) {
        score -= multiplierCost;
        multiplier *= 2;
        multiplierCost *= 2;
        multiplierButton.textContent = `${translations[currentLang].multiplier}${multiplierCost} ${translations[currentLang].score.split(':')[1]}`;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        updateButtons();
    }
}

function buyRamiButton() {
    if (score >= 50) {
        score -= 50;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        const newRami = document.createElement('div');
        newRami.classList.add('rami');
        newRami.textContent = translations[currentLang].clickMe;
        newRami.addEventListener('click', updateScore);
        gameArea.appendChild(newRami);
        moveRami();
    }
}

function updateButtons() {
    multiplierButton.disabled = score < multiplierCost;
    buyButton.disabled = score < 50;
}

function changeLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        element.textContent = translations[lang][key];
    });
    scoreDisplay.textContent = `${translations[lang].score}${score}`;
    multiplierButton.textContent = `${translations[lang].multiplier}${multiplierCost} ${translations[lang].score.split(':')[1]}`;
    buyButton.textContent = `${translations[lang].buyButton}50 ${translations[lang].score.split(':')[1]}`;
    currentLang = lang;
    document.getElementById('currentLang').src = document.querySelector(`#${lang} img`).src;
}

let currentLang = 'de';
changeLanguage(currentLang);

flags.forEach(flag => {
    flag.parentElement.addEventListener('click', (event) => {
        changeLanguage(event.currentTarget.id);
    });
});

ramiButtons.forEach(rami => {
    rami.addEventListener('click', updateScore);
});
multiplierButton.addEventListener('click', activateMultiplier);
buyButton.addEventListener('click', buyRamiButton);

moveRami();
updateButtons();