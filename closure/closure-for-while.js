// comparison of closure -- with for and while loops

function oneLessFor(value) {
  let newValue = value - 1;
  for (i = newValue; i > 0; i--) {
    console.log(i);
    oneLessFor(i);
  }
}

function oneLessWhile(value) {
  let newValue = value - 1;
  while (newValue > 0) {
    console.log(newValue);
    oneLessFor(newValue);
    newValue--;
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

oneLessFor(4);
console.log("**************");
oneLessWhile(4);
console.log("**************");
oneLessForWithLet(4);
