const model = require('./Model');
const userGroupLevelSchema = new model.Schema({
    user: { type: model.Schema.Types.ObjectId, index: false, required: true, ref: 'User' },
    grouplevel: { type: model.Schema.Types.ObjectId, required: true, ref: "GroupLevel" },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
userGroupLevelSchema.post("save", async document => {
    await model.db.model("GroupLevel").findByIdAndUpdate(document.grouplevel, { $push: { usergrouplevels: [document._id] } })
    await model.db.model("User").findByIdAndUpdate(document.user, { $push: { usergrouplevels: [document._id] } })
})
userGroupLevelSchema.pre("deleteMany", function (next) {
    const cond = this._conditions
    usergrouplevels.findOne({ user: cond.user, grouplevel: cond.grouplevel }, async (err, document) => {
        console.log(document)
        await model.db.model("GroupLevel").findByIdAndUpdate(document.grouplevel, { $pullAll: { usergrouplevels: [document._id] } })
        await model.db.model("User").findByIdAndUpdate(document.user, { $pullAll: { usergrouplevels: [document._id] } })
        next()
    })
})
const usergrouplevels = model.db.model("UserGroupLevel", userGroupLevelSchema);
module.exports = usergrouplevels;