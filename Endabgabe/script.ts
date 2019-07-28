interface Karte {               // Interface für Karte mit Farbe +  Zahl festgelegt = eindeutiger Wert
    cardId : string;            // eindeutiger Wert (ID) der Karte
    cardColor: number;          // Kartenfarbe
    cardNumber : number;        // Zahlenwert der Karte
}

let hand : Karte[] =[];                 // Ich erstelle 4 Arrays: Handdeck, Gegnerdeck, Stapel und Ablage
let gegner : Karte[] = [];
let ablage : Karte[] = [];
let ziehstapel : Karte[] = [];

var spielMöglich = false;    // durch "false" wird das Spiel wieder/zu Beginn auf den Anfang gesetzt
var gespielt = false;
var spielStand = false;
let aufgedeckt=false;       



function kartenBenennung(){               
  for(var i=1;i<=4;i++){       // 4 Schleifendurchläufe für die unterschiedlichen Farben
      for(var n=1;n<9;n++){    // 8 Schleifendurchläufe für alle Zahlen
          var cardId=i +"-"+n  // cardId wird festgelegt, "-" hebt den arithmetischen Operator + auf 
           ziehstapel.push({cardId:cardId,cardColor:i,cardNumber:n})  //Ziehstapel wird mit allen Karten gefüllt
      }
  }
  ziehstapel = mischeln(ziehstapel); // Ziehstapel wird gemischelt
}

function mischeln(array: any){ // Mischelfunktion
    var i = array.length - 1;  // i wird initialisiert
    while(i>0){
        var j = Math.random() * (i + 1); //Rechnung für das Mischeln
        var a = Math.floor(j);
        var tmp = array[i];
        array[i] = array[a];
        array[a] = tmp;
        i--  ;    //  Schleifenzähler wird um eins erniedrigt
    }
    return array; // Wert wird an die Funktion übergeben
}
 
function spielBeginn() {                    
    ziehstapel = [];  hand = []; gegner = []; ablage = [];          
     spielStand = true; spielMöglich = false; gespielt = false;      //Spiel kann beginnen --> weder Spieler noch Gegner hat gespielt
    kartenBenennung();    //Teil-Funktionen werden übergeben
    kartenAusgabe(); 
    spielFeldGenerierung(); 
}

function kartenAusgabe() {               //Karten werden ausgeteilt: 5 pro Spieler und 1 als Startkarte
    karteZuSpieler();
    karteZuGegner();
    karteZuSpieler();
    karteZuGegner();
    karteZuSpieler();
    karteZuGegner();
    karteZuSpieler();
    karteZuGegner();
    karteZuSpieler();
    karteZuGegner();
    karteStart();
}

function karteStart() {
     if (leer(ziehstapel)) { // if Anweisung wenn der Ziehstapel leer geht
        console.log("Stapel ist leer")
    } else {                        
        ablage.push(ziehstapel[0]);   
        ziehstapel.splice(0, 1); 
        }
    }

function karteZuSpieler() {  
    if (leer(ziehstapel)) {
        console.log("Stapel ist leer")
    } else {
        hand.push(ziehstapel[0]);  //Wenn der Ziehstapel nicht leer ist, dann kann weiter aufgenommen werden
        ziehstapel.splice(0, 1);   
        }
    }

function karteZuGegner() {
    if (leer(ziehstapel)) {
        console.log("Stapel ist leer")
    } else {
        gegner.push(ziehstapel[0]); //Wenn der Ziehstapel nicht leer ist, dann kann weiter aufgenommen werden
        ziehstapel.splice(0, 1);
        }
    }

function leer(array: any) {
    if (array.length == 0) {
        return true;
    } else {
        return false;
        }
    }

function obereKarte() {  //Wenn der Ablagestapel NICHT leer ist, dann ist immer die letzte (also abgelegte) Karte im Array, oben auf dem Ablagestapel
         if (!leer(ablage)) {
        return ablage[ablage.length - 1];
        }
    }

