require('dotenv').config();

const express = require('express');
const cors = require('cors');

//Ceando el servidor con express
const app = express();

const puerto = process.env.PORT || 3000;

app.use(cors());

app.use( express.json() );

app.use('/posts', require('./routes/blogs.route'));

app.listen( puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
});