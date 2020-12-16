const model = require("./../model/User");
const userrole = require("./../model/UserRole");
const jwt = require("jsonwebtoken");

function login(req, res) {
    const reqBody = req.body;
    model.findOne({
        userid: reqBody.userid,
    }, function(error, data) {
        if (error) {
            console.log(error);
            res.json(error)
            return
        }
        if (data == null) { res.json({ "status": "Userid not found" }); return }
        data.verifyPassword(reqBody.password, function(err, valid) {
            if (err) {
                console.log(err)
            } else if (valid) {
                const token = jwt.sign({ data }, "token12345", {
                    expiresIn: "24h"
                });
                console.log(data)
                userrole.find({user:data._id},function(error,access){
                    res.json({
                        data,
                        access,
                        message: "Login successfully"
                    });
                }).populate("role")
            } else {
                res.status(401).json({
                    message: "Password wrong"
                });
            }
        });
    });
}

module.exports = {
    login,
}