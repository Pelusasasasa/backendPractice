const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//cargar articulos desde el json
const articles = JSON.parse(fs.readFileSync('./data/articles.json', 'utf-8'));
console.log(articles)
//Rutas
app.get('/', (req, res) => {
    res.render('index', {articles});
});

app.get('/article/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id == id);
    res.render('article', {article});
}) 

//Servir Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Ejecuntandose en http://localhost:${PORT}`);
})