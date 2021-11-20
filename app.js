
//const webSocket = require('ws');

const serverAddress = 'wss://simple-websocket-codename.glitch.me/';

const socket = new WebSocket(serverAddress); 
// // Listen for messages
socket.onmessage = ({ data }) => {
     
     console.log('Message from server ', JSON.parse(data));
     
     for (i=0; i<data.length; i++){
        if (data[i] == 0) {
            document.getElementById(i+1).style.backgroundColor = "rgba(95, 91, 91, 0.8)";
            //document.getElementById(i+1).textContent = 20

        }
        
        else{
            document.getElementById(i+1).style.backgroundColor = "rgba(192, 67, 67, 0.8)";
            //document.getElementById(i+1).textContent = 10
        }
    } 
};

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }

function colourChange(item){
    socket.send(item)

}
