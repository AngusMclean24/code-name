
//const webSocket = require('ws');

const serverAddress = 'wss://simple-websocket-codename.glitch.me/';

const socket = new WebSocket(serverAddress); 
// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }

socket.on('open', function() {
    socket.send("Hello server!")
}

function colourChange(item){
    socket.send(item)

}
