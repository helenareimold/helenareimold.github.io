"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
var ENDABGABE_EIA2;
(function (ENDABGABE_EIA2) {
    let server = Http.createServer();
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest() {
    }
})(ENDABGABE_EIA2 = exports.ENDABGABE_EIA2 || (exports.ENDABGABE_EIA2 = {}));
//# sourceMappingURL=server.js.map