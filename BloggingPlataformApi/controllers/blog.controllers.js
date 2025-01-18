const blogCTRL = {};


const Blog = require('../model/Blogs');


blogCTRL.postOne = async(req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();

        res.status(201).send({
            ok: true,
            blog
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            message: error.message
        })
    }
};

module.exports = blogCTRL;