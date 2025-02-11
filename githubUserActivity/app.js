const URL = "https://api.github.com/users/";
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv.slice(2);

const user = args[0];

const verActiviad = async(user) => {
    const res = await fetch(`${URL}${user}/events`);
    const data = await res.json();

    console.log(data.payload)
};

verActiviad(user);

