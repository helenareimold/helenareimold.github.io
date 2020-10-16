document.getElementById("button1").onclick = function gebeHallo() {
    document.getElementById("button1").innerHTML = "Hallo";
};
document.getElementById("button2").onclick = function setzeUeberschrift() {
    document.getElementById("ueberschrift").innerHTML = "Hallo";
};
var button3 = document.getElementById("button3");
button3.onclick = function wegUeberschrift() {
    document.getElementById("ueberschrift").innerHTML = "";
};
