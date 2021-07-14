const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let verifySchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique:true
    },
    userid : {
        type : String,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('verify',verifySchema);