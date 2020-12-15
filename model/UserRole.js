const model = require('./Model');
const userRole = new model.Schema({
    user: { type: model.Schema.Types.ObjectId, required: true, ref: "User" },
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    allowView: { type: Boolean, default: true },
    allowAdd: { type: Boolean, default: false },
    allowEdit: { type: Boolean, default: false },
    allowDelete: { type: Boolean, default: false },
    allowPrint: { type: Boolean, default: false },
    allowCustom: { type: Boolean, default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
const userroles = model.db.model("UserRole", userRole);
module.exports = userroles;