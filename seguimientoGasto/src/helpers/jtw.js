const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (uid, password) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, password};

        jwt.sign(payload, process.env.JTW, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err){
                console.log(err);
                reject('No se pudo generar el token')
            };
            resolve( token )
        })
    })
};

module.exports = {
    generarJWT
}