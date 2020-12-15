const model = require('./Model');
const rolesSchema = new model.Schema({
    name: { type: String, required: true },
    remark: String,
    url: { type: String },
    controller: String,
    HaveAccessView: { type: Boolean, default: true },
    HaveAccessCreate: { type: Boolean, default: false },
    HaveAccessEdit: { type: Boolean, default: false },
    HaveAccessDelete: { type: Boolean, default: false },
    HaveAccessPrint: { type: Boolean, default: false },
    HaveAccessCustom: { type: Boolean, default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
const roles = model.db.model("Role", rolesSchema);
module.exports = roles;