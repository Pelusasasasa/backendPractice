#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const URL = 'https://api.themoviedb.org/3/movie/';
const key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzM2MjllMzE5OGYyMGQwYjJjMWM3MDQ4N2EwZTU3ZiIsIm5iZiI6MTczOTM5Mzc3Ny42Miwic3ViIjoiNjdhZDBhZjEyMWJjZjE4MjFlOWYzOGVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LQ3tIq78rhIFyOdol9v6iQ5qPwS2wOqNbtkWVNLRR-w'

const consumirApi = async(texto) => {

    const options = {
        method: 'GET',
        headers: { 
            accept: 'application/json',
            Authorization: `Bearer ${key}`
        }
    }

    const res = await fetch(`${URL}${texto}`, options);
    const data = (await res.json()).results;
    
    data.forEach( ({original_title}) => {
        console.log(original_title)
    })
};

program
    .name('Expense-Cli')
    .description('na Cli para traer y mostrar Peliculas')
    .version('1.0.0');

program
    .command('list')
    .description('Mustra las peliculas')
    .requiredOption('-t, --type <type>', 'Tipo de categoria de las peliculas')
    .action(async({type}) => {
        let arg = type;

        arg = arg === 'top' ? 'top_rated' : type;
        arg = arg === 'playing' ? 'now_playing' : arg;
        
        await consumirApi(arg);
});

//Parsear los argumentos de la terminal
program.parse(process.argv);
