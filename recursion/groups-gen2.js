function cl(log) {
  console.log(log);
}

// e 0, e 1, d 2, d 3, d 4, c 5, b 6, b 7, b 8, a 9, a 10, a 11, a 12
let sourceArray = [
  "e",
  "e",
  "d",
  "d",
  "d",
  "c",
  "b",
  "b",
  "b",
  "a",
  "a",
  "a",
  "a",
  "a",
];
// let lowestIndexOfTypeArray = [0, 2, 5, 6, 9];
let nextKeyIndexArray = [null, null, 0, 0, 0, 2, 5, 5, 5, 6, 6, 6, 6, 6];
let nextKeyIndexArray2 = [null, null, 0, 1, 2, 2, 5, 6, 7, 6, 7, 8, 9]; // is this better? XXXXXXXXXX

function translate(array) {
  return array.map((value) => sourceArray[value]);
}

let workingArray = [null, null, null, null, null];
let collectionArray = [];

// function fillLowest(startIndex) fill with highest sequential keyIndex
// faster way to do this is to create an array and then move values?  Or use map function?
function fillLowest(startIndex) {
  for (ind = startIndex; ind < workingArray.length; ind++) {
    workingArray[ind] =
      sourceArray.length - 1 - (workingArray.length - 1 - ind);
  }
  cl("fillLowest");
  cl(workingArray);
  cl(translate(workingArray));
}

function addToCollection(array) {
  collectionArray.push([...array]);
  cl("------ added to collection");
  cl(workingArray);
  cl(translate(workingArray));
}

// placeIndex and keyIndex

// a,a,a,a start with lowest (which is highest sequential sourceArray index) [10,11,12,13]
// b,a,a,a reduce keyIndex of [0] to next value [6,11,12,13]; move to next higher placeIndex
// b,b,a,a reduce keyIndex of [1] to next value, which is 7 because 6 is taken [6,7,12,13]
// b,b,b,a reduce keyIndex of [2] to next value, which is 8 because 7 is taken [6,7,8,13]
// reduce keyIndex of [3] to next value [6,7,8,9] doesn't change list, so don't add; maxed so return to [2]; [2] is also maxed, so return to [1]; [1] is also maxed, so return to [0]
// c,a,a,a reduce keyIndex of [0] to next value and fill rest with lowest [5,11,12,13]
// c,b,a,a reduce keyIndex of [1] to next value [5,6,12,13]
// c,b,b,a reduce keyIndex of [2] to next value [5,6,7,13]
// c,b,b,b reduce keyIndex of [3] to next value [5,6,7,8]; go back to start of list
// d,a,a,a reduce keyIndex of [0] to next value [2,11,12,13]; process next placeIndex
// d,b,a,a reduce keyIndex of [1] to next value [2,6,12,13]
// d,b,b,a reduce keyIndex of [2] to next value [2,6,7,13]
// d,b,b,b reduce keyIndex of [3] to next value [2,6,7,8]; [3] is maxed so return to [2]; [2] is maxed so return to [1]
// d,c,a,a reduce keyIndex of [1] to next value and fill rest with lowest [2,5,12,13]
// d,c,b,a reduce keyIndex of [2] to next value [2,5,6,13]
// d,c,b,b reduce keyIndex of [3] to next value [2,5,6,7]; go back to [1]
// d,d,a,a reduce keyIndex of [1] to next value and fill rest with lowest [2,3,12,13]
// d,d,b,a reduce keyIndex of [2] to next value [2,3,6,13]

// function reduceToNextValue(myIndex) reduce workingArray[myIndex] to next value
// XXXXXXXXXXXX is it possible for nextValue to be same value as current?
function nextValue(myKeyIndex, keyIndexLimit) {
  // look up next value to my value
  // Use higher of nextValue or keyIndexLimit
  return Math.max(nextKeyIndexArray[myKeyIndex], keyIndexLimit);
}

function reduceToNextValue(myPlaceIndex, keyIndexLimit) {
  cl("reducing keyIndex of ");
  cl(workingArray[myPlaceIndex]);
  workingArray[myPlaceIndex] = nextValue(
    workingArray[myPlaceIndex],
    keyIndexLimit
  );
}

function lastPlaceIndexProcess(myPlaceIndex, keyIndexLimit) {
  //   until I reach my limit, then return
  //   reduce my keyIndex
  //   XXXXXXXXXXXXXXX add to collection if new
  //     cl "reduced end and added"
  //   else
  //     cl "reduced end and skipped"
  while (workingArray[myPlaceIndex] > keyIndexLimit) {
    reduceToNextValue(myPlaceIndex, keyIndexLimit);
    addToCollection(workingArray);
    cl(workingArray);
    cl(translate(workingArray));
  }
}

function beforeLastPlaceIndexProcess(myPlaceIndex, keyIndexLimit) {
  // until I reach my keyIndexLimit
  //   reduce my keyIndex
  //   add to collection (if new?)
  //   cl ("i am new (or not)")
  //   cl ("reduced and added")
  //   processFollowing (myPlaceIndex +1, my keyIndex +1)
  // return
  // XXXXXXXXXXXX is it possible for nextValue to be same value as current?
  reduceToNextValue(myPlaceIndex, keyIndexLimit);
  addToCollection(workingArray);
  processPlaceIndexToLimit(myPlaceIndex + 1, workingArray[myPlaceIndex] + 1);
  return;
}

function processPlaceIndexToLimit(myPlaceIndex, keyIndexLimit) {
  if (myPlaceIndex === workingArray.length - 1) {
    cl("I'm at end");
    lastPlaceIndexProcess(myPlaceIndex, keyIndexLimit);
    return;
  } else {
    cl(workingArray[myPlaceIndex]);
    while (workingArray[myPlaceIndex] > keyIndexLimit) {
      cl("in while; my placeIndex is");
      cl(myPlaceIndex);
      beforeLastPlaceIndexProcess(myPlaceIndex, keyIndexLimit);
      // XXXXXXXXXXXXXXXX below is getting called after return from higher placeIndex
      fillLowest(myPlaceIndex + 1);
    }
    return;
  }
}

console.time();
cl(workingArray);
fillLowest(0);
addToCollection(workingArray);
processPlaceIndexToLimit(0, 0);
cl(collectionArray.map((array) => translate(array)));
cl(collectionArray.length);
console.log(console.timeEnd());
