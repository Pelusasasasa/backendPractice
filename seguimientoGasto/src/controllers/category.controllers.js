const categoryCTRL = {};

const Category = require('../model/Category');

categoryCTRL.crearCategory = async(req, res) => {

    try {
        const newCategory = new Category(req.body);

        await newCategory.save();

        res.status(201).json({
            ok: true,
            newCategory
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    };

};

categoryCTRL.getAll = async(req, res) => {
    
    try {
        const categorias = await Category.find();
        res.status(200).json({
            ok: true,
            categorias
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

module.exports = categoryCTRL;