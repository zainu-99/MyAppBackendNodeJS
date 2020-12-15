const model = require('./Model');
const usersSchema = new model.Schema({
    userid: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    email: String,
    phone: String,
    gender: String,
    address: String,
    password:{
        type: String,
        required: true
      },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})
usersSchema.plugin(require('mongoose-bcrypt'));
const user = model.db.model("User",usersSchema);
module.exports = user;