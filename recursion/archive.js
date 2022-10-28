// tree approach where depth is incrementally increased; a node where mod = 0 is a leaf - this prevents redundant gC's
// use group generator and subtractFromInventory on the array of gC's to create valid cgC's
// ++ refine this so that we're not looking at all valid cgC's

// 4,4,3,1,1,0
// [4][3][1][0=leaf/end] go through each different value. leaves get noted and taken off the list. At end go to next size group.
// [4,4][4,3][4,1=leaf][3,1][1,1=end] go through each remaining value and pair it with each different value that is available. Leaves get noted and taken off the list.  At end go to next size group.
// [4,4,3][4,4,1-contains leaf][4,3,1-contains leaf][3,1,1=leaf/end]  go through each remaining value and pair it with each different value that is available. if a collection "includes" a leaf take it off the list. Leaves get noted and taken off the list.  At end go to next size group.
// [4,4,3,1-contains leaf/end]DONE go through each remaining value and pair it with each different value that is available. if a collection "includes" a leaf take it off the list. at end there is nothing left so don't go to next size

let end = false;
let length = 1;
// let sourceArray = [
//   8, 8, 8, 8, 8, 7, 7, 7, 6, 5, 5, 5, 4, 4, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1,
//   1, 0, 0, 0,
// ];
// XXXXXXXXXX deal with zeros in sourceArray
// let sourceArray = [1455, 20044, 3, 991, 1, 456, 888, 4];
// let sourceArray = [991, 1, 1, 1, 456, 888, 4];
// let sourceArray = [2, 2, 2, 1, 1, 1];
let sourceArray = groups;
// let nextValue = { 4: 3, 3: 1, 1: 0, 0: null };
let passForwardArray = [[]];
let leafsArray = [];
let workingArray = [];
// let batchsize = 9;
// let batchsize = 2;
// let batchsize = 5;
let batchsize = batchSize;
let toCheck = [];
// let count = 1;

function containsLeaf(toCheck, leafsArray) {
  let inventory = {};

  function createInventory(toCheck) {
    toCheck.forEach((element) => {
      if (inventory[element]) {
        inventory[element]++;
      } else {
        inventory[element] = 1;
      }
    });
  }

  createInventory(toCheck);

  function subtractFromInventory(groupCollection, inventory) {
    let flag;
    groupCollection.forEach((value) => {
      if (inventory[value]--) {
        return;
      } else {
        flag = true;
      }
    });
    if (flag) {
      return false;
    } else {
      return true;
    }
  }
  // if toCheck contains a leaf, return true
  //  for loop though leafsArray
  for (const leaf of leafsArray) {
    const testInventory = { ...inventory };
    if (subtractFromInventory(leaf, testInventory)) {
      return true;
    }
  }
  // else return false
  return false;
}

function aLeaf(array, batchsize) {
  if (array.reduce((partialSum, a) => partialSum + a, 0) % batchsize == 0) {
    return true;
  }
  return false;
}

// retitle this function
// XXXXXXXXXXXXXX this can be a lot simpler -- get unique elements from master array, then return any of them that are equal to or lower than lowest element; this eliminates the need for the unique elements function lower down
function getAvailable(masterArray, subArray) {
  // console.log("masterArray is");
  // console.log(masterArray);
  // console.log("subArray is");
  // console.log(subArray);
  const arr = [...masterArray];
  const captureArray = [];
  // XXXXXX deal with upper limit
  const lowestElement = subArray[subArray.length - 1] || 500;
  arr.forEach((value) => {
    if (value <= lowestElement) {
      captureArray.push(value);
    }
  });
  subArray.forEach((value) => {
    const index = captureArray.indexOf(value);
    if (index != -1) {
      // console.log("splice");
      captureArray.splice(index, 1);
    }
  });
  return captureArray;
}

function uniqueMembers(orderedArray) {
  return [...new Set(orderedArray)];
}

function moveZeroesToLeafsArray(currentSource, leafsArray) {
  let end = false;
  let firstZero = true;
  while (!end) {
    let index = currentSource.indexOf(0);
    if (index != -1) {
      // console.log("splice");
      currentSource.splice(index, 1);
      if (firstZero) {
        leafsArray.push([0]);
        firstZero = false;
      }
    } else {
      end = true;
    }
  }
}

