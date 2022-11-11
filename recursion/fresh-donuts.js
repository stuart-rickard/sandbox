// Problem statement:

// There is a donuts shop that bakes donuts in batches of batchSize. They sell all of the donuts of a batch before they begin to sell the next batch. We are given an integer batchSize and a positive integer array sourceArray that provides the size of various groups of customers who want to visit the shop. Each customer will get exactly one donut.

// When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts (i.e., the first customer of the group does not receive a donut from a batch that was left over from the previous group).

// The task at hand: rearrange the ordering of the groups to maximize the number of happy groups and return this number.

// (Credit: adapted from Leetcode #1815.)

// This solution uses a two-step approach. First, evaluate sourceArray to find all combinations of groups in which the total number of customers is a multiple of batchSize (a "goodCombination"). Second, check "arrangements" of these goodCombinations to determine which arrangement results in the most happy groups.

let sourceArray = [
  77661097, 287831335, 591851599, 931531218, 76145868, 782939541, 80670001,
  23100566, 682236334, 10648258, 312267263, 806088843, 850601907, 385678804,
  529635015, 503407101, 926262283, 922467807, 165549088, 108377551, 538405915,
  835098309, 853607030, 352287776, 82792996, 546824529, 714304009,
];
let batchSize = 5;

let goodCombinationsArray = []; // used to store "goodCombinations" (combinations of groups in which the total number of customers is a multiple of batchSize)

// function containsGoodCombination is used to determine whether a combination of groups contains an already-identified goodCombination; such combinations are not added to the goodCombinationsArray because such combinations don't help maximize the number of groups
function containsGoodCombination(iterationToCheck, goodCombinationsArray) {
  let inventory = {}; // working object

  // creates an object that reflects the contents of iterationToCheck; for example, if iterationToCheck is [6, 3, 3, 2], the created inventory will be { 2: 1, 3: 2, 6: 1 }
  function createInventory(iterationToCheck) {
    iterationToCheck.forEach((element) => {
      if (inventory[element]) {
        inventory[element]++;
      } else {
        inventory[element] = 1;
      }
    });
  }

  // return true if the set of values of the goodCombination array are a subset of the values represented by inventory
  function inventoryContainsGoodCombination(inventory, goodCombination) {
    for (value of goodCombination) {
      // check whether the value in goodCombination exists in inventory; if so, decrement that property of inventory
      if (inventory[value]--) {
      } else {
        // if the value is not in goodCombination, it means goodCombination is not a subset of inventory, so return false
        return false;
      }
    }
    // if all values of goodCombination are in inventory, goodCombination is a subset of inventory, so return true
    return true;
  }

  // first, create inventory from iterationToCheck
  createInventory(iterationToCheck);

  // second, check whether the inventory is contained by any existing goodCombination in goodCombinationsArray; if so, containsGoodCombination returns true
  for (const goodCombination of goodCombinationsArray) {
    const testInventory = { ...inventory };
    if (inventoryContainsGoodCombination(testInventory, goodCombination)) {
      return true;
    }
  }
  // else return false; iterationToCheck does not contain a goodCombination
  return false;
}

// checks whether the sum of elements in an iterationToCheck is a multiple of batchSize
function multipleOfBatchSize(iterationToCheck, batchSize) {
  if (
    iterationToCheck.reduce((rollingSum, a) => rollingSum + a, 0) % batchSize ==
    0
  ) {
    return true;
  }
  return false;
}

// the function below first gets values in treatedGroupsArray that are equal to or lower than the lowest value in currentCollection then returns only the available values by removing any values that are already in currentCollection
function getAvailableLowValues(treatedGroupsArray, currentCollection) {
  // working array
  let lowValuesWorkingArray = [...treatedGroupsArray];
  // find lowest value in currentCollection
  const lowestElement = currentCollection[currentCollection.length - 1];
  // update working array to remove values higher than lowestElement, if any
  lowValuesWorkingArray.splice(0, lowValuesWorkingArray.indexOf(lowestElement));
  // remove values from working array that are already in currentCollection; if any, these will be one or more elements that have the value of lowestElement
  for (
    l = currentCollection.indexOf(lowestElement);
    l < currentCollection.length;
    l++
  ) {
    const index = lowValuesWorkingArray.indexOf(currentCollection[l]);
    if (index != -1) {
      lowValuesWorkingArray.splice(index, 1);
    }
  }

  return lowValuesWorkingArray;
}

function uniqueMembers(orderedArray) {
  return [...new Set(orderedArray)];
}

// this function removes any the zero values from treatedGroupsArray and, if there are any, puts [0] in goodCombinationsArray
function removeAnyZerosToGoodCombinationsArray(
  treatedGroupsArray,
  goodCombinationsArray
) {
  let workingArray = [...treatedGroupsArray];
  let end = false;
  let firstZero = true;
  while (!end) {
    let index = workingArray.indexOf(0);
    if (index != -1) {
      workingArray.splice(index, 1);
      if (firstZero) {
        goodCombinationsArray.push([0]);
        firstZero = false;
      }
    } else {
      end = true;
    }
  }
  return workingArray;
}

