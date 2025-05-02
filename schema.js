const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    mail:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("userDetails", schema);
module.exports = User;