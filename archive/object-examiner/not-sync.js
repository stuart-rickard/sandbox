function resolveAfterSecond(x) {
    // return( ' new return')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 750);
    });
  }
  
//   async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
//   }
  
//   f1();

//   async function f2() {
//     const thenable = {
//       then: function(resolve, _reject) {
//                   setTimeout(() => {
//                     resolve('2 seconds');
//                   }, 2000);
//                 }
//       };
    
//     console.log(await thenable); // resolved!
//   }
  
//   f2();

module.exports = {
    // await resolveAfter2Seconds;
    resolveAfterSecond,

}