// nextPrime returns first prime greater than n; n must be positive
// set x at second to last line to use the nextPrime function

const nextPrime = function (n) {
  let primesArray = [];

  // isPrime function tests whether a number is prime, takes array of primes as an argument
  const isPrime = function (testNum, arrayOfPrimes) {
    // use the array to determine whether testNum is prime
    for (i = 0; i < arrayOfPrimes.length; i++) {
      // if the square of the current iteration of the prime array is greater than the testNum, testNum is prime, so return true (we are filtering out non-primes using code below this if statement)
      if (arrayOfPrimes[i] ** 2 > testNum) {
        console.log(testNum + " is prime");
        return true;
      }
      // check whether testNum is divisible by the current iteration of the prime array, return false if it is
      if (!(testNum % arrayOfPrimes[i])) {
        console.log(
          testNum + " is not prime; it is divisible by " + arrayOfPrimes[i]
        );
        return false;
      }
    }
    // when we test n=2, arrayOfPrimes is empty, and we need to return true because 2 is prime
    console.log(testNum + " is prime");
    return true;
  };

  // function to create an array of primes in increasing order
  const createPrimesArray = function (array, hurdleNumber, testNum) {
    let hurdleExceeded = false;
    while (!hurdleExceeded) {
      if (isPrime(testNum, array)) {
        array.push(testNum);
        if (testNum > hurdleNumber) {
          return array;
        }
        testNum++;
      } else {
        testNum++;
      }
    }
  };

  // create array of primes until the largest prime is greater than the square root of n
  primesArray = createPrimesArray(primesArray, Math.sqrt(n), 2);
  console.log(primesArray);

  // check numbers incrementally greater than n to determine whether they are prime
  let notFoundYet = true;
  while (notFoundYet) {
    n++;
    // add another prime to array if n is greater than the square of the highest prime in the array
    if (n > primesArray[primesArray.length - 1] ** 2) {
      console.log("adding another prime to the array");
      primesArray = createPrimesArray(
        primesArray,
        Math.sqrt(n),
        primesArray[primesArray.length - 1] + 1
      );
      console.log(primesArray);
    }
    if (isPrime(n, primesArray)) {
      return n;
    }
  }
};

// set x to the number you want to test; x must be an interger greater than or equal to 1
let x = 3479;
console.log(
  "the lowest prime number that is greater than " + x + " is " + nextPrime(x)
);
