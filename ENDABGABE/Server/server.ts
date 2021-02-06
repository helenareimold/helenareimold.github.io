import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ENDABGABE_EIA2 {

    interface Rocket {
        [type: string]: string | string[];
    }

    let rocket: Mongo.Collection;
    let databaseUrl: string = "mongodb+srv://helenareimold:hallo1234@cluster1.dyyg0.mongodb.net/FireworksEditor?retryWrites=true&w=majority";
    startServer();
    connectToDatabase(databaseUrl);

    function startServer(): void {
        console.log("start server");
        let server: Http.Server = Http.createServer();

        let port: number | string | undefined = process.env.PORT;
        if (port == undefined)
            port = 5001;

        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);

    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeRocket(url.query);
        }

        _response.end();
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocket = mongoClient.db("FireworksEditor").collection("Rockets");
        console.log("database connected: " + rocket);
    }

    function storeRocket(data: Rocket):void{
        rocket.insertOne(data);
    }

}
