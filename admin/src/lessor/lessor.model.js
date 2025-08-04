const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
        emill : {
        type : String,
        required : true
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
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },


},{    timestamps: true})

const Lessors = mongoose.model('Lessors', lessonSchema);
module.exports = Lessors;