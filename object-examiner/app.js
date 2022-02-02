

// promises

const handleResolvedA = function ( argument ) {
    console.log( argument );
    console.log( 'inside A' );
    console.log( myPromise );
    return 'return from inside A'
}

const handleRejectedA = function ( argumentA ) {
    console.log( argumentA );
    console.log( 'inside rej A' );
}

const handleResolvedB = function ( argument ) {
    console.log( argument );
    console.log( 'inside B' );
}

const handleRejectedB = function ( argument ) {
    console.log( argument );
    console.log( 'inside rej B' );
}

const handleResolvedC = function ( argument ) {
    console.log( argument );
    console.log( 'inside c' );
}

const handleRejectedC = function ( argument ) {
    console.log( argument );
    console.log( 'inside rej c' );
}




const myPromise = new Promise(( resolve, reject ) => {
    x = Math.random();
    if ( x > 0.1 ) {
        console.log( x + ' is greater than 0.1 \n' )
        setTimeout(() => {
            resolve( [ 'myPromise is resolved', 'I am the myPromise object' ]  );
    }, 500)
    } else {
        console.log( x + 'is less than 0.1 \n' )
        reject( 'we are now in the rejected branch' )
    }
});


// returnsAFunction
myPromise()
.then(handleResolvedA, handleRejectedA)
.then(handleResolvedB, handleRejectedB)
.then(handleResolvedC, handleRejectedC);

                    // const returnsAnObject = function() {
                    //     return inquirer.prompt ({});
                    //     return example;
                    // }

                    // const returnsAFunction = new Promise(( resolve, reject ) => {
                    //     resolve( returnsAnObject );
                    // });
                    // console.log(returnsAnObject);
                    // console.log(returnsAnObject());
// .then

// await

// async

// const p1 = Promise.resolve('Hello');

// p1.then(value => {
//   console.log(value); // 👉️ Hello
// });

// function sum(a, b) {
//     return new Promise((resolve, reject) => {
//       resolve(a + b);
//     });
//   }
  
//   sum(5, 5).then(result => {
//     console.log(result); // 👉️ 10
//   });

  // this.

  // push new field into an object