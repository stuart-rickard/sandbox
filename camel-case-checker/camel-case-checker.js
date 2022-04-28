// this function was created for a codesignal algorithm

function solution(words, variableName) {
  // empty array to collect parsed chunks
  let parsedArray = [];
  // empty string to build chunks
  let collectionString = "";

  // function to check whether a letter is a capital
  const isCapital = function (letter) {
    let capitals = /[A-Z]/g;
    if (letter.match(capitals)) {
      return true;
    } else {
      return false;
    }
  };

  // parse variableName into an array
  let eachLetterArray = [];
  eachLetterArray = variableName.split("");

  // collect all letters before capital letter
  // first letter goes into the empty string
  collectionString = collectionString + eachLetterArray[0];
  // each following letter is added to the empty string unless it is a capital
  // if it's a capital, the current chunk is pushed to the array of chunks and the string becomes the capital letter
  for (i = 1; i < eachLetterArray.length; i++) {
    if (isCapital(eachLetterArray[i])) {
      parsedArray.push(collectionString);
      collectionString = eachLetterArray[i];
    } else {
      collectionString = collectionString + eachLetterArray[i];
    }
  }
  // when you get to the end, the current chunk is pushed to the array of chunks
  parsedArray.push(collectionString);

  // compare parsed array with the words array; each element in the parsed array should be in the words array (though not capitalized)
  for (i = 0; i < parsedArray.length; i++) {
    if (!words.includes(parsedArray[i].toLowerCase())) {
      return false;
    }
  }

  return true;
}
