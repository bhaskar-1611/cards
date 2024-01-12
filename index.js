//OM
let numOfPlayers;
let minGameAmount;
let GameTotal;
let newGamesCounter = 0;
let players = [];
let newButton = document.createElement("button");
newButton.innerHTML = "Add Players";
newButton.id = "startGame";
newButton.addEventListener("click", startGame);
function setupPlayers() {
    numOfPlayers = parseInt(document.getElementById('numOfPlayers').value);
    minGameAmount = parseInt(document.getElementById('minGameAmount').value);
    GameTotal = numOfPlayers * minGameAmount;
    let playerInputs = '';
    for (let i = 0; i < numOfPlayers; i++) {
        playerInputs += `<div class="player-input">
                          <label for="player${i + 1}">Player ${i + 1}:</label>
                          <input type="text" id="player${i + 1}">
                         </div>`;
    }
    document.getElementById('playerNames').innerHTML = playerInputs;
    document.getElementById('setup').style.display = 'none';
    document.getElementById('playerNames').style.display = 'block';
    document.getElementById('game').innerHTML = `<h2>Game Amount: ${GameTotal}</h2>`;
    document.getElementById("buttonContainer").appendChild(newButton);
}
function startGame() {
    for (let i = 0; i < numOfPlayers; i++) {
        let playerName = document.getElementById(`player${i + 1}`).value;
        players.push({ name: playerName, amount: -minGameAmount });
    }
    document.getElementById("buttonContainer").style.display = 'none';
    displayPlayers();
}
function displayPlayers() {
    document.getElementById('playerNames').innerHTML = ''; // Clear previous display
    players.forEach((player, index) => {
        let button = document.createElement('button');
        button.textContent = 'Challenge';
        button.addEventListener('click', function () {
            updateAmount(index);
        });
        let playerDiv = document.createElement('div');
        let amountClass = player.amount > 0 ? 'positive-amount' : 'negative-amount';
        playerDiv.innerHTML = `<span class="${amountClass}">${player.name} - Amount: ${player.amount}</span>`;
        playerDiv.appendChild(button);
        document.getElementById('playerNames').appendChild(playerDiv);
    });
    let btn = document.createElement('button');
    btn.textContent = 'New Game';
    btn.addEventListener('click', newGame);
    document.getElementById('playerNames').appendChild(btn);
    document.getElementById('game').innerHTML = `<h2>Game Amount: ${GameTotal}</h2>`;
}
function updateAmount(playerIndex) {
    let amountWon = prompt(`Enter the amount won/lost by ${players[playerIndex].name}:`);
    amountWon = parseInt(amountWon);
    players[playerIndex].amount += amountWon;
    GameTotal -= amountWon;
    if (GameTotal == 0) newGame();
    displayPlayers();
}
function newGame() {
    newGamesCounter++;
    document.getElementById('newGameCounter').innerText = `New Games: ${newGamesCounter}`;
    players.forEach((player, index) => {
        players[index].amount -= minGameAmount;
    })
    GameTotal += (minGameAmount * numOfPlayers);
    displayPlayers();
}