const model = require("../model/Menu")
const auth = require("./AuthController")
    index = function(req, res) {
        const oiduser = req.headers.oiduser
        model.find({parent:null}, async function(err, data) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            var data = data.filter(function f(o) {
                const userroles = o.role.userroles
                if (userroles.filter(e => (e.allowView === true && e.user == oiduser)).length) return true            
                if (o.children) {
                  return (o.children = o.children.filter(f)).length
                }
              })
            res.json({
                data,
                access : await auth.Access(req),
                message: "Successfully"
            });
        })
    }
module.exports = {
    index
}