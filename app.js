const URL = "wss://simple-websocket-codename.glitch.me/";
const socket = io(URL);

const joinGameBtn = document.getElementById('joinGameButton');
const newGameBtn = document.getElementById('newGameButton');

joinGameBtn.addEventListener('click', submitUsername);
newGameBtn.addEventListener('click', restartGame);

//initialise board
socket.emit('getGrid') 
var grid = null
var team = null
var turn = null

//server listening functions
socket.on('username', joinGame);

socket.on('returnGrid', (text) => {
    grid = text
    displayBoard()
})

socket.on('returnTeam', (text) => {
    team = text
})

socket.on('returnTurn', (text) => {
    turn = text
    console.log ("recieved returnTurn " + turn)
})

socket.on('gameWinner', (text) => {
    const header = document.querySelector('h3')

    if (text == 1) {
        header.innerText = 'Congratulations to red team you won!'
    } else {
        header.innerText = 'Congratulations to blue team you won!'
    }
    
    winScreen.style.display = "block";

})

//user functions
function submitUsername () {
    socket.emit('username', usernameInput.value)
}

function joinGame (state) {
    if (state == 1) {
        initialScreen.style.display = "none";
        gameScreen.style.display = "block"; 
        socket.emit('getTeam') 
    } 

    else {
        const el = document.createElement('p1')
        el.innerText = 'username already exists'
        el.style.color = 'red'
        const screen = document.querySelector('#initialScreen')
        screen.appendChild(el)
    }
}

//game play functions
function squareChange(row, column){
    if (team != 0) {
        if (turn == team) {
            grid[row][column] = team
            socket.emit('clickedGrid', row, column, team)
            displayBoard()
        }
        
    }
}

function displayBoard () {
    for (let y=0; y<grid.length; y++){
        for(let x=0; x<grid[y].length; x++) {
            if (grid[y][x] == 0) { 
                document.getElementById(y+","+x).style.backgroundColor = "rgba(95, 91, 91, 0.8)";
            }
            
            else if (grid[y][x] == 1){
                document.getElementById(y+","+x).style.backgroundColor = "rgba(192, 67, 67, 0.8)";
            }

            else {
                document.getElementById(y+","+x).style.backgroundColor = "rgba(108, 200, 253, 0.8)";
            }
        }
    } 
}

function restartGame() {
    socket.emit('restart')
    winScreen.style.display = "none";
}
