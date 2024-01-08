document.addEventListener('DOMContentLoaded', function () {
    var socket = io();

    document.querySelector('#form').addEventListener('submit', function(e) {
        e.preventDefault();
        var messageInput = document.querySelector('#input');
        if (messageInput.value) {
            socket.emit('message', messageInput.value);
            messageInput.value = '';
        }
        return false;
    });

    socket.on('message', function(msg){
        var messagesList = document.querySelector('#messages');
        var newMessage = document.createElement('li');
        newMessage.textContent = msg;
        messagesList.appendChild(newMessage);
    });

});