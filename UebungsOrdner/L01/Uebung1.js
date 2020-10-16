//Berechnung mit Typ number
var v = 1;
v = v + 1;
console.log("Berechnung v + 1");
console.log(v);
// Array ohne Schlüssel 
var a = [7, true, "Hallo"];
console.log("Zugriff auf ersten Wert des Arrays: ");
console.log(a[0]);
//Array mit Schlüsselpaar
var s = { "zahl": 7, "wahr": true, text: "Hallo" };
console.log("Zugriff auf Werte via Schluessel");
console.log(s["wahr"]);
console.log(s.text);
var b = { "wert1": true, "wert2": false };
console.log("Zugriff auf den ersten Wert via Schlüssel vom Typ String: ");
console.log(b["wert1"]);
var vector = { x: 12.4, y: -7.2, meaning: "Ortsvektor" };
console.log(vector["x"]);
//Primitive Datentypen
var v1 = 1;
var v2 = v1;
v1 = 5;
console.log("Variablenausgabe Primitiver Datentypen:");
console.log("Variable 1: " + v1 + " Variable 2: " + v2);
//Komplexe Datentypen
var v3 = [7, true, "Hallo"];
var v4 = v3;
v3[0] = 5;
console.log("Variablenausgabe komplexer Datentypen:");
console.log("Variable 3: " + v3 + " Variable 4: " + v4);
//Array aus Kuhlauten 
var zahlen = [2, 6, 5];
var kuehe = [];
for (var i = 0; i < zahlen.length; i++) {
    var kuh = getKuh("m", zahlen[i]);
    kuehe.push(kuh);
}
console.log("Array aus Kuhlauten: ");
console.log(kuehe);
function getKuh(start, zahl) {
    for (var k = zahl; k > 0; k--) {
        if (k == 1 || k == zahl / 2) {
            start += "h";
        }
        start += "u";
    }
    return start;
}
