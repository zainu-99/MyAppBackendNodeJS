const model = require('./Model');
const groupLevelSchema = new model.Schema()
groupLevelSchema.add({
    group: { type: model.Schema.Types.ObjectId, required: true, ref: "Group" },
    child: { type: [groupLevelSchema], ref: "GroupLevel" },
    parent: { type: groupLevelSchema, ref: "GroupLevel" },
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
const grouplevels = model.db.model("GroupLevel", groupLevelSchema);
module.exports = grouplevels;