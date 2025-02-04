const gastoCTRL = {};

const retornoError = (err, res) => {
    res.status(500).send({
        ok: false,
        msg: err
    })
};

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
    const gasto = await Gasto.findOne({_id: id});
    
    console.log(gasto.user)
    console.log(req.uid)
    if(gasto.user !== req.uid){
        return res.status(401).json({
            ok: false,
            msg: 'El usuario no tiene privilegios'
        })
    }
};

module.exports = gastoCTRL;