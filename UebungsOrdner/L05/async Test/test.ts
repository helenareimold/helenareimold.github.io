async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let secResponse:string = await response.text();
    console.log(secResponse);
}

console.log("Start");
communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");

console.log("End");