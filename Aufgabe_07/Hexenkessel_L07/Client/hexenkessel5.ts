namespace L07_Hexenkessel_No5 {

    let ingredients: string = "";
    let description: string = "";
    let instructions: string = "";
    let secInstruction: string = "";
    let addRec: string = "";
    let check: number[] = [];
    let price: number[] = [];
    let amounts: number[] = [];

    window.addEventListener("load", handleLoad);

    let url: string = "https://potioneditor.herokuapp.com";

    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);

        let secResponse: Response = await fetch("priceData.json");
        let secOffer: string = await secResponse.text();
        let priceData: PriceData = JSON.parse(secOffer);

        generateContent(data);
        generatePriceContent(priceData);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        console.log(submit);

        let showAll: HTMLElement = document.getElementById("showAll");
        document.querySelector("div#formDesc").addEventListener("change", addDescription);
        document.querySelector("div#ingredients").addEventListener("change", addIngredients);
        document.querySelector("div#instructions").addEventListener("change", addInstruction);
        document.querySelector("div#secInstructions").addEventListener("change", addSecInstruction);
        document.querySelector("div#amount").addEventListener("change", addIngredients);
        document.getElementById("resetOrder").addEventListener("click", resetRecipe);
        showAll.addEventListener("click", addRecipe);
        submit.addEventListener("click", sendOrder);

    }

    function resetRecipe(): void {
        (<HTMLFormElement>document.getElementById("basics")).reset();
        (<HTMLFormElement>document.getElementById("formExtras")).reset();
        (<HTMLFormElement>document.getElementById("formAmount")).reset();
        (<HTMLFormElement>document.getElementById("formInstructions")).reset();
        (<HTMLFormElement>document.getElementById("formSecInstructions")).reset();

        document.getElementById("recipe").innerHTML = "";
        document.getElementById("showDesc").innerHTML = "";
        document.getElementById("displayPrice").innerHTML = "";

    }

    async function sendOrder(_event: Event): Promise<void> {
        console.log("Send order");
        let form: FormData = new FormData(document.forms[0]);

        let query: URLSearchParams = new URLSearchParams(<any>form);
        let record = addRec.split("<br>").join("->").split("#").join("%23");
        let response: Response = await fetch(url + "?" + query.toString() + "&" + "instructions=" + record + "&" + "total=" + calculatePrice(price, amounts));
        let responseText: string = await response.text();

        alert(responseText);
    }


    function addIngredients(): void {

        if (check.some(elem => elem === 1)) { }
        else {
            check.push(1);
        }
        let formIngr: FormData = new FormData(document.forms[1]);
        let formAmount: FormData = new FormData(document.forms[2]);
        for (let entry of formIngr) {
            if ((<HTMLInputElement>document.getElementById(String(entry[1]))).checked) {
                ingredients = "add " + formAmount.get("Amount") + " " + entry[1] + "<br>";
            }

        }
    }
    function addDescription(): void {
        let formDesc: FormData = new FormData(document.forms[0]);
        description = "";
        for (let entry of formDesc) {
            description += entry[0] + " : " + entry[1] + "<br>";
        }
    }
    function addInstruction(): void {

        if (check.some(elem => elem === 2)) { }
        else {
            check.push(2);
        }
        let formInstr: FormData = new FormData(document.forms[3]);
        instructions = "heat up to " + formInstr.get("Temperature") + " C° for " + formInstr.get("Duration") + " min " + "<br>";

    }
    function addSecInstruction(): void {
        if (check.some(elem => elem === 3)) { }
        else {
            check.push(3);
        }
        let formInstr: FormData = new FormData(document.forms[4]);
        secInstruction = "stir " + formInstr.get("Intensity") + " until consistence is " + formInstr.get("Texture") + " and color is " + formInstr.get("Color") + "<br>";
    }
    function getPriceAmount(): void {
        let extras: NodeListOf<HTMLInputElement> = document.querySelectorAll(".ingredients");
        let amount: NodeListOf<HTMLInputElement> = document.querySelectorAll(".amount");
        for (let i: number = 0; i < extras.length; i++) {
            if (extras[i].checked) {
                price.push(Number(extras[i].getAttribute("price")));
                amounts.push(Number(amount[0].value));
            }
        }
    }


    function addRecipe(): void {
        let recipe: HTMLDivElement = <HTMLDivElement>document.getElementById("recipe");
        let showDesc: HTMLDivElement = <HTMLDivElement>document.getElementById("showDesc");
        let displayPrice: HTMLDivElement = <HTMLDivElement>document.getElementById("displayPrice");
        for (let i: number = 0; i < check.length; i++) {
            switch (check[i]) {
                case 1:
                    addRec += ingredients;
                    getPriceAmount();
                    break;
                case 2:
                    addRec += instructions;
                    break;
                case 3:
                    addRec += secInstruction;
                    break;

                default:
                    break;
            }
        }
        check.splice(0, check.length);

        showDesc.innerHTML = description;
        recipe.innerHTML = addRec;
        displayPrice.innerHTML = "<br>" + "<br>" + "Total: " + calculatePrice(price, amounts);
    }


    function calculatePrice(_price: number[], _amount: number[]): string {
        let totalPrice: number = 0;
        for (let i: number = 0; i < _price.length; i++) {
            totalPrice += _price[i] * _amount[i];

        }

        if (totalPrice < 29) {
            return totalPrice + " Knut";
        }
        else if (totalPrice < 493) {
            let sickel: number = totalPrice / 29;
            let knut: number = totalPrice % 29;
            return sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";
        }
        else {
            let galleone: number = totalPrice / 493;
            let rest: number = totalPrice % 493;
            let sickel: number = rest / 29;
            let knut: number = sickel % 29;
            return galleone.toFixed() + " Galleonen, " + sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";

        }


    }

}
