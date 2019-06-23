// ------- Variablen -------- //
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 2000; // Stellt die gesammelte Erfahrung des Spielers dar. - wenn der Spieler startet hat er keine Erfahrung
let playerXPperLevel = 500;
let playerHP = 0;
let playerHPperLevel = 2000;
// Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerItems = "Hammer und Meisel";
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix = ["Fette(s) ", "Hungrige(s) ", "Große(s) ", "Grüne(s) ", "Opfer ", "Wütende ", "Verdorbene ", "Lachendes "]; // length = 8, da 8 Einträge. Von 0-7.
let monsterName = ["Osterhase", "Drache", "Gummibär", "Teufel", "Ungeheuer", "Ameise", "Spinne", "Viech"]; // length = 8, da 8 Einträge. Von 0-7.
let suffix = ["aus Fuwa", "mit Spliss", " mit Schnupfen", " die Erbarmungslos", " die Rächerin", " aus der Tiefe", " aus dem Meer", " ohne Gnade"]; // length = 8, da hier 8 Einträge sind. Von 0-7.
let monsterModifers = ["Fett", "hat kein Leben", "unsterblich", "unzerstörbar", "teuflisch", "aufmerksam", "langsam", "stark", "flink", "liebevoll", "kugelrund"]; // Eine Reihe von zufälligen Verstärkern/Zusätzen für das Monster. length = 8, da 8 Einträge. Von 0-7.
let monsterWeapon = ["unsterblich", "Hammer", "Wasserbombe", "Spritzpistole", "Säge", "Axt", "Killerblick", "Berührung des Todes"]; // length = 8, da 8 Einträge. Von 0-7.
let Images = ["Bilder/osterhase.png", "Bilder/drache.png", "Bilder/gummibär.png"]; // length = 3, da 3 Einträge. Von 0-2.
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(0);
    console.log("" + document.getElementById("monsterSpawner").innerHTML);
    document.getElementById("fightAll").addEventListener('click', fightAllMonsters, false);
    document.getElementById("fightAllWeak").addEventListener('click', fightAllWeakMonsters, false);
    document.getElementById("fightWeakest").addEventListener('click', fightWeakestMonster, false);
    updatePlayerLevel(1);
};
//Funktionen 
function generateMonster() {
    let monsterNr = getRNGNumber(3) + 1; //zwischen 1-3 Monster werden angezeigt
    for (let i = 0; i < monsterNr; i++) // for Schleife
     {
        let newMonsterWeapon = generatedMonsterWeapon();
        let newImage;
        let newMonsterLevel = generateMonsterLevel();
        let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
        let newMonsterHP = generateMonsterHealthPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
        let newMonster = {
            monsterWeapon: newMonsterWeapon,
            monsterImage: newImage,
            monsterLevel: newMonsterLevel,
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        updateHTML();
    }
}
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAII();
    getMonsterCount();
}
function monsterGenerateHTMLAII() {
    for (let i = 0; i < monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }
}
function clearMonsterCell() {
    console.log(monsterArray);
    for (let i = 0; i <= monsterArray.length; i++) {
        if (document.getElementById("monster" + (i + 1)) != null) {
            var element = document.getElementById("monster" + (i + 1));
            element.parentNode.removeChild(element);
        }
    }
    console.log(monsterArray);
}
function getMonsterCount() {
    return monsterArray.length;
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(count) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + count); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[count].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[count].monsterModifier[0] + ", " + monsterArray[count].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", Images[generatedImage()]); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);
    let tempMonsterLevel = document.createElement("p");
    tempMonsterLevel.innerHTML = "Monster Level: " + monsterArray[count].monsterLevel;
    holdingDiv.appendChild(tempMonsterLevel);
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    let monsterCount = count; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
} // Füge den Button zu dem holding-div hinzu
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber); //Generiert eine Zahl zwischen 0 und 1, multipliziert mit maxNumber und rundet diese 
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der ZUFALLSGENERIERTEN Zahl den entsprechenden Eintrag.
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
// Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 500) + 100 zurück.             <-- von 350 auf 500 erhöht
    let tempMonsterXP = 100 + getRNGNumber(500);
    return tempMonsterXP;
}
function generateMonsterHealthPoints() {
    let tempMonsterHP = 300;
    return tempMonsterHP;
}
//Diese Funktion gibt die Waffe des Monsters aus                                           
//Liefert eine zufällig ausgewählte Waffe
function generatedMonsterWeapon() {
    let generatedMonsterWeapon = "";
    generatedMonsterWeapon = monsterWeapon[getRNGNumber(monsterWeapon.length)];
    return generatedMonsterWeapon;
}
// Wird für die Erstellung der Monster-Schwierigkeit aufgerufen.                             
// Liefert eine variierende Zahl zurück.
function generateMonsterDifficulty() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 20) + 1 zurück.
    let tempMonsterDf = 1 + getRNGNumber(20);
    return tempMonsterDf;
}
//Wird für die Auswahl eines Bildes aufgerufen                                       
//Liefert uns ein zufälliges Bild        
function generatedImage() {
    let tempImage = getRNGNumber(Images.length);
    return tempImage;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function fightMonster(_index) {
    if (monsterArray[_index].monsterLevel < tempPlayerLevel) {
        playerXP += monsterArray[_index].monsterExperience; //Spieler bekommt XP Punkte wenn sein Level höher als das des Monsters ist und gewinnt
        updatePlayerLevel(monsterArray[_index].monsterExperience);
        monsterArray.splice(_index, 1);
    }
    else {
        updatePlayerLevel(-monsterArray[_index].monsterExperience); //Spieler verliert XP Punkte weil sein Leven zu niedrig war
    }
    updateHTML();
}
function updatePlayerLevel(XP) {
    playerXP += XP;
    if (playerXP < 0) {
        playerXP = 0;
    }
    let tempPlayerLevel = Math.floor(playerXP / playerXPperLevel);
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempPlayerLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + tempPlayerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
    let tempPoints = Math.floor(playerHP / playerHPperLevel);
    document.getElementById("hpCounter").innerHTML = "Player-Lifes: +" + tempPoints + " (HP: " + playerHP + " / " + playerHPperLevel + ")";
    console.log("Spieler " + playerName + " hat nun " + playerHP + " Lebenspunkte" + " (" + playerHPperLevel + " pro Level)");
    if (tempPlayerLevel >= 20) //Level 20 = Sieg --> Alert wird angezeigt
     {
        alert("Du hast alle Monster in die Flucht geschlagen!!!");
    }
}
//Funktionen neu
let tempPlayerLevel = Math.floor(playerXP / playerXPperLevel); //Level-Variable des Spielers
function generateMonsterLevel() {
    let tempMonsterLevel = Math.floor(Math.random() * 11); //Level-Variable, die einen ganzzahligen zufälligen Wert zw. 0 und 10 generiert
    return tempMonsterLevel;
}
function fightAllMonsters() {
    for (let i = 0; i < monsterArray.length; i++) {
        fightMonster(i);
    }
}
function fightAllWeakMonsters() {
    for (let i = monsterArray.length - 1; i >= 0; i--) {
        if (tempPlayerLevel > monsterArray[i].monsterLevel) {
            fightMonster(i);
        }
    }
}
function fightWeakestMonster() {
    let index = 0;
    let theWeakest = monsterArray[0].monsterLevel;
    for (let i = monsterArray.length - 1; i >= 0; i--) {
        if (monsterArray[i].monsterLevel < theWeakest) {
            index = i;
            theWeakest = monsterArray[i].monsterLevel;
        }
        if (monsterArray[index].monsterLevel < tempPlayerLevel) {
            fightMonster(index);
        }
    }
}
//# sourceMappingURL=62-TS-Example.js.map
//# sourceMappingURL=62-TS-Example.js.map