const { Schema, model } = require("mongoose");

const Todo = new Schema({

    title: {
        type: String,
        required: true,
        set: (value) => value.trim().toUpperCase()
    },
    description: {
        type: String,
        required: true,
        set: (value) => value.trim().toUpperCase()
    },
});

Todo.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;

});

module.exports = model('Todo', Todo);
