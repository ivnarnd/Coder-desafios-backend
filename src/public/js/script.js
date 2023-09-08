const socket = io();
const btnChat = document.getElementById('botonChat');
const paragraph = document.getElementById('paragraphsMessages');
const valInput = document.getElementById('chatBox');
socket.emit('messageConecction',{user:'Ivan', role:'Admin'});
socket.on('messageControl',(message)=>{
    console.log(message);
});
socket.on('messages',(arrMessages)=>{
    paragraph.innerHTML='';
    arrMessages.forEach(message => {
        paragraph.innerHTML +=`<p>${message.date} : El usuario ${message.user} Escribio ${message.message} </p>`;
    });
})

Swal.fire({
    title:'Identificacion de Usuario',
    text:'Por favor ingrese su Nombre de Usuario: ',
    input:'text',
    inputValidator:(valor) => {
        return !valor && "Ingrese su nombre de usuario Valido";
    },
    allowOutsideClick:false,
}).then(resultado=>{
    user = resultado.value;
    console.log(user);
});
btnChat.addEventListener('click',()=>{
    let fechaAct = new Date().toLocaleString();
    if(valInput.value.trim().length > 0){
        socket.emit('message',{date:fechaAct,user:user,message:valInput.value});
        valInput.value = '';
    }
});
