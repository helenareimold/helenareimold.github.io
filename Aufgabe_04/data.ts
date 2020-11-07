namespace L04_Hexenkessel_No2 {

    export interface Item {
        name: string;
    }
    export interface priceItem {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }
    export interface PriceData {
        [category: string]: priceItem[];
    }

    export let data: Data = {
        Potion: [
            { name: "Name" }
        ],
        Explanation: [
            { name: "Explanation" }
        ],
        Effect: [
            { name: "love" },
            { name: "power" },
            { name: "invisible" },
            { name: "EIA-pro" }
        ],
        Amount: [
            { name: "amount" },
        ],
        Intensity: [
            { name: "low" },
            { name: "middle" },
            { name: "hard" }
        ],
        Texture: [
            { name: "tough" },
            { name: "liquid" },
            { name: "slimy" }
        ],
        Color: [
            { name: "#458B74" }
        ]
    };

    export let priceData: PriceData = {
        Extras: [
            { name: "spider-leg/s", price: 100.00 },
            { name: "blood (ml)", price: 300.00 },
            { name: "fingernail/s", price: 12.00 },
        ],
    }
    export let ingredients: string = "";
    export let description: string = "";
    export let instructions: string = "";
    export let secInstruction: string = "";
    export let displayPrice:string = "";
    export let addRec: string = "";
    export let check: number[] = [];

    export let price: number[] = [];
    export let amounts: number[] = [];
}