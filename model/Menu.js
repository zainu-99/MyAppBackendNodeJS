const model = require('./Model');
const menusSchema = new model.Schema()
menusSchema.add({
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    children: { type: [model.Schema.Types.ObjectId], ref: "Menu" },
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
menusSchema.post("save", async document => {
    await menus.findByIdAndUpdate(document.parent, { $push: { children: [document._id] } })
    await model.db.model("Role").findByIdAndUpdate(document.role, { $push: { menus: [document._id] } })
})

menusSchema.pre("updateMany", function (next) {
    menus.findById(this._update._id, async (err, document) => {
        if (this._update._id !== document.parent) {
            await menus.findByIdAndUpdate(document.parent, { $pullAll: { children: [document._id] } })
            await menus.findByIdAndUpdate(this._update.parent, { $push: { children: [document._id] } })
        }if(this._update.role !== document.role){
            await model.db.model("Role").findByIdAndUpdate(document.role, { $pullAll: { menus: [document._id] } })
            await model.db.model("Role").findByIdAndUpdate(this._update.role, { $push: { menus: [document._id] } })
        }
        next()
    })
})
menusSchema.pre("deleteMany", function (next) {
    const document =this._conditions
    menus.deleteMany({ parent: document._id })
    menus.findById(document._id,async (err,data)=>{
        await model.db.model("Role").findByIdAndUpdate(data.role, { $pullAll: { menus: [document._id] } })
        await menus.findByIdAndUpdate(data.parent,{$pullAll: {children: [document._id] }})
        next()
    })
})

menusSchema.pre("find", async function () {
    this.populate("role children", null, null, { sort: 'orderSort' })
    this.select("-__v")
})
const menus = model.db.model("Menu", menusSchema);
module.exports = menus;