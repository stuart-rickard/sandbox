// LeetCode #8
// ranks very slow! see other file (string-to-int-fastest) - looks like I didn't need to screen to avoid value becoming out of range (e.g., larger than 2^31-).

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  // get length
  let length = s.length;
  console.log(length);
  // create array to receive digits
  let arr = [];
  let firstChar = false;
  let negative = false;
  let outOfRange = false;

  // parse the string

  for (index = 0; index < length; index++) {
    // use switch case
    switch (s[index]) {
      // case whitespace
      case " ":
        if (firstChar) {
          index = length; // to end loop
          break;
        } else {
          break; // to skip to next index
        }

      // case + or -
      //   if not firstChar, push to arr, else end loop
      case "+":
      case "-":
        if (firstChar) {
          index = length; // to end loop
          break;
        } else {
          firstChar = true;
          arr.push(s[index]);
          break;
        }

      // case digit
      //   push to arr
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        firstChar = true;
        arr.push(s[index]);
        break;

      // case anything else
      default:
        index = length;

      //   end loop
    }
  }
  // remove sign

  if (arr[0] === "+") {
    arr.splice(0, 1);
  }
  if (arr[0] === "-") {
    arr.splice(0, 1);
    negative = true;
  }

  // remove leading zeros
  while (arr[0] === "0") {
    arr.splice(0, 1);
  }

  // check range

  let maxArr = negative
    ? [2, 1, 4, 7, 4, 8, 3, 6, 4, 8]
    : [2, 1, 4, 7, 4, 8, 3, 6, 4, 7];

  if (arr.length == maxArr.length) {
    for (i = 0; i < arr.length; i++) {
      if (arr[i] > maxArr[i]) {
        outOfRange = true;
        break;
      }
      if (arr[i] < maxArr[i]) {
        break;
      }
    }
  }

  if (arr.length > maxArr.length) {
    outOfRange = true;
  }

  console.log(arr);
  console.log(negative, " negative");
  console.log(outOfRange, " out of range");

  // too large; return 2147483647
  // too small; return -2147482648
  if (outOfRange) {
    return negative ? -2147483648 : 2147483647;
  }

  let value = 0;

  for (j = 0; j < arr.length; j++) {
    if (negative) {
      value = value - parseInt(arr[j]) * Math.pow(10, arr.length - 1 - j);
    } else {
      value = value + parseInt(arr[j]) * Math.pow(10, arr.length - 1 - j);
    }
    console.log(value);
  }

  // send output
  return value;
};

console.log(myAtoi("   -0000003452929.88lkjlkjljne"));
