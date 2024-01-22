const gameContainer = document.getElementById("game");
const showCount = document.getElementById("showCount");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let matchingInProgress = false;
let count = 0;
let clicks = 0;

function handleCardClick(e) {
  if(matchingInProgress){
    return;
  }
  const selectedCard = e.target;
  if(selectedCard.classList.contains("faceup")) {
      return;
    }
  clicks++;
  count = Math.floor(clicks / 2);
  showCount.textContent = `Total Guesses: ${count}`;
  selectedCard.style.backgroundColor = selectedCard.classList[0];
  selectedCard.classList.add("faceup");

  if (!firstCard){
    firstCard = selectedCard;
    return;
  }
  matchingInProgress = true;

  if(selectedCard.classList[0] === firstCard.classList[0]){
    firstCard = null;
    matchingInProgress = false;

  } else {
    setTimeout(function() {
      selectedCard.style.backgroundColor = "";
      firstCard.style.backgroundColor = "";

      selectedCard.classList.remove("faceup");
      firstCard.classList.remove("faceup");

      firstCard = null;
      matchingInProgress = false;
    }, 1000);
  }
}

const allMatchesFound = document.querySelectorAll(".faceup").length === COLORS.length;
  if (allMatchesFound) {
    console.log("Game Complete!");
  }

createDivsForColors(shuffledColors);