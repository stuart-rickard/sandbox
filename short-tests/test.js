const tempObject = {
  esfive: function () {
    console.log("inside esfive");
    console.log(this);
    // this.essix();
  },
  essix: () => {
    console.log("inside essix");
    console.log(this);
  },
};

const anotherObj = {
  call5: tempObject.esfive,
  call6: tempObject.essix,
};

const thirdObj = {
  thirdcall5: anotherObj.call5,
  thirdcall6: anotherObj.call6,
};

thirdObj.thirdcall5();
thirdObj.thirdcall6();
