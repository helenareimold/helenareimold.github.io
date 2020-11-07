var L04_Hexenkessel_No2;
(function (L04_Hexenkessel_No2) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let showAll = document.getElementById("showAll");
        let addNew = document.getElementById("addNew");
        document.querySelector("div#formDesc").addEventListener("change", addDescription);
        document.querySelector("div#ingredients").addEventListener("change", addIngredients);
        document.querySelector("div#instructions").addEventListener("change", addInstruction);
        document.querySelector("div#secInstructions").addEventListener("change", addSecInstruction);
        document.querySelector("div#amount").addEventListener("change", addIngredients);
        showAll.addEventListener("click", showRecipe);
        addNew.addEventListener("click", addRecipe);
        L04_Hexenkessel_No2.generateContent(L04_Hexenkessel_No2.data);
        L04_Hexenkessel_No2.generatePriceContent(L04_Hexenkessel_No2.priceData);
    }
    function addIngredients() {
        if (L04_Hexenkessel_No2.check.some(elem => elem === 1)) { }
        else {
            L04_Hexenkessel_No2.check.push(1);
        }
        let formIngr = new FormData(document.forms[1]);
        let formAmount = new FormData(document.forms[2]);
        for (let entry of formIngr) {
            if (document.getElementById(String(entry[1])).checked) {
                L04_Hexenkessel_No2.ingredients = "add " + formAmount.get("Amount") + " " + entry[1] + "<br>";
            }
        }
    }
    function addDescription() {
        let formDesc = new FormData(document.forms[0]);
        L04_Hexenkessel_No2.description = "";
        for (let entry of formDesc) {
            L04_Hexenkessel_No2.description += entry[0] + " : " + entry[1] + "<br>";
        }
    }
    function addInstruction() {
        if (L04_Hexenkessel_No2.check.some(elem => elem === 2)) { }
        else {
            L04_Hexenkessel_No2.check.push(2);
        }
        let formInstr = new FormData(document.forms[3]);
        L04_Hexenkessel_No2.instructions = "heat up to " + formInstr.get("Temperature") + " C° for " + formInstr.get("Duration") + " min " + "<br>";
    }
    function addSecInstruction() {
        if (L04_Hexenkessel_No2.check.some(elem => elem === 3)) { }
        else {
            L04_Hexenkessel_No2.check.push(3);
        }
        let formInstr = new FormData(document.forms[4]);
        L04_Hexenkessel_No2.secInstruction = "stir " + formInstr.get("Intensity") + " until consistence is " + formInstr.get("Texture") + " and color is " + formInstr.get("Color") + "<br>";
    }
    function getPriceAmount() {
        let extras = document.querySelectorAll(".ingredients");
        let amount = document.querySelectorAll(".amount");
        for (let i = 0; i < extras.length; i++) {
            if (extras[i].checked) {
                L04_Hexenkessel_No2.price.push(Number(extras[i].getAttribute("price")));
                L04_Hexenkessel_No2.amounts.push(Number(amount[0].value));
            }
        }
    }
    function addRecipe(_event) {
        for (let i = 0; i < L04_Hexenkessel_No2.check.length; i++) {
            switch (L04_Hexenkessel_No2.check[i]) {
                case 1:
                    L04_Hexenkessel_No2.addRec += L04_Hexenkessel_No2.ingredients;
                    getPriceAmount();
                    break;
                case 2:
                    L04_Hexenkessel_No2.addRec += L04_Hexenkessel_No2.instructions;
                    break;
                case 3:
                    L04_Hexenkessel_No2.addRec += L04_Hexenkessel_No2.secInstruction;
                    break;
                default:
                    break;
            }
        }
        L04_Hexenkessel_No2.check.splice(0, L04_Hexenkessel_No2.check.length);
    }
    function showRecipe(_event) {
        let recipe = document.getElementById("recipe");
        let showDesc = document.getElementById("showDesc");
        let displayPrice = document.getElementById("displayPrice");
        showDesc.innerHTML = L04_Hexenkessel_No2.description;
        recipe.innerHTML = L04_Hexenkessel_No2.addRec;
        displayPrice.innerHTML = "<br>" + "<br>" + "Total: " + calculatePrice(L04_Hexenkessel_No2.price, L04_Hexenkessel_No2.amounts);
    }
    function calculatePrice(_price, _amount) {
        let totalPrice = 0;
        for (let i = 0; i < _price.length; i++) {
            totalPrice += _price[i] * _amount[i];
        }
        if (totalPrice < 29) {
            return totalPrice + " Knut";
        }
        else if (totalPrice < 493) {
            let sickel = totalPrice / 29;
            let knut = totalPrice % 29;
            return sickel.toFixed() + " Sickel," + knut.toFixed() + " Knut";
        }
        else {
            let galleone = totalPrice / 493;
            let rest = totalPrice % 493;
            let sickel = rest / 29;
            let knut = sickel % 29;
            return galleone.toFixed() + " Galleonen, " + sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";
        }
    }
})(L04_Hexenkessel_No2 || (L04_Hexenkessel_No2 = {}));
//# sourceMappingURL=hexenkessel2.js.map