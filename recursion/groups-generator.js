let sourceArray = [
  "h",
  "g",
  "g",
  "g",
  "f",
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

let nextKeyIndexArray = [];

function cl(log) {
  console.log(log);
}

function createNextKeyIndexArray(sourceArray) {
  let priorValueAndFirstIndex = {
    priorValue: null,
    firstIndex: null,
  };
  sourceArray.forEach((element, index) => {
    if (index == 0) {
      nextKeyIndexArray.push(null);
      priorValueAndFirstIndex.priorValue = element;
      priorValueAndFirstIndex.firstIndex = index;
    } else {
      // if element is same as prior, the nextKey needs to be the same as the prior element
      if (priorValueAndFirstIndex.priorValue == element) {
        nextKeyIndexArray.push(nextKeyIndexArray[index - 1]);
        // if element is differnt from prior, we push a new nextKey: the firstIndex; we also update priorValueAndFirstIndex
      } else {
        nextKeyIndexArray.push(priorValueAndFirstIndex.firstIndex);
        priorValueAndFirstIndex.priorValue = element;
        priorValueAndFirstIndex.firstIndex = index;
      }
    }
  });
}

function translate(array) {
  return array.map((value) => sourceArray[value]);
}

let workingArray = [null, null, null, null, null, null];
let collectionArray = [];

// function fillLowest(startIndex) fill with highest sequential keyIndex
// faster way to do this is to create an array and then move values?  Or use map function?
function fillLowest(startIndex) {
  for (ind = startIndex; ind < workingArray.length; ind++) {
    workingArray[ind] =
      sourceArray.length - 1 - (workingArray.length - 1 - ind);
  }
  //   cl("fillLowest");
}

function addToCollection(array) {
  collectionArray.push([...array]);
  //   cl("------ added to collection");
  //   cl(workingArray);
  //   cl(translate(workingArray));
}

// function reduceToNextValue(myIndex) reduces workingArray[myIndex] to next value
function nextValue(myKeyIndex, keyIndexLimit) {
  // look up next value to my value
  // Use higher of nextValue or keyIndexLimit so that we don't have duplicate keyIndex's in the working Array
  return Math.max(nextKeyIndexArray[myKeyIndex], keyIndexLimit);
}

function reduceToNextValue(myPlaceIndex, keyIndexLimit) {
  //   cl("reducing keyIndex of ");
  //   cl(workingArray[myPlaceIndex]);
  workingArray[myPlaceIndex] = nextValue(
    workingArray[myPlaceIndex],
    keyIndexLimit
  );
}

function lastPlaceIndexProcess(myPlaceIndex, keyIndexLimit) {
  //   until I reach my limit, then return
  //   reduce my keyIndex
  //   add to collection if new
  while (workingArray[myPlaceIndex] > keyIndexLimit) {
    let startingValueAtMyPlaceIndex = sourceArray[workingArray[myPlaceIndex]];
    reduceToNextValue(myPlaceIndex, keyIndexLimit);
    if (
      startingValueAtMyPlaceIndex !== sourceArray[workingArray[myPlaceIndex]]
    ) {
      addToCollection(workingArray);
    }
    // else {
    //   cl("last not added to lowest");
    // }
    // cl(workingArray);
    // cl(translate(workingArray));
  }
}

function beforeLastPlaceIndexProcess(myPlaceIndex, keyIndexLimit) {
  // until I reach my keyIndexLimit
  //   reduce my keyIndex
  //   add to collection (if new)
  let startingValueAtMyPlaceIndex = sourceArray[workingArray[myPlaceIndex]];
  reduceToNextValue(myPlaceIndex, keyIndexLimit);
  if (startingValueAtMyPlaceIndex !== sourceArray[workingArray[myPlaceIndex]]) {
    addToCollection(workingArray);
  }
  //   else {
  //     cl("middle not added to lowest");
  //   }

  // note that this function is mutually recursive with processPLaceIndexToLimit
  processPlaceIndexToLimit(myPlaceIndex + 1, workingArray[myPlaceIndex] + 1);
  return;
}

function processPlaceIndexToLimit(myPlaceIndex, keyIndexLimit) {
  // escape condition is when we are at the end of the array
  if (myPlaceIndex === workingArray.length - 1) {
    // cl("I'm at end");
    lastPlaceIndexProcess(myPlaceIndex, keyIndexLimit);
    return;
  } else {
    // cl(workingArray[myPlaceIndex]);
    while (workingArray[myPlaceIndex] > keyIndexLimit) {
      //   cl("in while; my placeIndex is");
      //   cl(myPlaceIndex);
      // note that this function is mutually recursive with beforeLastPlaceIndexProcess
      beforeLastPlaceIndexProcess(myPlaceIndex, keyIndexLimit);
      // below is getting called after return from higher placeIndex, but adding an if statement to prevent this actually runs slower
      fillLowest(myPlaceIndex + 1);
    }
    return;
  }
}

console.time();

cl(workingArray);
createNextKeyIndexArray(sourceArray);
cl(sourceArray);
cl(nextKeyIndexArray);
fillLowest(0);
addToCollection(workingArray);
processPlaceIndexToLimit(0, 0);
cl(collectionArray.map((array) => translate(array)));
cl(translate(collectionArray[collectionArray.length - 1]));
cl(collectionArray.length);
console.log(console.timeEnd());
