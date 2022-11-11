const { main } = require("./db6");

const test = async function () {
  const db = await main();
  console.log("\n after main \n \n");
  // console.log(db);
  // query database
  let selected = await db.promise().query("SELECT * FROM sandyments");
  console.log("\n selected--------------------------------------------");
  console.log(selected);
};

test();
