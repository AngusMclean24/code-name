class GameView {
    constructor(root) {
        this.root = root
        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    updateTurn(game) {
        if (game.turn == "No one"){
            this.root.querySelector(".header__turn").textContent = "";
        }
        else {
            this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
        }
    }

    updateStatus(game) {
        let status = "In Progress";

        if (game.status === "Red") {
            status = "Red is the Winner!";

        } else if (game.status == "Blue") {
            status = "Blue is the Winner!";
        } else if (game.status == "Tie") {
            status = "It's a tie!";
        }

        this.root.querySelector(".header__status").textContent = status;
    }

    updateBoard(game) {
        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);
            if (game.board[i] == "Red") {
                tile.style.background =  "crimson";
            }

            else if (game.board[i] == "Blue") {
                tile.style.background =  "dodgerblue";
            } else {
                tile.style.background =  "#ffffff";
            }
            
        }
    }
}

class UserView {
    constructor(root) {
        this.root = root
    }

    updateUser(users) {
        const red = document.querySelector('#red .list')
        const blue = document.querySelector('#blue .list')
        const spectator = document.querySelector('#spectator .list')
        /*
        const red = this.root.querySelector('#red .list')
        const blue = this.root.querySelector('#blue .list')
        const spectator = this.root.querySelector('#spectator .list')
        //const spectator = this.root.querySelector('.spectator')
        */

        removeAllChildNodes(red)
        removeAllChildNodes(blue)
        removeAllChildNodes(spectator)

        for (const user of users) {
            const el = document.createElement('li');
            el.innerHTML = user[1]

            if (user[2] == "Red") {
                red.appendChild(el)
            } else if (user[2] == "Blue") {
                blue.appendChild(el)
            } else if (user[2] == null) {
                spectator.appendChild(el)
            }
        }
    }
}

class Game {
    constructor() {
        this.turn = null;
        this.board = new Array(9).fill(null);
        this.status = "0"
    }

    updateBoard(newturn, newboard, status) {
        this.turn = newturn
        this.board = newboard
        this.status = status
    }

}

const URL = "wss://simple-websocket-codename.glitch.me/";
const socket = io(URL);

let game = new Game();
let gameView = new GameView(document.getElementById("app"));
let userView = new UserView(document.getElementById("app"));

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const joinGameBtn = document.getElementById('joinGameButton');
const usernameInput = document.getElementById('usernameInput');

joinGameBtn.addEventListener('click', submitUsername);


var team = null

// define functions
gameView.onTileClick = function (i) {
    console.log(i)
    console.log(team)
    console.log(game.turn)
    //have to check because initiall turn = null
    if (team!=null) {
        if (team == game.turn){
            if (game.board[i] == null) {
                game.board[i] = team
                socket.emit('clicked', i)
                //change turn on other side check if client is in sync
                //game.turn = game.turn === "Red" ? "Blue" : "Red";
                game.turn = null;
                gameView.update(game)
            }
        }
    }
};

gameView.onRestartClick = function () {
    game = new Game();
    gameView.update(game);
    //tell other players to update
    socket.emit('restart')
};

function submitUsername () {
    socket.emit('username', usernameInput.value)
}

function joinGame (state) {
    if (state != 0) {
        initialScreen.style.display = "none";
        gameScreen.style.display = "flex"; 
        //if valid get my team
        team = state
    } 

    else {
        const el = document.createElement('p1')
        el.innerText = 'username already exists'
        el.style.color = 'red'
        const screen = document.querySelector('.menu')
        screen.appendChild(el)
    }
}

    console.log(team)


//listening from server
socket.on('restart', () => {
    game = new Game();
    gameView.update(game);
})

socket.on('update', (turn, board, status) => {
    game.updateBoard(turn, board, status);
    gameView.update(game)
    console.log("turn is" + turn + "board is" + board)
})

socket.on('returnUsers', (text) => {
    userView.updateUser(text)
    console.log(text)
})

socket.on('username', joinGame);

//html function
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}  winScreen.style.display = "none";
}
