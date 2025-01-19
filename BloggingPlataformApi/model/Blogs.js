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
        type: [String],
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
    //Los valores dentro dedl arreglo los guardamos en mayusucula y sacamos los espacios de adelante y del final de la cadena
    object.tags = object.tags.map(elem => elem.toUpperCase().trim());
    return object
});

module.exports = model('Blog', Blog);