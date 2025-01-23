const length = document.getElementById('length');
const weight = document.getElementById('weight');
const temperature = document.getElementById('temperature');

const optionsLength = document.querySelectorAll('.length');
const optionsWeight = document.querySelectorAll('.weight');
const optionsTemperature = document.querySelectorAll('.temperature');

const valor = document.getElementById('valor');
const unitFrom = document.getElementById('unitFrom');
const unitTo = document.getElementById('unitTo');

const form = document.getElementById('form');
const result = document.getElementById('result');

const response = document.getElementById('response');

const convert = document.getElementById('convert');
const reset = document.getElementById('reset');


const convertir = async() => {
    const data = await fetch('http://localhost:3000/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valor: valor.value,
            unitFrom: unitFrom.value,
            unitTo: unitTo.value,
        })
    });

    const resultado = await data.json();
    form.classList.add('none');
    result.classList.remove('none');
    console.log(resultado.valor.toString())
    response.innerText = `${valor.value} ${unitFrom.value}  = ${resultado.valor.toString().length > 10 ? resultado.valor.toFixed(10) : resultado.valor} ${unitTo.value}`;
};

const apretarEnter = (e) => {
    if(e.keyCode === 13 ) {
        if(e.target.id === 'valor'){
            unitFrom.focus();
        };
        console.log(e.target.id)
        if (e.target.id === 'unitFrom'){
            unitTo.focus();
        };

        if(e.target.id === 'unitTo'){
            convert.focus();
        }
    };
};

const clickPestaña = (e) => {
    if(!e.target.classList.contains('activo')){
        document.querySelector('.activo').classList.remove('activo');
        e.target.classList.add('activo');
    };
    
    let aux = document.querySelectorAll('option');
    for(let option of aux){
        option.classList.add('none');
    };

    if(e.target.id === 'length'){
        for(let option of optionsLength){
            option.classList.remove('none');
            unitFrom.value = 'ml';
            unitTo.value = 'ml';
        };
    };

    if(e.target.id === 'weight'){
        for(let option of optionsWeight){
            option.classList.remove('none');
            unitFrom.value = 'mg';
            unitTo.value = 'mg';
        };
    };

    if(e.target.id === 'temperature'){
        for(let option of optionsTemperature){
            option.classList.remove('none');
            unitFrom.value = 'c';
            unitTo.value = 'c';
        };
    };
};

const resetear = () => {
    form.classList.remove('none');
    result.classList.add('none');
    valor.value = '';
};

convert.addEventListener('click', convertir);
reset.addEventListener('click', resetear);


valor.addEventListener('keyup', apretarEnter);
unitFrom.addEventListener('keyup', apretarEnter);
unitTo.addEventListener('keyup', apretarEnter);

length.addEventListener('click',clickPestaña);
weight.addEventListener('click',clickPestaña);
temperature.addEventListener('click',clickPestaña);