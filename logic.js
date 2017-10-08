var wordOptions = ["panthers", "giants", "packers", "broncos", "chargers", "falcons", "ravens", "cardinals", "texans", "seahawks","patriots", "buccaneers", "cowboys", "eagles", "redskins","bears", "lions", "vikings", "saints", "rams", "bills", "dolphins", "jets", "bengals", "browns","steelers", "colts", "jaguars", "titans", "raiders", "chiefs"]
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;

var audioElement = document.createElement("audio");
      

function startGame() {
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersInWord = selectedWord.split("");
	numBlanks = lettersInWord.length;
	document.getElementById("wrongGuesses").innerHTML = wrongLetters;

	



	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}


	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

	function checkLetters(letter) {
		
		var isLetterInWord = false;

		for (var i = 0; i < numBlanks; i++) {
			if(selectedWord[i] == letter) {
				isLetterInWord = true;
			}
		}

		if(isLetterInWord) {
		for(var i = 0; i < numBlanks; i++) {
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
				}	
			}
		}
		
		else {
			wrongLetters.push(letter);
			guessesLeft --;
		}	
		console.log(blanksAndSuccesses);
	}

	function roundComplete() {
		console.log("Win count: " + winCount + " | Loss Count: " + lossCount + " | Guesses left: " + guessesLeft);
		
		document.getElementById("numGuesses").innerHTML = guessesLeft;
		document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
		document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

		if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
			winCount ++;
			alert("Correct! " + selectedWord + "!");

			document.getElementById("winCounter").innerHTML = winCount;
			audioElement.setAttribute("src", "theme.mp3");
			audioElement.play();

			startGame();
		
		}

		else if(guessesLeft == 0) {
			lossCount ++;
			alert("You Lost! It was " + selectedWord);
			document.getElementById("lossCounter").innerHTML = lossCount;
		
			startGame();

		}
	}


startGame();

document.onkeyup = function(event) {
        var letterGuessed = event.key;
        audioElement.pause();
        checkLetters(letterGuessed);
        roundComplete();

        console.log(letterGuessed);
    }

