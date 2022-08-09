// Groups Generator

// Makes all combinations of groups that include n members where each member has a value from 1 to n and the order doesn't matter (e.g., [3,2,1] is the same as [1,2,3]).  This is also called an unordered comination with replacement.

// To organize the generation of groups, we can count through the combinations. If we have an array of n=44, we start with [1,1,1,1] and end at [4,4,4,4].

// Example:
// 3,3,3,1
// 3,3,3,2
// 3,3,3,3
// 4,1,1,1
// 4,2,1,1
// 4,2,2,1
// 4,2,2,2
// 4,3,1,1

let groupArr = [];
let resultArr = [];
let resultSource = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
let groupCollection = [];

function populateGroupArr(total) {
  for (let n = 0; n < total; n++) {
    groupArr.push(total - n - 1);
  }
  groupCollection.push([...groupArr]);
  return groupArr;
}

function fillWithDescendingIndex(index) {
  for (let n = index; n < groupArr.length; n++) {
    groupArr[n] = groupArr.length - 1 - n;
  }
}

function processForward(myIndex, myTargetValue) {
  // last index - increment and save; return target number when reached
  if (myIndex === groupArr.length - 1) {
    while (groupArr[myIndex] < myTargetValue) {
      groupArr[myIndex]++;
      groupCollection.push([...groupArr]);
    }
    return groupArr[myIndex];

    // other indices - increment and save; send current value to last index as target; if returned value is not my target, increment, fill with ones, save, and send current value to last index as target; return target number when reached
  } else {
    groupArr[myIndex]++;
    groupCollection.push([...groupArr]);
    let result = processForward(myIndex + 1, groupArr[myIndex] - 1);
    while (result < myTargetValue - 1) {
      groupArr[myIndex]++;
      fillWithDescendingIndex(myIndex + 1);
      groupCollection.push([...groupArr]);
      result = processForward(myIndex + 1, groupArr[myIndex] - 1);
    }
    return groupArr[myIndex];
  }
}

function updateGroupArr() {
  for (let l = 2; l <= groupArr.length; l++) {
    fillWithDescendingIndex(1);
    groupArr[0]++;
    groupCollection.push([...groupArr]);
    processForward(1, groupArr[0] - 1);
  }
  console.log(groupCollection.length);
  return groupCollection;
}

function makeResultArr(groupCollection) {
  for (group of groupCollection) {
    resultArr.push(group.map((i) => resultSource[i]));
  }
}
console.time();
console.log(populateGroupArr(5));
updateGroupArr();
makeResultArr(groupCollection);
console.log(groupCollection);
console.log(groupCollection[groupCollection.length - 1]);
console.log(resultArr);
console.log(console.timeEnd());
