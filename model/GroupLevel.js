const model = require('./Model');
const groupLevelSchema = new model.Schema()
groupLevelSchema.add({
    group: { type: model.Schema.Types.ObjectId, required: true, ref: "Group" },
    child: { type: [model.Schema.Types.ObjectId], ref: "GroupLevel" },
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
groupLevelSchema.pre("save", async function() {
    const data = await grouplevels.findById(this.parent);
    this.populate("role child");
    if(data !== null){
        child = [...data.child, this._id];
        await grouplevels.findByIdAndUpdate(this.parent,{child})
    }
})
groupLevelSchema.pre("update", async function() {
    const data = await grouplevels.findById(this._update._id);
    if(data.parent !== this._update.parent){
        await grouplevels.findByIdAndUpdate(data.parent,{$pullAll: {child: [this._update._id] }})
        if(this._update.parent !== null){
            console.log("test")
            await grouplevels.findByIdAndUpdate(this._update.parent,{$push:{child:[this._update._id]}})
        }
    }
})
groupLevelSchema.pre("deleteOne", async function() {
    const data = await menus.findById(this._conditions._id);
    if(data.parent){
        console.log(data)
        await menus.findByIdAndUpdate(data.parent,{$pullAll: {child: [this._conditions._id] }})
    }
})
groupLevelSchema.pre("find", async function() {
    this.populate("group child")
    this.select("-__v");
})
const grouplevels = model.db.model("GroupLevel", groupLevelSchema);
module.exports = grouplevels;