function spielFeldGenerierung() {   // Spielfeld wird erstellt
    var feldSpieler = "SPIELER";
    if (hand.length > 0) {
        hand.forEach(function (card) {
            feldSpieler = feldSpieler + createCard(false, card, true);
        })
    }
    var feldGegner = "GEGNER";
    if (gegner.length > 0) {
        gegner.forEach(function (card) {
            card.cardId = "";
            feldGegner = feldGegner + createCard(true, card, true);
        })
    }
    var feldZiehen = "";
    if (ziehstapel.length > 0) {
        feldZiehen = createCard(true, { cardId: "up", cardColor: 0, cardNumber: 0 }, false);
    }
    var feldAblage = "";
    if (ablage.length > 0) {
        feldAblage = createCard(false, obereKarte(), false);
    }
    document.getElementById("feldAblage").innerHTML = feldAblage;
    document.getElementById("feldZiehen").innerHTML = feldZiehen;
    document.getElementById("feldSpieler").innerHTML = feldSpieler;
    document.getElementById("feldGegner").innerHTML = feldGegner;
}

function createCard(back: boolean, card: Karte, erstelleDivItem: boolean) {      // In der Funktion wird unterschieden, ob die Karte gezeigt oder verdeckt werden soll
    var farbe = "keine Farbe";
    var kartenWert = "kein Wert";
    switch (card.cardColor) {     // Wenn sie gezeigt werden soll, muss aus mehreren Fällen unterschieden werden welche Farbe und welchen dazugehörigen Wert die Karte hat
        case 1:                                      
            farbe = "blau";
            break;
        case 2:
            farbe = "rot";
            break;
        case 3:
            farbe = "gelb";
            break;
        case 4:
            farbe = "grün";
            break;
    }

    if (card.cardNumber < 9) {
        kartenWert = card.cardNumber.toString();
    }
    
    var divKarte = "";
    if (back) {
        if(erstelleDivItem) {
            divKarte = divKarte + `<div class="meinObjekt">`
        } divKarte = divKarte + `<div onclick=clickCard("${card.cardId}") id="${card.cardId}" class="stapelKarten card back"></div>`;
        if(erstelleDivItem) {
            divKarte = divKarte + `</div>`
        }
    } else {
        if(erstelleDivItem) { divKarte = divKarte + `<div class="meinObjekt">`
        }
        divKarte = divKarte + `<div onclick=clickCard("${card.cardId}") id="${card.cardId}" class="stapelKarten card">
                <div class="kartenWert">${kartenWert}</div>
                <div class="${farbe}"></div></div>`;
        if(erstelleDivItem) {
            divKarte = divKarte + `</div>` }
    }
    return divKarte;
}

function hatSpielerKarte(card: any) {                       // Sicherstellen, ob der Spieler eine Karte hat 
    var ok = false;
    hand.forEach(function (eineCard) {
        if ((eineCard.cardColor == card.cardColor) && (eineCard.cardNumber == card.cardNumber)) {
            ok = true; } 
        })
    return ok;
}

function kannSpieler() {                    // Kontrollfunktion, ob der Spieler legen kann
    if (!leer(hand)) {
    var move = obereKarte();
        var ok = false;
    for (var i = 0; i < hand.length; i++) {
    if ((hand[i].cardColor == move.cardColor) || (hand[i].cardNumber == move.cardNumber)) {
        ok = true; }
        }
        return ok;
    } else { console.log("Stapel ist leer")
        return false; }
}

function zugSpieler(card: any) {             // Der Spieler kann entweder ablegen oder auch aufnehmen, außer der Stapel ist leer dann kann nicht mehr aufgenommen werden
    if (!leer(hand)) {
    var index = indexKarte(hand, card);
        ablage.push(hand[index]);
        hand.splice(index, 1);
    return card;
    } else { console.log("Stapel ist leer") }
}

function zugMöglich(card: any) {
    var ok = false;
    if (!leer(ablage)) {
    var move = obereKarte(); // Wenn Farbe oder Zahl mit der karte auf dem Ablagestapel übereinstimmt, kann gelegt werden
    if ((move.cardColor == card.cardColor) || (move.cardNumber == card.cardNumber)) {
        ok = true; }
    }
    return ok;
}

