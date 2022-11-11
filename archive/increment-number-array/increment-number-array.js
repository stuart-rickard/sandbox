// algorithm solution from codesignal

function solution(digits) {
  let done = false;
  // start with last digit
  let currentIndex = digits.length - 1;
  console.log(currentIndex);

  while (!done) {
    // if current digit is 9, make current digit 0
    if (digits[currentIndex] == 9) {
      digits[currentIndex] = 0;
      console.log("there was a 9 at " + currentIndex);
      // restart with next higher digit
      currentIndex = currentIndex - 1;
      // except if there isn't one ...
      if (currentIndex == -1) {
        // ... use unshift to add a 1 at the start and we're done
        digits.unshift(1);
        done = true;
      }
    } else {
      // if current digit isn't 9, add 1 to current digit and we're done
      digits[currentIndex] = digits[currentIndex] + 1;
      console.log("done at " + currentIndex);
      done = true;
    }
  }
  return digits;
}

console.log(solution([9, 9, 9]));
