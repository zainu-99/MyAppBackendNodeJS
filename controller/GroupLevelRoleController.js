const model = require("./../model/GroupLevelRole")
const modelgrouplevel = require("./../model/GroupLevel")
const modelrole = require("./../model/Role")
const auth = require("./AuthController")
index = function(req, res) {
    const reqBody = req.query
    modelrole.find( async function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data,
                access : await auth.Access(req),
                message: "Successfully"
            });
        }).sort("url").populate({path:"grouplevelroles",model:"GroupLevelRole",match:{grouplevel:reqBody.grouplevel}})
    },
    store = function(req, res) {
        res.json({
            data : {},
            message: "No function"
        });
    },
    edit = function(req, res) {
        const reqBody = req.body;
        model.findOne({grouplevel:reqBody.grouplevel,role:reqBody.role},async(err,data)=>{
            if (err) {
                console.log(err)
                res.json(err)
            }
            if(data !== null){
                await model.updateMany({grouplevel:reqBody.grouplevel,role:reqBody.role},reqBody)
                data= reqBody
            }else{
                data = await model.create(reqBody)
            }
            res.json({
                data,
                message: "Successfully"
            });
        })
    },
    del = function(req, res) {
        res.json({
            data : {},
            message: "No function"
        });
    },
    getById = function(req, res) {
        res.json({
            data : {},
            message: "No function"
        });
    }
module.exports = {
    index,
    store,
    edit,
    del,
    getById
}