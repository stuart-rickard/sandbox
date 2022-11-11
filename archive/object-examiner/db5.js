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
}

module.exports = {
  main,
};
