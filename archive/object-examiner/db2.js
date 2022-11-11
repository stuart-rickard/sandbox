// create the connection
const db = require('mysql2/promise');
// get the client

let arrayZero = [];

async function main() {
  const connection = await db.createConnection({host:'localhost', user: 'root', password: 'qwer', database: 'sandbox'});
    const result = await connection.query('SELECT * FROM sandyments');
    // console.log(result);
    arrayZero = result[0];
    console.log(result[0]);
    console.log( arrayZero);
  };

  main();

  setTimeout( async function () {
    let x = await connection.query('select * from sandyroles');
    console.log(x);

  }, 2000);