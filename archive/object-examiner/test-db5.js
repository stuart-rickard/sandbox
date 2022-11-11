const { main } = require("./db5");

const test = async function () {
  await main();
  console.log("after main");
  // query database
  const selected = await connection.execute("SELECT * FROM sandyments");

  console.log(selected);
};

test();
