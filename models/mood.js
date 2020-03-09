//database logic

const mongoose = require('mongoose');
//to define what property will be on the database
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    "day": Number,
    "mood": String
});

const db = mongoose.model('mood', todoSchema);
module.exports = db;