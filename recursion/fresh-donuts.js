// Problem statement:

// There is a donuts shop that bakes donuts in batches of batchSize. They sell all of the donuts of a batch before they begin to sell the next batch. We are given an integer batchSize and a positive integer array sourceArray that provides the size of various groups of customers who want to visit the shop. Each customer will get exactly one donut.

// When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts (i.e., the first customer of the group does not receive a donut from a batch that was left over from the previous group).

// We need to rearrange the ordering of the groups to maximize the number of happy groups and return this number.

// (Credit: adapted from Leetcode #1815.)

// This solution uses a two-step approach. First we evaluate sourceArray to find all combinations of groups in which the total number of customers is a multiple of batchSize (a "leaf"). Second we check arrangements of these "leafs" to determine which arrangement results in the most happy groups.

let endStepOne = false;
// let sourceArray = [1455, 20044, 3, 991, 1, 456, 888, 4];
let sourceArray = [7, 8, 1, 1, 1, 3];
// let sourceArray = [2, 2, 2, 1, 1, 1];
// XXXXXXXXXXX check what happens if there are no leafs
// let sourceArray = [
//   77661097, 287831335, 591851599, 931531218, 76145868, 782939541, 80670001,
//   23100566, 682236334, 10648258, 312267263, 806088843, 850601907, 385678804,
//   529635015, 503407101, 926262283, 922467807, 165549088, 108377551, 538405915,
//   835098309, 853607030, 352287776, 82792996, 546824529, 714304009,
// ];
let passForwardArray = [[]]; // XXXXXXXXX come back to this; does it have an empty array in it so that it has a length?
let leafsArray = []; // used to store "leafs" (combinations of groups in which the total number of customers is a multiple of batchSize)
let workingArray = []; // a working array derived from sourceArray XXXX move down to function?
// let batchSize = 9;
// let batchSize = 2;
let batchSize = 5;
let toCheck = []; // used as a working store for combinations of groups that we want to check XXXX move down to function?

// function containsLeaf is used to identify combinations of groups that aready contain a leaf; such combinations are not leafs
function containsLeaf(toCheck, leafsArray) {
  let inventory = {}; // working object

  // creates an object that reflects the contents of toCheck; for example, if toCheck is [6, 3, 3, 2], the created inventory will be { 2: 1, 3: 2, 6: 1 }
  function createInventory(toCheck) {
    toCheck.forEach((element) => {
      if (inventory[element]) {
        inventory[element]++;
      } else {
        inventory[element] = 1;
      }
    });
  }

  // return true if the set of values of the leaf array are a subset of the values represented by inventory
  function inventoryContainsLeaf(inventory, leaf) {
    let flag;
    // leaf.forEach((value) => {
    for (value of leaf) {
      // check whether the value in leaf exists in inventory; if so, decrement that property of inventory
      if (inventory[value]--) {
      } else {
        // if the value is not in leaf, it means leaf is not a subset of inventory, so return false
        return false;
      }
    }
    // if all values of leaf are in inventory, leaf is a subset of inventory, so return true
    return true;
  }

  // first, create inventory from toCheck
  createInventory(toCheck);

  // second, check whether the inventory is contained by any existing leaf in leafsArray; if so, containsLeaf returns true
  for (const leaf of leafsArray) {
    const testInventory = { ...inventory };
    if (inventoryContainsLeaf(testInventory, leaf)) {
      return true;
    }
  }
  // else return false; toCheck does not contain a leaf
  return false;
}

// checks whether the sum of elements in an array is a multiple of batchSize
function multipleOfBatchSize(array, batchSize) {
  if (array.reduce((rollingSum, a) => rollingSum + a, 0) % batchSize == 0) {
    return true;
  }
  return false;
}

