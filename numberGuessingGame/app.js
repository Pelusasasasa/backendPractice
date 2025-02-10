const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('Welcome to the Number Guessing Game!');
console.log("I'm thinking of a number between 1 and 100.");
console.log("You have 5 chances to guess the correct number.");

console.log()

console.log("Please select the difficulty level:");
console.log("1. Easy (10 chances)")
console.log("2. Medium (5 chances)")
console.log("3. Hard (3 chances)");

let dificultad = 0;
let numero = Math.floor(Math.random() * 100) + 1;
console.log(numero)
let vidas = 0;
let bandera = false;

rl.question('Enter your choice: ', res => {
    if(res === "1" || res === "2" || res === "3"){
        dificultad = res;

    if ( dificultad === "1" ){
        vidas = 10;
        console.log("Great! You have selected the Easy difficulty level.")
    };

    if ( dificultad === "2" ){
        vidas = 5;
        console.log("Great! You have selected the Medium difficulty level.")
    };

    if ( dificultad === "3" ){
        vidas = 3;
        console.log("Great! You have selected the Hard difficulty level.")
    };

    console.log("Let's start the game!");
    jugar();
    }else{
        console.log('La dificultad no se encuentra en ese rango');
    };
});

let jugar = async() => {
  
    while (vidas > 0){
      const numeroAux = await llamarEntrada();
        
        if (numeroAux === numero) {
            console.log("Congratulations! You guessed the correct number in 4 attempts.");
            bandera = true;
            vidas = 0;
            rl.close();
        }else{
            console.log(`Incorrect! The number is less than ${numeroAux}.`);
            vidas--;
        }
    };
    
    //Si La bandera esta en false es porque nos quecamos sin vidas sino es poruqe ya ganamos
    if (!bandera) {
        console.log(`You have ${vidas} lives left`);
        rl.close();
    }
}



const llamarEntrada = () => {
    return new Promise((resolve) => {
        rl.question('Enter your guess: ', res => {
            const numero = parseInt(res)
            resolve(numero)
        });
    })
};