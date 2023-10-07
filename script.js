let currentPlayer = 1;
let currentScore = 0;
let consecutiveDoubles = 0;
let player1Name = "";
let player2Name = "";
let player1Score = 0;
let player2Score = 0;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function startGame() {
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;

  if (player1Name === "" || player2Name === "") {
    alert("Anna pelaajille nimet ennen pelin aloittamista.");
    return;
  }

  document.getElementById('player-names-form').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';
  document.getElementById('player-turn').textContent = `Pelaaja ${player1Name} vuoro`;
  document.getElementById('player1-score').textContent = `${player1Name}: ${player1Score} pistettä`;
  document.getElementById('player2-score').textContent = `${player2Name}: ${player2Score} pistettä`;
}

function rollDice() {
  const die1Value = rollDie();
  const die2Value = rollDie();

  const die1 = document.getElementById('die1');
  const die2 = document.getElementById('die2');

  die1.src = `img/noppa${die1Value}.png`;
  die2.src = `img/noppa${die2Value}.png`;

  if (die1Value === die2Value) {
    consecutiveDoubles++;
    if (consecutiveDoubles === 3) {
      endTurn();
      return;
    }
  } else {
    consecutiveDoubles = 0;
  }

  const total = die1Value + die2Value;

  if (die1Value === 1 && die2Value === 1) {
    currentScore += 25;
  } else if (die1Value === 1 || die2Value === 1) {
    currentScore = 0;
    endTurn();
  } else if (die1Value === die2Value) {
    currentScore += total * 2;
  } else {
    currentScore += total;
  }

  document.getElementById('score').textContent = `Pelaajan ${currentPlayer === 1 ? player1Name : player2Name} pisteet: ${currentScore}`;
}

function endTurn() {
  if (currentPlayer === 1) {
    player1Score += currentScore;
    document.getElementById('player1-score').textContent = `${player1Name}: ${player1Score} pistettä`;
    currentPlayer = 2;
    document.getElementById('player-turn').textContent = `Pelaaja ${player2Name} vuoro`;
  } else {
    player2Score += currentScore;
    document.getElementById('player2-score').textContent = `${player2Name}: ${player2Score} pistettä`;
    currentPlayer = 1;
    document.getElementById('player-turn').textContent = `Pelaaja ${player1Name} vuoro`;
  }
  currentScore = 0;
  consecutiveDoubles = 0;
  document.getElementById('score').textContent = `Pelaajan ${currentPlayer === 1 ? player1Name : player2Name} pisteet: ${currentScore}`;
  document.getElementById('die1').src = 'img/noppa1.png';
  document.getElementById('die2').src = 'img/noppa1.png';
}

document.getElementById('player-names-form').addEventListener('submit', function (e) {
  e.preventDefault();
  startGame();
});
