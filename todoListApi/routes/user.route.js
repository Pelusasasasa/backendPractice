const { Router } = require('express');
const router = Router();


const { getUsers, createUser, login } = require('../controllers/user.controllers');

router.route('/')
    .get(getUsers)
    .post(createUser)
router.route('/login')
    .post( login )


module.exports = router;