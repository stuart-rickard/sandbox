const { getConnection } = require("./db3.js");

// let arrayZero = [];

const main = async function () {
  // get the connection
  const db = await getConnection();
  console.log("got connection");
  const result = await db.execute("SELECT * FROM sandyments");
  // console.log(result);
  // arrayZero = result[0];
  console.log(result[0]);
  // console.log( arrayZero);
};

main();

// setTimeout(main(), 10000);

//   setTimeout( async function () {
//     let x = await connection.query('select * from sandyroles');
//     console.log(x);

//   }, 2000);
