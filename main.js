// VARIABLE DECLARATIONS
let optionsArray = [
	"AFGHANISTAN",
    "ALBANIA",
    "ALGERIA",
    "ARGENTINA",
    "ARMENIA",
    "AUSTRALIA",
    "AUSTRIA",
    "AZERBAIJAN",
    "BAHAMAS",
    "BANGLADESH",
    "BARBADOS",
    "BELARUS",
    "BELGIUM",
    "BELIZE",
    "BOSNIA AND HERZEGOVINA",
    "BOTSWANA",
    "BRAZIL",
    "BRITAIN",
    "BULGARIA",
    "CAMBODIA",
    "CAMEROON",
    "CANADA",
    "CHAD",
    "CHILE",
    "CHINA",
    "COLOMBIA",
    "CONGO",
    "COSTA RICA",
    "CROATIA",
    "CUBA",
    "CZECHIA",
    "DENMARK",
    "DOMINICA",
    "DOMINICAN REPUBLIC",
    "ECUADOR",
    "EGYPT",
    "EL SALVADOR",
    "EQUATORIAL GUINEA",
    "ESTONIA",
    "ETHIOPIA",
    "FINLAND",
    "FRANCE",
    "GEORGIA",
    "GERMANY",
    "GHANA",
    "GIBRALTAR",
    "GREECE",
    "GUATEMALA",
    "HUNGARY",
    "ICELAND",
    "INDIA",
    "INDONESIA",
    "IRAN",
    "IRAQ",
    "IRELAND",
    "ISRAEL",
    "ITALY",
    "JAMAICA",
    "JAPAN",
    "JORDAN",
    "KENYA",
    "NORTH KOREA",
    "SOUTH KOREA",
    "LAO",
    "LATVIA",
    "LEBANON",
    "LIBYA",
    "LIECHTENSTEIN",
    "LITHUANIA",
    "LUXEMBOURG",
    "MALI",
    "MALTA",
    "MEXICO",
    "MONGOLIA",
    "MOROCCO",
    "NEPAL",
    "NETHERLANDS",
    "NEW ZEALAND",
    "NICARAGUA",
    "NIGERIA",
    "NORWAY",
    "PANAMA",
    "PAPUA NEW GUINEA",
    "PARAGUAY",
    "PERU",
    "PHILIPPINES",
    "POLAND",
    "PORTUGAL",
    "ROMANIA",
    "RUSSIA",
    "RWANDA",
    "SAUDI ARABIA",
    "SENEGAL",
    "SERBIA",
    "SIERRA LEONE",
    "SINGAPORE",
    "SLOVAKIA",
    "SLOVENIA",
    "SOUTH AFRICA",
    "SOUTH SUDAN",
    "SPAIN",
    "SRI LANKA",
    "SUDAN",
    "SWEDEN",
    "SWITZERLAND",
    "TAIWAN",
    "THAILAND",
    "TRINIDAD AND TOBAGO",
    "TUNISIA",
    "TURKEY",
    "UGANDA",
    "UKRAINE",
    "UNITED ARAB EMIRATES",
    "UNITED STATES OF AMERICA",
    "URUGUAY",
    "VENEZUELA",
    "VIETNAM",
    "YEMEN",
    "ZAMBIA",
    "ZIMBABWE",
];

let answer;
let maxWrongGuess = 5;
let mistakes = 0;
let guessed = [];
let wordStatus;
// DOCUMENT DECLARATIONS
let mistakeElement = document.getElementById("mistakes");
let maxWrongGuessElement = document.getElementById("maxWrongGuesses");
mistakeElement.innerHTML = mistakes;
maxWrongGuessElement.innerHTML = maxWrongGuess;

// INITIAL INTERFACE
// Builds out the keyboard for the game 
function generateButtons() {
    let keyboardContainerElement = document.getElementById('keyboardContainer');
    let keyboardButtons = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('').map(letter => 
        `
            <button 
                class="keyboardLetter"
                id="` + letter + `"
                onClick="handleGuess('` + letter + `')"
            >
            ` + letter + `
            </button>
        `).join('');
    keyboardContainerElement.innerHTML = keyboardButtons; 
}

// GAME LOGIC
// Selects a random word from the array
function chooseRandomWord() {
    answer = optionsArray[Math.floor(Math.random()*optionsArray.length)];
    console.log(answer);
}

// Sets the random word
function setGuessWord() {
    wordStatus = answer.split('').map(letter =>
        (guessed.indexOf(letter) >=0 ? letter : " _ ")
    ).join('');

    document.getElementById('letterContainer').innerHTML = wordStatus;
}

// Controls the player's guess
function handleGuess(selectedLetter) {
    if (guessed.indexOf(selectedLetter) === -1) {
        guessed.push(selectedLetter);
    }

    console.log(selectedLetter);
    console.log(guessed);

    if (answer.indexOf(selectedLetter) >=0) {
        document.getElementById(selectedLetter).classList.add('correctLetter');
        setGuessWord();
        checkWin();
    } else {
        document.getElementById(selectedLetter).classList.add('incorrectLetter');
        mistakes++;
        updateMistakes();
        checkLoss();
    }
}

// Adds a mistake to the mistake counter
function updateMistakes() {
    mistakeElement.innerHTML = mistakes;
}

// GAME OVER LOGIC
// Runs if the player wins by guessing the word before reaching the max incorrect guesses
function checkWin() {
	if (wordStatus === answer) {
		document.getElementById('gameContainer').style.visibility = "hidden";
		document.getElementById('gameOverContainer').style.visibility = "visible";
		document.getElementById('gameOverStatus').innerHTML = "You win!";
	}
}

function checkLoss() {
	if (mistakes === maxWrongGuess) {
		document.getElementById('gameContainer').style.visibility = "hidden";
		document.getElementById('gameOverContainer').style.visibility = "visible";

		const gameOver = document.createElement("h3");
		const gameOverText = document.createTextNode("Game over...");
		gameOver.appendChild(gameOverText);

		const correctAnswer = document.createElement("p");
		const correctAnswerText = document.createTextNode("The answer was: " + answer);
		correctAnswer.appendChild(correctAnswerText);
		
		document.getElementById('gameOverStatus').appendChild(gameOver);
		document.getElementById('gameOverStatus').appendChild(correctAnswer);
	}
}

// Runs if the player loses by not guessing the word before reaching the max incorrect guesses


// Starts the game over
function startOver() {
	mistakes = 0;
	guessed = [];
	updateMistakes();
	generateButtons();
	chooseRandomWord();
	setGuessWord();
	document.getElementById('gameContainer').style.visibility = "visible";
		document.getElementById('gameOverContainer').style.visibility = "hidden";
	document.getElementById('gameOverStatus').replaceChildren();
}

// FUNCTION CALLS
generateButtons();
chooseRandomWord();
setGuessWord();