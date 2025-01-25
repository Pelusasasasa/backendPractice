const { Router } = require('express');
const router = Router();


const { getUsers, createUser } = require('../controllers/user.controllers');

router.route('/')
    .get(getUsers)
    .post(createUser)


module.exports = router;