const { Router } = require('express');
const router = Router();

const { getTodos } = require('../controllers/todo.controllers');

router.route('/')
    .get(getTodos);


module.exports = router; 
