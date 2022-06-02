
//selectors
let form = document.querySelector("form");
let inputField;
let guess;
let numBtns = document.querySelectorAll(".num-btn");

//variables
let answer;
let feedback = "";
let count = 0;
let correct = 0;
let attempts = 0;
let hiScore = 0;

//Helper functions

//retrieves the random 4 digit number from APi
async function getRandNum() {
    try {
        const response = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        answer = response.data.match(/\d+/g).join("");
        console.log(answer);
    } catch (error) {
        console.log(error);
    }
}

//refreshes the page to start a new game
function newGame() {
    location.reload();
}

//checks if user guess is equal to answer
function checkIfEqual(answer, guess) {
    if (answer == guess) return true;
    return false;
}

// creates a new table row to display user attempts, guesses, and hints each turn
function showUserFeedback() {
    //Select table body
    let tableBody = document.querySelector("tbody");
    //insert new row at the end of the table
    let row = tableBody.insertRow(-1);
    //insert new cells in the table
    let tempAttemptsCell = row.insertCell(0);
    let tempGuessCell = row.insertCell(1);
    let tempHintCell = row.insertCell(2);
    //Append text nodes to new cells
    let tempAttempts = document.createTextNode(attempts);
    tempAttemptsCell.appendChild(tempAttempts);
    let tempGuess = document.createTextNode(guess);
    tempGuessCell.appendChild(tempGuess);
    let tempHint = document.createTextNode(feedback);
    tempHintCell.appendChild(tempHint);
}

getRandNum();


//Each form submission counts as an attempt!
form.addEventListener("submit", (event) => {
    event.preventDefault();
    inputField = document.getElementById("user-guess");
    guess = inputField.value;

    //Ensure length of user guess is 4 digits
    if (guess.length != 4) {
        alert("Your guess must be 4 digits!");
    } else {
        attempts += 1;
        //if userGuess is NOT equal to the answer
        if (!checkIfEqual(answer, guess) && attempts < 11) {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === answer[i]) {
                    correct += 1;
                    count += 1;
                }
                for (let j = 0; j < guess.length; j++) {
                    if (i !== j) {
                        if (guess[i] === answer[j]) {
                            count += 1;
                        }
                    }
                }
            }
            feedback = `You got ${correct} numbers in the correct position and ${count} numbers in the solution.`;

            showUserFeedback();
            if (attempts === 10) {
                alert(`You lose, the answer was ${answer}! Press New Game to play again.`);
            }
        } else {
            //if userGuess is equal to the answer
            feedback = `You win! You guessed the correct solution.`;
            hiScore = (hiScore === 0) ? Math.min(hiScore, attempts) : attempts;
            sessionStorage.setItem('hi-score', hiScore);
            alert(feedback);
            location.reload();
        }

    }

    inputField.value = "";
    count = 0;
    correct = 0;
})

