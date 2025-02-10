const { Router } = require('express');
const { postGasto, getAll, putOne, deleteOne, lastWeek, lastMonth, last3Month, customDate } = require('../controllers/gasto.controllers');
const validarJWT = require('../middlewares/validar-jtw');


const router = Router();


router.use(validarJWT);

router.route('/')
    .get(getAll)
    .post(postGasto)
router.route('/:id')
    .put(putOne)
    .delete(deleteOne)
router.route('/reportes/lastWeek')
    .get(lastWeek)
router.route('/reportes/lastMonth')
    .get(lastMonth)
router.route('/reportes/last3Month')
    .get(last3Month)
router.route('/reportes/:desde/:hasta')
    .get(customDate)

module.exports = router