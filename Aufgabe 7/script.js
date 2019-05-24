//Konsolenausgabe//
console.log("Übung1");
window.onload = function () {
    document.getElementById("Klicker1").addEventListener("click", ChangeText1);
    document.getElementById("Klicker2").addEventListener("click", ChangeText2);
    document.getElementById("Klicker3").addEventListener("click", ChangeNumbers);
    newelements();
    window.alert("Was ist denn das? Klick besser mal OK!");
    console.log("Meine Seite wird geladen");
};
//Der Button verändert sich wenn man auf ihn klickt//
function ChangeText1() {
    console.log("Klicker1 wurde geklickt");
    document.getElementById("Klicker1").innerHTML = "Oh, doch nicht!";
}
//Die Klasse eines HTML Elements verändert sich wenn man auf den Button klickt//
function ChangeText2() {
    document.getElementById("Klicker3").className = "Klasse1";
    console.log("Ein neuer Klassennamen ist entstanden");
}
//Ich erstelle HTML-Elemente mit TypeScrit//
function newelements() {
    let heading = document.createElement("h3");
    let node = document.createTextNode("TypeScript und so");
    heading.appendChild(node);
    let element = document.getElementById("die3");
    element.appendChild(heading);
    let paragraph = document.createElement("p");
    node = document.createTextNode("TypeScript kann einen Paragraphen erstellen");
    paragraph.appendChild(node);
    element = document.getElementById("die3");
    element.appendChild(paragraph);
}
//Rechner-Konsole//
function ChangeNumbers() {
    console.log("Klicker3 wurde angeklickt");
    let no1 = 1; //meine Zahlen
    let no2 = 2;
    let no3 = 3;
    let word1 = "Halli"; //String
    let word2 = "Hallo";
    no2 = 3; //Nummer 2 hatte bisher den Wert 2, erhält jetzt den neuen Wert 3
    console.log(no1 + no2);
    console.log(word1 + word2);
    console.log(no1 + word2);
}
//# sourceMappingURL=script.js.map
//# sourceMappingURL=script.js.map