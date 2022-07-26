let groupArr = [];
let groupCollection = [];

function populateGroupArr(total) {
  groupArr = [3, 3, 3, 3];
  //   for (let n = 0; n < total; n++) {
  //     groupArr.push(1);
  //   }
  groupCollection.push([...groupArr]);
  return groupArr;
}

// create array of ones

// in order of increasing index, increment items in the array

// after incrementing the last item in the array to match the one before it, we go back to the first item that is greater than the value of the last item and increment that one and set all following items to 1.  If the whole array has the same value, we increment the first item and set all follow to 1 (e.g., after [2,2,2,2] comes [3,1,1,1])

// functions:
// increment current item
// work on next item
// go back to a certain index (if at end)

// example
// 3,3,3,1 increment to 3,3,3,2
// 3,3,3,2 increment to 3,3,3,3
// 3,3,3,3 incrment to 4,1,1,1
// 4,1,1,1 increment to 4,2,1,1
// 4,2,1,1 incrmenet to 4,2,2,1
// 4,2,2,2 incrmement to 4,3,1,1

// if last increment was behind me, increment me and go to next
//  if at end, return my value
//  else increment next
// if increment was in front of me, increment me and make all following ones, unless I am equal to previous value, in which case return my value
//    when processForward returns a number less than myTargetValue,
//     processForward again
//    when it returns my value, return my value

// processForward (myIndex, myTargetValue)
//  increment myIndex
//   if at end, return my value
//  else, check processForward of following index
//   if it's equal to myTargetValue
//    return my value
//   else
//    fill ones for myIndex +2
//    processForward with target value of current value +1
//set all following indices to ones and processForward

function fillWithOnes(index) {
  console.log("fill ", index);
  if (index >= groupArr.length) {
    console.log("done with row");
    return;
  }
  for (let n = index; n < groupArr.length; n++) {
    groupArr[n] = 1;
  }
}

function processForward(myIndex, myTargetValue) {
  groupArr[myIndex]++;
  groupCollection.push([...groupArr]);
  if (myIndex === groupArr.length - 1) {
    return groupArr[myIndex];
  }
  let result = 0;
  do {
    fillWithOnes(myIndex + 2);
    result = processForward(myIndex + 1, groupArr[myIndex + 1] + 1);
    groupCollection.push([...groupArr]);
  } while (result < myTargetValue);
  return groupArr[myIndex];
}

function updateGroupArr() {
  fillWithOnes(1);
  groupArr[0]++;
  groupCollection.push([...groupArr]);
  console.log(processForward(1, groupArr[0]), "process forward");

  return groupCollection;
}

console.log(populateGroupArr(5));
console.log(updateGroupArr());