// XXXXX retitle this function; it returns the values that are equal or lower than the lowest element in workingArray[i]
// XXXXXXXXXXXXXX this can be a lot simpler -- get unique elements from master array, then return any of them that are equal to or lower than lowest element; this eliminates the need for the unique elements function lower down
function getAvailable(treatedGroupsArray, currentCollection) {
  // DDD treatedGroupsArray is treatedGroupsArray
  console.log("treatedGroupsArray:");
  console.log(treatedGroupsArray);
  console.log("currentCollection:");
  console.log(currentCollection);
  const arr = [...treatedGroupsArray];
  // DDD availableValues is what gets returned
  const availableValues = [];
  // XXXXXX deal with upper limit
  // DDD currentCollection is workingArray[i]
  // XXXXX is currentCollection ordered in decreasing value?
  const lowestElement =
    currentCollection[currentCollection.length - 1] || batchSize;
  // put values that are equal to or lower than the last item in workingArray[i] into the availableValues
  console.log("lowestElement:");
  console.log(lowestElement);
  arr.forEach((value) => {
    if (value <= lowestElement) {
      availableValues.push(value);
    }
  });
  console.log("availableValues:");
  console.log(availableValues);
  // remove values from availableValues that are in workingArray[i]
  currentCollection.forEach((value) => {
    const index = availableValues.indexOf(value);
    if (index != -1) {
      availableValues.splice(index, 1);
    }
  });
  console.log("availableValues:");
  console.log(availableValues);
  console.log("********** end get availableValues");
  return availableValues;
}

function uniqueMembers(orderedArray) {
  return [...new Set(orderedArray)];
}

// this function removes any the zero values from treatedGroupsArray and, if there are any, puts [0] in leafsArray
function moveZeroesToLeafsArray(treatedGroupsArray, leafsArray) {
  let end = false;
  let firstZero = true;
  while (!end) {
    let index = treatedGroupsArray.indexOf(0);
    if (index != -1) {
      treatedGroupsArray.splice(index, 1);
      if (firstZero) {
        leafsArray.push([0]);
        firstZero = false;
      }
    } else {
      end = true;
    }
  }
}

// create a working array from the sourceArray
let treatedGroupsArray = [...sourceArray];
// update treatedGroupsArray so that each value is replaced by the value mod batchSize, then sorted in ascending order; using the mod value allows us to sort in ascending order and is equivalent when we want to check whether the values of the groups in a collection are a multiple of batchSize
treatedGroupsArray = treatedGroupsArray
  .map((value) => value % batchSize)
  .sort((a, b) => a - b);
// XXXXXXXX
let finalCheckSource = [...treatedGroupsArray];

// we can save time in our leaf search algorithm by first removing the zeros from the source array
// XXXX this is confusing; not obvious that this changes treatedGroupsArray
moveZeroesToLeafsArray(treatedGroupsArray, leafsArray);

// use while so that we stop when we run out of combinations
while (!endStepOne) {
  // working array starts as [[]]
  workingArray = [...passForwardArray];
  console.log("workingArray is: -----------");
  console.log(workingArray);
  // reset passForwardArray
  passForwardArray = [];

  // outer for loop is to process workingArray items
  for (i = 0; i < workingArray.length; i++) {
    // create new unique values
    //  to each workingArray starter value, create new sets by incrementally adding available, unique values from treatedGroupsArray
    //   getAvailable
    //   uniqueMembers
    let availableValues = getAvailable(treatedGroupsArray, workingArray[i]);
    let uniqueAvailableValues = uniqueMembers(availableValues);

    // inner for loop is to generate combos by adding unique availables
    for (j = 0; j < uniqueAvailableValues.length; j++) {
      toCheck = [...workingArray[i]];
      toCheck.push(uniqueAvailableValues[j]);

      // check each value --
      if (multipleOfBatchSize(toCheck, batchSize)) {
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
  }
  // if passForwardArray has any elements
  if (!passForwardArray.length) {
    // XXXXXXXXXXXXX is endStepOne used?
    endStepOne = true;
    break;
  }
  workingArray = [...passForwardArray];
}

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
    let newGatheredArray = [...gatheredArray];
    newGatheredArray.push(leafsArray[currentIndex]);
    //     recur - checkThisIndex( current index, checkResult, current set count)
    checkThisIndex(currentIndex, checkResult, newSetCount, newGatheredArray);
    //   else
  } else {
    let newCurrentIndex = currentIndex + 1;
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
    // try to move this to the end in case leafsArray is empty
    console.log("remainderArray is:");
    console.log(remainderArray);
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

// XXXX doesn't work if there's nothing in leafsArray
// for leafsArray index 0 to length -1
for (i = 0; i < leafsArray.length; i++) {
  //   let gatheredArray = []
  let gatheredArray = [];
  //   checkThisIndex(index, leafsArray, 0, gatheredArray)
  checkThisIndex(i, finalCheckSource, 0, gatheredArray);
}

console.log("maxSets is: " + maxSets);
