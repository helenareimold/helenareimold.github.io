class Card {
    constructor(color, cardNumber) {
        this.cardNumber = cardNumber;
        this.color = color;
    }
}
let numberString = window.prompt("Geben sie eine Zahl von 1-10 ein:");
let amountCards = parseInt(numberString);
let endAmountCards = amountCards + amountCards;
let cards = [];
let farben = ["green", "red", "yellow", "blue"];
let cardWidth = "50px";
let cardHeight = "90px";
let cardColor = "#000000";
let cardRadius = "5px";
let deck = [];
let startCard;
let gamerCard = [];
let enemyCard = [];
let stapelLength = 36 - endAmountCards;
let stapelkarten = [];
let hilfsNummer = 1;
let currentEmpty = [];
let currentCard;
let lastPosition = 0;
let currentEmptyEnemy = [];
let lastEnemyPos = 0;
for (let i = 1; i < 10; i++) {
    for (let a = 0; a < farben.length; a++) {
        cards.push(new Card(farben[a], i));
    }
}
window.addEventListener("load", createDeck);
window.addEventListener("load", createGamerCards);
window.addEventListener("load", createEnemyCards);
window.addEventListener("load", createStartCard);
function shuffleCards(_cards) {
    for (let i = _cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_cards[i], _cards[j]] = [_cards[j], _cards[i]];
    }
}
function createDeck(_event) {
    shuffleCards(cards);
    for (let i = 0; i < cards.length; i++) {
        deck.push(document.createElement("div"));
        document.querySelector("div#left").appendChild(deck[i]);
        deck[i].style.width = cardWidth;
        deck[i].style.height = cardHeight;
        deck[i].style.borderRadius = cardRadius;
        deck[i].style.position = "absolute";
        deck[i].style.marginLeft = "auto";
        deck[i].style.marginRight = "auto";
        deck[i].style.top = "250px";
        deck[i].style.right = "50px";
        deck[i].className = eval("cards[i].color");
        deck[i].id = eval("cards[i].cardNumber");
    }
    deck[deck.length - 1].style.backgroundColor = "black";
    for (let i = endAmountCards + 1; i < deck.length; i++) {
        stapelkarten.push(deck[i]);
    }
    for (let i = 0; i < stapelkarten.length; i++) {
        stapelkarten[i].addEventListener("click", spielerAufnehmen);
    }
}
function createGamerCards(_event) {
    let leftPosition = -900;
    for (let i = 0; i < amountCards; i++) {
        deck[i].style.left = leftPosition + "px";
        deck[i].style.top = "350px";
        deck[i].textContent = deck[i].id;
        leftPosition += 170;
        gamerCard.push(deck[i]);
    }
    for (let i = 0; i < gamerCard.length; i++) {
        gamerCard[i].addEventListener("click", karteAblegen);
    }
}
function createEnemyCards(_event) {
    let leftPosition = -900;
    for (let i = amountCards; i < endAmountCards; i++) {
        deck[i].style.left = leftPosition + "px";
        deck[i].style.top = "50px";
        deck[i].style.backgroundColor = "black";
        leftPosition += 170;
        enemyCard.push(deck[i]);
    }
}
function createStartCard(_event) {
    deck[endAmountCards].style.left = "250px";
    deck[endAmountCards].style.top = "250px";
    deck[endAmountCards].textContent = deck[endAmountCards].id;
    startCard = deck[endAmountCards];
}
function karteAblegen(_event) {
    currentCard = _event.target;
    if (currentCard.id == startCard.id || currentCard.className === startCard.className) {
        currentEmpty.push(currentCard.style.left);
        startCard.style.backgroundColor = "transparent";
        startCard.textContent = "";
        currentCard.style.left = "250px";
        currentCard.style.top = "250px";
        startCard = currentCard;
        gamerCard.splice(gamerCard.indexOf(currentCard), 1);
    }
    spielGewonnen();
    zugGegner();
}
function spielerAufnehmen(_event) {
    //Wert aus der Prompt holen für Gewinn
    //Cases ändern
    if (gamerCard.length == 10) {
        alert("Sie können keine weitere Karte aufnehmen");
    }
    else {
        if (currentEmpty.length == 0 || currentCard == null) {
            let str = gamerCard[gamerCard.length - 1].style.left;
            str = str.substring(0, str.length - 2);
            let currentPos = eval(str) + 170;
            currentEmpty.push(currentPos + "px");
        }
        switch (currentEmpty[lastPosition]) {
            case "-900px":
                styleGamerCard();
                break;
            case "-730px":
                styleGamerCard();
                break;
            case "-660px":
                styleGamerCard();
                break;
            case "-490px":
                styleGamerCard();
                break;
            case "-320px":
                styleGamerCard();
                break;
            case "-150px":
                styleGamerCard();
                break;
            case "20px":
                styleGamerCard();
                break;
            case "190px":
                styleGamerCard();
                break;
            case "360px":
                styleGamerCard();
                break;
            case "530px":
                styleGamerCard();
                break;
        }
        lastPosition++;
        gamerCard.push(stapelkarten[stapelkarten.length - hilfsNummer]);
        stapelkarten[stapelkarten.length - hilfsNummer].removeEventListener("click", spielerAufnehmen);
        stapelkarten[stapelkarten.length - hilfsNummer].addEventListener("click", karteAblegen);
        stapelkarten[stapelkarten.length - hilfsNummer - 1].style.backgroundColor = "black";
        stapelLength--;
        hilfsNummer++;
    }
    if (stapelLength == 0) {
        window.alert("Sie haben leider keine Karten mehr!");
    }
    zugGegner();
}
function zugGegner() {
    for (let i = 0; i < enemyCard.length; i++) {
        if (enemyCard[i].id == startCard.id || enemyCard[i].className == startCard.className) {
            currentEmptyEnemy.push(enemyCard[i].style.left);
            startCard.style.backgroundColor = "transparent";
            startCard.textContent = "";
            enemyCard[i].style.left = "250px";
            enemyCard[i].style.top = "250px";
            enemyCard[i].style.backgroundColor = enemyCard[i].className;
            enemyCard[i].textContent = enemyCard[i].id;
            startCard = enemyCard[i];
            enemyCard.splice(i, 1);
            break;
        }
        else if (i == enemyCard.length - 1) {
            let str = enemyCard[enemyCard.length - 1].style.left;
            str = str.substring(0, str.length - 2);
            let currentPos = eval(str) + 170;
            currentEmptyEnemy.push(currentPos + "px");
            gegnerAufnehmen();
            break;
        }
    }
    spielVerloren();
}
function gegnerAufnehmen() {
    if (enemyCard.length == 10 && gamerCard.length == 10) { }
    else {
        switch (currentEmptyEnemy[lastEnemyPos]) {
            case "-900px":
                styleEnemycard();
                break;
            case "-730px":
                styleEnemycard();
                break;
            case "-660px":
                styleEnemycard();
                break;
            case "-490px":
                styleEnemycard();
                break;
            case "-320px":
                styleEnemycard();
                break;
            case "-150px":
                styleEnemycard();
                break;
            case "20px":
                styleEnemycard();
                break;
            case "190px":
                styleEnemycard();
                break;
            case "360px":
                styleEnemycard();
                break;
            case "530px":
                styleEnemycard();
                break;
        }
        stapelkarten[stapelkarten.length - hilfsNummer - 1].style.backgroundColor = "black";
        //Änderung
        stapelkarten[stapelkarten.length - hilfsNummer].removeEventListener("click", spielerAufnehmen);
        enemyCard.push(stapelkarten[stapelkarten.length - hilfsNummer]);
        stapelLength--;
        hilfsNummer++;
        lastEnemyPos++;
    }
    if (stapelLength == 0) {
        alert("Alle Karten gespielt, starten sie neu!");
    }
}
function spielGewonnen() {
    if (gamerCard.length == 0) {
        window.alert("Glückwunsch, sie haben gewonnen");
    }
}
function spielVerloren() {
    if (enemyCard.length == 0) {
        window.alert("Sie haben verloren, versuchen sie es erneut");
    }
}
function styleGamerCard() {
    stapelkarten[stapelkarten.length - hilfsNummer].style.left = currentEmpty[lastPosition];
    stapelkarten[stapelkarten.length - hilfsNummer].style.top = "450px";
    stapelkarten[stapelkarten.length - hilfsNummer].style.backgroundColor = stapelkarten[stapelkarten.length - hilfsNummer].className;
    stapelkarten[stapelkarten.length - hilfsNummer].textContent = stapelkarten[stapelkarten.length - hilfsNummer].id;
}
function styleEnemycard() {
    stapelkarten[stapelkarten.length - hilfsNummer].style.left = currentEmptyEnemy[lastEnemyPos];
    stapelkarten[stapelkarten.length - hilfsNummer].style.top = "50px";
    stapelkarten[stapelkarten.length - hilfsNummer].style.backgroundColor = "black";
}
//# sourceMappingURL=uebung02.js.map