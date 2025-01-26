const { Schema, model, Mongoose } = require("mongoose");

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
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

Todo.method('toJSON', function(){

    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;

});

module.exports = model('Todo', Todo);
