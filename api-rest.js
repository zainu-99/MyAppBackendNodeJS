var express = require('express');
var cors = require('cors')
const jwt = require("jsonwebtoken");
var roles = require('./model/Role');
var auth = require('./controller/AuthController');
var app = express();
app.use(express.json());
app.use(cors())

app.post("/api/login", auth.login)

app.use("/api/*",function(req, res, next) {
    const reqHeader = req.headers
    jwt.verify(reqHeader.authorization, 'token12345', function(err, decoded) {
        if (!err){
            next();
        } 
        else {
            res.json({ message: "token expired",data:{} })
        }
    });
})

roles.find(function(error, data) {
    data.forEach(function(item) {
        if (item.controller != "-") {
            const controller = require(item.controller);
            const routeapi = app.route("/api/" + item.url);
            routeapi.get(controller.index)
            routeapi.post(controller.store)
            routeapi.put(controller.edit)
            routeapi.delete(controller.del)
            app.get("/api/" + item.url + "/:id", controller.getById);
        }
    })
}).where("url").ne(null)
module.exports = app;