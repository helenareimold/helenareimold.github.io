let hand = [];
let gegner = [];
let ablage = [];
let ziehstapel = [];
var work = false;
var played = false;
var ingame = false;
let isVisible = false;
function Karten_Füllen() {
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j < 9; j++) {
            var cardId = i + "-" + j;
            ziehstapel.push({ cardId: cardId, cardColor: i, cardNumber: j });
        }
    }
    ziehstapel = mischeln(ziehstapel);
}
function mischeln(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.random() * (i + 1);
        var ri = Math.floor(r);
        var tmp = array[i];
        array[i] = array[ri];
        array[ri] = tmp;
    }
    return array;
}
function isEmpty(array) {
    if (array.length == 0) {
        return true;
    }
    else {
        return false;
    }
}
function cardToPlayer() {
    if (!isEmpty(ziehstapel)) {
        hand.push(ziehstapel[0]);
        ziehstapel.splice(0, 1);
    }
    else {
        console.log("Der Stapel ist Leer");
    }
}
function cardToField() {
    if (!isEmpty(ziehstapel)) {
        ablage.push(ziehstapel[0]);
        ziehstapel.splice(0, 1);
    }
    else {
        console.log("Der Stapel ist Leer");
    }
}
function dealCards() {
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToField();
}
function start() {
    ziehstapel = [];
    hand = [];
    gegner = [];
    ablage = [];
    ingame = true;
    work = false;
    played = false;
    Karten_Füllen();
    dealCards();
    loadField();
}
function getTopCard() {
    if (!isEmpty(ablage)) {
        return ablage[ablage.length - 1];
    }
}
function loadField() {
    var feldSpieler = "";
    if (hand.length != 0) {
        hand.forEach(function (card) {
            feldGegner = feldSpieler + createCard(false, card, true);
        });
    }
    var feldGegner = "";
    if (gegner.length != 0) {
        gegner.forEach(function (card) {
            card.cardId = "";
            feldGegner = feldGegner + createCard(true, card, true);
        });
    }
    var feldZiehen = "";
    if (ziehstapel.length != 0) {
        feldZiehen = createCard(true, { cardId: "nc", cardColor: 0, cardNumber: 0 }, false);
    }
    var feldAblage = "";
    if (ablage.length != 0) {
        feldAblage = createCard(false, getTopCard(), false);
    }
    document.getElementById("feldAblage").innerHTML = feldAblage;
    document.getElementById("feldZiehen").innerHTML = feldZiehen;
    document.getElementById("feldSpieler").innerHTML = feldSpieler;
    document.getElementById("feldGegner").innerHTML = feldGegner;
}
//# sourceMappingURL=script2.js.map