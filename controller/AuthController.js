const model = require("./../model/User");
const userrole = require("./../model/UserRole");
const jwt = require("jsonwebtoken");
const userroles = require("./../model/UserRole");

function login(req, res) {
    const reqBody = req.body;
    model.findOne({
        userid: reqBody.userid,
    }, function (error, data) {
        if (error) {
            console.log(error);
            res.json(error)
            return
        }
        if (data == null) { res.json({ message: "Userid not found", data: {} }); return }
        data.verifyPassword(reqBody.password, function (err, valid) {
            if (err) {
                console.log(err)
            } else if (valid) {
                const token = jwt.sign({ data }, "token12345", {
                    expiresIn: "24h"
                });
                userrole.find({ user: data._id }, function (error, access) {
                    res.json({
                        data,
                        access,
                        token,
                        message: "Login successfully"
                    });
                }).populate("role userroles")
            } else {
                res.json({
                    message: "Password wrong",
                    data: {}
                });
            }
        });
    });
}
async function Access(req) {
    const reqHeader = req.headers;  
    console.log(req)
    const baseUrl = req.originalUrl.replace("/api/","").split('?')[0]
    access = await (await userroles.find({user:reqHeader.oiduser},"allowView allowCreate allowEdit allowDelete allowPrint allowCustom -_id").populate({path:"role",model:"Role",match:{url:baseUrl}})).filter(e => e.role !== null)
    return access[0] || {
        "allowView": false,
        "allowCreate": false,
        "allowEdit": false,
        "allowDelete": false,
        "allowPrint": false,
        "allowCustom": false,
    }
}

module.exports = {
    login, Access
}