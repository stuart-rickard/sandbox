// Problem statement:

// There is a donuts shop that bakes donuts in batches of batchSize. They sell all of the donuts of a batch before they begin to sell the next batch. We are given an integer batchSize and an integer array that provides the size of various groups of customers who want to visit the shop. Each customer will get exactly one donut.

// When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts (i.e., the first customer of the group does not receive a donut from a batch that was left over from the previous group).

// We need to rearrange the ordering of the groups to maximize the number of happy groups and return this number.

// (Credit: adapted from Leetcode #1815.)

var maxHappyGroups = function (batchSize, groups) {
  // Array to collect sets
  let sets = [];

  // The function lookForSets is recursive. It is used to find sets of groups for which one group will be happy. We will start by looking for sets with one group, then two groups, then three, etc.  When we are looking for sets with more than one group, recursion is used to test combinations of array elements.
  function lookForSets(currentSetSize, currentGroups, currentSum, batchSize) {
    // If currentSetSize = 1, go through array
    if (currentSetSize == 1) {
      for (let i = 0; i < currentGroups.length; i++) {
        // Return match if any, else return false
        if ((currentSum + currentGroups[i]) % batchSize == 0) {
          return [currentGroups[i]];
        }
      }
      return false;

      // If currentSetSize > 1, call lookForSets recursively
    } else {
      for (let i = 0; i <= currentGroups.length - currentSetSize; i++) {
        // Send index value and remaining array to next layer
        let nextLayerSetSize = currentSetSize - 1;
        let nextLayerGroups = [...currentGroups];
        nextLayerGroups.splice(0, i + 1);
        let nextLayerSum = currentSum + currentGroups[i];
        let result = lookForSets(
          nextLayerSetSize,
          nextLayerGroups,
          nextLayerSum,
          batchSize
        );

        // If response has non-false result, add currentGroups[i] to result and return it
        if (result) {
          result.push(currentGroups[i]);
          return result;
        }
      }

      // If we get through the array without non-false result, return false
      return false;
    }
  }

  // Look for sets of groups, and incrementally increase the size of the sets.  Stop the search when the set size is larger than the number of groups left to search.
  for (let setSize = 1; setSize <= groups.length; setSize++) {
    for (let j = 0; j < groups.length; j++) {
      let resultOfLook = lookForSets(setSize, groups, 0, batchSize);

      // If a set is found
      if (resultOfLook) {
        // Add set to list
        sets.push(resultOfLook);

        // Update variables
        for (let m = 0; m < resultOfLook.length; m++) {
          compareValue = resultOfLook[m];
          for (i = 0; i < groups.length; i++) {
            // Remove matched items from groups array
            if (compareValue == groups[i]) {
              groups.splice(i, 1);
              break;
            }
          }
        }
        j = 0;
      }
    }
  }
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
