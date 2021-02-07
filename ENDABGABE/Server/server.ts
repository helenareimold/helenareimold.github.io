import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ENDABGABE_EIA2 {

    interface Rocket {
        [type: string]: string | string[];
    }

    let rocket: Mongo.Collection;
    let databaseUrl: string = "mongodb+srv://helenareimold:hallo@cluster0.eivgu.mongodb.net/fireworks?retryWrites=true&w=majority"
    startServer();
    connectToDatabase(databaseUrl);

    function startServer(): void {
        console.log("start")
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

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let verify: string | string[] = url.query["command"];

        if (verify == "retrieve") {
            getRocketName(_request, _response);
        }

        else {

            for (let key in url.query) {
                _response.write(key + " : " + url.query[key] + "\n")
            }

            storeRocket(url.query);
        }

        _response.end();
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocket = mongoClient.db("fireworks").collection("rockets");
        console.log("database connected: " + rocket);
    }

    function storeRocket(data: Rocket): void {
        rocket.insertOne(data);
    }

    async function getRocketName(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let results: Mongo.Cursor = rocket.find();
        let rockets: string[] = await results.toArray();

        for (let rocket of rockets){
            console.log(rocket);
        }
    }

}
