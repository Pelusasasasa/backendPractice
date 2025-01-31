const { Schema, model } = require('mongoose');

const Gasto = new Schema({
    description: {
        type: String,
        required: true,
        value: (value => value.toUpperCase().trim())
    },
    importe: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true,
});


module.exports = model('Gasto', Gasto);