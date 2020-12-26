const model = require('./Model');
const usersSchema = new model.Schema({
    userid: { type: String, unique: true, sparse: true},
    name: { type: String, required: true},
    email: String,
    phone: String,
    gender: String,
    address: String,
    password:{
        type: String,
        required: true
      },
    userroles:  { type: [model.Schema.Types.ObjectId], ref: "UserRole" },
    usergrouplevels :  { type: [model.Schema.Types.ObjectId], ref: "UserGroupLevel" },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})
usersSchema.pre("deleteMany",  function (next) {
    const document = this._conditions
    const _id = document._id;
    model.db.model("UserGroupLevel").deleteMany({ user: _id })
    model.db.model("UserRole").deleteMany({ user: _id })
    next()
})
usersSchema.plugin(require('mongoose-bcrypt'));
const users = model.db.model("User",usersSchema);
module.exports = users;