function kannGegner() {          // Kontrollfunktion, ob der Gegner legen kann, ansonsten muss aufgenommen werden, außer der Stapel ist leer
    if (!leer(gegner)) {
    var move = obereKarte();
        var ok = false;
    for (var i = 0; i < gegner.length; i++) {
    if ((gegner[i].cardColor == move.cardColor) || (gegner[i].cardNumber == move.cardNumber)) {
        ok = true; }
        }
        return ok;
    } else { console.log("Stabel ist leer")
        return false; }
}

function zugGegner() {       // Gegner ist am Zug
    if (!leer(gegner)) { // Wenn der Gegner nicht legen kann, bleibt die letze Ablagekate oben
    var move = obereKarte();
        var ok = false;
        console.log(move);
    for (var i = 0; i < gegner.length; i++) {
    if ((gegner[i].cardColor == move.cardColor) || (gegner[i].cardNumber == move.cardNumber)) {
        console.log("Passt")
            ablage.push(gegner[i]); // Wenn Gegner eine Karte ablegt...
            gegner.splice(i, 1);    // ... wird das Kartenarray des Gegners um eins verkürzt
            ok = true;
            return; }
        }
    if (!ok) {
        karteZuGegner(); }
    } else {
        karteZuGegner(); } 
    }

function indexKarte(array: any, card: Karte) {
    var index = -1;
    for (var i = 0; i < array.length; i++) {
        if ((array[i].cardColor == card.cardColor) && (array[i].cardNumber == card.cardNumber)) {
            index = i; }
        }
    return index; }
    

function stapelStatus() {
    if(leer(ziehstapel)) {  // Wenn der Ziehstapel leer ist... 
        if(ablage.length > 1) { // ... und mehr als eine Karte auf dem Ablagestapel liegt...
            var temp = obereKarte(); // ... dann bleibt die obere Karte bestehen ...
            ziehstapel = ablage;    // ... und der Rest des Ablagestapels, wird zum Ziehstapel
            ziehstapel.slice(ziehstapel.length - 1, 1)
            ablage = [temp];
        } else {
            if(!leer(ablage)) {
                if(!kannSpieler && !kannGegner) {
                    spielStand = false;
                    alert("Unentschieden!"); } 
         } } } }

function clickCard(id: string) {          // Kontrollfunktion falls Spieler außerhalb der Karten klickt
    if(!spielStand) {
        console.log("Leider daneben geklickt!")
        return;
    }
    var move = obereKarte();
    if (spielMöglich) {
        console.log("Spiel wird verarbeitet")
        return;
    }
    gespielt = false;
    spielMöglich = true;
    if (id == "up") {
        karteZuSpieler();
        gespielt = true;
    } else if (id == "") {
        console.log("Karte muss aufgenommen werden");
        spielMöglich = false;
        return;
    }
    else {
        var play = id.split("-", 2);
        var color = +play[0];
        var kartenWert = +play[1];
        let card: Karte = { cardId: id, cardColor: color, cardNumber: kartenWert };
        if (!hatSpielerKarte(card)) {
            console.log("Nicht möglich")
            spielMöglich = false;
            return;
        }
        if (!zugMöglich(card)) {
            console.log("Zug ungültig")
            spielMöglich = false;
            return;
        }
        zugSpieler(card);
        gespielt = true;
    }
    spielFeldGenerierung();
    if(leer(hand)) {        // Spieler hat keine Karten mehr auf der Hand --> Alert --> gewonnen
        spielStand = false;
        alert("Gut gespielt! Du hast gewonnen!");
        return; } setTimeout(() => 
    {
        if (gespielt) {
            zugGegner();
            spielFeldGenerierung();
        }
        if(leer(gegner)) {          // Gegner hat keine Karten mehr auf der Hand --> Alert --> verloren
            spielStand = false;
            alert("Du hast leider verloren! Versuchs nochmal!"); }
        spielMöglich = false;     }, 700);          // Spiel Ende  // "Geschwindigkeit" Ablage Gegnger
        stapelStatus();  
    
}




//# sourceMappingURL=script.js.map