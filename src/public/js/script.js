const socket = io();

socket.emit('messageConecction',{user:'Ivan', role:'Admin'});
socket.on('messageControl',(message)=>{
    console.log(message);
})