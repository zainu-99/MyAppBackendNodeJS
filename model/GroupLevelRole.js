const model = require('./Model');
const groupLevelRole = new model.Schema({
    role: { type: model.Schema.Types.ObjectId, required: true, ref: "Role" },
    grouplevel: { type: model.Schema.Types.ObjectId, required: true, ref: "GroupLevel" },
    isViewActive: { type: Boolean, default: true },
    isCreateActive: { type: Boolean, default: false },
    isEditActive: { type: Boolean, default: false },
    isDeleteActive: { type: Boolean, default: false },
    isPrintActive: { type: Boolean, default: false },
    isCustomActive: { type: Boolean, default: false },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
const grouplevelroles = model.db.model("GroupLevelRole", groupLevelRole);
module.exports = grouplevelroles;