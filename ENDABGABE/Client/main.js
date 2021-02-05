var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    window.addEventListener("load", handleLoad);
    let rockets = [];
    let number = 1;
    let url = "https://fireworkseditor.herokuapp.com";
    function handleLoad(_event) {
        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#showAllButton").addEventListener("click", showAllOrders);
    }
    function displayOrder() {
        let formDescription = new FormData(document.forms[0]);
        let info = "Name of your fireworks: " + formDescription.get("Name") + "<br>" + "Risks: " + formDescription.get("Risks") + "<br>" + "<br>";
        let formComponents = new FormData(document.forms[1]);
        let rocket = number + ". Rocket size: " + formComponents.get("Size") + "<br>" + "Color of the rocket: " + formComponents.get("Color") + "<br>" + "Time of the effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of the effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";
        rockets.push(rocket);
        document.querySelector("div#yourOrder").innerHTML = info;
        for (let rocket of rockets) {
            document.querySelector("div#yourOrder").innerHTML += rocket;
        }
        number++;
    }
    function resetOrder() {
        document.getElementById("formDescription").reset();
        document.getElementById("formComponents").reset();
        document.getElementById("yourOrder").innerHTML = "";
        rockets = [];
        number = 1;
    }
    function sendOrder() {
    }
    function showAllOrders() {
    }
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=main.js.map