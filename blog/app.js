const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

//Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let auth = false;


//cargar articulos desde el json
const dataFolder = path.join(__dirname, 'data');

const loadArticles = () => {

    const articles = [];

    const files = fs.readdirSync(dataFolder);
    
    files.forEach(file => {
        const filePath = path.join(dataFolder, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        articles.push(content);
    });

    return articles;
};

let articles = loadArticles();

//Rutas
app.get('/', (req, res) => {
    res.render('index', {articles});
});

app.get('/admin', (req, res) => {

    if (auth) {
        res.render('admin', {articles});
    }else{
        res.redirect('auth');
    }
});

app.get('/auth', (req, res) => {

    res.render('auth');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/article/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id == id);
    res.render('article', {article});
});

app.post('/authentication', (req, res) => {

    const {user, password} = req.body;
    console.log(req.body)

    if(user == 'admin' && password == 'admin'){
        
        auth = true;
        return res.redirect('admin');

    };

    res.redirect('/auth');
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id == id);

    const fileName = path.join(dataFolder, `${article.id}.json`);
    fs.writeFileSync(fileName, JSON.stringify(article, null, 2));

    res.render('edit', {article});
});

app.post('/add-article', (req, res) => {

    const { articleTitle, articleDate, articleContent } = req.body;
    
    const newArticle = {
        id: articles.length + 1,
        title: articleTitle,
        fecha: articleDate,
        text: articleContent.trim()
    };

    articles.push(newArticle);

    const fileName = path.join(dataFolder, `${newArticle.id}.json`);
    fs.writeFileSync(fileName, JSON.stringify(newArticle, null, 2));

    res.redirect('/admin');

});

app.post('/delete-article/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    articles = articles.filter(article => article.id != id);
    
    const fileName = path.join(dataFolder, `${id}.json`);
    fs.unlinkSync(fileName);

    res.redirect('/admin');
});

app.post('/edit-article/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const article = articles.find(article => article.id == id);

    article.title = req.body.articleTitle;
    article.fecha = req.body.articleDate;
    article.text = req.body.articleContent.trim();

    res.redirect('/admin');
    
});


//Servir Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Ejecuntandose en http://localhost:${PORT}`);
});