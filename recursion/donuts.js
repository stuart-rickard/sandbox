// Problem statement:

// There is a donuts shop that bakes donuts in batches of batchSize. They sell all of the donuts of a batch before they begin to sell the next batch. We are given an integer batchSize and an integer array that provides the size of various groups of customers who want to visit the shop. Each customer will get exactly one donut.

// When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts (i.e., the first customer of the group does not receive a donut from a batch that was left over from the previous group).

// We need to rearrange the ordering of the groups to maximize the number of happy groups and return this number.

// (Credit: adapted from Leetcode #1815.)

var maxHappyGroups = function (batchSize, groups) {
  // Array to collect sets
  let sets = [];
  groups.sort((a, b) => (b % batchSize) - (a % batchSize));
  let workingArray = [];
  for (item of groups) {
    workingArray.push(item % batchSize);
  }
  console.log(workingArray);

  function sumOfArray(array) {
    return array.reduce((a, b) => a + b);
  }
  console.log(sumOfArray(workingArray));

  function removeFromArray(arrayToRemove) {
    for (let modSize of arrayToRemove) {
      for (let j = 0; j < workingArray.length; j++) {
        if (modSize == workingArray[j]) {
          workingArray.splice(j, 1);
          groups.splice(j, 1);
          break;
        }
      }
    }
  }

  function levelOneCheck(givenSum, arrayToCheck, targetSize) {
    for (let value of arrayToCheck) {
      if (givenSum + value == targetSize) {
        return [value];
      }
      return false;
    }
  }

  function lookForSet(givenSum, arrayToCheck, level, targetSize) {
    if (level == 1) {
      return levelOneCheck(givenSum, arrayToCheck, targetSize) || false;
    } else {
      let nextLevel = level - 1;
      for (let i = 1; i <= arrayToCheck.length; i++) {}

      return (
        lookForSet(nextGivenSum, nextArrayToCheck, nextLevel, targetSize)?.push(
          value
        ) || false
      );
      // let nextGivenArray = [...givenArray, arrayToCheck[0]];
      // arrayToCheck.splice(0,1);
      // let nextArrayToCheck = [...arrayToCheck];
      // if (nextLevel>nextArrayToCheck.length){
      //   return false;
      // }
    }
  }

  // function setManager() {
  //   let result = lookForSet(givenArray, arrayToCheck, targetSize);
  //   if (result) {
  //     givenArray.push(result);
  //     sets.push(givenArray);
  //     removeFromArray(givenArray);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // for (
  //   let multiplier = 1;
  //   multiplier * batchSize < sumOfArray(workingArray);
  //   multiplier++
  // ) {
  //   lookForSet(workingArray,1,multiplier*batchSize)
  // }

  console.log("The groups with a set are:");
  console.log(sets);
  console.log("The groups without a set are:");
  console.log(groups);

  // If there are any groups left that are not in a set, one of those will be happy, and is added to the count
  let count = groups.length ? 1 : 0;
  count = count + sets.length;
  console.log("The maximum number of happy groups is: " + count);
};

maxHappyGroups(7, [1, 1, 2, 3, 1, 6, 7, 3, 4, 3000, 4, 6, 6, 2]);
