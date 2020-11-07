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
            { name: "small" }
        ],
        Amount: [
            { name: "amount" },
        ],
        Intensity: [
            { name: "low" },
            { name: "middle" },
            { name: "high" }
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
}