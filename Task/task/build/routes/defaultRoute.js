"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var registrationRoute_1 = require("./registrationRoute");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return registrationRoute_1.router; } });
registrationRoute_1.router.get('/', function (req, res) {
    res.send("\n    <html>\n       <body style=\"padding: 15% 35% 35% 35%\">\n          <h1 style=\"color:blue\">Click Below To Login</h1>\n          </br>\n          <a style=\"padding-left: 20% \" href=\"http://localhost:3000/registration\">Register here</a>\n       </body>\n    </html>\n  ");
});
