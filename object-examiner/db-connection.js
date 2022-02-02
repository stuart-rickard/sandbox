async function main() {
    // get the client
    const db = require('mysql2/promise');
    // create the connection
    const connection = await db.createConnection({host:'localhost', user: 'root', password: 'qwer', database: 'sandbox'});
    // query database
    const result = await connection.query('SELECT * FROM sandyments');
    console.log(result)
  };

  main();