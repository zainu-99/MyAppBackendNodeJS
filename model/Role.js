const model = require('./Model');
const rolesSchema = new model.Schema({
    name: { type: String, required: true },
    remark: String,
    url: { type: String },
    controller: String,
    HaveAccessView: { type: Boolean, default: true },
    HaveAccessCreate: { type: Boolean, default: false },
    HaveAccessEdit: { type: Boolean, default: false },
    HaveAccessDelete: { type: Boolean, default: false },
    HaveAccessPrint: { type: Boolean, default: false },
    HaveAccessCustom: { type: Boolean, default: false },
    menus:  { type: [model.Schema.Types.ObjectId], ref: "Menu" },
    userroles:  { type: [model.Schema.Types.ObjectId], ref: "UserRole" },
    grouplevelroles :  { type: [model.Schema.Types.ObjectId], ref: "GroupLevelRole" },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
rolesSchema.pre("deleteMany",function (next) {
    const document = this._conditions
    const _id = document._id;
    model.db.model("Menu").deleteMany({ role: _id })
    model.db.model("GroupLevelRole").deleteMany({ role: _id })
    model.db.model("UserRole").deleteMany({ role: _id })
    next()
})
// rolesSchema.pre("find", async function () {
//     this.populate({path:"userroles",model:"UserRole"})
// })

const roles = model.db.model("Role", rolesSchema);
module.exports = roles;