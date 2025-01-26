const jtw = require('jsonwebtoken');
require('dotenv').config();

const generarJTW = (uid, password) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, password };

        jtw.sign(payload, process.env.JTW, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error){
                console.log(error);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    });
};


module.exports = {
    generarJTW
}