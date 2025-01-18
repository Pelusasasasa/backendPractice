const { Schema, model } = require('mongoose');

const Blog = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: ''
    },
    tags: {
        type: [],
        default: []
    }
},
    {
        timestamps: true
    }
);

Blog.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
});

module.exports = model('Blog', Blog);