async function main() {
  // get the client
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer",
    database: "sandbox",
  });
  // query database
  const selected = await connection.execute("SELECT * FROM sandyments");

  console.log(selected);
}

module.exports = {
  main,
};
