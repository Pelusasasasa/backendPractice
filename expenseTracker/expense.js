#!/usr/bin/env node

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

const archivoGastos = './archivoGastos.json';

const gastos = [];

if(!fs.existsSync(archivoGastos)){
    fs.createWriteStream(archivoGastos);
}else{
    const data = fs.readFileSync(archivoGastos,'utf-8');

    if(data){
        let aux = JSON.parse(data);
        gastos.push(...aux);
    };
};

const agregarGasto = (desc, amount) => {

    const nuevoGasto = {
        id: gastos.length,
        date: new Date(),
        desc,
        amount
    };

    //Agregamos el gasto a al arreglo temporal
    gastos.push(nuevoGasto);

    //Agregamos el gasto al archivo
    fs.writeFileSync(archivoGastos, JSON.stringify(gastos, null, null));

    console.log(`Se agrego correctamente el gasto ${nuevoGasto.id}`);

};

const eliminarGasto = (id) => {

    const nuevoGastos = gastos.filter(elem => elem.id != id);
    
    if(gastos.length === nuevoGastos.length){
        console.log('No existe el gasto con ese id');
        return;
    };

    fs.writeFileSync(archivoGastos, JSON.stringify(nuevoGastos, null, 2));

    console.log(`Se elimino el gasto con id ${id}`);
};

const actualizarGasto = (id, desc, amount) => {

    const gastoActualizado = gastos.find(elem => elem.id == id);

    if(!gastoActualizado){
        console.log('No se encuntra ese gasto');
    }else{
        gastoActualizado.desc = desc;
        gastoActualizado.amount = amount;

        fs.writeFileSync(archivoGastos, JSON.stringify(gastos, null, 2));
    };

};

const mostrarGastos = () => {
    console.log('ID  DATE       DESCRIPTION  AMOUNT')
    gastos.forEach( ({id, date, desc, amount}) => {
        console.log(`${id.toString().padStart(2, "0")}  ${date.slice(0, 10).split('-', 3).reverse().join('/')}  ${desc}  ${amount}`);
    })

};

const sumarGastos = (args = 'all') => {
    let total = 0;

    if(args === 'all'){
        gastos.forEach( elem => total += elem.amount);
    }else{
        gastos.forEach( ({date, amount}) => {
            let month = date.slice(5, 7);

            if(parseInt(args) === parseInt(month)){
                total += amount;
            };
        });
    };

    console.log(`Total Expenses: $${total.toFixed(2)}`);

};

program
    .name('Expense-Cli')
    .description('Una cli para seguimiente de gastos')
    .version('1.0.0');

//Definir Comanod para Mostrar Los gastos
program
    .command('list')
    .description('Muestra una lista con los gastos')
    .action(() => {
        mostrarGastos();
    });

program
    .command('summary')
    .description('Suma todos los gastos que pasemos por paramntros del mes')
    .option('-m, --month <month>', 'Mes para el resumen(1, 12)', 'all')
    .action(({month}) => {
        sumarGastos(month);
});

program
    .command('add')
    .description('Vamos a agregar un gasto al arreglo, pasando como parametros la descriocion y precio')
    .requiredOption('-d, --description <description>', 'Descripcion Para agregar')
    .requiredOption('-a, --amount <amount>', 'Importe Para agregar')
    .action(({description, amount}) => {
        if(isNaN(amount)){
            console.log("Elegir por favor un numero en el precio")
            return;
        };

        if(description.lenth === 0){
            console.log('La descripcion no puede ser vacia!!!');
            return;
        };

        agregarGasto(description, amount);
}); 

program
    .command('delete')
    .description('Vamos a borrar un gasto del arreglo, pasando como parametro el id')
    .requiredOption('-i, --id <id>', 'Id a eliminar')
    .action( ({ id }) => {
        eliminarGasto(id);
});

program
    .command('update')
    .description('Vamos a actualizar un gasto al arreglo, pasando como parametros la descriocion y precio')
    .requiredOption('-i, --id <id>', 'id Para Modificar')
    .requiredOption('-d, --description <description>', 'Descripcion Para Modificar')
    .requiredOption('-a, --amount <amount>', 'Importe Para Modificar')
    .action(({id, description, amount}) => {
        if(isNaN(amount)){
            console.log("Elegir por favor un numero en el precio")
            return;
        };

        if(description.lenth === 0){
            console.log('La descripcion no puede ser vacia!!!');
            return;
        };
        actualizarGasto(id, description, amount);
}); 


    
//Parsear los argumentos de la terminal
program.parse(process.argv);


//mostrarTodos();
//sumarGastos("1");
//agregarGasto('Probando', 25000);
// actualizarGasto(1, 'Probando 2', 30000);