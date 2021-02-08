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

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocket = mongoClient.db("fireworks").collection("rockets");                           //rocket = Mongo Client --> db und collection  
        console.log("database connected: " + rocket);
    }
    
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let verify: string | string[] = url.query["command"];                                  //prüfen welcher command ausgeführt wurde

        if (verify == "retrieve") {                                                            //1. Daten aus db holen über sendOrder bei Client
            getRocketsFromDb(_request, _response);
        }

        else if (verify == "delete") {                                                         //2. löschen
            updateRocket(_request, _response);
        }

        else if (verify == "update") {                                                         //3. update
            deleteRocket(_request, _response);
        }

        else {                                                                                 //4. speichern

            for (let key in url.query) {
                _response.write(key + " : " + url.query[key] + "\n")                           //Schlüssel-Werte-Paar jeweils in Ausgabe an Client zurück
            }

            storeRocket(url.query);
            _response.end();
        }
    }
    
    async function getRocketsFromDb(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let results: Mongo.Cursor = rocket.find();                                             //Ergebnissuche der Einträge in rocket
        let rockets: string[] = await results.toArray();                                       //Ergebnisse in Array rockets speichern
        _response.write(JSON.stringify(rockets));                                              //Client ausgeben, welche Raketen gespeichert wurden
        
        _response.end();
    }
    
    async function deleteRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let rocketName: string | string[] = url.query["rocket"];                                
        rocket.deleteOne({ "Name": rocketName });
        _response.write("rocket deleted!");
        _response.end();
    }

    async function updateRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

    }

    function storeRocket(data: Rocket): void {
        rocket.insertOne(data);                                                                //Eintrag der Daten in rocket (mongo client)
    }
    

}
