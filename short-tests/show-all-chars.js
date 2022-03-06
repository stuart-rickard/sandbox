const maxCharCode = 16384;
// const maxCharCode = 256;
let string = "";

for (m = 0; m <= maxCharCode; m++) {
  string = string.concat(String.fromCharCode(m), ".");
}
console.log(string);
