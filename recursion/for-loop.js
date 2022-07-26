// use while loops not for loops with recursion; for loop does not have closure -- unless let is used in declaration

function oneLessWhile(value) {
  let newValue = value - 1;
  while (newValue > 0) {
    console.log(newValue);
    oneLessFor(newValue);
    newValue--;
  }
}

function oneLessFor(value) {
  let newValue = value - 1;
  for (i = newValue; i > 0; i--) {
    console.log(i);
    oneLessFor(i);
  }
}

function oneLessForWithLet(value) {
  let newValue = value - 1;
  // notice let below
  for (let i = newValue; i > 0; i--) {
    console.log(i);
    oneLessFor(i);
  }
}

oneLessWhile(4);
console.log("**************");
oneLessFor(4);
console.log("**************");
oneLessForWithLet(4);
