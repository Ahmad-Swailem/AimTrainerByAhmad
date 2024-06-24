let score = 0;
let level = 1;
let multiplier = 1;
let multiplierCost = 20;
let buttonCost = 50;
let reduceCost = 100;
let areaIncreaseCost = 200;
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const klickerButtons = document.querySelectorAll('.klicker');
const gameArea = document.getElementById('gameArea');
const shopButton = document.getElementById('shopButton');
const shop = document.getElementById('shop');
const closeShopButton = document.getElementById('closeShop');
const multiplierButton = document.getElementById('multiplier');
const buyButton = document.getElementById('buyButton');
const reduceCostButton = document.getElementById('reduceCost');
const increaseAreaButton = document.getElementById('increaseArea');
const languageSelector = document.getElementById('languageSelector');
const flags = document.querySelectorAll('.flag');
const translations = {
    de: {
        score: 'Punkte: ',
        level: 'Level: ',
        clickMe: 'Klick mich',
        multiplier: 'Punkte-Multiplikator (Kosten: ',
        buyButton: 'Kaufe Knopf (Kosten: ',
        reduceCost: 'Kostenreduzierung (Kosten: ',
        increaseArea: 'Spielbereich vergrößern (Kosten: ',
        shopTitle: 'Shop',
        closeShop: 'Schließen',
        shopButton: 'Shop'
    },
    en: {
        score: 'Score: ',
        level: 'Level: ',
        clickMe: 'Click me',
        multiplier: 'Points Multiplier (Cost: ',
        buyButton: 'Buy Button (Cost: ',
        reduceCost: 'Reduce Cost (Cost: ',
        increaseArea: 'Increase Game Area (Cost: ',
        shopTitle: 'Shop',
        closeShop: 'Close',
        shopButton: 'Shop'
    }
};
function updateScore() {
    score += multiplier;
    scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
    if (score > level * 100) {
        level++;
        levelDisplay.textContent = `${translations[currentLang].level}${level}`;
    }
    saveGame();
    updateButtons();
}
function moveKlicker() {
    const klickerButtons = document.querySelectorAll('.klicker');
    klickerButtons.forEach(klicker => {
        let x, y;
        let klickerRect;
        do {
            x = Math.random() * (gameArea.clientWidth - klicker.clientWidth);
            y = Math.random() * (gameArea.clientHeight - klicker.clientHeight);
            klicker.style.transform = `translate(${x}px, ${y}px)`;
            klickerRect = klicker.getBoundingClientRect();
        } while (klickerRect.left < 0 || klickerRect.top < 0 || klickerRect.right > gameArea.clientWidth || klickerRect.bottom > gameArea.clientHeight);
    });
}
function activateMultiplier() {
    if (score >= multiplierCost) {
        score -= multiplierCost;
        multiplier *= 2;
        multiplierCost *= 2;
        multiplierButton.textContent = `${translations[currentLang].multiplier}${multiplierCost} ${translations[currentLang].score.split(':')[1]})`;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        saveGame();
    }
    updateButtons();
}
function buyKlickerButton() {
    if (score >= buttonCost) {
        score -= buttonCost;
        const newKlicker = document.createElement('div');
        newKlicker.classList.add('klicker');
        newKlicker.textContent = translations[currentLang].clickMe;
        newKlicker.addEventListener('click', updateScore);
        gameArea.appendChild(newKlicker);
        buttonCost *= 2;
        buyButton.textContent = `${translations[currentLang].buyButton}${buttonCost} ${translations[currentLang].score.split(':')[1]})`;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        saveGame();
        moveKlicker();
    }
    updateButtons();
}
function reduceUpgradeCost() {
    if (score >= reduceCost) {
        score -= reduceCost;
        multiplierCost = Math.max(10, Math.floor(multiplierCost / 2));
        buttonCost = Math.max(25, Math.floor(buttonCost / 2));
        reduceCost *= 2;
        multiplierButton.textContent = `${translations[currentLang].multiplier}${multiplierCost} ${translations[currentLang].score.split(':')[1]})`;
        buyButton.textContent = `${translations[currentLang].buyButton}${buttonCost} ${translations[currentLang].score.split(':')[1]})`;
        reduceCostButton.textContent = `${translations[currentLang].reduceCost}${reduceCost} ${translations[currentLang].score.split(':')[1]})`;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        saveGame();
    }
    updateButtons();
}
function increaseGameArea() {
    if (score >= areaIncreaseCost) {
        score -= areaIncreaseCost;
        gameArea.style.width = `${gameArea.clientWidth * 1.2}px`;
        gameArea.style.height = `${gameArea.clientHeight * 1.2}px`;
        areaIncreaseCost *= 2;
        increaseAreaButton.textContent = `${translations[currentLang].increaseArea}${areaIncreaseCost} ${translations[currentLang].score.split(':')[1]})`;
        scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
        saveGame();
        moveKlicker();
    }
    updateButtons();
}
function updateButtons() {
    multiplierButton.disabled = score < multiplierCost;
    buyButton.disabled = score < buttonCost;
    reduceCostButton.disabled = score < reduceCost;
    increaseAreaButton.disabled = score < areaIncreaseCost;
}
function changeLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = translations[lang][key];
    });
    scoreDisplay.textContent = `${translations[lang].score}${score}`;
    levelDisplay.textContent = `${translations[lang].level}${level}`;
    multiplierButton.textContent = `${translations[lang].multiplier}${multiplierCost} ${translations[lang].score.split(':')[1]})`;
    buyButton.textContent = `${translations[lang].buyButton}${buttonCost} ${translations[lang].score.split(':')[1]})`;
    reduceCostButton.textContent = `${translations[lang].reduceCost}${reduceCost} ${translations[lang].score.split(':')[1]})`;
    increaseAreaButton.textContent = `${translations[lang].increaseArea}${areaIncreaseCost} ${translations[lang].score.split(':')[1]})`;
    currentLang = lang;
    document.getElementById('currentLang').src = document.querySelector(`#${lang} img`).src;
}
function saveGame() {
    localStorage.setItem('aimTrainerScore', score);
    localStorage.setItem('aimTrainerLevel', level);
    localStorage.setItem('aimTrainerMultiplier', multiplier);
    localStorage.setItem('aimTrainerMultiplierCost', multiplierCost);
    localStorage.setItem('aimTrainerButtonCost', buttonCost);
    localStorage.setItem('aimTrainerReduceCost', reduceCost);
    localStorage.setItem('aimTrainerAreaIncreaseCost', areaIncreaseCost);
}
function loadGame() {
    const savedScore = localStorage.getItem('aimTrainerScore');
    const savedLevel = localStorage.getItem('aimTrainerLevel');
    const savedMultiplier = localStorage.getItem('aimTrainerMultiplier');
    const savedMultiplierCost = localStorage.getItem('aimTrainerMultiplierCost');
    const savedButtonCost = localStorage.getItem('aimTrainerButtonCost');
    const savedReduceCost = localStorage.getItem('aimTrainerReduceCost');
    const savedAreaIncreaseCost = localStorage.getItem('aimTrainerAreaIncreaseCost');
    if (savedScore !== null) score = parseInt(savedScore);
    if (savedLevel !== null) level = parseInt(savedLevel);
    if (savedMultiplier !== null) multiplier = parseInt(savedMultiplier);
    if (savedMultiplierCost !== null) multiplierCost = parseInt(savedMultiplierCost);
    if (savedButtonCost !== null) buttonCost = parseInt(savedButtonCost);
    if (savedReduceCost !== null) reduceCost = parseInt(savedReduceCost);
    if (savedAreaIncreaseCost !== null) areaIncreaseCost = parseInt(savedAreaIncreaseCost);
    scoreDisplay.textContent = `${translations[currentLang].score}${score}`;
    levelDisplay.textContent = `${translations[currentLang].level}${level}`;
    multiplierButton.textContent = `${translations[currentLang].multiplier}${multiplierCost} ${translations[currentLang].score.split(':')[1]})`;
    buyButton.textContent = `${translations[currentLang].buyButton}${buttonCost} ${translations[currentLang].score.split(':')[1]})`;
    reduceCostButton.textContent = `${translations[currentLang].reduceCost}${reduceCost} ${translations[currentLang].score.split(':')[1]})`;
    increaseAreaButton.textContent = `${translations[currentLang].increaseArea}${areaIncreaseCost} ${translations[currentLang].score.split(':')[1]})`;
    updateButtons();
}
let currentLang = 'de';
changeLanguage(currentLang);
flags.forEach(flag => {
    flag.parentElement.addEventListener('click', (event) => {
        changeLanguage(event.currentTarget.id);
    });
});
klickerButtons.forEach(klicker => {
    klicker.addEventListener('click', updateScore);
});
multiplierButton.addEventListener('click', activateMultiplier);
buyButton.addEventListener('click', buyKlickerButton);
reduceCostButton.addEventListener('click', reduceUpgradeCost);
increaseAreaButton.addEventListener('click', increaseGameArea);
shopButton.addEventListener('click', () => {
    shop.classList.toggle('hidden');
});
closeShopButton.addEventListener('click', () => {
    shop.style.display ='none';
});
shopButton.addEventListener('click', () => {
    shop.style.display ='block';
});
moveKlicker();
updateButtons();
loadGame();