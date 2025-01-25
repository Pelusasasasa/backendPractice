const {Schema, model} = require("mongoose");

const User = new Schema({
    name: {
        type: String,
        required: true,
        set: value => value.toUpperCase().trim()
    },
    email:{
        type: String,
        unique: true,
        required: true,
        set: value => value.toUpperCase().trim()
    },
    password: {
        type: String,
        required: true,
        set: value => value.toUpperCase().trim()
    }
});

User.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;
});

module.exports = model('User', User);