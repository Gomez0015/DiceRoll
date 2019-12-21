//Variables
var down;
var middle;
var up;

var downWon;
var middleWon;
var upWon;

function startRolling(){
  // Roll the Dice
  function playGame(){
    var randomNumber1 = Dice1Roll();
    var randomNumber2 = Dice2Roll();
    var randomNumber3 = Dice3Roll();

    decideWinner(randomNumber1, randomNumber2, randomNumber3);
  }

  // Roll Dice 1
  function Dice1Roll(){
    var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

    var randomDice1 = "images/dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

    document.querySelectorAll("img")[0].setAttribute("src", randomDice1);

      return randomNumber1;
  }

  // Roll Dice  2
  function Dice2Roll(){
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    var randomDice2 = "images/dice" + randomNumber2 + ".png";

    document.querySelectorAll("img")[1].setAttribute("src", randomDice2);

    return randomNumber2;
  }

  // Roll Dice  3
  function Dice3Roll(){
    var randomNumber3 = Math.floor(Math.random() * 6) + 1;

    var randomDice3 = "images/dice" + randomNumber3 + ".png";

    document.querySelectorAll("img")[2].setAttribute("src", randomDice3);

    return randomNumber3;
  }

  // Display Which number was rolled And decide what condition wins
  function decideWinner(randomNumber1, randomNumber2, randomNumber3){
    var numberRolled = randomNumber1 + randomNumber2 + randomNumber3;
    document.querySelector(".number-rolled").innerHTML = "Number Rolled is " + numberRolled;
    console.log(numberRolled);

    if (numberRolled < 12 && numberRolled > 0){
      downWon = true;
      middleWon = false;
      upWon = false;
    }
    if (numberRolled == 12 ){
      middleWon = true;
      downWon = false;
      upWon = false;
    }
    if (numberRolled < 25 && numberRolled > 12){
      upWon = true;
      middleWon = false;
      downWon = false;
    }

    checkIfWon();
  }


  //Countdown from 15 to 0 and restart.
  startTimer();
  var tickSound = new Audio("sounds/Tick.mp3");
  function startTimer(){
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
      document.querySelector(".timer").innerHTML = "Rolling in "+ timeleft;
      timeleft -= 1;
      tickSound.play();

      if(timeleft < 0){
        clearInterval(downloadTimer);
        document.querySelector(".hidden").style.visibility = "visible";
        var allDices = document.querySelectorAll("img");
        var rollDiceSound = new Audio("sounds/RollDice2.mp3");
        rollDiceSound.play();

        for (var i = 0; i < allDices.length; i++){
          document.querySelectorAll("img")[i].style.filter = "blur(5px)";
          var rollGif = "gifs/DiceRoll" + Math.floor((Math.random() * 3) + 1) + ".gif";
          document.querySelectorAll("img")[i].setAttribute("src", rollGif);
        }

        setTimeout(function (){
          playGame();
          startTimer();

          lastBet = parseInt(0);
          lastMidBet = parseInt(0);
          lastUpBet = parseInt(0);
          lastDownBet = parseInt(0);
          for (var i = 0; i < allDices.length; i++){
            document.querySelectorAll("img")[i].style.filter = "none";
          }
          document.querySelector(".hidden").style.visibility = "hidden";
        }, 3000);

      }
    }, 1000);
  }
}

  function checkIfWon(){
    var balanceText = document.querySelector("#balance").innerHTML;
    balanceText = balanceText.match(/\d+/g).map(Number);
    var balance = parseInt(balanceText, 10);

    var betText = document.querySelector(".betAmount").innerHTML;
    betText = betText.match(/\d+/g).map(Number);
    var betAmount = parseInt(betText, 10);

    var betTextDown = document.querySelector("#downBet").innerHTML;
    betTextDown = betTextDown.match(/\d+/g).map(Number);
    var betAmountDown = parseInt(betTextDown, 10);

    var betTextUp = document.querySelector("#upBet").innerHTML;
    betTextUp = betTextUp.match(/\d+/g).map(Number);
    var betAmountUp = parseInt(betTextUp, 10);

    var betTextMid = document.querySelector("#middleBet").innerHTML;
    betTextMid = betTextMid.match(/\d+/g).map(Number);
    var betAmountMid = parseInt(betTextMid, 10);

    var addBalance;

    if (downWon == true){
      addBalance = balance + (betAmountDown * 2);
      document.querySelector("#balance").innerHTML = "Balance: " + addBalance;
    }
    else if (upWon == true){
      addBalance = balance + (betAmountUp * 2);
      document.querySelector("#balance").innerHTML = "Balance: " + addBalance;
    }
    else if (middleWon == true){
      addBalance = balance + (betAmountMid * 5);
      document.querySelector("#balance").innerHTML = "Balance: " + addBalance;
    }
    else if (up == false && down == false && middle == false){
      addBalance = balance + betAmount;
      document.querySelector("#balance").innerHTML = "Balance: " + addBalance;
    }else {
      document.querySelector("#balance").innerHTML = "Balance: " + balance;
    }

    document.querySelector(".betAmount").innerHTML = "Total Bet Amount: 0";
    document.querySelector("#middleBet").innerHTML = "0";
    document.querySelector("#upBet").innerHTML = "0";
    document.querySelector("#downBet").innerHTML = "0";

    down = false;
    middle = false;
    up = false;
    lastBet = 0;

  }


function downFunction(){
  down = true;
  middle = false;
  up = false;
  placeBet();
}

function middleFunction(){
  middle = true;
  down = false;
  up = false;
  placeBet();
}

function upFunction(){
  up = true;
  middle = false;
  down = false;
  placeBet();
}

document.querySelector("#balance").innerHTML  = "Balance: 1000";

var bet = parseInt(document.querySelector("#betInput").value);
var lastBet = parseInt(0);
var lastMidBet = parseInt(0);
var lastUpBet = parseInt(0);
var lastDownBet = parseInt(0);

var string = document.querySelector("#balance").innerHTML;
var balance = string.match(/\d+/g).map(Number);

// Check the players bet and remove from balance
function placeBet(){
  string = document.querySelector("#balance").innerHTML;
  balance = string.match(/\d+/g).map(Number);
  bet = parseInt(document.querySelector("#betInput").value);

  if (balance > bet || balance == bet){

    if (middle == true){
      document.querySelector("#middleBet").innerHTML = (bet + lastMidBet);
      lastMidBet = bet + lastMidBet;
    }
    else if (up == true){
      document.querySelector("#upBet").innerHTML = (bet + lastUpBet);
      lastUpBet = bet + lastUpBet;
    }
    else if (down == true){
      document.querySelector("#downBet").innerHTML = (bet + lastDownBet);
      lastDownBet = bet + lastDownBet;
    }

    document.querySelector(".betAmount").innerHTML = "Total Bet Amount: " + (bet + lastBet);

    document.querySelector("#balance").innerHTML = "Balance: " + (balance - bet);

    lastBet = bet +  lastBet;
  }
  else if(balance < bet){
    alert("Not Enough Money");
  }

}
