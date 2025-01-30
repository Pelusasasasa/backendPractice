require('dotenv').config();
const express = require('express');
const dbConnection = require('./database');

const app = express();

dbConnection();

const PORT = 3000;

app.use(express.json());

//middlewares
app.use('/api/users', require('./routes/user.route'));
app.use('/api/todos', require('./routes/todo.router'));

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log('Servidor Corriendo en el puerto: ' + PORT);
});