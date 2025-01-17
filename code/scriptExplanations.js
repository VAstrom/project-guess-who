// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questionSection = document.getElementById('question-section')
const boardWrapper = document.getElementById('board-wrapper')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const filterBtn = document.getElementById('filter')
const winOrLose = document.getElementById("winOrLose")
const winOrLoseText = document.getElementById("winOrLoseText")
const playAgainBtn = document.getElementById("playAgain")


// Array with all the characters, as objects
const POKEMON = [
  {
    name: 'Pikachu',
    img: 'images/Pikachu.png',
    color: 'yellow',
    type: ['electric'],
    other: ['tail']
  },
  {
    name: 'Ninetales',
    img: 'images/Ninetales.png',
    color: 'yellow',
    type: ['fire'],
    other: ['tail']
  },
  {
    name: 'Beedrill',
    img: 'images/Beedrill.png',
    color: 'yellow',
    type: ['bug', 'poison'],
    other: ['stinger']
  },
  {
    name: 'Meowth',
    img: 'images/Meowth.png',
    color: 'yellow',
    type: ['normal'],
    other: ['tail']
  },
  {
    name: 'Ponyta',
    img: 'images/Ponyta.png',
    color: 'yellow',
    type: ['fire'],
    other: ['tail', 'flame']
  },
  {
    name: 'Jigglypuff',
    img: 'images/Jigglypuff.png',
    color: 'pink',
    type: ['normal', 'fairy'],
    other: []
  },
  {
    name: 'Mew',
    img: 'images/Mew.png',
    color: 'pink',
    type: ['psychic'],
    other: ['tail']
  },
  {
    name: 'Clefairy',
    img: 'images/Clefairy.png',
    color: 'pink',
    type: ['fairy'],
    other: ['tail']
  },
  {
    name: 'Chansey',
    img: 'images/Chansey.png',
    color: 'pink',
    type: ['normal'],
    other: ['tail']
  },
  {
    name: 'Squirtle',
    img: 'images/Squirtle.png',
    color: 'blue',
    type: ['water'],
    other: ['tail']
  },
  {
    name: 'Gloom',
    img: 'images/Gloom.png',
    color: 'blue',
    type: ['grass', 'poison'],
    other: ['plant']
  },
  {
    name: 'Vaporeon',
    img: 'images/Vaporeon.png',
    color: 'blue',
    type: ['water'],
    other: ['tail', 'fin']
  },
  {
    name: 'Seadra',
    img: 'images/Seadra.png',
    color: 'blue',
    type: ['water'],
    other: ['tail', 'fin']
  },
  {
    name: 'Lapras',
    img: 'images/Lapras.png',
    color: 'blue',
    type: ['water', 'ice'],
    other: ['tail', 'fin']
  },
  {
    name: 'Poliwhirl',
    img: 'images/Poliwhirl.png',
    color: 'blue',
    type: ['water'],
    other: []
  },
  {
    name: 'Charmander',
    img: 'images/Charmander.png',
    color: 'red',
    type: ['fire'],
    other: ['tail', 'flame']
  },
  {
    name: 'Vileplume',
    img: 'images/Vileplume.png',
    color: 'blue',
    type: ['grass', 'poison'],
    other: ['plant']
  },
  {
    name: 'Electabuzz',
    img: 'images/Electabuzz.png',
    color: 'yellow',
    type: ['electric'],
    other: ['tail'],
  },
  {
    name: 'Flareon',
    img: 'images/Flareon.png',
    color: 'red',
    type: ['fire'],
    other: ['tail']
  },
  {
    name: 'Krabby',
    img: 'images/Krabby.png',
    color: 'red',
    type: ['water'],
    other: []
  },
  {
    name: 'Seaking',
    img: 'images/Seaking.png',
    color: 'red',
    type: ['water'],
    other: ['fin']
  },
  {
    name: 'Bulbasaur',
    img: 'images/Bulbasaur.png',
    color: 'green',
    type: ['grass', 'poison'],
    other: ['plant']
  },
  {
    name: 'Caterpie',
    img: 'images/Caterpie.png',
    color: 'green',
    type: ['bug'],
    other: ['tail']
  },
  {
    name: 'Scyther',
    img: 'images/Scyther.png',
    color: 'green',
    type: ['bug', 'flying'],
    other: ['tail']
  },
];

