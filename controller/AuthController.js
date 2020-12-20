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
        if (data == null) { res.json({ message: "Userid not found",data:{}}); return }
        data.verifyPassword(reqBody.password, function(err, valid) {
            if (err) {
                console.log(err)
            } else if (valid) {
                const token = jwt.sign({ data }, "token12345", {
                    expiresIn: "24h"
                });
                userrole.find({user:data._id},function(error,access){
                    res.json({
                        data,
                        access,
                        token,
                        message: "Login successfully"
                    });
                }).populate("role")
            } else {
                res.json({
                    message: "Password wrong",
                    data:{}
                });
            }
        });
    });
}

module.exports = {
    login,
}