import * as Http from "http";
import * as Url from "url";

export namespace ENDABGABE_EIA2 {
    let server: Http.Server = Http.createServer();

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    console.log("Server starting on port:" + port);

    server.listen(port);
    server.addListener("request", handleRequest);


    function handleRequest(): void {


    }
}