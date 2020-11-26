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
var L07_Hexenkessel_No5;
(function (L07_Hexenkessel_No5) {
    let recipe;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/PotionEditor?retryWrites=true&w=majority";
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
            recipe = mongoClient.db("PotionEditor").collection("Recipe");
            console.log("Database connection ", recipe != undefined);
        });
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        let verify = url.query["command"];
        if (verify == "retrieve") {
            getAllRecipes(_request, _response);
        }
        else {
            getMyRecipeBack(_request, _response);
            _response.end();
        }
    }
    function getMyRecipeBack(_request, _response) {
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + " : " + url.query[key] + "\n");
            }
            storeOrder(url.query);
        }
    }
    function getAllRecipes(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = recipe.find();
            let recipes = yield results.toArray();
            for (let recipe of recipes) {
                for (let key in Object(recipe)) {
                    _response.write(key + " : " + Object(recipe)[key] + "\n");
                }
                _response.write("\n");
            }
            _response.end();
        });
    }
    function storeOrder(_order) {
        recipe.insertOne(_order);
    }
})(L07_Hexenkessel_No5 = exports.L07_Hexenkessel_No5 || (exports.L07_Hexenkessel_No5 = {}));
//# sourceMappingURL=server.js.map