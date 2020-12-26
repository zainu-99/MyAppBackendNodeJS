const model = require("./../model/UserGroupLevel")
const usermodel = require("./../model/User")
const grouplevelmodel = require("./../model/GroupLevel")
const auth = require("./AuthController")
index = function(req, res) {
    const reqBody = req.query
    grouplevelmodel.find(async function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            res.json({
                data,
                access : await auth.Access(req),
                message: "Successfully"
            });
        }).populate({path:"usergrouplevels",model:"UserGroupLevel",match:{user:reqBody.user}})
    },
    store = function(req, res) {
        res.json({
            data : {},
            message: "No function"
        });
    },
    edit = function(req, res) {
        const reqBody = req.body;
        model.findOne({grouplevel:reqBody.grouplevel,user:reqBody.user},async(err,data)=>{
            if (err) {
                console.log(err)
                res.json(err)
            }
            if(data !== null){
                await model.deleteMany({grouplevel:reqBody.grouplevel,user:reqBody.user})
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