async function main() {
  // get the client
  const mysql = require("mysql2");
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer",
    database: "sandbox",
  });
  console.log("after connection");
  // console.log(connection);
  let queryResult = await connection
    .promise()
    .query("SELECT * FROM sandyroles");
  console.log("queryResult is: \n" + queryResult);
  console.log("\n queryresult[0]------------------- \n" + queryResult[0]);
  return connection;
}

module.exports = {
  main,
};
