
const serverAddress = 'wss://simple-websocket-codename.glitch.me/';
const socket = io('serverAddress', {
    headers: {
        "user-agent": "Chrome"
    });

socket.on('message', text => {
    /*
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
    */


    for (i=0; i<text.length; i++){
        if (text[i] == 0) {
            document.getElementById(i+1).style.backgroundColor = "rgba(95, 91, 91, 0.8)";
            //document.getElementById(i+1).textContent = 20

        }
        
        else{
            document.getElementById(i+1).style.backgroundColor = "rgba(192, 67, 67, 0.8)";
            //document.getElementById(i+1).textContent = 10
        }
    } 
});

/*
document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}
*/
function colourChange(item){
    socket.emit('message', item)

}
