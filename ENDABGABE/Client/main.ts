namespace Endabgabe_EIA2 {

    window.addEventListener("load", handleLoad);

    let rockets: string[] = [];
    let number: number = 1;

    let url: string = "https://fireworkseditor.herokuapp.com";


    function handleLoad(_event: Event): void {

        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#showAllButton").addEventListener("click", showAllOrders);
    }

    function displayOrder(): void {

        let formDescription: FormData = new FormData(document.forms[0]);
        let info: string = "Name of your fireworks: " + formDescription.get("Name") + "<br>" + "Risks: " + formDescription.get("Risks") + "<br>" + "<br>";

        let formComponents: FormData = new FormData(document.forms[1]);
        let rocket = number + ". Rocket size: " + formComponents.get("Size") + "<br>" + "Color of the rocket: " + formComponents.get("Color") + "<br>" + "Time of the effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of the effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";
        rockets.push(rocket);

        document.querySelector("div#yourOrder").innerHTML = info;

        for (let rocket of rockets) {
            document.querySelector("div#yourOrder").innerHTML += rocket;
        }

        number++;
    }


    function resetOrder(): void {
        (<HTMLFormElement>document.getElementById("formDescription")).reset();
        (<HTMLFormElement>document.getElementById("formComponents")).reset();

        document.getElementById("yourOrder").innerHTML = "";
        rockets = [];
        number = 1;
    }


    function sendOrder(): void {

    }

    function showAllOrders(): void {

    }













}