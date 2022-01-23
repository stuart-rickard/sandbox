const { resolveAfterSecond } = require( './not-sync' );

async function f1() {
    var y = resolveAfterSecond(2)
    console.log(y);
    var x =  await resolveAfterSecond(10);
    console.log( 'did I wait?' )
    console.log(x); // 10
  }
  
f1();