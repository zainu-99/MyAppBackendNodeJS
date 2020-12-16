const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on("error", function() {
    console.log("Connection Error");
});
db.on("open", function() {
    console.log("Connection Success");
});

module.exports = { db, Schema };