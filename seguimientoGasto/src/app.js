const express = require('express');
const dbConnection = require('./dataBase');
const cors = require('cors');

const PORT = '3000';

const app = express();

dbConnection();

app.use(express.json());
app.use(cors())

//middlewares
app.use('/api/users', require('./routes/user.route'));
app.use('/api/gastos', require('./routes/gasto.route'));
app.use('/api/categories', require('./routes/category.route'));

app.listen(PORT, () => {
    console.log('Servidor Corriente en el puerto ' + PORT);
});