// FIRST STEP: find goodCombinations ---------------------------

// create a working array from the sourceArray
let treatedGroupsArray = [...sourceArray];
// update treatedGroupsArray so that each group is replaced by the group mod batchSize, then sorted in ascending order; using the mod value allows us to sort in ascending order and is equivalent when checking whether the values of the groups in a collection are a multiple of batchSize
treatedGroupsArray = treatedGroupsArray
  .map((value) => value % batchSize)
  .sort((a, b) => b - a);
let treatedGroupsArrayWithZeros = [...treatedGroupsArray];

// save time in our goodCombination search algorithm by first removing the zeros from treatedGroupsArray; if there are any, add [0] to goodCombinationsArray
treatedGroupsArray = removeAnyZerosToGoodCombinationsArray(
  treatedGroupsArray,
  goodCombinationsArray
);

let initialNodesValues = uniqueMembers(treatedGroupsArray);
let nodesForNextLevelCollections = initialNodesValues.map((value) => [value]);
console.log(nodesForNextLevelCollections);

let workingArrayOfNodes = []; // a working array that is used in the while loop below
let iterationToCheck = []; // a working store for combinations of groups that is used in the while loop below

// this while loop generates, tests, and handles combinations of groups; it starts with combinations of two groups and increases the size of the groups as long as nodesForNextLevelCollections has any elements
while (nodesForNextLevelCollections.length) {
  workingArrayOfNodes = [...nodesForNextLevelCollections];
  // reset nodesForNextLevelCollections
  nodesForNextLevelCollections = [];

  // this for loop is to process workingArrayOfNodes items
  for (i = 0; i < workingArrayOfNodes.length; i++) {
    // create an array of available, unique values from the treatedGroupsArray
    let availableLowValues = getAvailableLowValues(
      treatedGroupsArray,
      workingArrayOfNodes[i]
    );
    let uniqueAvailableLowValues = uniqueMembers(availableLowValues);

    // this for loop generates combinations by adding these unique availables to a node from workingArrayOfNodes
    for (j = 0; j < uniqueAvailableLowValues.length; j++) {
      // update interationToCheck
      iterationToCheck = [...workingArrayOfNodes[i]];
      // add the current unique available value
      iterationToCheck.push(uniqueAvailableLowValues[j]);

      // check each iteration -- skip any that contain a goodCombination
      if (containsGoodCombination(iterationToCheck, goodCombinationsArray)) {
        // do nothing
      } else {
        // if the sum of values in the iteration is a multiple of batchSize, add it to the goodCombinationsArray
        if (multipleOfBatchSize(iterationToCheck, batchSize)) {
          goodCombinationsArray.push(iterationToCheck);
        } else {
          // one that is not a goodCombination gets passed forward;
          nodesForNextLevelCollections.push(iterationToCheck);
        }
      }
    }
  }
}

console.log("goodCombinationsArray:");
console.log(goodCombinationsArray);

// SECOND STEP: arrange goodCombinations -------------------------

let maximumHappyGroups = 0; // this is the variable that is returned at the end!

// returns false if all groups in goodCombination are not found in remainingGroupsArray, otherwise removes the groups in goodCombination from remainingGroupsArray and returns the updated array
function checkAndUpdateRemainingGroupsArray(
  goodCombination,
  remainingGroupsArray
) {
  let returnArray = [...remainingGroupsArray];
  for (group of goodCombination) {
    let result = returnArray.indexOf(group);
    if (result === -1) {
      return false;
    } else {
      returnArray.splice(result, 1);
    }
  }
  return returnArray;
}

