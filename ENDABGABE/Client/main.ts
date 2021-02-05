namespace Endabgabe_EIA2 {

    window.addEventListener("load", handleLoad);

    let url: string = "https://fireworkseditor.herokuapp.com";


    function handleLoad(_event: Event): void {

        document.querySelector("#addButton").addEventListener("click", displayOrder);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#sendButton").addEventListener("click", sendOrder);
        document.querySelector("#showAllButton").addEventListener("click", showAllOrders);
    }

    function displayOrder(): void {


        let formComponents: FormData = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("Name") + "<br>" + "Risks: " + formComponents.get("Risks") + "<br>" + "Rocket size: " + formComponents.get("Size") + "<br>" + "Color of the rocket: " + formComponents.get("Color") + "<br>" + "Time of the effect: " + formComponents.get("Duration") + "s" + "<br>" + "Radius of the effect: " + formComponents.get("Radius") + "cm" + "<br>" + "Amount of particles: " + formComponents.get("Amount") + "<br>" + "<br>";


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
    
    
    function showAllOrders(): void {
        
    }
    
    
}











