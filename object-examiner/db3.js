// get the client
const mysql = require("mysql2/promise");

// create the connection
const getConnection = async function () {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer",
    database: "sandbox",
  });
  console.log(db);
};

module.exports = {
  getConnection,
};

// module.exports = db;
