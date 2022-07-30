// Groups Generator

// Make groups without replacement where order doesn't matter.  Starting with [a,b,c,d,e], sets of three would be [c,b,a], [d,b,a], [d,c,a], [d,c,b], [e,b,a], etc.

let sourceArr = [1, 3, 5, 6, 7, 8, 9];
let groupArr = [];
let groupCollection = [];

function populateGroupArr(total) {
  for (let n = total - 1; n >= 0; n--) {
    groupArr.push(sourceArr[n]);
  }
  groupCollection.push([...groupArr]);
  return groupArr;
}

function fillWithOnes(index) {
  for (let n = index; n < groupArr.length; n++) {
    groupArr[n] = sourceArr[groupArr.length - 1 - n];
  }
}

function processForward(myIndex, indexOfSourceArrValue) {
  // XXSXXXXXX indexOfSourceArrValue becomes myTargetIndex of the sourceArr
  // last index - increment and save; return target number when reached
  if (myIndex === groupArr.length - 1) {
    while (groupArr[myIndex] < sourceArr[indexOfSourceArrValue]) {
      //XXXXXXXXXXXXXXXXXX
      groupArr[myIndex]++; // XXXXXXXXXXXXXXXXXXXXX
      groupCollection.push([...groupArr]);
    }
    return groupArr[myIndex]; // XXXXXXXXXXXXXXXXXXXXX

    // other indices - increment and save; send current value to last index as target; if returned value is not my target, increment, fill with ones, save, and send current value to last index as target; return target number when reached
  } else {
    groupArr[myIndex]++; // XXXXXXXXXXXXXXXXXXXXX
    groupCollection.push([...groupArr]);
    let result = processForward(myIndex + 1, groupArr[myIndex]);
    while (result < indexOfSourceArrValue) {
      // XXXXXXXXXXXXXXXXXXXXX
      groupArr[myIndex]++; // XXXXXXXXXXXXXXXXXXXXX
      fillWithOnes(myIndex + 1); // XXXXXXXXXXXXXXXXXXXXX
      groupCollection.push([...groupArr]);
      result = processForward(myIndex + 1, groupArr[myIndex]); // XXXXXXXXXXXXXXXXXXXXX
    }
    return result;
  }
}

function updateGroupArr() {
  for (let l = 2; l <= groupArr.length; l++) {
    // XXXXXXXXXXXXXXXXXXXXX
    fillWithOnes(1);
    groupArr[0]++; // XXXXXXXXXXXXXXXXXXXXX
    groupCollection.push([...groupArr]);
    processForward(1, groupArr[0]); // XXXXXXXXXXXXXXXXXXXXX
  }
  return groupCollection;
}
// console.time();
console.log(populateGroupArr(7));
let z = 20;
groupArr = [z, z, z, z, z, z, z];
console.log(groupArr);
fillWithOnes(2);
console.log(groupArr);
processForward(6, 3);
console.log(groupArr);
// console.log(updateGroupArr());
// console.log(console.timeEnd());
