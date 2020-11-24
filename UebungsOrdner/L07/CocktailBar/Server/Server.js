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
var L07_CocktailBar;
(function (L07_CocktailBar) {
    let orders;
    let verify = process.argv[2];
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl;
    let database;
    if (verify == "local") {
        databaseUrl = "mongodb://localhost:27017";
        database = "CocktailBar";
    }
    else if (verify == "remote") {
        databaseUrl = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/Cocktailbar?retryWrites=true&w=majority";
        database = "Cocktailbar";
    }
    else {
        databaseUrl = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/Cocktailbar?retryWrites=true&w=majority";
        database = "Cocktailbar";
    }
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            orders = mongoClient.db(database).collection("Orders");
            console.log("Database connection ", orders != undefined);
        });
    }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            storeOrder(url.query);
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
    // const MongoClient = require('mongodb').MongoClient;
    // const uri = "mongodb+srv://helena:<password>@cluster0.qk01e.mongodb.net/<dbname>?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });
})(L07_CocktailBar = exports.L07_CocktailBar || (exports.L07_CocktailBar = {}));
//# sourceMappingURL=Server.js.map