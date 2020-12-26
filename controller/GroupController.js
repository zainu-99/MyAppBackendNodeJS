const userroles = require("../model/UserRole");
const model = require("./../model/Group")
const auth = require("./AuthController")
index = function(req, res) {
        model.find(async function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data,
                access : await auth.Access(req),
                message: "Successfully"
            });
        });
    },
    store = function(req, res) {
        const reqBody = req.body;
        model.create(reqBody, function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data,
                message: "Successfully"
            });
        });
    },
    edit = function(req, res) {
        const reqBody = req.body;
        model.updateMany({_id:reqBody._id},reqBody, function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data : reqBody,
                message: "Successfully"
            });
        });
    },
    del = function(req, res) {
        const reqBody = req.body;
        model.deleteMany({_id:reqBody._id}, function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data : reqBody,
                message: "Successfully"
            });
        });
    },
    getById = function(req, res) {
        const reqBody = req.body;
        model.findOne(reqBody, function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data,
                message: "Successfully"
            });
        });
    }
module.exports = {
    index,
    store,
    edit,
    del,
    getById
}