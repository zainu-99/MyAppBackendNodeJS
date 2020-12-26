const model = require('./Model');
const groupLevelRoleSchema = new model.Schema({
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    grouplevel: { type: model.Schema.Types.ObjectId, required: true, ref: "GroupLevel" },
    isViewActive: { type: Boolean, default: true },
    isCreateActive: { type: Boolean, default: false },
    isEditActive: { type: Boolean, default: false },
    isDeleteActive: { type: Boolean, default: false },
    isPrintActive: { type: Boolean, default: false },
    isCustomActive: { type: Boolean, default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
groupLevelRoleSchema.post("save", async document => {
    await model.db.model("GroupLevel").findByIdAndUpdate(document.grouplevel, { $push: { grouplevelroles: [document._id] } })
    await model.db.model("Role").findByIdAndUpdate(document.role, { $push: { grouplevelroles: [document._id] } })
})
groupLevelRoleSchema.pre("deleteMany", function (next) {
    const cond = this._conditions
    grouplevelroles.findOne({ grouplevel: cond.grouplevel, role: cond.role }, async (err, document) => {
        console.log(document)
        await model.db.model("Role").findByIdAndUpdate(document.role, { $pullAll: { grouplevelroles: [document._id] } })
        await model.db.model("GroupLevel").findByIdAndUpdate(document.grouplevel, { $pullAll: { grouplevelroles: [document._id] } })
        next()
    })
})
const grouplevelroles = model.db.model("GroupLevelRole", groupLevelRoleSchema);
module.exports = grouplevelroles;