let currentSource = [...sourceArray];
currentSource = currentSource
  .map((value) => value % batchsize)
  .sort((a, b) => a - b);
// currentSource.sort((a, b) => a - b);
// console.log(currentSource);
let finalCheckSource = [...currentSource];
moveZeroesToLeafsArray(currentSource, leafsArray);

// use while so that we stop when we run out of combinations
while (!end) {
  workingArray = [...passForwardArray];
  // reset passForwardArray
  passForwardArray = [];
  // console.log("workingArray:");
  // console.log(workingArray);

  // outer for loop is to process workingArray items
  for (i = 0; i < workingArray.length; i++) {
    // create new unique values
    //  to each workingArray starter value, create new sets by incrementally adding available, unique values from the sourceArray
    //   getAvailable
    //   uniqueMembers
    let available = getAvailable(currentSource, workingArray[i]);
    let uniqueAvailable = uniqueMembers(available);
    // console.log("uniqueAvailable:");
    // console.log(uniqueAvailable);

    // inner for loop is to generate combos by adding unique availables
    for (j = 0; j < uniqueAvailable.length; j++) {
      toCheck = [...workingArray[i]];
      toCheck.push(uniqueAvailable[j]);
      // console.log("toCheck:");
      // console.log(toCheck);
      // check each value --
      if (aLeaf(toCheck, batchsize)) {
        // leafs get collected if they don't already contain a leaf
        if (containsLeaf(toCheck, leafsArray)) {
          // do nothing
          // console.log("do nothing");
        } else {
          leafsArray.push(toCheck);
        }
      } else {
        // one that is not a leaf gets passed forward;
        passForwardArray.push(toCheck);
      }
    }

    // currentSource = [...passForwardArray];
  }
  // if (count == 5) {
  if (!passForwardArray.length) {
    end = true;
    break;
  }
  // count++;
  // console.log("back to while");
  workingArray = [...passForwardArray];
}

// ----------------

// map groups into groups % batchsize
// sort new array large to small
// pull out groups with mod = 0
// create groupCollections that have 2 members, then 3, then 4, etc
// ++ refine groupCollection generation - not necessary to create all possibilities
// test groupCollections for mod = 0

// collections of gC's need to be tested
// limited by available groups
// looking for largest collection of gC's (including counting remainder as one happy customer)
// # this will tend to be a collection of small gC's, but optimal solution can have larger gC's depending on the set of groups we are testing
// develop cgC's
// # two approaches: 1) blindly combine gC's first and then test complete cgC whether it is using too many groups; or 2) strategically combine gC's so that we are only adding a gC to a cgC if it qualifies
//  start with small gC's

// algorithm for checking whether a gC can be formed with remaining groups
// create an inventory object where the number is the property and the value is the count of that number:
//  {2: 4, 3: 5, 6: 1} - this means there are 4 twos, 5 threes, and 1 six
//  if a group is [2, 3, 3, 6] we can use forEach on it so that group.forEach((value)=> inventory[value]--; if (inventory[value]<0){return false})

// let inventory = { 2: 4, 3: 5, 6: 1 };
// let arrOne = [2, 3, 3, 6];
// let arrTwo = [2, 2, 6];

// function subtractFromInventory(groupCollection, inventory) {
//   let flag;
//   groupCollection.forEach((value) => {
//     if (inventory[value]--) {
//       return;
//     } else {
//       flag = true;
//     }
//   });
//   if (flag) {
//     return false;
//   } else {
//     return true;
//   }
// }

