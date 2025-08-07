const mongoose = require("mongoose");

const lessorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
        email : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone : {
        type : String,
        required : true
    },
    address: [{
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    }],
    birthday : {
        type : Date,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password : {
        type : String,
        required : true
    },


},{    timestamps: true})

const Lessors = mongoose.model('Lessors', lessorSchema);
module.exports = Lessors;