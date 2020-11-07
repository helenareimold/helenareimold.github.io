namespace L04_Hexenkessel_No2 {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        generateContent(data);
        generatePriceContent(priceData);
        
        let showAll: HTMLElement = document.getElementById("showAll");
        let addNew: HTMLElement = document.getElementById("addNew");
        document.querySelector("div#formDesc").addEventListener("change", addDescription);
        document.querySelector("div#ingredients").addEventListener("change", addIngredients);
        document.querySelector("div#instructions").addEventListener("change", addInstruction);
        document.querySelector("div#secInstructions").addEventListener("change", addSecInstruction);
        document.querySelector("div#amount").addEventListener("change", addIngredients);

        showAll.addEventListener("click", showRecipe);
        addNew.addEventListener("click", addRecipe);


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
    }

    function showRecipe(): void {
        let recipe: HTMLDivElement = <HTMLDivElement>document.getElementById("recipe");
        let showDesc: HTMLDivElement = <HTMLDivElement>document.getElementById("showDesc");
        let displayPrice: HTMLDivElement = <HTMLDivElement>document.getElementById("displayPrice");
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
            return sickel.toFixed() + " Sickel," + knut.toFixed() + " Knut";
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
