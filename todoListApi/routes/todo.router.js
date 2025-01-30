const { Router } = require('express');
const router = Router();

const { getTodos, crearTodo, putTodo, deleteTodo } = require('../controllers/todo.cotrollers');

router.route('/')
    .post(crearTodo)
    .get(getTodos)
router.route('/:id')
    .put(putTodo)
    .delete(deleteTodo)
    


module.exports = router; 
