import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_Hexenkessel_No5 {
    interface Recipe {
        [type: string]: string | string[];
    }

    let recipe: Mongo.Collection;
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/PotionEditor?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        recipe = mongoClient.db("PotionEditor").collection("Recipe");
        console.log("Database connection ", recipe != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        let verify: string | string[] = url.query["command"];
        if (verify == "retrieve") {
            getAllRecipes(_request, _response);
        }

        else {
            getMyRecipeBack(_request, _response);
            _response.end();
        }

    }


    function getMyRecipeBack(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeOrder(url.query);
        }
    }

    async function getAllRecipes(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let results: Mongo.Cursor = recipe.find();
        let recipes: string[] = await results.toArray();
        
        for (let recipe of recipes) {
           for(let key in Object(recipe)){
               _response.write(key+" : " + Object(recipe)[key]+"\n");
           }
           _response.write("\n"); 
        }
        _response.end();

    }

    function storeOrder(_order: Recipe): void {
        recipe.insert(_order);
    }
}


