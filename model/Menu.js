const model = require('./Model');
const menusSchema = new model.Schema()
menusSchema.add({
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    child: { type: [model.Schema.Types.ObjectId], ref: "Menu" },
    parent: { type: model.Schema.Types.ObjectId, ref: "Menu" },
    remark: String,
    menuText: String,
    icon: String,
    orderSort: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
menusSchema.pre("save", async function() {
    const data = await menus.findById(this.parent);
    this.populate("role child");
    if(data !== null){
        child = [...data.child, this._id];
        await menus.findByIdAndUpdate(this.parent,{child})
    }
})
menusSchema.pre("update", async function() {
    const data = await menus.findById(this._update._id);
    if(data.parent !== this._update.parent){
        await menus.findByIdAndUpdate(data.parent,{$pullAll: {child: [this._update._id] }})
        if(this._update.parent !== null){
            console.log("test")
            await menus.findByIdAndUpdate(this._update.parent,{$push:{child:[this._update._id]}})
        }
    }
})
menusSchema.pre("deleteOne", async function() {
    const data = await menus.findById(this._conditions._id);
    if(data.parent){
        await menus.findByIdAndUpdate(data.parent,{$pullAll: {child: [this._conditions._id] }})
    }
})
menusSchema.pre("find", async function() {
    this.populate("role child");
    this.select("-__v");
})
const menus = model.db.model("Menu", menusSchema);
module.exports = menus;