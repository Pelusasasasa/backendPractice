const { Router } = require('express');
const { getAll, crearUsuario, loginUsuario } = require('../controllers/user.controllers');

const router = Router();

router.route('/')
    .get(getAll)
router.route('/register')
    .post(crearUsuario)
router.route('/login')
    .post(loginUsuario)


module.exports = router;