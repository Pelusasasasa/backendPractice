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

blogCTRL.getAll = async(req, res) => {
    try {
        const blogs = await Blog.find();
        
        res.status(200).send({
            ok: true,
            blogs
        });
    } catch (error) {
        console.log(error);
        
        res.status(400).send({
            ok:false,
            message: error.message
        })
    }
};

blogCTRL.getForTags = async(req, res) => {
    const {texto} = req.params;


    try {
        const blogs = await Blog.find({ tags: texto.toUpperCase() });
        res.status(200).send({
            ok: true,
            blogs
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            ok: false,
            message: error.message
        })
    }

};

blogCTRL.getOne = async(req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findOne({_id: id});
        
        res.status(200).send({
            ok: true,
            blog
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            ok: false,
            error: error.message
        })
    }
};

blogCTRL.deleteOne = async(req, res) => {
    const { id } = req.params;
    
    try {
        const blog = await Blog.findOneAndDelete({_id: id});
        res.status(200).send({
            ok: true,
            blog,
            message: 'Blog Eliminado Correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            ok: false,
            message: error.message
        })
    }
};

blogCTRL.putOne = async(req, res) => {

    const { id } = req.params;

    try {
        const nuevoBlog = {
            ...req.body
        }
        const updateBlog = await Blog.findByIdAndUpdate(id, nuevoBlog, {new: true});
        res.status(200).send({
            ok: true,
            blog: updateBlog
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).send({
            ok: false,
            message: error.message
        })
    }

};

module.exports = blogCTRL;