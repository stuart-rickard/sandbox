let bodyEl = document.getElementById("body");
const maxCharCode = 16384;
// const maxCharCode = 256;
const columns = 100;

let currentCharCode = 0;

for (x = 0; x <= 80; x++) {
  let rowElement = document.createElement("tr");
  bodyEl.appendChild(rowElement);

  for (y = 0; y < columns; y++) {
    let colElement = document.createElement("td");
    colElement.textContent = String.fromCharCode(currentCharCode);
    // colElement.setAttribute("data-y", y);
    rowElement.appendChild(colElement);
    currentCharCode++;
  }
}

let currentCharEl = document.getElementById("currentChar");
currentCharEl.textContent = String.fromCharCode(2735) + `  ${2735}`;
