const model = require('./Model');
const userRoleSchema = new model.Schema({
    user: { type: model.Schema.Types.ObjectId, index: false, required: true, ref: "User" },
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    allowView: { type: Boolean, default: true },
    allowCreate: { type: Boolean, default: false },
    allowEdit: { type: Boolean, default: false },
    allowDelete: { type: Boolean, default: false },
    allowPrint: { type: Boolean, default: false },
    allowCustom: { type: Boolean, default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
userRoleSchema.post("save", async document => {
    await model.db.model("User").findByIdAndUpdate(document.user, { $push: { userroles: [document._id] } })
    await model.db.model("Role").findByIdAndUpdate(document.role, { $push: { userroles: [document._id] } })
})
userRoleSchema.pre("deleteMany", function (next) {
    const cond = this._conditions
    userroles.findOne({ user: cond.user, role: cond.role }, async (err, document) => {
        console.log(document)
        await model.db.model("Role").findByIdAndUpdate(document.role, { $pullAll: { userroles: [document._id] } })
        await model.db.model("User").findByIdAndUpdate(document.user, { $pullAll: { userroles: [document._id] } })
        next()
    })
})
const userroles = model.db.model("UserRole", userRoleSchema);
module.exports = userroles;