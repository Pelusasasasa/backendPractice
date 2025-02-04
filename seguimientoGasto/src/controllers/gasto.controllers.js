const gastoCTRL = {};

const retornoError = (err, res) => {
    res.status(500).send({
        ok: false,
        msg: err
    })
};

const { default: mongoose } = require('mongoose');
const Gasto = require('../model/Gasto');

gastoCTRL.postGasto = async(req, res) => {

    try {

        const gastoGuardado = new Gasto(req.body);
        const { user } = req.headers;

        gastoGuardado.user = user;

        await gastoGuardado.save();

        res.json({
            ok: true,
            gasto: gastoGuardado
        });

    } catch (error) {
        console.log(error)
        res.status('500').send({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    };

};

gastoCTRL.getAll = async(req, res) => {

    try {
        //Traemos los gastos y los devolvemos con el suario y la categoria
        const gastos = await Gasto.find()
        .populate('user', ['name', 'email'])
        .populate('category', ['name']);

        res.status(200).json({
            ok: true,
            gastos
        })
    } catch (error) {
        retornoError(error, res);
    }

};

gastoCTRL.putOne = async(req, res) => {
    const { id } = req.params;
    try {
        const idUser = req.uid;
        const gasto = await Gasto.findOne({_id: id});

        const objectId = new mongoose.Types.ObjectId(idUser);
        
        if(!gasto.user.equals(objectId)){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene privilegios'
            })
        }

        const gastoModificado = await Gasto.findOneAndUpdate({_id: id}, req.body);

        res.status(200).json({
            ok: true,
            gastoModificado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(({
            ok: false,
            msg: 'Por Favor Hable con el administrador'
        }))
    }
};

gastoCTRL.deleteOne = async(req, res) => {
    const { id } = req.params;

    const usuarioId = new mongoose.Types.ObjectId(req.uid);

    try {
        const gasto = await Gasto.findOne({_id: id});
        
        if(!gasto.user.equals(usuarioId)){
            res.status(401).json({
                ok: false,
                msg: 'Usuario no Autorizado'
            });
        };

        const gastoEliminado = await Gasto.findOneAndDelete({_id: id});

        res.status(200).json({
            ok: true,
            msg: 'Gasto Eliminado',
            gastoEliminado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable Con el administrador'
        });
    };


};


module.exports = gastoCTRL;