// recursive function that adds good combinations to arrangementOfGoodCombinations until remainingGroupsArray is depleted, at which point it checks whether the arrangement has maximized happy groups; if so, it updates the maximumHappyGroups variable; it crawls through the tree of arrangements by incrementing indexInGoodCombinationsArray, which means that it starts with good combinations that have fewer members, then ones with more members
// TODO can arrangementOfGoodCombinations be deleted?
function createAndCheckArrangement(
  indexInGoodCombinationsArray,
  remainingGroupsArray,
  happyGroupsCounter,
  arrangementOfGoodCombinations
) {
  function possibleToIncreaseMaximumHappyGroups(
    maximumHappyGroups,
    indexInGoodCombinationsArray,
    remainingGroupsArray,
    happyGroupsCounter
  ) {
    console.log(
      maximumHappyGroups,
      indexInGoodCombinationsArray,
      remainingGroupsArray,
      happyGroupsCounter
    );
    console.log("if");
    console.log(
      Math.ceil(
        remainingGroupsArray.length /
          goodCombinationsArray[indexInGoodCombinationsArray].length
      )
    );

    console.log(maximumHappyGroups + 1 - happyGroupsCounter);
    if (
      Math.ceil(
        remainingGroupsArray.length /
          goodCombinationsArray[indexInGoodCombinationsArray].length
      ) >=
      maximumHappyGroups + 1 - happyGroupsCounter
    ) {
      console.log("greater or equal");
      return true;
    } else {
      console.log("lesser");
      return false;
    }
  }
  // check whether it is possible to increase maximumHappyGroups at the current indexInGoodCombinationsArray; it won't be possible if we are checking a good combination that is long and there aren't enough groups remaining in remainingGroupsArray
  if (
    Math.ceil(
      remainingGroupsArray.length /
        goodCombinationsArray[indexInGoodCombinationsArray].length
    ) >=
    maximumHappyGroups + 1 - happyGroupsCounter
  ) {
    // newRemainingGroupsArray is false if the good combination doesn't exist in remainingGroupsArray; otherwise it is an array that is remainingGroupsArray without the groups in the good combination
    let newRemainingGroupsArray = checkAndUpdateRemainingGroupsArray(
      goodCombinationsArray[indexInGoodCombinationsArray],
      remainingGroupsArray
    );
    // if newRemainingGroupsArray is an array, recurse because there could be more good combinations available in remainingGroupsArray
    if (newRemainingGroupsArray) {
      // increment happyGroupsCounter
      let newHappyGroupsCounter = happyGroupsCounter + 1;
      // create newArrangement and add the good combination
      let newArrangement = [...arrangementOfGoodCombinations];
      newArrangement.push(goodCombinationsArray[indexInGoodCombinationsArray]);
      // recurse
      createAndCheckArrangement(
        indexInGoodCombinationsArray,
        newRemainingGroupsArray,
        newHappyGroupsCounter,
        newArrangement
      );
      // if newRemainingGroupsArray is false, the good combination doesn't exist in remainingGroupsArray, so increment the index to check the next good combination
    } else {
      let newCurrentIndex = indexInGoodCombinationsArray + 1;
      // recurse until either 1) there are no more indices to check, or 2) the current good combination is longer than remainingGroupsArray
      while (
        newCurrentIndex < goodCombinationsArray.length &&
        goodCombinationsArray[newCurrentIndex].length <=
          remainingGroupsArray.length
      ) {
        newRemainingGroupsArray = checkAndUpdateRemainingGroupsArray(
          goodCombinationsArray[newCurrentIndex],
          remainingGroupsArray
        );
        // if newRemainingGroupsArray is an array, recurse because there could be more good combinations available in remainingGroupsArray
        if (newRemainingGroupsArray) {
          // increment happyGroupsCounter
          let newHappyGroupsCounter = happyGroupsCounter + 1;
          // create newArrangement and add the good combination
          let newArrangement = [...arrangementOfGoodCombinations];
          newArrangement.push(
            goodCombinationsArray[indexInGoodCombinationsArray]
          );
          // recurse
          createAndCheckArrangement(
            newCurrentIndex,
            newRemainingGroupsArray,
            newHappyGroupsCounter,
            newArrangement
          );
        }
        // increment to check next index
        newCurrentIndex++;
      }
      // console.log("remainingGroupsArray is:");
      // console.log(remainingGroupsArray);

      // after the while loop above, check whether the current arrangement has the most happy groups
      // increment happyGroupsCounter if there are any groups in the remainingGroupsArray because exactly one of them will be happy
      if (remainingGroupsArray.length) {
        happyGroupsCounter++;
      }
      // update maximumHappyGroups if appropriate
      if (happyGroupsCounter > maximumHappyGroups) {
        maximumHappyGroups = happyGroupsCounter;
        console.log(happyGroupsCounter, arrangementOfGoodCombinations);
      }
      //     console.log (happyGroupsCounter, arrangementOfGoodCombinations)
      console.log(happyGroupsCounter);
    }
  }
}

// check that at least one goodCombination has been found
if (goodCombinationsArray.length) {
  // use the recursive createAndCheckArrangement function to create and check arrangements
  for (
    indexInGoodCombinationsArray = 0;
    indexInGoodCombinationsArray < goodCombinationsArray.length;
    indexInGoodCombinationsArray++
  ) {
    let arrangementOfGoodCombinations = []; // reset
    let happyGroupsCounter = 0; // reset
    createAndCheckArrangement(
      indexInGoodCombinationsArray,
      treatedGroupsArrayWithZeros,
      happyGroupsCounter,
      arrangementOfGoodCombinations
    );
  }
  // handle condition where no goodCombination has been found
} else {
  if (sourceArray.length) {
    maximumHappyGroups = 1;
  }
}

console.log("maximumHappyGroups is: " + maximumHappyGroups);
