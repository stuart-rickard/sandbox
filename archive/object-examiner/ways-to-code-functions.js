// IIFE
(function () {
  // whatever code
})();

// ES5
// function expression - get hoisted but can't be run until after line 8
const myFunction = function (param) {
  // code
};

myFunction(param);

// function declaration - gets hoisted and can be called at any time - not allowed in ES6?
function myFunction2() {
  // code
}

myFunction2();

// ES6
// function expression - get hoisted but can't be run until after line 8
const myFunction4 = function (param) {
  // code
};

myFunction4(param);

const myFunction3 = () => {
  // code
};

const my5 = (oneParam) =>
  oneParam.map((dog) => ({ name: dog.name, color: dog.color }));

const my6 = (param2) => {
  return param2 + 2;
};

const my7 = (param3) => param3 + 3;
