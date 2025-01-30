const todoCTRL = {};

const Todo = require('../model/Todo');

todoCTRL.crearTodo = async (req, res) => {

    const { title, description, user } = req.body;

    try {
        
        const newTodo = new Todo({
            title, description, user
        });

        await newTodo.save();

        res.status(201).json({
            ok: true,
            newTodo
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

    const {page, limit} = req.query;
    //Hacemos skip para saltar los primeros elementos si la pagina es mayor a 1
    const skip = (page - 1) * limit;

    try {
        const todos = await Todo.find().skip(skip).limit(limit);
        res.status(200).json({
            ok: true,
            data: todos,
            page,
            limit,
            total: todos.length
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
    const { user } = req.headers;

    try {
        const verificar = await Todo.findOne({_id: id});
        console.log(verificar)
        if (verificar.user !== user){
            return res.status(401).send({
                ok: false,
                message: 'No tiene permisos para modificar el Todo'
            });
        };

        const updateTodo = await Todo.findByIdAndUpdate({_id: id}, {title, description}, {new: true});

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
    };
};

todoCTRL.deleteTodo = async (req, res) => {
    const { id } = req.params;
    const { user } = req.headers;

    try {

        const verificar = await Todo.findOne({_id: id});
    
        if (verificar.user !== user){
            return res.status(401).send({
                ok: false,
                message: 'No tiene permisos para modificar el Todo'
            });
        };

        await Todo.findByIdAndDelete(id);

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