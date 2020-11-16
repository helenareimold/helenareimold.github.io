var L06_NodeAPI;
// (function (L06_NodeAPI) {
//     console.log("Hallo");
//     let x = 0;
//     console.log(x);
//     x++;
//     console.warn(x);
//     console.log(process.env.COMPUTERNAME);
//     console.log(process.env.USERNAME);
//     console.log(process.env.PORT);
//     console.log(process.argv);
//     console.log("Hallo " + process.argv[2]);
//     process.addListener("exit", handleExit);
//     setTimeout(handleTimeout, 2000);
//  timout handler expects no parameter
//     function handleTimeout() {
//         console.log("Timeout");
//     }
//     exit handler expects a number as parameter
//     function handleExit(_code) {
//         console.log("Tschüss!");
//     }
// Basis 10 Zahlensystem (Dezimal)
let number = parseInt(process.argv[2], Number(process.argv[3]));
// Basis 16 Zahlensystem (Hexadezimal)
let hexadezimal = number.toString(Number(process.argv[4]));
let binär = number.toString(2);
console.log(hexadezimal);
// console.log(binär);
//# sourceMappingURL=Convert.js.map