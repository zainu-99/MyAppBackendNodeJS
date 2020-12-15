const model = require('./Model');
const userGroupLevel = new model.Schema({
    user: { type: model.Schema.Types.ObjectId, required: true, ref: "User" },
    grouplevel: { type: model.Schema.Types.ObjectId, required: true, ref: "GroupLevel" },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
const usergrouplevel = model.db.model("UserGroupLevel", userGroupLevel);
module.exports = usergrouplevel;