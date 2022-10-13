'use strict';

// Selecting Elements of html
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores,currentScore,activePlayer;


function init(){
// function that holds the variables it's used to set all the ,
// variables to the initial form of the program
scores = [0,0];
currentScore = 0;
activePlayer = 0;
score1.textContent = '0';
score0.textContent = '0';
current0El.textContent = 0;
current1El.textContent = 0;
diceEl.classList.add('hidden');
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
btnHold.classList.remove('hidden');
btnRoll.classList.remove('hidden');
}
init();

function switchPlayer(){
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     // Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
     currentScore = 0;
     player0El.classList.toggle('player--active');
     player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click',function(){

     // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random()*6)+1;

    
    // 2 Display dice 
    diceEl.classList.remove('hidden');
    // To add a variable in a string it has to be ´´ 
    diceEl.src =`dice-${dice}.png`;
   

    // 3. Check for rolled 1
    if(dice !== 1){
         // Add dice to current score
        currentScore += dice;
        // selecting dynamic the active player
       document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
     switchPlayer();
    } 
})

btnHold.addEventListener('click',function(){
    
     // add current score to the total score
    scores[activePlayer] += currentScore ;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    // if the total score is >= 100 the player wins
      if(scores[activePlayer] >= 100){
          document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
          document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
          btnHold.classList.add('hidden');
          btnRoll.classList.add('hidden');
          document.querySelector('.dice').classList.add('hidden');

     // else switch the player
      }else {
       switchPlayer();
      }

})
// It's used to reset the variables
btnNew.addEventListener('click',init);