const submitBtn = document.querySelector(".submit-btn")
const numberInput = document.querySelector(".number-input")
const feedbackMessage = document.querySelector(".feedback-message")

function handleCorrectAnswer(attempts) {
    feedbackMessage.textContent = `Congratulations! You guessed the correct answer after ${attempts} attempt(s)`
    submitBtn.setAttribute("disabled", true)
}

function handleGameOver() {
    feedbackMessage.textContent = "GAME OVER! Better luck next time";
    submitBtn.setAttribute("disabled", true) 
}

function handleTooHigh(){
    feedbackMessage.textContent = "Your guess is too high. Try again.";
}
function handleTooLow(){
    feedbackMessage.textContent = "Your guess is too low. Try again.";
}

function handleIsValidNumber() {
    feedbackMessage.textContent = "BRAVO! Input a valid number";
}
function handleIsDecimal() {
    feedbackMessage.textContent = "Decimals are not allowed. Use whole numbers";
} 

function isLastAttempt(attempts) {
    return attempts === 3
}

   // Function to clear the entire Display
function clearDisplay() {
    document.getElementById('display').value = '';
}

function init() {
    const minNumber = 1;
    const maxNumber = 100;

    let attempts = 0;
    const answer = Math.floor((Math.random() * (maxNumber - minNumber + 1))) + minNumber;
    let playing = true
    
    submitBtn.addEventListener("click", function() {
        if (playing) {
            const numberInputValue = numberInput.value;
            const isDecimal = String(numberInputValue).includes(".");
            const isNotANumber = isNaN(parseInt(numberInputValue));
            const lowerThanMinNumber = +numberInputValue < minNumber;
            const higherThanMaxNumber = +numberInputValue > maxNumber;
            const isOutOfRange = lowerThanMinNumber || higherThanMaxNumber;
            const isTooHigh =  +numberInputValue > answer;
            const isTooLow =  +numberInputValue < answer;
            const isCorrectAnswer =  +numberInputValue === answer;
            const isNotTooLowAndIsNotTooHighAndIsCorrectAnswer =  !isTooHigh && !isTooLow && isCorrectAnswer;

            
                if(isDecimal) {
                    handleIsDecimal()
                } else if(isNotANumber || isOutOfRange) {
                    handleIsValidNumber()
                } else {
                    attempts++
                    if(isLastAttempt(attempts)) {
                        if(isNotTooLowAndIsNotTooHighAndIsCorrectAnswer) {
                            handleCorrectAnswer(attempts);
                        } else {
                            handleGameOver()
                        }
                        playing = false
                    }
                    else if(attempts <= 2) {
                        if(isTooHigh) {
                            handleTooHigh()
                        }
                        else if(isTooLow) {
                            handleTooLow()
                        } else {
                            handleCorrectAnswer(attempts);
                            playing = false
                        }
                    } else {
                        // this fires off if attempt is greater than 3
                        handleGameOver()
                        playing = false
                    }
                    
                }  
            
            
            console.log({numberInputValue, answer, attempts})
        }
    })
}

    



init();