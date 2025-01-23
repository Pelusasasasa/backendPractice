const convertirTemperatura = (valor, de, hasta) => {
    let aux = valor;
    switch (de) {
        case 'ml':
            aux = valor * 1;
        break;
        case 'cm':
            aux = valor * 10;
        break;
        case 'm':
            aux = valor * 1000;
        break;
        case 'km':
            aux = valor * 10000000;
        break;
        case 'pu':
            aux = valor * 35.4;
        break;
        case 'pi':
            aux = valor * 304.8;
        break;

        case 'y':
            aux = valor * 914.4;
        break;

        case 'mi':
            aux = valor * 1612903.2258065;
        break;

        case 'c':
            aux = aux / 1;
        break;

        case 'f':
            aux = (valor - 32) / 1.8;
        break;
        case 'k':
            aux = valor - 273.15;
        break;

        case 'mg': 
            aux = valor / 1;
        break;

        case 'g': 
            aux = valor * 1000;
        break;

        case 'kg': 
            aux = valor * 1000000;
        break;

        case 'o': 
            aux = valor * 28349.54;
        break;

        case 'l': 
            aux = valor * 0.0625;
        break;
    
        default:
            break;
    };

    switch(hasta){
        case 'ml':
            aux = valor / 1;
        break;
        case 'cm':
            aux = valor / 10;
        break;
        case 'm':
            aux = valor / 1000;
        break;
        case 'km':
            aux = valor / 10000000;
        break;
        case 'pu':
            aux = valor / 35.4;
        break;
        case 'pi':
            aux = valor / 304.8;
        break;

        case 'y':
            aux = valor / 914.4;
        break;

        case 'mi':
            aux = valor / 1612903.2258065;
        break;

        case 'c':
            aux = aux * 1;
        break;

        case 'f':
            aux = (aux * 1.8 ) + 32;
        break;
        case 'k':
            aux = aux + 273.15;
        break;

        case 'mg': 
            aux = valor * 1;
        break;

        case 'g': 
            aux = valor / 1000;
        break;

        case 'kg': 
            aux = valor / 1000000;
        break;

        case 'o': 
            aux = valor / 28349.54;
        break;

        case 'l': 
            aux = valor / 453592.37;
        break;
    }


    return aux;
};

module.exports = { convertirTemperatura};