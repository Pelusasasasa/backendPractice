const { Router } = require('express');
const { postGasto, getAll } = require('../controllers/gasto.controllers');


const router = Router();

router.route('/')
    .get(getAll)
    .post(postGasto)


module.exports = router