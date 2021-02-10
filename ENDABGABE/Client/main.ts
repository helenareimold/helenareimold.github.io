namespace Endabgabe_EIA2 {

    window.addEventListener("load", handleLoad);

    let url: string = "https://fireworkseditor.herokuapp.com";
    let buttonClicked: number = 0;
    let rockets: any;
    let currentRocket: string;
    let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        document.querySelector("#displayButton").addEventListener("click", displayRocket);
        document.querySelector("#updateButton").addEventListener("click", updateRocket);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showAllRockets);
        document.querySelector("canvas").addEventListener("click", handleAnimate);

        bannerText();

    }

    function displayRocket(): void {
        let formComponents: FormData = new FormData(document.forms[0]);                         //Daten aus Formular holen
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Rocket size: " + formComponents.get("Size") + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Duration of effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of explosion: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>"; //Schlüssel und Wert jeweils in rocket speichern

        document.querySelector("div#yourOrder").innerHTML = rocket;                             //Inhalt von yourOrder div = rocket mit Formular Daten
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>newData);
        let response: Response = await fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);        
    }

    function resetOrder(): void {
        document.forms[0].reset();                                                              //Formular Daten zurücksetzen
        document.getElementById("yourOrder").innerHTML = "";                                    //Inhalt im div leeren
    }

    async function saveRocket(_event: Event): Promise<void> {
        console.log("Send rocket");
        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let query: URLSearchParams = new URLSearchParams(<any>form);                             //In Variable query speichern, vom Objekt URLSearchParams               
        let response: Response = await fetch(url + "?" + query.toString());                      //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
        let responseText: string = await response.text();                                        //Daten in Textform in responseText speichern und ausgeben lassen

        alert(responseText);
    }

    async function getRocketsFromDatabase(): Promise<void> {
        let response: Response = await fetch(url + "?" + "command=retrieve");                    //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
        rockets = await response.json();

        for (let rocket of rockets) {                                                                   //Durchlauf jeder Rakete in Collection rockets
            let rocketName: HTMLElement = document.createElement("a");                                  //Element a wird erstellt --> in rocketName gespeichert
            rocketName.innerHTML = rocket["Name"];                                                      //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
            (<HTMLElement>document.querySelector("div#dropupContent")).appendChild(rocketName);         //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
            rocketName.addEventListener("click", chooseRocket);                                         //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
        }
    }

    function chooseRocket(_event: Event): void {
        currentRocket = (<HTMLElement>_event.target).innerHTML;                                         //currentRocket entspricht Rakete die angezeigt werden soll
        for (let rocket of rockets) {                                                                   //Durchlauf jeder Rakete in Collection rockets
            if (rocket["Name"] == currentRocket) {                                                      //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?
                document.querySelector("div#yourOrder").innerHTML = "Name: " + rocket["Name"] + "<br>" + "Risks:  " + rocket["Risks"] + "<br>" + "Rocket size: " + rocket["Size"] + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Duration of effect: " + rocket["Duration"] + "s" + "<br>" + "Radius of explosion: " + rocket["Radius"] + "cm" + "<br>" + "Amount of particles: " + rocket["Amount"];    //ja: Schlüssel-Werte-Paare werden wieder in yourorder div gepusht
            }
        }
    }

    async function deleteRocket(): Promise<void> {
        console.log(currentRocket);
        let response: Response = await fetch(url + "?" + "command=delete&rocket=" + currentRocket);       //Abfrage über url --> hier: löschen über command "delete"
        let text: string = await response.text();
        alert(text);                                                                                     //rocket deleted!
        document.querySelector("div#yourOrder").innerHTML = "";
    }

    function showAllRockets(): void {
        let parent: HTMLElement = document.querySelector("div#dropupContent");

        if (buttonClicked % 2 == 0) {                                                                    //button geklickt = gerade Zahl (auf)
            getRocketsFromDatabase();
            parent.style.display = "block";
        }
        else {                                                                                           //button nochmal geklickt = ungerade (zu)
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        buttonClicked++;
    }

    function bannerText(): void {
        crc2.font = "1em Nunito";
        crc2.fillStyle = "white";
        crc2.textAlign = "center";
        crc2.fillText("Try out your firework below", 205, 30);
    }

    function drawLightRays(x: number, y: number, radius: number, color: string) {

        for (let grade: number = -1; grade <= 1; grade = grade + 0.2) {

            let theta: number = grade * Math.PI;
            crc2.moveTo(x, y);
            crc2.lineTo(x + radius * Math.cos(theta), y + radius * Math.sin(theta));

            crc2.strokeStyle = color;
            crc2.stroke();

            //Nach der letzten Schleife Leinwand leeren
            if (radius == 50) {
                crc2.clearRect(0, 0, 421, 503);
            }

            crc2.beginPath();
        }
    }

    function handleAnimate(_event: MouseEvent): void {
        let cursorX: number = _event.pageX - document.querySelector("canvas").offsetLeft;
        let cursorY: number = _event.pageY - document.querySelector("canvas").offsetTop;

        console.log(cursorX, cursorY);
        animateLightRays(cursorX, cursorY, 10, "orange");
    }

    function animateLightRays(x: number, y: number, radius: number, color: string): void {
        function fireworkLoop() {
            setTimeout(function () {

                drawLightRays(x, y, radius, color);
                radius = radius + 10;
                if (radius <= 50) {
                    fireworkLoop();
                }

            }, 200)
        }

        fireworkLoop();
    }
}
