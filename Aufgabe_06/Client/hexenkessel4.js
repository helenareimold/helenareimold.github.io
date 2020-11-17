var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L06_Hexenkessel_No4;
(function (L06_Hexenkessel_No4) {
    let ingredients = "";
    let description = "";
    let instructions = "";
    let secInstruction = "";
    let addRec = "";
    let check = [];
    let price = [];
    let amounts = [];
    window.addEventListener("load", handleLoad);
    let url = "https://potioneditor.herokuapp.com";
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("data.json");
            let offer = yield response.text();
            let data = JSON.parse(offer);
            let secResponse = yield fetch("priceData.json");
            let secOffer = yield secResponse.text();
            let priceData = JSON.parse(secOffer);
            L06_Hexenkessel_No4.generateContent(data);
            L06_Hexenkessel_No4.generatePriceContent(priceData);
            let submit = document.querySelector("button[type=button]");
            console.log(submit);
            let showAll = document.getElementById("showAll");
            document.querySelector("div#formDesc").addEventListener("change", addDescription);
            document.querySelector("div#ingredients").addEventListener("change", addIngredients);
            document.querySelector("div#instructions").addEventListener("change", addInstruction);
            document.querySelector("div#secInstructions").addEventListener("change", addSecInstruction);
            document.querySelector("div#amount").addEventListener("change", addIngredients);
            document.getElementById("resetOrder").addEventListener("click", resetRecipe);
            showAll.addEventListener("click", addRecipe);
            submit.addEventListener("click", sendOrder);
        });
    }
    function resetRecipe() {
        document.getElementById("basics").reset();
        document.getElementById("formExtras").reset();
        document.getElementById("formAmount").reset();
        document.getElementById("formInstructions").reset();
        document.getElementById("formSecInstructions").reset();
        document.getElementById("recipe").innerHTML = "";
        document.getElementById("showDesc").innerHTML = "";
        document.getElementById("displayPrice").innerHTML = "";
    }
    function sendOrder(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Send order");
            let form = new FormData(document.forms[0]);
            let query = new URLSearchParams(form);
            let record = addRec.split("<br>").join("->").split("#").join("%23");
            let response = yield fetch(url + "?" + query.toString() + "&" + "instructions=" + record + "&" + "total=" + calculatePrice(price, amounts));
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function addIngredients() {
        if (check.some(elem => elem === 1)) { }
        else {
            check.push(1);
        }
        let formIngr = new FormData(document.forms[1]);
        let formAmount = new FormData(document.forms[2]);
        for (let entry of formIngr) {
            if (document.getElementById(String(entry[1])).checked) {
                ingredients = "add " + formAmount.get("Amount") + " " + entry[1] + "<br>";
            }
        }
    }
    function addDescription() {
        let formDesc = new FormData(document.forms[0]);
        description = "";
        for (let entry of formDesc) {
            description += entry[0] + " : " + entry[1] + "<br>";
        }
    }
    function addInstruction() {
        if (check.some(elem => elem === 2)) { }
        else {
            check.push(2);
        }
        let formInstr = new FormData(document.forms[3]);
        instructions = "heat up to " + formInstr.get("Temperature") + " C° for " + formInstr.get("Duration") + " min " + "<br>";
    }
    function addSecInstruction() {
        if (check.some(elem => elem === 3)) { }
        else {
            check.push(3);
        }
        let formInstr = new FormData(document.forms[4]);
        secInstruction = "stir " + formInstr.get("Intensity") + " until consistence is " + formInstr.get("Texture") + " and color is " + formInstr.get("Color") + "<br>";
    }
    function getPriceAmount() {
        let extras = document.querySelectorAll(".ingredients");
        let amount = document.querySelectorAll(".amount");
        for (let i = 0; i < extras.length; i++) {
            if (extras[i].checked) {
                price.push(Number(extras[i].getAttribute("price")));
                amounts.push(Number(amount[0].value));
            }
        }
    }
    function addRecipe() {
        let recipe = document.getElementById("recipe");
        let showDesc = document.getElementById("showDesc");
        let displayPrice = document.getElementById("displayPrice");
        for (let i = 0; i < check.length; i++) {
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
            return sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";
        }
        else {
            let galleone = totalPrice / 493;
            let rest = totalPrice % 493;
            let sickel = rest / 29;
            let knut = sickel % 29;
            return galleone.toFixed() + " Galleonen, " + sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";
        }
    }
})(L06_Hexenkessel_No4 || (L06_Hexenkessel_No4 = {}));
//# sourceMappingURL=hexenkessel4.js.map