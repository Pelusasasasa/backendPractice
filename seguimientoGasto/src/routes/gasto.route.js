const { Router } = require('express');
const { postGasto, getAll, putOne } = require('../controllers/gasto.controllers');
const validarJWT = require('../middlewares/validar-jtw');


const router = Router();


router.use(validarJWT);

router.route('/')
    .get(getAll)
    .post(postGasto)
router.route('/:id')
    .put(putOne)


module.exports = router