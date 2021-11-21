
const socket = io('wss://simple-websocket-codename.glitch.me/');

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const joinGameBtn = document.getElementById('joinGameButton');
const usernameInput = document.getElementById('usernameInput');

joinGameBtn.addEventListener('click', submitUsername);



socket.on('changeGameState', handleGameState);
socket.on('username', joinGame);
socket.on('changeUsers', displayUsers)

function colourChange(item){
    socket.emit('clickedGrid', item)
}

function teamChange(team){
    socket.emit('teamChange', team)
}

function handleGameState (grid) {
    for (i=0; i<grid.length; i++){
        if (grid[i] == 0) { 
            document.getElementById(i+1).style.backgroundColor = "rgba(95, 91, 91, 0.8)";
        }
        
        else if (grid[i] == 1){
            document.getElementById(i+1).style.backgroundColor = "rgba(192, 67, 67, 0.8)";
        }

        else {
            document.getElementById(i+1).style.backgroundColor = "rgba(108, 200, 253, 0.8)";
        }
    } 
}

function submitUsername () {
    console.log(usernameInput.value)
    socket.emit('username', usernameInput.value)

    /*
    initialScreen.style.display = "none";
    gameScreen.style.display = "block";
    */
}

function displayUsers (users){
    document.querySelector('ul')
    
    const red = document.querySelector('#red .list')
    const blue = document.querySelector('#blue .list')
    const spectator = document.querySelector('#spectator .list')

    removeAllChildNodes(red)
    removeAllChildNodes(blue)
    removeAllChildNodes(spectator)

    for (let i = 0; i<users.length; i++){
        const el = document.createElement('li');
        el.innerHTML = users[i][1]

        if (users[i][2] == 0) {
            spectator.appendChild(el)
        }

        else if (users[i][2] == 1) {
            red.appendChild(el)
        }

        else {
            blue.appendChild(el)
        }
        
    }

}

function joinGame (state) {
    if (state == 1) {
        initialScreen.style.display = "none";
        gameScreen.style.display = "block"; 
    } 

    else {

    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
