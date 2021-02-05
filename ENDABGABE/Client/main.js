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
    function handleLoad(_event) {
        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#showAllButton").addEventListener("click", showAllOrders);
    }
    function displayOrder() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Rocket size: " + formComponents.get("Size") + "<br>" + "Color of the rocket: " + formComponents.get("Color") + "<br>" + "Time of the effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of the effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";
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
            // let record = addRec.split("<br>").join("->").split("#").join("%23");
            let response = yield fetch(url + "?" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function showAllOrders() {
    }
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=main.js.map