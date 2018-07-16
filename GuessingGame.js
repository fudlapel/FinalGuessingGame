function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }


function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    if(this.playersGuess < this.winningNumber) {
        return true;
    } else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(num) {
    if(num < 1 || num > 100 || typeof num !== 'number') {
        throw("That is an invalid guess.");
    }
    this.playersGuess = num;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.playersGuess === this.winningNumber) {
        $('#submit, #hint').prop("disabled", true);
        $('#subtitle').text("press reset to play again!");
        return 'You Win!';
    } else {
        if(this.pastGuesses.indexOf(this.playersGuess) >= 0) {
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

            if(this.pastGuesses.length === 5) {

                $('#submit, #hint').prop("disabled", true);
                $('#subtitle').text("press reset to play again!");
    
                return 'You Lose.';
            } else {
        
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!");
                } else {
                    $('#subtitle').text("Guess Lower!!")
                }   

                if(this.difference() < 10) {
                    return 'You\'re burning up!';
                }
                if(this.difference() < 25) {
                    return 'You\'re lukewarm.';
                }
                if(this.difference() < 50) {
                    return 'You\'re a bit chilly.';
                }
                if(this.difference() < 100) {
                    return 'You\'re ice cold!';
                }
            }
        }
    }
}
 

function newGame() {
    var newInstance = new Game();
    return newInstance;
}

Game.prototype.provideHint = function() {
    //generates array with length of 3
    
    var finalArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];

    return shuffle(finalArr);
}

function shuffle(inputArr) {

    for(var i = inputArr.length-1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var temp = inputArr[i];
        inputArr[i] = inputArr[randomIndex];
        inputArr[randomIndex] = temp;
    }

    return inputArr;
}

function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function() {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1 - 100!');
        $('.guess').text('-');
        $('#submit, #hint').prop("disabled", false);
     })

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is one of these: ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
    });

})