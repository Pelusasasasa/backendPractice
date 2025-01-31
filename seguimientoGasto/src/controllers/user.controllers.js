const userCTRL = {};

const bcrypt = require('bcryptjs')
const User = require('../model/Users');
const { generarJWT } = require('../helpers/jtw');

userCTRL.getAll = async(req, res) => {
    
    const users = await User.find();

    res.status(200).send({
        ok: true,
        users
    });

};

userCTRL.crearUsuario = async(req, res) => {

    try {
        const {name, email, password} = req.body;

        let usuario = await User.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        };

        usuario = new User( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JTW
        const token = await generarJWT(usuario._id, usuario.password);

        res.status(201).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administador'
        })
    }

};

userCTRL.loginUsuario = async(req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese mail'
            })
        };

        //confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            })
        };

        const token = await generarJWT( usuario._id, usuario.password);

        res.status(200).json({
            ok: true,
            id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor Hable con el administador'
        });
    }

};


module.exports = userCTRL;