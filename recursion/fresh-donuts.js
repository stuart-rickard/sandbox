// map groups into groups % batchsize
// sort new array large to small
// pull out groups with mod = 0
// create groupCollections that have 2 members, then 3, then 4, etc
// ++ refine groupCollection generation - not necessary to create all possibilities
// test groupCollections for mod = 0

// collections of gC's need to be tested
// limited by available groups
// looking for largest collection of gC's (including counting remainder as one happy customer)
// # this will tend to be a collection of small gC's, but optimal solution can have larger gC's depending on the set of groups we are testing
// develop cgC's
// # two approaches: 1) blindly combine gC's first and then test complete cgC whether it is using too many groups; or 2) strategically combine gC's so that we are only adding a gC to a cgC if it qualifies
//  start with small gC's

// algorithm for checking whether a gC can be formed with remaining groups
// create an inventory object where the number is the property and the value is the count of that number:
//  {2: 4, 3: 5, 6: 1} - this means there are 4 twos, 5 threes, and 1 six
//  if a group is [2, 3, 3, 6] we can use forEach on it so that group.forEach((value)=> inventory[value]--; if (inventory[value]<0){return false})

let inventory = { 2: 4, 3: 5, 6: 1 };
let arrOne = [2, 3, 3, 6];
let arrTwo = [2, 2, 6];

function subtractFromInventory(groupCollection, inventory) {
  let flag;
  groupCollection.forEach((value) => {
    if (inventory[value]--) {
      return;
    } else {
      flag = true;
    }
  });
  if (flag) {
    return false;
  } else {
    return true;
  }
}

console.log(inventory);
console.log(subtractFromInventory(arrOne, inventory));
console.log(inventory);
console.log(subtractFromInventory(arrTwo, inventory));
console.log(inventory);
