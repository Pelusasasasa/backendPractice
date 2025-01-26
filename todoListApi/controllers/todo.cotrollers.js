const todoCTRL = {};

const Todo = require('../models/Todo');

todoCTRL.crearTodo = async (req, res) => {

    const { title, description } = req.body;


    try {
        
        const newTodo = new Todo({
            title, description
        });

        await newTodo.save();

        res.status(201).json({
            ok: true,
            todo
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al crear el todo'
        })
        
    }
};

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

todoCTRL.putTodo = async ( req, res ) => {
    const { id } = req.params;

    const { title, description } = req.body;

    try {
        const updateTodo = await Todo.findByIdAndUpdate(id, {title, description}, {new: true});

        res.status(200).json({
            ok: true,
            todo: updateTodo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el todo'
        });
    }
};

todoCTRL.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {

        const deleteTodo = await Todo.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            message: 'Todo eliminado'
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar el todo'
        });
    }
};

module.exports = todoCTRL;