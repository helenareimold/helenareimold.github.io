"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
var ENDABGABE_EIA2;
(function (ENDABGABE_EIA2) {
    let server = Http.createServer();
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(ENDABGABE_EIA2 = exports.ENDABGABE_EIA2 || (exports.ENDABGABE_EIA2 = {}));
//# sourceMappingURL=server.js.map