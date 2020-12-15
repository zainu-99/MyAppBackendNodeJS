const model = require("./../model/User");
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
                res.json({
                    data,
                    token,
                    message: "Login successfully"
                });
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