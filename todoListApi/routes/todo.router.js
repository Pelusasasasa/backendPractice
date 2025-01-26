const { Router } = require('express');
const router = Router();

const { getTodos, crearTodo, putTodo, deleteTodo } = require('../controllers/todo.controllers');

router.route('/')
    .get(getTodos)
    .post(crearTodo)
router.route('/:id')
    .put(putTodo)
    .delete(deleteTodo)


module.exports = router; 
