const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        // required:true,
        unique:true,
        lowercase:true,
        trim:true,
        // validate : [validator.isEmail , 'Please provide a valid email']
    },
    Photo: {
        type :String,
        default : 'default.jpeg'
    },
    Role: {
        type: String,
        enum : ['Admin','Student','Professor','CR']
        // default : 'Student'
    },
    Password: {
        type: String,
        minlength : 8
        // select : false,
        // required:true
    },
    dob: {
        type : Date
    },
    gender: {
        type : String
    },
    isverified: {
        type : String
    },
    department: {
        type: String
    },
    description: {
        type : String 
    }
}, {
        collection: 'registration',
        timestamps:true
    })



module.exports = mongoose.model('registration', userSchema)
