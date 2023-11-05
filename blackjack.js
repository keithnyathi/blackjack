let cards =  [];
let players = [{
  name: 'Keith',
  chips: 240
}];


let hasBlackJack = false;
let isAlive = false;
let message = '';

let sum = 0;





const messageEl = document.querySelector('#message-el');
const sumEl = document.querySelector('#sum');
const cardsEl = document.querySelector('#cards');


playerDetails();
let buyChipsHTML = '';

const startBtnEl = document.querySelector('#start-btn');
startBtnEl.addEventListener('click',() => {
 
  if (players.chips === 0 ){
      buyChipsHTML += 
      `
      <input type="text" id="chips-input">
      <button id="buy-button">Buy More</button>
      `
      document.querySelector('#buy-chips').innerHTML = buyChipsHTML;
      
      const buyButtonEl = document.querySelector('#buy-button');
      buyButtonEl.addEventListener('click', () => {
        const chipsInput = document.querySelector('#chips-input')
        const chipsInputValue =  Number (chipsInput.value);

        players.chips += chipsInputValue;
      })

      startGame()

        cards.forEach((card) => {
        sum += card;
      })
    
      
    
      renderGame()
      
      if (hasBlackJack){
          players.forEach(
          (player)=>{
            player.chips += 20;
          }
          )
      }else if(!hasBlackJack && isAlive) {
        playerDetails();
      }else if (!hasBlackJack && !isAlive){
        players.forEach(
          (player)=> {
            player.chips -= 20;
          }
        )
      }else {
        playerDetails()
      }
        
      playerDetails();
  

  }else {
        startGame()

        cards.forEach((card) => {
        sum += card;
      })
    
      
    
      renderGame()
      
      if (hasBlackJack){
          players.forEach(
          (player)=>{
            player.chips += 20;
          }
          )
      }else if(!hasBlackJack && isAlive) {
        playerDetails();
      }else if (!hasBlackJack && !isAlive){
        players.forEach(
          (player)=> {
            player.chips -= 20;
          }
        )
      }else {
        playerDetails()
      }
        
      playerDetails();
      }
  
 
});

const restartBtnEl = document.querySelector('#restart-btn');
restartBtnEl.addEventListener('click', () => {
  sum = 0;
  cards = [];
  console.log(sum)
  sumEl.textContent = `Sum: `;
  messageEl.textContent = 'Want to play a round?';
  cardsEl.textContent = `Cards: `;
  isAlive = true;
  hasBlackJack = false;
})


const newCardEl = document.querySelector('#new-card-btn');
newCardEl.addEventListener('click', () => {

  if (isAlive && !hasBlackJack){
    console.log('Drawing new card')
    const newCardNum = randomCard(13,1) ;
    
    cards.push(newCardNum);
 
    sum += newCardNum;
 
   
   
 
   renderGame();

   if (hasBlackJack){
    players.forEach(
     (player)=>{
       player.chips += 20;
     }
    )
 }else if(!hasBlackJack && isAlive) {
   playerDetails();
 }else if (!hasBlackJack && !isAlive){
   players.forEach(
     (player)=> {
       player.chips -= 20;
     }
   )
 }else {
   playerDetails()
 }
  
 playerDetails();
  }

  
  
})





function startGame() {
  isAlive = true;
  const cardNum1 = randomCard(13,1);
  const cardNum2 = randomCard(13,1);

   cards.push(cardNum1);
   cards.push(cardNum2);
  
};


function renderGame() {
  if (sum < 21) {
    message = 'Do you want to draw a new card?';
    } else if (sum === 21) {
      message ='wohoo! You have a BlackJack!';
      hasBlackJack = true;
    } else {
      message = "You're out of the game!";
      isAlive = false;
    }
    
    const [firstNumber,secNumber,thirdNumber] = cards;
    
    if (cards.length === 2){
      cardsEl.textContent = `Cards: ${firstNumber} ${secNumber}`;
    } else {
      cardsEl.textContent = `Cards: ${firstNumber} ${secNumber} ${thirdNumber}`;
    }
   
    sumEl.textContent = `Sum: ${sum}`;
    messageEl.textContent = message;

   
}


function randomCard(max,min) {

  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  if (number === 1) {
    return 11;
  } else if (number === 11 || number === 12 || number === 13){
    return 10;
  } else {
    return number;
  }
}


function playerDetails() {
  let playerhtml = '';
    let chipshtml = '';

    
    players.forEach((player) => {
      playerhtml += 
      `
        Player: ${player.name}
      `;
      
      chipshtml +=
      `
       Chips: $${player.chips}
      `;

    })



    document.querySelector('#player-el').innerHTML = playerhtml;
    document.querySelector('#player-chips-el').innerHTML = chipshtml;
}

