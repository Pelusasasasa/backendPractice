const validarJWT = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validacion'
        });
    };


    try {
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}