const URL = "https://api.github.com/users/";
const readline = require('readline');

const args = process.argv.slice(2);

const user = args[0];

const verActiviad = async(user) => {
    const res = await fetch(`${URL}${user}/events`);
    const data = await res.json();

    for(let elem of data){
        console.log(elem.type + " to " + elem.repo.name)
    }
};

verActiviad(user);


