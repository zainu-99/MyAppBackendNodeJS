var express = require('express');
var cors = require('cors')
const jwt = require("jsonwebtoken");
var roles = require('./model/Role');
var userrole = require('./model/UserRole');
var auth = require('./controller/AuthController');
var menuapp = require('./controller/MenuAppController');
var app = express();
app.use(express.json());
app.use(cors())

app.post("/api/login", auth.login)

app.use("/api/*", function (req, res, next) {
    const reqHeader = req.headers
    jwt.verify(reqHeader.authorization, 'token12345', function (err, decoded) {
        if (!err) {
            next();
        }
        else {
            res.json({ message: "token expired", data: {} })
        }
    });
})
app.get("/menuapp",menuapp.index)
app.use("/api/*", function (req, res, next) {
    const oiduser = req.headers.oiduser
    const methode = req.method
    const baseUrl = req.baseUrl.replace("/api/","")
    let access = ""
    switch (methode) {
        case "GET":
            access = "allowView";
            break;
        case "POST":
            access = "allowCreate";
            break;
        case "PUT":
            access = "allowEdit";
            break;
        case "DELETE":
            access = "allowDelete";
            break;
        default:
            access = "NO METHODE";
    }
    const filter = { user: oiduser}
    filter[access] = true
    userrole.find(filter, (err, data) => {
        if (err) {
            res.json({ message: "Error Access", data: { err } });
            return;
        }
        data = data.filter(e => e.role !== null)
        if(data.length>0){
            next()
        }else{
            res.json({ message: "You Have No Access", data: { data } });
        }
        
    }).populate({path:"role",match:{url:baseUrl}})
})

roles.find({ controller: { "$ne": "" } }, function (error, data) {
    data.forEach(function (item) {
        if (item.controller !== "") {
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