// Global variables
let secretCharacter
let currentQuestion
let charactersInPlay

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((pokemon) => {
    board.innerHTML += `
      <div class="card">
        <p>${pokemon.name}</p>
        <img class="pokemonImage" src=${pokemon.img} alt=${pokemon.name}>
        <div class="guess">
          <span>Guess on ${pokemon.name}?</span>
          <button id="findOut" class="filled-button small"onclick="guess('${pokemon.name}')">Guess</button>
        </div>
      </div>
    `
  }
  )
}

// Randomly select a person from the characters array and set as the value of the variable called secret
/*  Explanation for setSecret()
  The random character selection is based on the index number calculated using Math.random(). Math.random() generates decimal numbers 0>= x < 1.
  Since we have 24 characters and the index starts at 0, by also using the math.floor() method (that rounds down to the closest integer) the highest number that can be calculated is 23, which is the last character in the array[].
  charactersInPlay.length = the number of elements in the array. 
*/
const setSecretCharacter = () => {
  secretCharacter = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = POKEMON
  // Invoke/use the function generateBoard to load all the characters on the board.
  generateBoard(charactersInPlay);

  //Randomly select a character from the charactersInPlay array and designate it as the "secret" character.
  setSecretCharacter();
  console.log("The secret character is:", secretCharacter);
  console.log("secret is this data type:", typeof (secretCharacter));
}

// setting the currentQuestion object when you select something in the dropdown
/* EXPLANATION
const category: stores what option group (category) the question belongs to
  questions.options[questions.selectedIndex] retrieves the specific <option> element that is currently selected in the dropdown list.
  [questions.selectedIndex] returns the numerical index of the selected option. The first option in the list has an index of 0, the second has an index of 1, and so on.
  .parentNode.label, accesses the parent element of the selected <option>, the <optgroup> element and retrieves the label attribute of that element.
  So the whole expression is used to retrieve the label of the <optgroup> element from the option that is currently selected in the drop-down menu
*/
const selectQuestion = () => {
  const selectedOption = questions.options[questions.selectedIndex];
  const category = selectedOption.parentNode.label;

  // Variable that stores the actual value of the question that has been selected.
  const value = selectedOption.value;

  currentQuestion = {
    category: category,
    value: value
  };

  console.log("This is the category and value of currentQuestion", currentQuestion);
}


