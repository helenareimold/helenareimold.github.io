"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var ENDABGABE_EIA2;
(function (ENDABGABE_EIA2) {
    let rocket;
    let databaseUrl = "mongodb+srv://helenareimold:hallo@cluster0.eivgu.mongodb.net/fireworks?retryWrites=true&w=majority";
    startServer();
    connectToDatabase(databaseUrl);
    function startServer() {
        console.log("start");
        let server = Http.createServer();
        let port = process.env.PORT;
        if (port == undefined)
            port = 5001;
        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            rocket = mongoClient.db("fireworks").collection("rockets"); //rocket = Mongo Client --> db und collection  
            console.log("database connected: " + rocket);
        });
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        let verify = url.query["command"]; //prüfen welcher command ausgeführt wurde
        switch (verify) {
            case "retrieve":
                getRocketsFromDb(_request, _response);
                break;
            case "delete":
                deleteRocket(_request, _response);
                break;
            case "update": updateRocket(_request, _response);
            default:
                for (let key in url.query) {
                    _response.write(key + " : " + url.query[key] + "\n"); //Schlüssel-Werte-Paar jeweils in Ausgabe an Client zurück
                }
                storeRocket(url.query);
                _response.end();
        }
    }
    function getRocketsFromDb(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = rocket.find(); //Ergebnissuche der Einträge in rocket
            let rockets = yield results.toArray(); //Ergebnisse in Array rockets speichern
            _response.write(JSON.stringify(rockets)); //Client ausgeben, welche Raketen gespeichert wurden
            _response.end();
        });
    }
    function deleteRocket(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = Url.parse(_request.url, true);
            let rocketName = url.query["rocket"];
            rocket.deleteOne({ "Name": rocketName });
            _response.write("rocket deleted!");
            _response.end();
        });
    }
    function updateRocket(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = Url.parse(_request.url, true);
            let oldName = url.query["rocket"];
            let rocketName = url.query["Name"];
            let rocketRisks = url.query["Riks"];
            let rocketSize = url.query["Size"];
            let rocketColor = url.query["Color"];
            let rocketDuration = url.query["Duration"];
            let rocketRadius = url.query["Radius"];
            let rocketAmount = url.query["Amount"];
            rocket.updateOne({ "Name": oldName }, { $set: { "Name": rocketName, "Risks": rocketRisks, "Size": rocketSize, "Color": rocketColor, "Duration": rocketDuration, "Radius": rocketRadius, "Amount": rocketAmount } });
        });
    }
    function storeRocket(data) {
        rocket.insertOne(data); //Speichern der Daten in rocket (mongo client)
    }
})(ENDABGABE_EIA2 = exports.ENDABGABE_EIA2 || (exports.ENDABGABE_EIA2 = {}));
//# sourceMappingURL=server.js.map