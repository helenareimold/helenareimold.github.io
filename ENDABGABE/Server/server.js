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
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        let verify = url.query["command"];
        if (verify == "retrieve") {
            getRocketName(_request, _response);
        }
        else {
            for (let key in url.query) {
                _response.write(key + " : " + url.query[key] + "\n");
            }
            storeRocket(url.query);
            _response.end();
        }
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            rocket = mongoClient.db("fireworks").collection("rockets");
            console.log("database connected: " + rocket);
        });
    }
    function storeRocket(data) {
        rocket.insertOne(data);
    }
    function getRocketName(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = rocket.find();
            let rockets = yield results.toArray();
            _response.write(JSON.stringify(rockets));
            _response.end();
        });
    }
})(ENDABGABE_EIA2 = exports.ENDABGABE_EIA2 || (exports.ENDABGABE_EIA2 = {}));
//# sourceMappingURL=server.js.map