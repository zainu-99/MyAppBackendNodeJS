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
groupLevelSchema.pre("delete", async function() {
   
})
groupLevelSchema.pre("edit", async function() {

})
groupLevelSchema.pre("find", async function() {
    this.populate("group child")
    this.select("-__v");
})
const grouplevels = model.db.model("GroupLevel", groupLevelSchema);
module.exports = grouplevels;