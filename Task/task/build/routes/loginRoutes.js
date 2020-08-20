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
exports.router = void 0;
var index_1 = require("../index");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv1 = __importStar(require("dotenv"));
var forget_1 = require("./forget");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return forget_1.router; } });
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv1.config();
forget_1.router.get('/login', function (req, res) {
    res.send("\n      <style>\n      .container {\n        padding:10% 45% 30% 35%;\n        background-color: #A0A0A0;\n      }\n      </style>\n    </head>\n    <form action=\"http://localhost:3000/login\" method=\"POST\">\n    <div class=\"container\">\n      <h1>Login</h1>\n      <hr>\n  \n      <label><b>Username</b></label>\n      <input type=\"text\" placeholder=\"Enter Username\" name=\"usernameLogin\" required>\n      </br></br>\n      <label><b>Password</b></label>\n      <input type=\"password\" placeholder=\"Password\" name=\"passwordlogin\" required>\n      </br></br>\n      <hr>\n      <button type=\"submit\">login</button>\n      <a style=\"margin-left:35% \" href=\"http://localhost:3000/forget\">forgot password</a>\n      <p>Don't have an account? <a href=\"http://localhost:3000/registration\">Sign up</a>.</p>\n    </div>\n  </form>\n  ");
});
forget_1.router.post('/login', function (req, res) {
    var _a = req.body, usernameLogin = _a.usernameLogin, passwordlogin = _a.passwordlogin;
    var Secret = process.env.secret;
    var token = jsonwebtoken_1.default.sign(req.body, Secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    jsonwebtoken_1.default.verify(token, Secret, function (err, decoded) {
        if (err) {
            res.send({ message: 'something went wrong' });
        }
        else {
            if (decoded) {
                index_1.client.query("select exists(select 1 from information where username='" + usernameLogin + "')", function (err, result) {
                    if (err) {
                        return res.send(err);
                    }
                    else {
                        if (result.rows[0].exists == true) {
                            index_1.client.query("select password from information where username='" + usernameLogin + "'", function (err1, result1) {
                                var consumedPassword = result1.rows[0].password;
                                if (err1) {
                                    return console.error(err1);
                                }
                                else {
                                    bcrypt_1.default.compare(passwordlogin, consumedPassword, function (err2, result2) {
                                        console.log(result2);
                                        if (err2) {
                                            res.send(err2);
                                        }
                                        else {
                                            if (result2) {
                                                res.send("\n                        <html>\n                          <div>\n                            <h1>Hello! Hope You are enjoying the index page</h1>\n                          </div>\n                          </br></br>\n                          <a href=\"http://localhost:3000/login\">logout</a>\n                        </html>\n                      ");
                                            }
                                            else {
                                                res.send("\n                        <style>\n                        .container {\n                          padding:10% 45% 30% 35%;\n                          background-color: #A0A0A0;\n                        }\n                        </style>\n                      </head>\n                      <form action=\"http://localhost:3000/login\" method=\"POST\">\n                      <div class=\"container\">\n                        <h1>Login</h1>\n                        <hr>\n                    \n                        <label><b>Username</b></label>\n                        <input type=\"text\" placeholder=\"Enter Username\" name=\"usernameLogin\" required>\n                        </br></br>\n                        <label><b>Password</b></label>\n                        <input type=\"password\" placeholder=\"Password\" name=\"passwordlogin\" required>\n                        <h5 style=\"color:red\">Please check the passowrd</h5>\n                        <hr>\n                        <button type=\"submit\">login</button>\n                        <a style=\"margin-left:35% \" href=\"http://localhost:3000/forget\">forgot password</a>\n                        <p>Don't have an account? <a href=\"http://localhost:3000/registration\">Sign up</a>.</p>\n                      </div>\n                    </form>\n                    ");
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.send("\n              <style>\n              .container {\n                padding:10% 45% 30% 35%;\n                background-color: #A0A0A0;\n              }\n              </style>\n            </head>\n            <form action=\"http://localhost:3000/login\" method=\"POST\">\n            <div class=\"container\">\n              <h1>Login</h1>\n              <hr>\n          \n              <label><b>Username</b></label>\n              <input type=\"text\" placeholder=\"Enter Username\" required>\n              </br></br>\n              <label><b>Password</b></label>\n              <input type=\"password\" placeholder=\"Password\" required>\n              <h5 style=\"color:red\">Please check the input</h5>\n              <hr>\n              <button type=\"submit\">login</button>\n              <a style=\"margin-left:35% \" href=\"http://localhost:3000/forget\">forgot password</a>\n              <p>Don't have an account? <a href=\"http://localhost:3000/registration\">Sign up</a>.</p>\n            </div>\n          </form>\n          ");
                        }
                    }
                });
            }
            else {
                res.send({ message: 'Not a valid user' });
            }
        }
    });
});
