// const maxCharCode = 16384;
const maxCharCode = 60;
const numberOfStrings = 100;
const minimumLength = 3;
const maximumLenth = 20;

for (n = 0; n < numberOfStrings; n++) {
  let string = "";
  let length =
    Math.floor(Math.random() * (maximumLenth - minimumLength)) +
    1 +
    minimumLength;
  for (m = 0; m < length; m++) {
    string = string.concat(
      String.fromCharCode(Math.floor(Math.random() * maxCharCode) + 15)
    );
    //string = string + etc.  may have better performance
  }
  console.log(string);
  // console.log("\n---------" + n + "   " + m + "\n");
}
