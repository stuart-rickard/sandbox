const anObjectThatRefersToItself = {
  one: "one as a string",
  two: {
    secondLevelString: "2nd level string",
    // referBack: anObjectThatRefersToItself.one,
    // There is a ReferenceError that is returned if we try to self refer as in line 5
  },
};

console.log(anObjectThatRefersToItself);
console.log(anObjectThatRefersToItself.two.referBack);

const anObjectThatRefersToAnotherVariable = {
  one: "one as a string",
  two: {
    secondLevelString: "2nd level string",
    referOutside: anObjectThatRefersToItself.one,
  },
};

console.log(anObjectThatRefersToAnotherVariable);
console.log(anObjectThatRefersToAnotherVariable.two.referOutside);

anObjectThatRefersToItself.one = "a different string";

console.log(anObjectThatRefersToAnotherVariable.two.referOutside);
