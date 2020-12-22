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
menusSchema.pre("delete", async function() {
   
})
menusSchema.pre("edit", async function() {

})
menusSchema.pre("find", async function() {
    this.populate("role child");
    this.select("-__v");
})
const menus = model.db.model("Menu", menusSchema);
module.exports = menus;