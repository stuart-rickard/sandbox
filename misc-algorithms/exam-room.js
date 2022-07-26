// Leetcode #855 Exam Room
// Take first seat that has the maximum least number of seats in between

/**
 * @param {number} n
 */
var ExamRoom = function (n) {
  this.seats = n;
  this.occArr = [];
  return null;
};

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function () {
  console.log("seat");

  // if the array is empty
  if (this.occArr.length == 0) {
    this.occArr.push(0);
    return 0;
  }
  this.occArr.sort((a, b) => a - b);
  let largest = { seat: -1, gap: -1 };

  if (this.occArr.length > 1) {
    // skip first member of array
    for (index = 1; index < this.occArr.length; index++) {
      // for all others calculate gap to prevNum and add it to largest if it's larger than previous
      let currGap = this.occArr[index] - this.occArr[index - 1];
      if (Math.floor(currGap / 2) > Math.floor(largest.gap / 2)) {
        largest.gap = currGap;
        largest.seat = this.occArr[index - 1];
      }
    }
  }
  let fromLargestSitIn = largest.seat + Math.floor(largest.gap / 2);
  let fromLargestGap = Math.floor(largest.gap / 2) - 1;

  let nextChair = -1;

  // check gap to end
  let endGap = this.seats - 1 - this.occArr[this.occArr.length - 1] - 1;

  // calculate middleGap
  let middleGap = fromLargestGap;

  // check gap to start
  let startGap = this.occArr[0] - 1;
  console.log(startGap, " startGap");

  // fill the appropriate set
  if (endGap > middleGap) {
    if (endGap > startGap) {
      nextChair = this.seats - 1;
    } else {
      nextChair = 0;
    }
  } else {
    if (middleGap > startGap) {
      nextChair = fromLargestSitIn;
    } else {
      nextChair = 0;
    }
  }
  this.occArr.push(nextChair);
  console.log(nextChair, " nextChair");
  console.log(this.occArr);
  console.log("********************");
  return nextChair;
};

/**
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function (p) {
  console.log("leave");
  this.occArr.splice(this.occArr.indexOf(p), 1);
  return null;
};

/**
 * Your ExamRoom object will be instantiated and called as such:
 * var obj = new ExamRoom(n)
 * var param_1 = obj.seat()
 * obj.leave(p)
 */
let theRoom = new ExamRoom(10);
console.log(theRoom);
console.log(theRoom.seat()); // return 0, no one is in the room, then the student sits at seat number 0.
console.log(theRoom.seat()); // return 9, the student sits at the last seat number 9.
console.log(theRoom.seat()); // return 4, the student sits at the last seat number 4.
console.log(theRoom.seat()); // return 2, the student sits at the last seat number 2.
console.log(theRoom.leave(4));
console.log(theRoom.seat()); // return 5, the student sits at the last seat number 5.
