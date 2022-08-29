// Import stylesheets
import "./styles/index.css";
import "./styles/normalize.css";

let userInput;

// DOM Selection
const grayShadesButton = document.querySelector("#gray-shades-button");
const clearButton = document.querySelector("#clear-button");
const resetButton = document.querySelector("#reset-button");
const randomColorsButton = document.querySelector("#random-colors-button");
const modalDiv = document.querySelector("#modal-div");
const modalCloseButton = document.querySelector("#close-modal");
const numberInput = document.querySelector("#squares-number-input");
const confirmNumberSquaresButton = document.querySelector(
  "#confirm-number-squares-button",
);
const alertMessageDiv = document.querySelector("#alert-message-div");
const alertTouchDevices = document.querySelector("#alert-touch-devices");

/* * Function - Create squares grid * */
const createSquaresGrid = (userChoice) => {
  userInput = userChoice;
  const containerAllSquareDivs = document.querySelector("#squares-container"); // Select the container

  // Fix the grid's columns and rows  number inside containerAllSquareDivs
  containerAllSquareDivs.style.setProperty(
    "grid-template-columns",
    `repeat(${userChoice}, 1fr)`,
  );
  containerAllSquareDivs.style.setProperty(
    "grid-template-row",
    `repeat(${userChoice}, 1fr)`,
  );

  // Create new squares and append them to the container
  for (let i = 0; i < userChoice * userChoice; i++) {
    const newSquareDiv = document.createElement("div");
    newSquareDiv.classList.add("new-square-divs");
    containerAllSquareDivs.appendChild(newSquareDiv);
  }

  // "Gray shades effect" for all created divs
  for (let i = 0; i < userChoice * userChoice; i++) {
    const allSquareDivs = document.querySelectorAll(".new-square-divs");
    allSquareDivs[i].addEventListener("mouseenter", (event) => {
      /** 1 - At first, when the grid is created, opacity = 0
       * because the custom attribute "progressive opacity" has not been assigned yet.
       * We add 0.1 to 0, so the first mouseenter generates a 0.1 opacity.* */
      let opacityDOM =
        Number(event.target.getAttribute("progressive-opacity")) + 0.1;
      event.target.style.backgroundColor = "black";
      event.target.style.opacity = opacityDOM; // 2 - Change the CSS opacity

      if (opacityDOM < 1) {
        opacityDOM += 0.1; // 3 - Update opacityDOM
        // 4 - (Set the "progressive-opacity" at the first time and)
        // Attribute and update the value
        event.target.setAttribute("progressive-opacity", opacityDOM);
      }
    });
  }
};

/* * Function - Set a random color code (HEX) * */
const getRandomColor = (hoveredSquare) => {
  const letters = "0123456789ABCDEF";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  hoveredSquare.style.backgroundColor = randomColor;
};

/* * Function - Display Modal * */
const displayModal = () => {
  modalDiv.style.display = "flex";
};

/* * Function - Hide Modal * */
const hideModal = () => {
  modalDiv.style.display = "none";
};

/* * Function - Set Alert Modal Delay * */
const setAlertModalDelay = () => {
  setTimeout(() => {
    alertMessageDiv.style.display = "none";
  }, 2000);
};

/* * Function - Display Alert  Message Modal * */
const displayAlertMessage = () => {
  alertMessageDiv.style.display = "flex";
  setAlertModalDelay();
};

/* * Function - Reset the grid * */
const resetGrid = () => {
  const squaresNumber = numberInput.value;

  if (squaresNumber > 60 || squaresNumber <= 0) {
    displayAlertMessage();
    return;
  }
  // Remove all created divs inside the container
  const allSquareDivs = document.querySelectorAll(".new-square-divs");
  allSquareDivs.forEach((item) => {
    item.remove();
  });
  // Create Grid with squaresNumber
  createSquaresGrid(squaresNumber);
  modalDiv.style.display = "none";
};

/* * Function - SetAlertDevicesDelay Function - This App doesn't work on Touch Screen
 * Devices. This function set the delay after which the relating Alert disappears after 5000 ms * */
const setAlertTouchDevicesDelay = () => {
  setTimeout(() => {
    alertTouchDevices.remove();
  }, 5000);
};

/* * Function - Hide Alert Touch Screen Devices after 5000 ms delay * */
const hideAlertDevices = () => {
  setAlertTouchDevicesDelay();
};

// Gray Shades Button - Event Listener
grayShadesButton.addEventListener("click", () => {
  // Remove all created divs inside the container
  const allSquareDivs = document.querySelectorAll(".new-square-divs");
  allSquareDivs.forEach((item) => {
    item.remove();
  });
  createSquaresGrid(userInput);
});

// Clear Button - Event Listener
clearButton.addEventListener("click", () => {
  const allSquareDivs = document.querySelectorAll(".new-square-divs");
  for (let i = 0; i < userInput * userInput; i++) {
    allSquareDivs[i].style.backgroundColor = "";
    allSquareDivs[i].style.opacity = "1";

    // Check if the div was "random-color" and fix the future opacity
    if (allSquareDivs[i].classList.contains("random-color")) {
      allSquareDivs[i].setAttribute("progressive-opacity", "1");
    } else {
      allSquareDivs[i].setAttribute("progressive-opacity", "0.1");
    }
  }
});

// Random Colors Button - Event Listener
randomColorsButton.addEventListener("click", () => {
  const allSquareDivs = document.querySelectorAll(".new-square-divs");
  for (let i = 0; i < userInput * userInput; i++) {
    allSquareDivs[i].style.backgroundColor = "white";
    allSquareDivs[i].style.opacity = "1";
    allSquareDivs[i].classList.add("random-color");
    allSquareDivs[i].setAttribute("progressive-opacity", "1.0");
    allSquareDivs[i].addEventListener("mouseenter", (event) => {
      const square = event.target;
      getRandomColor(square);
    });
    // Set mouseovered square's background color to the "Random Color" Button's background color
    allSquareDivs[i].addEventListener("mouseenter", (event) => {
      const { backgroundColor } = event.target.style;
      randomColorsButton.style.backgroundColor = backgroundColor;
    });
  }
});

// Reset Button - Event Listener
resetButton.addEventListener("click", displayModal);

// Confirm Button - Event Listener
confirmNumberSquaresButton.addEventListener("click", resetGrid);

// Modal Close Button - Event Listener
modalCloseButton.addEventListener("click", hideModal);

// Number Input - Event Listener
numberInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    resetGrid();
  }
});

// Initiate the game - 16 squares grid
createSquaresGrid(16);

// Hide the Touch Screen Devices Alert after 5000 ms
hideAlertDevices();
