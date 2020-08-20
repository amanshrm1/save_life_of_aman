"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var __1 = require("..");
var registrationRoute_1 = require("./registrationRoute");
var router = express_1.Router();
exports.router = router;
router.get('/forget', function (req, res) {
    res.send("\n      <style>\n      .container {\n        padding:10% 45% 30% 35%;\n        background-color: #A0A0A0;\n      }\n      </style>\n      </head>\n      <form action=\"http://localhost:3000/forget\" method=\"POST\">\n        <div class=\"container\">\n        <h1>Set password</h1>\n        <hr>\n  \n        <label><b>mobile no.</b></label>\n        <input type=\"number\" placeholder=\"Enter Mobile no.\" name=\"mobile\" required>\n        </br></br>\n        <label><b>New Password</b></label>\n        <input type=\"password\" placeholder=\"New Password\" name=\"newpassword\" required>\n        </br></br>\n        <hr>\n        <button type=\"submit\">Set password</button>\n    </div>\n  </form>\n  ");
});
router.post('/forget', function (req, res) {
    var _a = req.body, mobile = _a.mobile, newpassword = _a.newpassword;
    __1.client.query("select exists(select 1 from information where mobile='" + mobile + "')", function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            if (result.rows[0].exists) {
                registrationRoute_1.bcrypt.hash(newpassword, registrationRoute_1.salt, function (err1, res1) {
                    if (err1) {
                        res.send(err);
                    }
                    else {
                        __1.client.query("update information set password=" + res1 + " where mobile=" + mobile, function (err2, re2) {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.send("\n                <style>\n                .container {\n                  padding:10% 45% 30% 35%;\n                  background-color: #A0A0A0;\n                }\n                </style>\n              </head>\n              <form action=\"http://localhost:3000/login\" method=\"POST\">\n              <div class=\"container\">\n                <h1>Login</h1>\n                <hr>\n            \n                <label><b>Username</b></label>\n                <input type=\"text\" placeholder=\"Enter Username\" name=\"usernameLogin\" required>\n                </br></br>\n                <label><b>Password</b></label>\n                <input type=\"password\" placeholder=\"Password\" name=\"passwordlogin\" required>\n                </br>\n                <h5 style=\"color:green\"> !! Password updated successfully !!\n                <hr>\n                <button type=\"submit\">login</button>\n                <a style=\"margin-left:35% \" href=\"http://localhost:3000/forget\">forgot password</a>\n                <p>Don't have an account? <a href=\"http://localhost:3000/registration\">Sign up</a>.</p>\n              </div>\n            </form>\n            ");
                            }
                        });
                    }
                });
            }
        }
    });
});
