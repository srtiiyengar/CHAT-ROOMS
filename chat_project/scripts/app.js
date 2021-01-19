//dom queiries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
// console.log(chatList);


//add new chat
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=>newChatForm.reset())
    .catch(error=>console.log(error));
})
//update username
newNameForm.addEventListener('submit',e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    //show then hide the update msg
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(()=>{updateMssg.innerText=''},3000);
});

//update chat room
rooms.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat=>chatUI.render(chat));
    }
})

const username = localStorage.username?localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);
chatroom.getChats(data=>{
  chatUI.render(data);
})