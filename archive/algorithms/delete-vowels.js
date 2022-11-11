function solution(str) {
  const vowel = /[aeiouAEIOU]/g;
  // convert str to an array
  const arrayFromString = str.split("");
  // create a receiving array
  let receivingArray = [];
  // for each item in the original array, push the char to the receiving array unless it's a vowel
  arrayFromString.forEach((char) => {
    if (!char.match(vowel)) {
      receivingArray.push(char);
    }
  });
  // return the joined receiving array
  return receivingArray.join("");
}
