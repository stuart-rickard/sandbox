// Problem statement:

// There is a donuts shop that bakes donuts in batches of batchSize. They sell all of the donuts of a batch before they begin to sell the next batch. We are given an integer batchSize and an integer array that provides the size of various groups of customers who want to visit the shop. Each customer will get exactly one donut.

// When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts (i.e., the first customer of the group does not receive a donut from a batch that was left over from the previous group).

// We need to rearrange the ordering of the groups to maximize the number of happy groups and return this number.

// (Credit: adapted from Leetcode #1815.)

var maxHappyGroups = function (batchSize, groups) {
  groups = groups.map((item) => item % batchSize);
  groups.sort((a, b) => a - b);
  console.log("sorted groups is");
  console.log(groups);
  let sets = [];

  function removeFromGroups(array) {
    for (let m = 0; m < array.length; m++) {
      for (let n = 0; n < groups.length; n++) {
        // Remove matched items from groups array
        if (array[m] === groups[n]) {
          groups.splice(n, 1);
          break;
        }
      }
    }
  }

  function checkThis(toAdd, startIndex, currentSum, targetTotal) {
    if (toAdd === 1) {
      for (let i = startIndex; i < groups.length; i++) {
        if ((groups[i] + currentSum) % targetTotal === 0) {
          return [groups[i]];
        }
      }
      if (groups.length < 6) {
        console.log([toAdd, startIndex, currentSum, targetTotal]);
      }
      return false;
    } else {
      let toAddNext = toAdd - 1;
      for (
        let j = startIndex;
        j < groups.length - startIndex - toAddNext;
        j++
      ) {
        let startIndexNext = j + 1;
        let currentSumNext = currentSum + groups[j];
        if (groups.length < 6) {
          console.log(
            [toAddNext, startIndexNext, currentSumNext, targetTotal],
            "sent"
          );
        }
        let result = checkThis(
          toAddNext,
          startIndexNext,
          currentSumNext,
          targetTotal
        );
        if (result) {
          result.push(groups[j]);
          return result;
        }
      }
      return false;
    }
  }

  while (groups[0] === 0) {
    sets.push([groups[0]]);
    groups.splice(0, 1);
  }

  if (groups.length >= 2) {
    for (let setSize = 2; setSize <= groups.length; setSize++) {
      for (let multiplier = 1; multiplier < setSize; multiplier++) {
        let result = checkThis(setSize, 0, 0, batchSize * multiplier);
        if (result) {
          sets.push(result);
          removeFromGroups(result);
          if (groups.length < setSize) {
            break;
          }
          multiplier--;
        }
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

// maxHappyGroups(7, [1, 1, 2, 3, 1, 6, 7, 3, 4, 3000, 4, 6, 6, 2]);
maxHappyGroups(
  5,
  [
    77661097, 287831335, 591851599, 931531218, 76145868, 782939541, 80670001,
    23100566, 682236334, 10648258, 312267263, 806088843, 850601907, 385678804,
    529635015, 503407101, 926262283, 922467807, 165549088, 108377551, 538405915,
    835098309, 853607030, 352287776, 82792996, 546824529, 714304009,
  ]
);
