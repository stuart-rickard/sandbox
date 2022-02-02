// const inquirer = require( 'inquirer' );

class Example {
    constructor() {
        this.name = "example object",
        this.array = [
            'the', 'long', 'and', 'winding', 'road'
        ],
        this.innerObject = {
            one: "one",
            'two': "two",
            three: [ 4, 5, 6 ]
        },
        this.func = function() {
            console.log( 'I am func' )
            return {
                location: 'within func',
                subfunc: function(a = 4, b = 7) {
                    console.log( 'I am subfunc' )
                    console.log( 'here is the product of ' + a + ' and ' + b + ': ' + a*b )
                    return a*b
                }

            }
        }
    }

    addAnotherField( arg ) {
        this.anotherField = arg;
    }
}

const example = new Example;
// example.addAnotherField( 'my text' );
// const nameField = example.name;
const differentExampleInnerObject = new Example;
console.log(differentExampleInnerObject.innerObject)
// const thirdExampleWithAddedField = new Example().addAnotherField();
// const thirdExampleWithAddedField = new Example().addAnotherField.anotherField;

console.log( example );
// console.log( nameField );
// console.log( differentExampleInnerObject );
// console.log(thirdExampleWithAddedField);
// example.anotherField = 'text of another Field';
// console.log( example );

// console.log( example.innerObject.two );
// console.log( example.func );
// console.log( example.func() );
// console.log ( ' ---------------------------- ');
// console.log( example.func().subfunc() );


// objects

// promises

// const handleResolvedA = function ( argument ) {
//     console.log( argument );
//     console.log( 'inside A' );
//     console.log( myPromise );
//     return 'return from inside A'
// }

// const handleRejectedA = function ( argumentA ) {
//     console.log( argumentA );
//     console.log( 'inside rej A' );
// }

// const handleResolvedB = function ( argument ) {
//     console.log( argument );
//     console.log( 'inside B' );
// }

// const handleRejectedB = function ( argument ) {
//     console.log( argument );
//     console.log( 'inside rej B' );
// }

// const handleResolvedC = function ( argument ) {
//     console.log( argument );
//     console.log( 'inside c' );
// }

// const handleRejectedC = function ( argument ) {
//     console.log( argument );
//     console.log( 'inside rej c' );
// }




// const myPromise = new Promise(( resolve, reject ) => {
//     x = Math.random();
//     if ( x > 0.1 ) {
//         console.log( x + ' is greater than 0.1 \n' )
//         setTimeout(() => {
//             resolve( [ 'myPromise is resolved', 'I am the myPromise object' ]  );
//     }, 500)
//     } else {
//         console.log( x + 'is less than 0.1 \n' )
//         reject( 'we are now in the rejected branch' )
//     }
// });

                                                    // const returnsAnObject = function() {
                                                    //     return inquirer.prompt ({});
                                                    //     return example;
                                                    // }

                                                    // const returnsAFunction = new Promise(( resolve, reject ) => {
                                                    //     resolve( returnsAnObject );
                                                    // });
                                                    // console.log(returnsAnObject);
                                                    // console.log(returnsAnObject());

// returnsAFunction
// myPromise
//     .then(handleResolvedA, handleRejectedA)
//     .then(handleResolvedB, handleRejectedB)
//     .then(handleResolvedC, handleRejectedC);

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