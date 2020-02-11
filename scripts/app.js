const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');
const currentUser = document.querySelector('.current-user');
const table = document.querySelector('.table');

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMessage.innerText = `Your Name has been Updated to ${newName}`;
    currentUser.innerHTML = ``;


    setTimeout(() => {
        updateMessage.innerText = '';        
        const html = `<h5 class="text-center my-2">You are being shown as <strong>${newName}</strong></h5>`;
        currentUser.innerHTML = html;
    }, 3000);
    
});

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

const username = localStorage.username ? localStorage.username : 'anonymous';

let html = `
    <h5 class="text-center my-2">
    You are being shown as 
        <strong>${username}</strong>
    </h5>`;
currentUser.innerHTML = html;

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

chatroom.getChats((data) => {
    chatUI.render(data);
})