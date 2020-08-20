"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypt = exports.salt = exports.router = void 0;
var loginRoutes_1 = require("./loginRoutes");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return loginRoutes_1.router; } });
var index_1 = require("../index");
var validator_1 = __importDefault(require("validator"));
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.bcrypt = bcrypt_1.default;
var salt = 10;
exports.salt = salt;
loginRoutes_1.router.get('/registration', function (req, res) {
    res.send("\n    <head>\n      <style>\n      .container {\n        padding:10% 45% 30% 35%;\n        background-color: #A0A0A0;\n      }\n      </style>\n    </head>\n    <form action=\"http://localhost:3000/registration\" method=\"POST\">\n    <div class=\"container\">\n      <h1>Register</h1>\n      <hr>\n  \n      <label><b>Username</b></label>\n      <input type=\"text\" placeholder=\"Enter Username\" name=\"username\" required>\n      </br></br>\n      <label><b> email </b></label>\n      <input type=\"email\" placeholder=\"Enter email\" name=\"email\" required>\n      </br></br>\n      <label><b>Password</b></label>\n      <input type=\"password\" placeholder=\"Password\" name=\"password\" required>\n      </br></br>\n      <label><b>Mobile No.</b></label>\n      <input type=\"number\" placeholder=\"Enter mobile No.\" name=\"mobile\" required>\n      <hr>\n      <button type=\"submit\" >Register</button>\n      <p>Already have an account? <a href=\"http://localhost:3000/login\">Sign in</a>.</p>\n    </div>\n  </form>\n  \n  ");
});
loginRoutes_1.router.post('/registration', function (req, res) {
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password, mobile = _a.mobile;
    if (validator_1.default.isEmail(email) && validator_1.default.isMobilePhone(mobile)) {
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }
            else {
                index_1.client.query("INSERT INTO INFORMATION(username, email, password, mobile, created_on) VALUES('" + username + "','" + email + "','" + hash + "','" + mobile + "',now() )", function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.redirect('http://localhost:3000/login');
                    }
                });
            }
        });
    }
    else {
        res.send("\n    <head>\n      <style>\n      .container {\n        padding:10% 45% 30% 35%;\n        background-color: #A0A0A0;\n      }\n      </style>\n    </head>\n    <form action=\"http://localhost:3000/registration\" method=\"POST\">\n    <div class=\"container\">\n      <h1>Register</h1>\n      <hr>\n  \n      <label><b>Username</b></label>\n      <input type=\"text\" placeholder=\"Enter Username\" required>\n      </br></br>\n      <label><b> email </b></label>\n      <input type=\"email\" placeholder=\"Enter email\" required>\n      <h5>Please check the email input type. Eg:-'something@something</h5>\n      </br>\n      <label><b>Password</b></label>\n      <input type=\"password\" placeholder=\"Password\" required>\n      </br></br>\n      <label><b>Mobile No.</b></label>\n      <input type=\"string\" placeholder=\"Enter mobile No.\" required>\n      <h5>Please check the phone no</h5>\n      <hr>\n      <button type=\"submit\" >Register</button>\n      <p>Already have an account? <a href=\"http://localhost:3000/login\">Sign in</a>.</p>\n    </div>\n  </form>\n  \n  ");
    }
});
