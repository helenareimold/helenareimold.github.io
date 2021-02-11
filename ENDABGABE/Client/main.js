var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    window.addEventListener("load", handleLoad);
    let url = "https://fireworkseditor.herokuapp.com";
    let buttonClicked = 0;
    let rockets;
    let currentRocket;
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        document.querySelector("#displayButton").addEventListener("click", displayRocket);
        document.querySelector("#updateButton").addEventListener("click", updateRocket);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showSavedRockets);
        document.querySelector("canvas").addEventListener("click", handleAnimate);
        bannerText();
    }
    // TEIL 1: CLIENT SEITE
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]); //Daten aus Formular holen
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Size of light rays: " + formComponents.get("Size") + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Duration of effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of explosion: " + formComponents.get("Radius") + "cm"; //Schlüssel und Wert jeweils in rocket speichern
        document.querySelector("div#yourOrder").innerHTML = rocket; //Inhalt von yourOrder div = rocket mit Formular Daten
    }
    function updateRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = new FormData(document.forms[0]);
            let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
            let response = yield fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function resetOrder() {
        document.forms[0].reset(); //Formular Daten zurücksetzen
        document.getElementById("yourOrder").innerHTML = ""; //Inhalt im div leeren
    }
    function saveRocket(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Save rocket");
            let form = new FormData(document.forms[0]); //Daten aus Form holen
            let query = new URLSearchParams(form);
            let response = yield fetch(url + "?" + query.toString()); //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
            let responseText = yield response.text(); //Daten in Textform in responseText speichern und ausgeben lassen
            alert(responseText);
        });
    }
    function getSavedRocketsFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url + "?" + "command=retrieve"); //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
            rockets = yield response.json();
            for (let rocket of rockets) { //Durchlauf jeder Rakete in Collection rockets
                let rocketName = document.createElement("a"); //Element a wird erstellt --> in rocketName gespeichert
                rocketName.innerHTML = rocket["Name"]; //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
                document.querySelector("div#dropupContent").appendChild(rocketName); //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
                rocketName.addEventListener("click", chooseRocket); //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
            }
        });
    }
    function chooseRocket(_event) {
        currentRocket = _event.target.innerHTML; //currentRocket entspricht Rakete die angezeigt werden soll
        let parent = document.querySelector("div#dropupContent");
        parent.style.display = "none";
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        for (let rocket of rockets) { //Durchlauf jeder Rakete in Collection rockets
            if (rocket["Name"] == currentRocket) { //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?
                document.querySelector("div#yourOrder").innerHTML = "Name: " + rocket["Name"] + "<br>" + "Risks:  " + rocket["Risks"] + "<br>" + "Size of light rays: " + rocket["Size"] + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Duration of effect: " + rocket["Duration"] + "s" + "<br>" + "Radius of explosion: " + rocket["Radius"] + "cm"; //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }
        buttonClicked++;
    }
    function fillInputFields(rocket) {
        document.querySelector("input#name").value = rocket["Name"];
        document.querySelector("textarea#risks").innerText = rocket["Risks"];
        document.querySelector("input#color").value = rocket["Color"];
        document.querySelector("input#duration").value = rocket["Duration"];
        document.querySelector("input#radius").value = rocket["Radius"];
        switch (rocket["Size"]) {
            case "small":
                document.querySelector("input#small").checked = true;
                break;
            case "middle":
                document.querySelector("input#middle").checked = true;
                break;
            case "big":
                document.querySelector("input#big").checked = true;
                break;
        }
    }
    function deleteRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(currentRocket);
            let response = yield fetch(url + "?" + "command=delete&rocket=" + currentRocket); //Abfrage über url --> hier: löschen über command "delete"
            let text = yield response.text();
            alert(text); //rocket deleted!
            document.querySelector("div#yourOrder").innerHTML = "";
        });
    }
    function showSavedRockets() {
        let parent = document.querySelector("div#dropupContent");
        if (buttonClicked % 2 == 0) { //button geklickt = gerade Zahl (auf)
            getSavedRocketsFromDb();
            parent.style.display = "block";
        }
        else { //button nochmal geklickt = ungerade (zu)
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        buttonClicked++;
    }
    // TEIL 2: CANVAS
    function bannerText() {
        crc2.font = "1em Nunito";
        crc2.fillStyle = "white";
        crc2.textAlign = "center";
        crc2.fillText("Try out your firework below", 205, 30);
    }
    function drawLightRays(x, y, color, radius, radiusEnde) {
        for (let grade = -1; grade <= 1; grade = grade + 0.2) {
            let jump = grade * Math.PI;
            crc2.moveTo(x, y);
            crc2.lineTo(x + radius * Math.cos(jump), y + radius * Math.sin(jump));
            crc2.strokeStyle = color;
            crc2.stroke();
            if (radius >= radiusEnde) {
                crc2.clearRect(0, 0, 421, 503); //Nach der letzten Schleife Leinwand leeren
            }
            crc2.beginPath();
        }
    }
    function handleAnimate(_event) {
        let cursorX = _event.pageX - document.querySelector("canvas").offsetLeft; //Position Maus X-Achse
        let cursorY = _event.pageY - document.querySelector("canvas").offsetTop; //Position Maus Y-Achse
        let form = new FormData(document.forms[0]); //Daten aus Form holen
        let color = form.get("Color");
        let duration = Number(form.get("Duration")) * 1000; //1 Mili sec. * 1000 = 1 sec
        let radiusEnde = Number(form.get("Radius")) * 10; //1mm * 10 = 1cm
        animateLightRays(cursorX, cursorY, color, duration, 0, radiusEnde);
    }
    function animateLightRays(x, y, color, duration, radius, radiusEnde) {
        function oneLoop() {
            setTimeout(function () {
                drawLightRays(x, y, color, radius, radiusEnde);
                radius++;
                if (radius <= radiusEnde) {
                    oneLoop();
                }
            }, duration / radiusEnde);
        }
        oneLoop();
    }
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=main.js.map