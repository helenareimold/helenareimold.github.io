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
    function handleLoad(_event) {
        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showAllRockets);
    }
    function displayOrder() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Rocket size: " + formComponents.get("Size") + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Duration of effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";
        document.querySelector("div#yourOrder").innerHTML = rocket;
    }
    function resetOrder() {
        document.forms[0].reset();
        document.getElementById("yourOrder").innerHTML = "";
    }
    function sendOrder(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Send order");
            let form = new FormData(document.forms[0]);
            let query = new URLSearchParams(form);
            let response = yield fetch(url + "?" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function showAllRockets() {
        let parent = document.querySelector("div#dropupContent");
        if (buttonClicked % 2 == 0) {
            getRocketsFromDatabase();
            parent.style.display = "block";
        }
        else {
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        buttonClicked++;
    }
    function getRocketsFromDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url + "?" + "command=retrieve");
            rockets = yield response.json();
            for (let rocket of rockets) {
                let rocketName = document.createElement("a");
                rocketName.innerHTML = rocket["Name"];
                document.querySelector("div#dropupContent").appendChild(rocketName);
                rocketName.addEventListener("click", chooseRocket);
            }
        });
    }
    function chooseRocket(_event) {
        currentRocket = _event.target.innerHTML;
        for (let rocket of rockets) {
            if (rocket["Name"] == currentRocket) {
                document.querySelector("div#yourOrder").innerHTML = "Name: " + rocket["Name"] + "<br>" + "Risks:  " + rocket["Risks"] + "<br>" + "Rocket size: " + rocket["Size"] + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Duration of effect: " + rocket["Duration"] + "s" + "<br>" + "Radius of effect: " + rocket["Radius"] + "cm" + "<br>" + "Amount of particles: " + rocket["Amount"];
            }
        }
    }
    function deleteRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(currentRocket);
            yield fetch(url + "?" + "command=delete&rocket=" + currentRocket);
            alert("rocket deleted!");
        });
    }
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=main.js.map