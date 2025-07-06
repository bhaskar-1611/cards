let numOfPlayers = 0;
let minGameAmount = 0;
let GameTotal = 0;
let newGamesCounter = 0;
let players = [];

const storageKey = 'gameState';
const newButton = createButton("Add Players", startGame);

window.onload = () => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
        restoreGameState();
    }
};

function setupPlayers() {
    numOfPlayers = parseInt(document.getElementById('numOfPlayers').value) || 0;
    minGameAmount = parseInt(document.getElementById('minGameAmount').value) || 0;
    GameTotal = numOfPlayers * minGameAmount;

    const playerInputs = Array.from({ length: numOfPlayers }, (_, i) => `
        <div class="player-input">
            <label for="player${i + 1}">Player ${i + 1}:</label>
            <input type="text" id="player${i + 1}">
        </div>
    `).join('');

    document.getElementById('playerNames').innerHTML = playerInputs;
    document.getElementById('setup').style.display = 'none';
    document.getElementById('playerNames').style.display = 'block';
    updateGameTotalDisplay();

    const container = document.getElementById("buttonContainer");
    container.innerHTML = '';
    container.appendChild(newButton);
}

function startGame() {
    players = Array.from({ length: numOfPlayers }, (_, i) => {
        const name = document.getElementById(`player${i + 1}`)?.value.trim() || `Player ${i + 1}`;
        return { name, amount: -minGameAmount };
    });

    document.getElementById("buttonContainer").style.display = 'none';
    renderPlayers();
    saveGameState();
}

function renderPlayers() {
    const container = document.getElementById('playerNames');
    container.innerHTML = '';

    players.forEach((player, i) => {
        const div = document.createElement('div');
        const amountClass = player.amount >= 0 ? 'positive-amount' : 'negative-amount';
        div.innerHTML = `<span class="${amountClass}">${player.name} - Amount: ${player.amount}</span>`;

        const challengeBtn = createButton('Challenge', () => handleChallenge(i));
        div.appendChild(challengeBtn);
        container.appendChild(div);
    });

    container.appendChild(createButton('New Game', newGame));
    container.appendChild(createButton('Reset Game', resetGame));

    updateGameTotalDisplay();
    updateNewGameCounter();
}

function handleChallenge(index) {
    let input = prompt(`Enter amount won/lost by ${players[index].name}:`);
    let amount = parseInt(input);
    if (isNaN(amount)) {
        amount = 0;
        alert("Invalid input. Defaulting to 0.");
    }
    players[index].amount += amount;
    GameTotal -= amount;

    if (GameTotal === 0) newGame();
    renderPlayers();
    saveGameState();
}

function newGame() {
    newGamesCounter++;
    players.forEach(player => player.amount -= minGameAmount);
    GameTotal += numOfPlayers * minGameAmount;

    renderPlayers();
    saveGameState();
}

function resetGame() {
    if (!confirm("Reset game and clear all data?")) return;

    sessionStorage.removeItem(storageKey);

    // Reset all state
    numOfPlayers = 0;
    minGameAmount = 0;
    GameTotal = 0;
    newGamesCounter = 0;
    players = [];

    // Reset UI
    document.getElementById('setup').style.display = 'block';
    document.getElementById('playerNames').innerHTML = '';
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('game').innerHTML = '';
    document.getElementById('buttonContainer').innerHTML = '';
    document.getElementById('buttonContainer').style.display = 'block';
    document.getElementById('newGameCounter').innerText = '';
    document.getElementById('numOfPlayers').value = '';
    document.getElementById('minGameAmount').value = '';
}

function updateGameTotalDisplay() {
    document.getElementById('game').innerHTML = `<h2>Game Amount: ${GameTotal}</h2>`;
}

function updateNewGameCounter() {
    document.getElementById('newGameCounter').innerText = `New Games: ${newGamesCounter}`;
}

function saveGameState() {
    const state = {
        numOfPlayers,
        minGameAmount,
        GameTotal,
        newGamesCounter,
        players
    };
    sessionStorage.setItem(storageKey, JSON.stringify(state));
}

function restoreGameState() {
    const state = JSON.parse(sessionStorage.getItem(storageKey));
    if (!state) return;

    numOfPlayers = state.numOfPlayers;
    minGameAmount = state.minGameAmount;
    GameTotal = state.GameTotal;
    newGamesCounter = state.newGamesCounter;
    players = state.players;

    document.getElementById('setup').style.display = 'none';
    document.getElementById('playerNames').style.display = 'block';
    document.getElementById('buttonContainer').appendChild(newButton);
    document.getElementById('buttonContainer').style.display = 'none';

    renderPlayers();
}

function createButton(label, handler) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.margin = '5px';
    btn.addEventListener('click', handler);
    return btn;
}
