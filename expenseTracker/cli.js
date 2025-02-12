// Importar Commander
const { Command } = require('commander');
const program = new Command();

// Configurar el nombre y la descripción del programa
program
  .name('mi-cli')
  .description('Una CLI de ejemplo para saludar al usuario')
  .version('1.0.0');

// Definir un comando
program
  .command('saludar <nombre>') // <nombre> es un argumento requerido
  .description('Saluda al usuario')
  .action((nombre) => {
    console.log(`¡Hola, ${nombre}!`);
  });

// Parsear los argumentos de la terminal
program.parse(process.argv);