const { Router } = require('express');
const { crearCategory, getAll } = require('../controllers/category.controllers');
const router = Router();

router.route('/')
    .get(getAll)
    .post(crearCategory)


module.exports = router;