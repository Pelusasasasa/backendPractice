const express = require('express');
const cors = require('cors');
const { convertirTemperatura } = require('./funciones');
const app = express();
const PORT = 3000;

//midlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cors())

app.post('/convert', (req, res) => {

    const {valor, unitFrom, unitTo} = req.body;
    const resp = convertirTemperatura(valor, unitFrom, unitTo);
    res.send({valor: resp});

});

//Iniciar el servidor en el puerto PORT
app.listen(PORT, () => {
    console.log('Servidor corriente en el puerto ' + PORT);
});