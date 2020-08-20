"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotenv = exports.client = void 0;
/*
  command to run - npm start
  server runnig at localhost : 3000
  Database :- postgres from Elephant SQL
  working:-
        1.  Default            'http:localhost:3000/' ->
        2.  registration       'http:localhost:3000/registration' ->
        3. if(registration == sucessful){    //validators on email and mobile no.
            information saved to db  AND  page redirects to the login page.
          }else{
            Error will be thrown
          }
        4. login                'http:localhost:3000/login' ->
        5. if(login == successful){
            Welcome msg will be displayed
            logout at any time
          }else{
            Error for invalid inputs
          }
  Security:- used bcrypt to store and check with encrytpion and decryption
  also used Token checking.

*/
var express_1 = __importDefault(require("express"));
var defaultRoute_1 = require("./routes/defaultRoute");
var body_parser_1 = __importDefault(require("body-parser"));
var pg_1 = __importDefault(require("pg"));
var dotenv = __importStar(require("dotenv"));
exports.dotenv = dotenv;
var app = express_1.default();
dotenv.config();
var client = new pg_1.default.Client(process.env.database_URL);
exports.client = client;
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    else {
        console.log('database is connected');
    }
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(defaultRoute_1.router);
app.listen(process.env.PORT, function () {
    console.log("listning on " + process.env.PORT);
});
