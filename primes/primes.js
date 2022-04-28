// returns first prime greater than n; n is positive and less than 10^7

const nextPrime = function (n) {
  const limit = Math.pow(10, 7);
  let numberToTest = 1;
  let primesArray = [];

  // isPrime function tests whether a number is prime, takes array of primes as an argument
  const isPrime = function (testNum, arrayOfPrimes) {
    // check whether testNum is greater than the square of the largest prime; if so, there's a problem
    let largestPrime = arrayOfPrimes[arrayOfPrimes.length - 1] || 1;
    if (testNum > largestPrime ** 2) {
      // if (testNum < Math.pow(largestPrime, 2)) {
      console.log("testNum is too high in isPrime function");
      return "error";
    }

    // use the array to determine whether testNum is prime
    for (i = 0; i < arrayOfPrimes.length; i++) {
      // if the square of the current iteration of the prime array is greater than the testNum, testNum is prime, so return true (we are filtering out non-primes using code below this if statement)
      if (arrayOfPrimes[i] ** 2 > testNum) {
        console.log(testNum + " is prime");
        return true;
      }
      // check whether testNum is divisible by the current iteration of the prime array, return false if it is
      if (!testNum % arrayOfPrimes[i]) {
        console.log(
          testNum + " is not prime; it is divisible by " + arrayOfPrimes[i]
        );
        return false;
      }
    }
  };

  // function to create an array of primes in increasing order
  const createPrimesArray = function (array, hurdleNumber, testNum) {
    if (testNum > hurdleNumber) {
      console.log("testNum is too high in createPrimesArray function");
      return "error";
    }
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
  primesArray = createPrimesArray(primesArray, Math.sqrt(n), numberToTest);
  console.log(primesArray);

  // check numbers incrementally greater than n to determine whether they are prime
  let notFoundYet = true;
  while (notFoundYet) {
    n++;
    // add another prime to array if n is greater than the square of the highest prime in the array
    if (n > primesArray[primesArray.length - 1] ** 2) {
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

console.log(nextPrime(15));
