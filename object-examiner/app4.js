class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

class GroupCreateArgs {
  constructor(value) {
    this.value = value;
  }

  whatwewant() {
    return {
      attributes: {
        class: "group",
      },

      childElements: {
        1: {
          type: "p",
          // styles,
          // attributes,
          props: { innerText: `Group ${this.value}` },
          // eventHandlers,
          // appendTo:
        },
        2: {
          type: "button",
          // styles,
          attributes: {
            "data-do": "delete group",
            // id: `group-${settings.nextGroup}-delete-btn`,
          },
          props: { innerText: "x delete group" },
          // eventHandlers,
          // appendTo:
        },
      },
    };
  }
}

const hello = new GroupCreateArgs("valuexxxx");

console.log(square);
console.log(square.area); // 100
console.log(square.calcArea());
console.log(hello);
console.log(hello.whatwewant().childElements);
