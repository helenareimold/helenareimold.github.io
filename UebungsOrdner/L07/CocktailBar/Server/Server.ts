import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_CocktailBar {
    interface Order {
        [type: string]: string | string[];
    }

    let orders: Mongo.Collection;
    let verify: string = process.argv[2];
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string;
    let database:string;
    if (verify == "local") {
        databaseUrl = "mongodb://localhost:27017";
        database = "CocktailBar";

    }
    else if (verify == "remote") {
        databaseUrl = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/Cocktailbar?retryWrites=true&w=majority";
        database = "Cocktailbar";
    }
    else{
        databaseUrl = "mongodb+srv://helena:potioneditor@cluster0.qk01e.mongodb.net/Cocktailbar?retryWrites=true&w=majority";
        database = "Cocktailbar";  
    }



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
        orders = mongoClient.db(database).collection("Orders");
        console.log("Database connection ", orders != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }

            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeOrder(url.query);
        }

        _response.end();
    }


    function storeOrder(_order: Order): void {
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

}
