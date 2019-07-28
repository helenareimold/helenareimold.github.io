
interface Karte {
    cardId : string;
    cardColor: number;
    cardNumber : number;

}

let hand : Karte[] =[];
let gegner : Karte[] = [];
let ablage : Karte[] = [];
let ziehstapel : Karte[] = [];

var work = false;
var played = false;
var ingame = false;

let isVisible=false;



// Arrays, welche jeweils Bauteile für Eigenschaften der Karten beinhalten.


function Karten_Füllen(){
  for(var i=1;i<=4;i++){
      for(var j=1;j<9;j++){
          var cardId=i +"-"+j
           ziehstapel.push({cardId:cardId,cardColor:i,cardNumber:j})
      }
  }
  ziehstapel = mischeln(ziehstapel);

}
function mischeln(array){
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.random() * (i + 1);
        var ri = Math.floor(r);
        var tmp = array[i];
        array[i] = array[ri]
        array[ri] = tmp;
    }
    return array;
}

function isEmpty(array) {
    if (array.length == 0) {
        return true;
    } else {
        return false;
    }
}

function cardToPlayer() {
    if (!isEmpty(ziehstapel)) {
        hand.push(ziehstapel[0]);
        ziehstapel.splice(0, 1);
    } else {
        console.log("EMPTY STACK")
    }
}

function cardToField() {
    if (!isEmpty(ziehstapel)) {
        ablage.push(ziehstapel[0]);
        ziehstapel.splice(0, 1);
    } else {
        console.log("EMPTY STACK")
    }
}

