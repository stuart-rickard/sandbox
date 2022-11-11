function solution(inputString) {
  // break string into array
  let array = inputString.split("");
  // copy this array and reverse it
  let reverse = [...array];
  reverse.reverse();
  // compare the two arrays; if same, return true, else return false
  for (i = 0; i < (array.length - 1) / 2; i++) {
    if (array[i] !== reverse[i]) {
      return false;
    }
  }
  return true;
}
