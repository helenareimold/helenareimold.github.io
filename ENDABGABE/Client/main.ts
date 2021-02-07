namespace Endabgabe_EIA2 {

    window.addEventListener("load", handleLoad);

    let url: string = "https://fireworkseditor.herokuapp.com";
    let buttonClicked: number = 0;
    let rockets: any;
    let currentRocket: string;

    function handleLoad(_event: Event): void {

        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showAllRockets);
    }

    function displayOrder(): void {


        let formComponents: FormData = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Rocket size: " + formComponents.get("Size") + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Duration of effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";

        document.querySelector("div#yourOrder").innerHTML = rocket;
    }


    function resetOrder(): void {

        document.forms[0].reset();

        document.getElementById("yourOrder").innerHTML = "";

    }

    async function sendOrder(_event: Event): Promise<void> {
        console.log("Send order");
        let form: FormData = new FormData(document.forms[0]);

        let query: URLSearchParams = new URLSearchParams(<any>form);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();

        alert(responseText);
    }


    function showAllRockets(): void {

        let parent: HTMLElement = document.querySelector("div#dropupContent");

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

    async function getRocketsFromDatabase(): Promise<void> {
        let response: Response = await fetch(url + "?" + "command=retrieve");
        rockets = await response.json();

        for (let rocket of rockets) {
            let rocketName: HTMLElement = document.createElement("a");
            rocketName.innerHTML = rocket["Name"];
            (<HTMLElement>document.querySelector("div#dropupContent")).appendChild(rocketName);
            rocketName.addEventListener("click", chooseRocket);
        }

    }

    function chooseRocket(_event: Event): void {
        currentRocket = (<HTMLElement>_event.target).innerHTML;
        for (let rocket of rockets) {
            if (rocket["Name"] == currentRocket) {
                document.querySelector("div#yourOrder").innerHTML = "Name: " + rocket["Name"] + "<br>" + "Risks:  " + rocket["Risks"] + "<br>" + "Rocket size: " + rocket["Size"] + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Duration of effect: " + rocket["Duration"] + "s" + "<br>" + "Radius of effect: " + rocket["Radius"] + "cm" + "<br>" + "Amount of particles: " + rocket["Amount"];
            }

        }
    }

    async function deleteRocket(): Promise<void> {
        console.log(currentRocket);
        let respone: Response = await fetch(url + "?" + "command=delete&rocket=" + currentRocket);
        let text: string = await respone.text();
        alert(text);
    }
}











