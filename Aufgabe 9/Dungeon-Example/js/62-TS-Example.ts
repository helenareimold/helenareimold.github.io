interface Monster {
    
    monsterName : string; // Name des Monsters
    monsterHealthPoints : number; // Lebenspunkte
    monsterExperience : number; // Erfahrungspunkte bei besiegen des Monsters
    monsterModifier : string []; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)

    monsterWeapon : string; //Waffe des Monsters
    monsterImage : string;  //Bild des Monsters
}


// ------- Variablen -------- //


let monsterHolder : string = "monsterHoldingCell";                                  // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.

let playerName : string = "Spielername";                                            // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP : number = 0;                                                          // Stellt die gesammelte Erfahrung des Spielers dar. - wenn der Spieler startet hat er keine Erfahrung
let playerXPperLevel : number = 500;                                                // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerItems : string = "Hammer und Meisel"

// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix : string[] = ["Fette(s) ", "Hungrige(s) ", "Große(s) ", "Grüne(s) ", "Opfer ", "Wütende ", "Verdorbene ", "Lachendes "]; // length = 8, da 8 Einträge. Von 0-7.
let monsterName : string[] = ["Osterhase", "Drache", "Gummibär", "Teufel", "Ungeheuer", "Ameise", "Spinne", "Viech"]; // length = 8, da 8 Einträge. Von 0-7.
let suffix : string[] = ["aus Fuwa", "mit Spliss", " mit Schnupfen", " die Erbarmungslos", " die Rächerin", " aus der Tiefe", " aus dem Meer", " ohne Gnade"]; // length = 8, da hier 8 Einträge sind. Von 0-7.

let monsterModifers : string[] = ["Fett", "hat kein Leben", "unsterblich", "unzerstörbar", "teuflisch", "aufmerksam", "langsam", "stark", "flink", "liebevoll", "kugelrund"]; // Eine Reihe von zufälligen Verstärkern/Zusätzen für das Monster. length = 8, da 8 Einträge. Von 0-7.

let monsterWeapon : string[] = ["unsterblich", "Hammer", "Wasserbombe", "Spritzpistole", "Säge", "Axt", "Killerblick", "Berührung des Todes"] // length = 8, da 8 Einträge. Von 0-7.
let Images : string[] = ["Bilder/osterhase.png", "Bilder/drache.png", "Bilder/gummibär.png"] // length = 3, da 3 Einträge. Von 0-2.


// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray : Monster[] = []; // Das Haupt-Array wurde erstellt und initialisiert!
//console.log(monsterArray ); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.


//Funktionen 


// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML); 
}


console.log(document.getElementById("monsterSpawner").innerHTML);


// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster()
{
    let monsterNr : number = getRNGNumber(3) + 1;  //zwischen 1-3 Monster werden angezeigt
    for (let i = 0; i < monsterNr; i++)             // for Schleife

     {
    let newMonsterWeapon : string = generatedMonsterWeapon();
    let newImage: string ;
    
    let newMonsterName : string = generateMonsterName();                // Eigens-gebaute Funktion, welche einen string zurück gibt.
    let newMonsterHP : number = generateMonsterHealthPoints();             // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterXP : number = generateMonsterXP();                    // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterModifier : string[] = generateMonsterModifer();       // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.

    let newMonster : Monster = {                                        // Monster wird erstellt.
    
        monsterWeapon : newMonsterWeapon,
        monsterImage : newImage,

        monsterName : newMonsterName, 
        monsterHealthPoints : newMonsterHP,
        monsterExperience : newMonsterXP,
        monsterModifier : newMonsterModifier,
    };

    monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
    if(monsterArray.length != 0)                                        
    {
        console.log(monsterArray[monsterArray.length - 1].monsterExperience);                    // Man kann nur auf Array-Teile zugreifen, welche definiert sind.
    }
    
    monsterGenerateHTML(monsterArray.length);                                              // Triggere die Generierung von HTML
}

updateHTML();
}
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAII();
    getMonsterCount();
}
function monsterGenerateHTMLAII() {
    for (let i: number = 1; i <= monsterArray.length; i++) {
        console.log("Hierbei wurden " + i + " Monster generiert");
        monsterGenerateHTML(i);
    }
}
function clearMonsterCell() {
    let monsterCell = document.getElementById("monsterHoldingCell");
    if (monsterCell.hasChildNodes) {                            // bei Kindelementen, soll nachfolgendes ausgeführt werden
        while (monsterCell.firstChild) {
            monsterCell.removeChild(monsterCell.firstChild);                //löschen der Kindelemente        
        }
    }
    console.log("Kindelemente des MonsterCell wurden entfernt");
}
function getMonsterCount() {
    return monsterArray.length;
}

// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(count)
{
    let holdingDiv : HTMLElement = document.createElement("div");       // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + count);     // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster");                        // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv);     // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

    let monsterName : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterName.innerHTML = monsterArray[count - 1].monsterName;                     // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterMod : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[count - 1].monsterModifier[0] + ", " +  monsterArray[count -1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterImg : HTMLElement = document.createElement("img");       // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", Images[generatedImage()]);                 // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster");                         // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);                                 // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

    let monsterBtn : HTMLElement = document.createElement("BUTTON");    // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!";                        // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn);                                 // Füge den Button zu dem holding-div hinzu.

    let monsterCount : number = monsterArray.length;                    // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);

    monsterBtn.addEventListener(                                        // Füge dem Monster eine Funktion hinzu.
        'click', function() {                                           // Wird bei Maus-Click ausgelöst.
            fightMonster(monsterCount);                                 // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
        }, false);                                                      // Ignoriert das false.
}


// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber : number) : number
{
    return Math.floor(Math.random() * _maxNumber);   //Generiert eine Zahl zwischen 0 und 1, multipliziert mit maxNumber und rundet diese 
}

// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() : string
{
    let generatedMonsterName : string = ""; // Erstelle einen leeren String für das Monster

    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber : number = getRNGNumber(prefix.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber];                           // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length);                       // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber];                     // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der ZUFALLSGENERIERTEN Zahl den entsprechenden Eintrag.

    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length);                            // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber];                          // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    return generatedMonsterName;
}


//Diese Funktion gibt die Waffe des Monsters aus                                           
//Liefert eine zufällig ausgewählte Waffe
function generatedMonsterWeapon() : string
{
    let generatedMonsterWeapon : string = "";
    generatedMonsterWeapon = monsterWeapon[getRNGNumber(monsterWeapon.length)];
    return generatedMonsterWeapon;
}

// Wird für die Erstellung der Monster-Schwierigkeit aufgerufen.                             
// Liefert eine variierende Zahl zurück.
function generateMonsterDifficulty() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 20) + 1 zurück.
    let tempMonsterDf : number = 1 + getRNGNumber(20);
    return tempMonsterDf;
}


//Wird für die Auswahl eines Bildes aufgerufen                                       
//Liefert uns ein zufälliges Bild        
function generatedImage()           
{
    let tempImage : number = getRNGNumber(Images.length);
    return tempImage;
}

// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHealthPoints() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP : number = 1 + getRNGNumber(10);
    return tempMonsterHP;
}


// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 500) + 100 zurück.             <-- von 350 auf 500 erhöht
    let tempMonsterXP : number = 100 + getRNGNumber(500);
    return tempMonsterXP;
}


// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() : string[]
{
    let tempMonsterMod : string[] = [];                                         // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
}


// Aufgerufen, wenn man auf den Button klickt.
// Entsprechendes Monster wird bekämpft und der Spieler erhält Erfahrungspunkte.
function fightMonster(_index : number)
{

    console.log("Spieler kämpft gegen Monster und gewinnt!");                       // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
    console.log("Das Monster weigert sich zu verschwinden.");                       // Wird nächste Stunde erweitert.
    
    playerXP += monsterArray[_index - 1].monsterExperience;                 	    // _index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.

    updatePlayerLevel();
    monsterArray.splice(_index -1, 1);
    updateHTML();
}


// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel()
{
    let tempLevel : number = Math.floor(playerXP / playerXPperLevel);                                                                           // Spieler-Level = XP / XPproLevel

    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")";       // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + tempLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)");        // Spieler-Level in der Konsole.
}

//# sourceMappingURL=62-TS-Example.js.map