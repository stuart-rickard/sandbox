const { main } = require("./db4");

const test = async function () {
  await main();
  console.log("after main");
};

test();
