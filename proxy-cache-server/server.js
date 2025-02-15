const express = require('express');
const NodeCache = require('node-cache');

const { createProxyMiddleware } = require('http-proxy-middleware');

//Creamos una Instancia de node-cache con un tiempo de vida
const cache = new NodeCache({ stdTTL: 600 });

//Creamos una aplicacion de express
const app = express();

//Midleware para manejar la cache
const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedResponse = cache.get(cacheKey);

    if(cachedResponse){
        console.log(`Sirviendo desde la cache: ${cacheKey}`);
        res.send(cachedResponse);
    }else{
        console.log(`Haciendo solicitud al servidor de origen ${cacheKey}`);
        next();
    }
};

//configurar el proxy
const proxy = createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
        const cacheKey = req.originalUrl;
        let body = "";
        console.log("a")

        proxyRes.on('data', (chunk) => {
            body += chunk;
        });

        
        //Almacenar la respuesta en cache
        proxyRes.on('end', () => {
            console.log(`Almacenar en cache: ${cacheKey}`)
            cache.set(cacheKey, body);
            res.send(body)
        });
    },
    onError: (err, req, res) => {
        console.error('Error en el proxy:', err.message);
        res.status(500).send('Error al conectar con el servidor de origen');
    },
});

//Usar el middleware de cache y el proxy
app.use(cacheMiddleware);
app.use('/', proxy);

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor Andando en el puerto ' + PORT);
});