// console.log(inventory);
// console.log(subtractFromInventory(arrOne, inventory));
// console.log(inventory);
// console.log(subtractFromInventory(arrTwo, inventory));
// console.log(inventory);
// console.log(aLeaf([2, 3, 4, 5], 5));
// console.log(aLeaf([2, 3, 4, 5], 7));
// console.log(aLeaf([2, 3, 4, 5], 14));
// console.log(aLeaf([2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 9], 4));
// console.log(aLeaf([2, 3, 4, 5], 1));
// console.log(getAvailable([2, 3, 4, 5], [5]));
// console.log(getAvailable([2, 3, 4, 5], [2, 4]));
// console.log(getAvailable([2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 9], [2, 4]));
// let testArray = [2, 3, 4, 5, 7];
// console.log(getAvailable(testArray, [2, 4]));
// console.log(testArray);
// console.log(getAvailable([2, 3, 4, 5], []));
// console.log(getAvailable([], [5]));
// console.log(getAvailable([2, 3, 4, 5], [7]));
// console.log(getAvailable([2, 3, 4, 5], 1));
// console.log(getAvailable("the", [4]));
// console.log(getAvailable("the", "t"));
// console.log(getAvailable("the", "the"));
// console.log(uniqueMembers([2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 9]));
// console.log(uniqueMembers("the", "the"));
// console.log(uniqueMembers("the quick brown fox jumped over the lazy dog"));
// console.log(uniqueMembers(22, 14));
// console.log(
//   uniqueMembers([
//     [1, 2, 3],
//     [2, 3, 4],
//     [1, 2, 3],
//   ])
// );

console.log("leafsArray:");
console.log(leafsArray);

// go through leafsArray recursively

let maxSets = 0;

// function valuesAreFound(che, remainderArray)
function valuesAreFound(che, remainderArray) {
  let returnArray = [...remainderArray];
  //   if che is in remainderArray
  //      return remainderArray less che
  //   else
  //      return false
  for (value of che) {
    let result = returnArray.indexOf(value);
    if (result === -1) {
      return false;
    } else {
      returnArray.splice(result, 1);
    }
  }
  return returnArray;
}

// function checkThisIndex(currentIndex, remainderArray, currentSetCount, gatheredArray)
function checkThisIndex(
  currentIndex,
  remainderArray,
  currentSetCount,
  gatheredArray
) {
  //   checkResult = valuesAreFound(leafsArray[currentIndex], remainderArray)
  let checkResult = valuesAreFound(leafsArray[currentIndex], remainderArray);
  //   if checkResult
  if (checkResult) {
    //     increment setCount
    let newSetCount = currentSetCount + 1;
    //     push to gatheredArray
    // console.log("gathered array is: ");
    // console.log(gatheredArray);
    let newGatheredArray = [...gatheredArray];
    newGatheredArray.push(leafsArray[currentIndex]);
    //     recur - checkThisIndex( current index, checkResult, current set count)
    checkThisIndex(currentIndex, checkResult, newSetCount, newGatheredArray);
    //   else
  } else {
    let newCurrentIndex = currentIndex + 1;
    // improve while below so that we aren't searching if leafsArray[newCurrentIndex].length > remainderArray.length
    while (
      newCurrentIndex < leafsArray.length &&
      leafsArray[newCurrentIndex].length <= remainderArray.length
    ) {
      //       checkResult = valuesAreFound(leafsArray[currentIndex], remainderArray)
      checkResult = valuesAreFound(leafsArray[newCurrentIndex], remainderArray);
      //       if checkResult
      if (checkResult) {
        //         increment a copy of setCount
        let newSetCount = currentSetCount + 1;
        //         push to gatheredArray
        let newGatheredArray = [...gatheredArray];
        newGatheredArray.push(leafsArray[currentIndex]);
        //         recur - checkThisIndex( current index, checkResult, current set count)
        checkThisIndex(
          newCurrentIndex,
          checkResult,
          newSetCount,
          newGatheredArray
        );
      }
      //       increment currentIndex
      newCurrentIndex++;
    }
    //     increment the current set count if there's anything in the remainder array
    if (remainderArray.length) {
      currentSetCount++;
    }
    //     update highest set count if ours is the greatest
    if (currentSetCount > maxSets) {
      maxSets = currentSetCount;
      console.log(currentSetCount, gatheredArray);
    }
    //     console.log (currentSetCount, gatheredArray)
    console.log(currentSetCount);
  }
}

// for leafsArray index 0 to length -1
for (i = 0; i < leafsArray.length; i++) {
  //   let gatheredArray = []
  let gatheredArray = [];
  //   checkThisIndex(index, leafsArray, 0, gatheredArray)
  checkThisIndex(i, finalCheckSource, 0, gatheredArray);
}

console.log("maxSets is: " + maxSets);
return maxSets;
