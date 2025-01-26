const todoCTRL = {};

const Todo = require('../models/Todo');

todoCTRL.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            ok: true,
            todos
        });
    } catch (error) {
        console.log(error)
        res.send({
            ok: false,
            message: 'Error al obtener los todos'
        })
    }
};

module.exports = todoCTRL;