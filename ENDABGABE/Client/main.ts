namespace Endabgabe_EIA2 {
    window.addEventListener("load", handleLoad);

    let url: string = "https://fireworkseditor.herokuapp.com";
    let buttonClicked: number = 0;
    let rockets: any;
    let currentRocket: string;
    export let crc2: CanvasRenderingContext2D;
    export let imageData: ImageData;
    let lightRay: LightRay;
    let moveables: Moveable[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        document.querySelector("#displayButton").addEventListener("click", displayRocket);
        document.querySelector("#updateButton").addEventListener("click", updateRocket);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showSavedRockets);
        document.querySelector("canvas").addEventListener("click", handleAnimate);

        moveables.push(new Background());
        moveables.push(new Star({ x: crc2.canvas.width / 2, y: crc2.canvas.height / 2 }, { x: crc2.canvas.width, y: crc2.canvas.height }));
        moveables.push(new Moon({ x: 100, y: 100 }))
        for (let moveable of moveables) {
            moveable.draw();
        }
        imageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    // TEIL 1: CLIENT SEITE


    function displayRocket(): void {
        let formComponents: FormData = new FormData(document.forms[0]);                         //Daten aus Formular holen
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Thickness of light rays: " + formComponents.get("Thickness") + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Duration of effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of explosion: " + formComponents.get("Radius") + "cm"; //Schlüssel und Wert jeweils in rocket speichern

        document.querySelector("div#yourOrder").innerHTML = rocket;                             //Inhalt von yourOrder div = rocket mit Formular Daten
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>newData);                         //umformatieren um url mitgeben zu können
        let response: Response = await fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }

    function resetOrder(): void {
        document.forms[0].reset();                                                              //Formular Daten zurücksetzen
        document.getElementById("yourOrder").innerHTML = "";                                    //Inhalt im div leeren
    }

    async function saveRocket(): Promise<void> {
        console.log("Save rocket");
        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let query: URLSearchParams = new URLSearchParams(<any>form);
        let response: Response = await fetch(url + "?" + query.toString());                      //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
        let responseText: string = await response.text();                                        //Daten in Textform in responseText speichern und ausgeben lassen

        alert(responseText);
    }

    async function deleteRocket(): Promise<void> {
        console.log("delete rocket");
        let response: Response = await fetch(url + "?" + "command=delete&rocket=" + currentRocket);       //Abfrage über url --> hier: löschen über command "delete"
        let text: string = await response.text();
        alert(text);                                                                                     //rocket deleted!
        document.querySelector("div#yourOrder").innerHTML = "";
    }

    function showSavedRockets(): void {
        let parent: HTMLElement = document.querySelector("div#dropupContent");

        if (buttonClicked % 2 == 0) {                                                                    //button geklickt = gerade Zahl (auf)
            getSavedRocketsFromDb();
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

    async function getSavedRocketsFromDb(): Promise<void> {
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
        currentRocket = (<HTMLElement>_event.target).innerHTML;                                          //currentRocket entspricht Rakete die angezeigt werden soll
        let parent: HTMLElement = document.querySelector("div#dropupContent");                           //Wenn Rakete ausgewählt, dann soll Dropup-Feld wieder runterfahren 
        parent.style.display = "none";

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        for (let rocket of rockets) {                                                                   //Durchlauf jeder Rakete in Collection rockets
            if (rocket["Name"] == currentRocket) {                                                      //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?
                document.querySelector("div#yourOrder").innerHTML = "Name: " + rocket["Name"] + "<br>" + "Risks:  " + rocket["Risks"] + "<br>" + "Thickness of light rays: " + rocket["Thickness"] + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Duration of effect: " + rocket["Duration"] + "s" + "<br>" + "Radius of explosion: " + rocket["Radius"] + "cm";    //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }

        buttonClicked++;
    }

    function fillInputFields(rocket: any): void {
        (<HTMLInputElement>document.querySelector("input#name")).value = rocket["Name"];
        (<HTMLTextAreaElement>document.querySelector("textarea#risks")).innerText = rocket["Risks"];
        (<HTMLInputElement>document.querySelector("input#color")).value = rocket["Color"];
        (<HTMLInputElement>document.querySelector("input#duration")).value = rocket["Duration"];
        (<HTMLInputElement>document.querySelector("input#radius")).value = rocket["Radius"];
        switch (rocket["Thickness"]) {
            case "small":
                (<HTMLInputElement>document.querySelector("input#small")).checked = true;
                break;
            case "middle":
                (<HTMLInputElement>document.querySelector("input#middle")).checked = true;
                break;
            case "big":
                (<HTMLInputElement>document.querySelector("input#big")).checked = true;
                break;
        }
    }



    // TEIL 2: CANVAS

    function handleAnimate(_event: MouseEvent): void {
        let cursorX: number = _event.pageX - document.querySelector("canvas").offsetLeft;        //Position Maus X-Achse
        let cursorY: number = _event.pageY - document.querySelector("canvas").offsetTop;         //Position Maus Y-Achse

        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let thickness: string = <string>form.get("Thickness");
        let color: string = <string>form.get("Color");
        let duration: number = Number(form.get("Duration")) * 1000;
        let radius: number = 0;                                                                     // 1000 = 1 sec
        let radiusEnde: number = Number(form.get("Radius")) * 10;                                   //1mm * 10 = 1cm
        lightRay = new LightRay({ x: cursorX, y: cursorY }, thickness, color, duration, radius, radiusEnde);
        lightRay.animate();
    }
}

