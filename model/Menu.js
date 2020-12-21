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
const menus = model.db.model("Menu", menusSchema);
module.exports = menus;