// This function should be invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  /* Explanation: Object destructuring
   extract data from an object and assign to new variables.
   Another way to do this is:
   const category = currentQuestion.category;
   const value = currentQuestion.value;
   The destructuring makes it easier to extract data
   */
  const { category, value } = currentQuestion;
  // Compare the currentQuestion details with the secret person details in a different manner based on category (hair/eyes or accessories/others).
  // See if we should keep or remove people based on that

  /* Explanations
  This is divided like this since the first two categories will have one to one comparisons while the other two categories contain properties with multiple values.
  For the hair/eyes category:
  We're accessing a CHARACTER object (via the variable secretCharacter) and look through its attributes until we find one that matches the category in the if statement. Once found we take the value (for example "yellow hair") and compare that to the player's choice to see if the match.*/

  let keep = false; //Chose "false" to make the code below easier for me to read (and avoid !)
  if (category === 'color') {
    if (value === secretCharacter[category]) {
      keep = true;
    }
  } else if (category === 'type' || category === 'other') {
    if (secretCharacter[category].includes(value)) { // .includes() since there are multiple values
      keep = true;
    }
  }
  console.log('keep:', keep);
  // Then invoke filterCharacters
  filterCharacters(keep);
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keepParam) => {
  const { category, value } = currentQuestion
  // Show the correct alert message for different categories
  console.log(charactersInPlay);
  if (category === 'color') {
    // since keep parameter is a boolean there's no need to do an equation.
    if (keepParam) {
      alert(
        `Yes, the pokemon is ${value}! Keep all pokemon that are ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => pokemon[category] === value)
    } else {
      alert(
        `No, the pokemon isn't ${value}! Remove all pokemon that are ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => pokemon[category] !== value)
    }
  } else if (category === 'type') {
    if (keepParam) {
      alert(
        `Yes, the pokemon has the ${value} type! Keep all pokemon that have the ${value} type.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => pokemon[category].includes(value))
    } else {
      alert(
        `No, the pokemon doesn't have the ${value} type! Remove all pokemon that have the ${value} type.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => !pokemon[category].includes(value))
    }
  } else {
    if (keepParam) {
      alert(
        `Yes, the pokemon has a ${value}! Keep all pokemon that have a ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => pokemon[category].includes(value))
    } else {
      alert(
        `No, the pokemon doesn't have a ${value}! Remove all pokemon that have a ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((pokemon) => !pokemon[category].includes(value))
    }
  }
  // Invoke a function to redraw the board with the remaining people.
  generateBoard();
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (pokemonToConfirm) => {
  // store the interaction from the player in a variable.
  console.log("guess= ", pokemonToConfirm);
  // remember the confirm() ?
  let result = confirm(`Are you sure you want to pick ${pokemonToConfirm}?`);
  // If the player wants to guess, invoke the checkMyGuess function.
  if (result) {
    checkMyGuess(pokemonToConfirm);
  }
}

// If you confirm, this function is invoked
const checkMyGuess = (pokemonToCheck) => {
  board.style.display = "none";
  winOrLose.style.display = "flex";

/* Old code:
  if (pokemonToCheck === secretCharacter.name) {
    winOrLoseText.innerHTML = `Yay! ${pokemonToCheck} was correct! Congratz!`;
  } else {
    winOrLoseText.innerHTML = `Oh, no! ${secretCharacter.name} was the right answer! Better luck next time!`;
  }
*/
  winOrLoseText.innerHTML =
    (pokemonToCheck === secretCharacter.name) 
    ? `Yay! ${pokemonToCheck} was correct! Congratz!` 
    : `Oh, no! ${secretCharacter.name} was the right answer! Better luck next time!`;
}

// Invokes the start function when website is loaded
start()

// Counter for number of guesses
/* Explanation
 createElement and AppendChild are used when you want to dynamically create and insert new elements into the DOM or when you need to update specific parts of an element's content without replacing its entire content. += innerHTML is used when you want to update the content of an existing HTML element, replacing its content with new HTML.
*/
let counter = 0;

/* I tried using createElement and appendchild for the counter and it worked but I'm going to add the element to the html file since it should always be visible and it's an easier solution
let counterDiv = document.createElement("div");
counterDiv.id = "counterDiv";

let numberOfGuessesText = 'Number of guesses: ';
let counterText = document.createTextNode(`${numberOfGuessesText} ${counter}`);
counterText.id = "counterElement";

// Append the text node to the div.
// The new node will be last in the list of children.
counterDiv.appendChild(counterText);

// Append the div to the aside section.
questionSection.appendChild(counterDiv);
*/

// All the event listeners
/* EXPLANATION, event listeners:
there are two different options:
filterBtn.addEventListener('click', checkQuestion);
or
In this one i can pass in an argument to the function:
filterBtn.addEventListener('click', () => checkQuestion());
if I type:
filterBtn.addEventListener('click', checkQuestion());
the function will be run immediately without Javascript listening to the event which is not what i want here.
*/
filterBtn.addEventListener('click', () => {
  counter++; // Increase counter by 1
  // Updates the textnode since that text is static and the counter number won't go up without this update
  counterText.textContent = `${numberOfGuessesText} ${counter}`;
  checkQuestion();
});
restartButton.addEventListener('click', () => {
  location.reload();
  start();
})
// Event listener for the dropdown menu
questions.addEventListener('change', selectQuestion);
// Event listener for find out-button
playAgainBtn.addEventListener('click', () => {
  winOrLose.style.display = "none";
  board.style.display = "flex";
  location.reload();
  start();
})