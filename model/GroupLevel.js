const model = require('./Model');
const groupLevelSchema = new model.Schema()
groupLevelSchema.add({
    group: { type: model.Schema.Types.ObjectId, required: true, ref: "Group" },
    children: { type: [model.Schema.Types.ObjectId], ref: "GroupLevel" },
    grouplevelroles: { type: [model.Schema.Types.ObjectId], ref: "GroupLevel" },
    usergrouplevels: { type: [model.Schema.Types.ObjectId], ref: "UserGroupLevel" },
    parent: { type: model.Schema.Types.ObjectId, ref: "GroupLevel" },
    remark: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
groupLevelSchema.post("save", async document => {
    await grouplevels.findByIdAndUpdate(document.parent, { $push: { children: [document._id] } })
    await model.db.model("Group").findByIdAndUpdate(document.group, { $push: { grouplevels: [document._id] } })
})

groupLevelSchema.pre("updateMany", function (next) {
    grouplevels.findById(this._update._id, async (err, document) => {
        if (this._update._id !== document.parent) {
            await grouplevels.findByIdAndUpdate(document.parent, { $pullAll: { children: [document._id] } })
            await grouplevels.findByIdAndUpdate(this._update.parent, { $push: { children: [document._id] } })
        }if(this._update.group !== document.group){
            await model.db.model("Group").findByIdAndUpdate(document.group, { $pullAll: { grouplevels: [document._id] } })
            await model.db.model("Group").findByIdAndUpdate(this._update.group, { $push: { grouplevels: [document._id] } })
        }
        next()
    })
})
groupLevelSchema.pre("deleteMany", function (next) {
    const document = this._conditions
    model.db.model("GroupLevelRole").deleteMany({ grouplevel: document._id })
    grouplevels.deleteMany({ parent: document._id })
    grouplevels.findById(document._id, async (err, data) => {
        await model.db.model("Group").findByIdAndUpdate(data.group, { $pullAll: { grouplevels: [document._id] } })
        await grouplevels.findByIdAndUpdate(data.parent, { $pullAll: { children: [document._id] } })
        next()
    })
})
groupLevelSchema.pre("find", async function () {
    this.populate("group children")
    this.select("-__v");
})
const grouplevels = model.db.model("GroupLevel", groupLevelSchema);
module.exports = grouplevels;