function cardToComputer() {
    if (!isEmpty(ziehstapel)) {
        gegner.push(ziehstapel[0]);
        ziehstapel.splice(0, 1);
    } else {
        console.log("EMPTY STACK")
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
    var kartenSpieler = "";
    if (hand.length != 0) {
        hand.forEach(function (card) {
            kartenSpieler = kartenSpieler + createCard(false, card, true);
        })
    }
    var kartenComputer = "";
    if (gegner.length != 0) {
        gegner.forEach(function (card) {
            card.cardId = "";
            kartenComputer = kartenComputer + createCard(true, card, true);
        })
    }
    var stapelKarten = "";
    if (ziehstapel.length != 0) {
        stapelKarten = createCard(true, { cardId: "nc", cardColor: 0, cardNumber: 0 }, false);
    }
    var karteImSpiel = "";
    if (ablage.length != 0) {
        karteImSpiel = createCard(false, getTopCard(), false);
    }
    document.getElementById("kartenImSpiel").innerHTML = karteImSpiel;
    document.getElementById("stapelKarten").innerHTML = stapelKarten;
    document.getElementById("kartenSpieler").innerHTML = kartenSpieler;
    document.getElementById("kartenComputer").innerHTML = kartenComputer;
}

function createCard(back: boolean, card: Karte, createItemDiv: boolean) {
    var colorn = "none";
    var valuen = "X";
    switch (card.cardColor) {
        case 1:
            colorn = "blau";
            break;
        case 2:
            colorn = "rot";
            break;
        case 3:
            colorn = "gelb";
            break;
        case 4:
            colorn = "grün";
            break;
    }
    if (card.cardNumber < 11) {
        valuen = card.cardNumber.toString();
    } else {
      /*  switch (card.cardNumber) {
            case 11:
                valuen = "J";
                break;
            case 12:
                valuen = "Q";
                break;
            case 13:
                valuen = "K";
                break;
        }*/
    }
    var carddiv = "";
    if (back) {
        if(createItemDiv) {
            carddiv = carddiv + `<div class="meinObjekt">`
        }
        carddiv = carddiv +
            `
            <div onclick=clickCard("${card.cardId}") id="${card.cardId}" class="stapelKarten card back"></div>
      
            `;
        if(createItemDiv) {
            carddiv = carddiv + `</div>`
        }
    } else {
        if(createItemDiv) {
            carddiv = carddiv + `<div class="meinObjekt">`
        }
        carddiv = carddiv +
            `
            <div onclick=clickCard("${card.cardId}") id="${card.cardId}" class="stapelKarten card">
                <div class="value">${valuen}</div>
                <div class="${colorn}"></div>
            </div>
           
            `;
            
        if(createItemDiv) {
            carddiv = carddiv + `</div>`
        }
    }
    return carddiv;
}

function hasPlayerCard(card) {
    var ok = false;
    hand.forEach(function (pcard) {
        if ((pcard.cardColor == card.cardColor) && (pcard.cardNumber == card.cardNumber)) {
            ok = true;
        }
    })
    return ok;
}

function getCardIndex(array, card: Karte) {
    var ind = -1;
    for (var i = 0; i < array.length; i++) {
        if ((array[i].cardColor == card.cardColor) && (array[i].cardNumber == card.cardNumber)) {
            ind = i;
        }
    }
    return ind;
}

function cardCanBePlayed(card) {
    var ok = false;
    if (!isEmpty(ablage)) {
        var tc = getTopCard();
        if ((tc.cardColor == card.cardColor) || (tc.cardNumber == card.cardNumber)) {
            ok = true;
        }
    }
    return ok;
}

function playCardPlayer(card) {
    if (!isEmpty(hand)) {
        var ind = getCardIndex(hand, card);
        ablage.push(hand[ind]);
        hand.splice(ind, 1);
        return card;
    } else {
        console.log("EMPTY STACK")
    }
}

function canPlayerPlay() {
    if (!isEmpty(hand)) {
        var tc = getTopCard();
        var ok = false;
        for (var i = 0; i < hand.length; i++) {
            if ((hand[i].cardColor == tc.cardColor) || (hand[i].cardNumber == tc.cardNumber)) {
                ok = true;
            }
        }
        return ok;
    } else {
        console.log("EMPTY STACK")
        return false;
    }
}

function canComputerPlay() {
    if (!isEmpty(gegner)) {
        var tc = getTopCard();
        var ok = false;
        for (var i = 0; i < gegner.length; i++) {
            if ((gegner[i].cardColor == tc.cardColor) || (gegner[i].cardNumber == tc.cardNumber)) {
                ok = true;
            }
        }
        return ok;
    } else {
        console.log("EMPTY STACK")
        return false;
    }
}

function playCardComputer() {
    if (!isEmpty(gegner)) {
        var tc = getTopCard();
        var ok = false;
        console.log(tc);
        for (var i = 0; i < gegner.length; i++) {
            if ((gegner[i].cardColor == tc.cardColor) || (gegner[i].cardNumber == tc.cardNumber)) {
                console.log("OK!")
                ablage.push(gegner[i]);
                gegner.splice(i, 1);
                ok = true;
                return;
            }
        }
        if (!ok) {
            cardToComputer();
        }
    } else {
        cardToComputer();
    }
}

function checkStack() {
    if(isEmpty(ziehstapel)) {
        if(ablage.length > 1) {
            var temp = getTopCard();
            ziehstapel = ablage;
            ziehstapel.slice(ziehstapel.length - 1, 1)
            ablage = [temp];
        } else {
            if(!isEmpty(ablage)) {
                if(!canPlayerPlay && !canComputerPlay) {
                    ingame = false;
                    alert("Tie!");
                }
            }
        }
    }
}

function clickCard(id: string) {
    if(!ingame) {
        console.log("Not in game!")
        return;
    }
    var tc = getTopCard();
    if (work) {
        console.log("WORKING...")
        return;
    }
    played = false;
    work = true;
    if (id == "nc") {
        cardToPlayer();
        played = true;
    } else if (id == "") {
        console.log("No your Card!");
        work = false;
        return;
    }
    else {
        var spl = id.split("-", 2);
        var color = +spl[0];
        var value = +spl[1];
        let card: Karte = { cardId: id, cardColor: color, cardNumber: value };
        if (!hasPlayerCard(card)) {
            console.log("Not your Card!")
            work = false;
            return;
        }
        if (!cardCanBePlayed(card)) {
            console.log("Card cant be played!")
            work = false;
            return;
        }
        playCardPlayer(card);
        played = true;
    }
    loadField();
    if(isEmpty(hand)) {
        ingame = false;
        alert("Gut gespielt! Du hast gewonnen!");
        return;
    }
    setTimeout(() => 
    {
        if (played) {
            playCardComputer();
            loadField();
        }
        if(isEmpty(gegner)) {
            ingame = false;
            alert("Du hast leider verloren! Versuchs nochmal!");
        }
        work = false;
    }, 1000);
    checkStack();
}

}





let karteArray : Karte[] = []; 
console.log(karteArray );                      


window.onload = function () {
    document.getElementById("cardSpawner").addEventListener("click", generateKarte, false);
    }


















//# sourceMappingURL=script.js.map