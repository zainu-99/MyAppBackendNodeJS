const model = require("./../model/UserRole")
const modelgrouplevelrole = require("./../model/GroupLevelRole")
const auth = require("./AuthController")
index = function (req, res) {
    const reqBody = req.query
    modelgrouplevelrole.find({ grouplevel: { $in: reqBody.grouplevel } }, async function (err, data) {
        if (err) {
            console.log(err)
            res.json(err)
        }
        res.json({
            data,
            access : await auth.Access(req),
            message: "Successfully"
        })
    }).or([{ isViewActive: true },
    { isCreateActive: true },
    { isEditActive: true },
    { isDeleteActive: true },
    { isPrintActive: true },
    { isCustomActive: true }])
        .populate(
            {
                path: "role", 
                model: "Role",
                options:{populate:{path:"userroles",model:"UserRole",match:{user:reqBody.user}}}
            }
        )
},
    store = function (req, res) {
        res.json({
            data: {},
            message: "No function"
        });
    },
    edit = function (req, res) {
        const reqBody = req.body;
        model.findOne({ user: reqBody.user, role: reqBody.role }, async (err, data) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            if (data !== null) {
                await model.updateMany({ user: reqBody.user, role: reqBody.role }, reqBody)
                data = reqBody
            } else {
                data = await model.create(reqBody)
            }
            res.json({
                data,
                message: "Successfully"
            });
        })
    },
    del = function (req, res) {
        res.json({
            data: {},
            message: "No function"
        });
    },
    getById = function (req, res) {
        res.json({
            data: {},
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