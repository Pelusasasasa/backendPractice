const { Router } = require('express');
const { postOne, deleteOne, getAll, getOne, putOne, getForTags } = require('../controllers/blog.controllers');

const router = Router();



router.route('/')
    .post(postOne)
    .get(getAll)
router.route('/:id')
    .get(getOne)
    .delete(deleteOne)
    .put(putOne)
router.route('/filter/:texto')
    .get(getForTags)

module.exports = router;