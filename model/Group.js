const model = require('./Model');
const groupsSchema = new model.Schema({
    name: { type: String, required: true },
    remark: String,
    grouplevels: { type: [model.Schema.Types.ObjectId], ref: "GroupLevel" },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
groupsSchema.pre("deleteMany",  function (next) {
    const document = this._conditions
    model.db.model("GroupLevel").deleteMany({ group: document._id },(err,data)=>{
        next()
    })
})
groupsSchema.pre("find", async function () {
    this.select("-__v");
})
const groups = model.db.model("Group", groupsSchema);
module.exports = groups;