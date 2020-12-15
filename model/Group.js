const model = require('./Model');
const groupsSchema = new model.Schema({
    name: { type: String, required: true },
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
const groups = model.db.model("Group", groupsSchema);
module.exports = groups;