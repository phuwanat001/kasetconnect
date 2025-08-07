const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
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
    birthdate: {
        type: Date,
        required : true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        enum: ['customer', 'lessor'],
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    


},{
    timestamps: true
})


const Auths = mongoose.model('Auth', authSchema);
module.exports = Auths;
