const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({

    firstname:{
        type: String, 
        required: true,
        max: 20, 
    },

    lastname:{
        type: String, 
        required: true,
        max: 20, 
    },

    email:{
        type: String, 
        required: true,
        unique: true, 
        lowercase: true, 
    },

    uid: {
        type: String,
        required: false,
        unique: true,
    }, 

    username:{
        type: String,
        required: true,
        unique: true, 
    },

    profile:{
        type: String,
        required: true,
        unique: true, 
    }, 

    /*photo: {
        data: Buffer, 
        contentType: String, 
    }, 

    location: {
        type: String, 
        required: true, 
    }, 

    biography: {
        type: String, 
        required: true,
        max: 500, 

    }*/

}, {timestamp:true});



module.exports = mongoose.model("Profile", profileSchema)