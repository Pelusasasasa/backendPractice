const  userCTRL = {};

const bcrypt = require('bcryptjs');
const User = require("../model/User");
const { generarJTW } = require('../helpers/jtw');

userCTRL.createUser = async(req, res) => {
    const {name, email, password} = req.body;
    
    let usuario = await User.findOneAndDelete({ email });
    //Vemos si el usuario existe con esa mail
    if(usuario){
        return res.status(400).send({
            ok: false,
            message: 'Un usuario existe con ese correo'
        })
    };

    const newUser = new User({
        name,
        email,
        password
    });


    //Encriptrar Contraseña
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    const token = await generarJTW(newUser.id, newUser.password);
   
    res.status(201).send({
        ok: true,
        user: newUser,
        token
    });
};

userCTRL.login = async(req, res) => {
    const {email, password} = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ email });

        if (!user){
            res.status(400).json({
                ok: false,
                message: 'El usuario no existe con ese mail'
            });
        };
        
        //comprobar cotraseña
        console.log(user.password)
        console.log(password)
        const validatorPassword = bcrypt.compareSync(password, user.password);

        if(!validatorPassword){
            res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            });
        };

        //generar JTW
        const token = await generarJTW(user.id, user.password);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        })
    }

};

userCTRL.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};



module.exports = userCTRL;