//Berechnung mit Typ number
let v :number= 1;
v = v + 1;
console.log("Berechnung v + 1");
console.log(v);

// Array ohne Schlüssel 
let a = [7, true,"Hallo"];
console.log("Zugriff auf ersten Wert des Arrays: ");
console.log(a[0]);

 //Array mit Schlüsselpaar
let s = {"zahl": 7, "wahr": true, text: "Hallo"};
    console.log("Zugriff auf Werte via Schluessel");
    console.log(s["wahr"]);
    console.log (s.text);

//Array Mit typisierten Schlüsselpaar
    interface MapStringToBoolean {
        [key: string]: boolean;
    }
    let b: MapStringToBoolean = {"wert1": true, "wert2": false};
    console.log("Zugriff auf den ersten Wert via Schlüssel vom Typ String: ")
    console.log(b["wert1"]);

//Array mit vordefinierten, typisierten Schlüssel
    interface VectorWithMeaning {
        x: number;
        y: number;
        meaning: string;
    }
    let vector: VectorWithMeaning = {x: 12.4, y: -7.2, meaning: "Ortsvektor"};
    console.log(vector["x"]);


//Primitive Datentypen
    let v1 = 1;
    let v2 = v1;
    v1 = 5;
    console.log("Variablenausgabe Primitiver Datentypen:");
    console.log("Variable 1: "+v1 +" Variable 2: "+v2);
    

//Komplexe Datentypen
    let v3 = [7, true,"Hallo"];
    let v4 = v3;
    v3[0] = 5;
    console.log("Variablenausgabe komplexer Datentypen:");
    console.log("Variable 3: "+v3 +" Variable 4: "+v4);

//Array aus Kuhlauten 

let zahlen:number[] = [2,6,5];
let kuehe:string[] = [];

for(let i :number = 0; i<zahlen.length;i++){
    let kuh  = getKuh("m",zahlen[i]);
    kuehe.push(kuh);
}

console.log("Array aus Kuhlauten: ")
console.log(kuehe);

function getKuh(start:string, zahl:number):string{
    for(let k:number = zahl;k>0;k--){
        if(k == 1 || k == zahl/2 ){
            start+= "h";
        }
        start += "u";
    }

    return start;
}



