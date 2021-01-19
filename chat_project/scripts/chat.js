//adding new chat documents
//setting real time listeners to get bew chats
//update username
//update room

class Chatroom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        };
        //save chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    callback(change.doc.data());
                }
            })
        })
    }
        updateName(username){
            this.username = username;
            console.log('name updated');
            localStorage.setItem('username',username);
        }
        updateRoom(room){
            this.room = room;
            console.log('room updated');
            if(this.unsub){
            this.unsub();
            }
        }
}



// const chatroom = new Chatroom('general','shaun');
// // console.log(chatroom);
// // chatroom.addChat('Hello Everyone')
// // .then(()=>console.log('chat added!'))
// // .catch(error=>console.log('error'));
// chatroom.getChats(data=>{
//     console.log(data);
// })

// setTimeout(()=>{
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('yoshi');
//     chatroom.getChats(data=>{
//         console.log(data);
//     });
//     chatroom.addChat('hello');
// },3000);