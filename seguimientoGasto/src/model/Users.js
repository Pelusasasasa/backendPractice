const { Schema, model } = require('mongoose');


const User = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        set: (value => value.toUpperCase().trim())
    },
    name: {
        type: String,
        required: true,
        set: (value => value.toUpperCase().trim())
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = model('User', User);