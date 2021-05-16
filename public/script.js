const socket=io();
const messageContainer=document.querySelector('#message-container');
const messageForm=document.querySelector('.message-form');
const message=document.querySelector('.message');
var content=document.getElementsByClassName('recent');

const roomContainer=document.querySelector('#rooms-container')

if(messageContainer!=null){
    const name=prompt('What is your name?');

    socket.emit('user-connected',name,roomName);


    messageForm.addEventListener('submit',e=>{
        e.preventDefault();
        socket.emit('send-messages', roomName,message.value );
        appendOwnMessage(message.value);
        message.value="";
        messageContainer.scrollIntoView(false);
    })
}

socket.on('room-created',(name)=>{
    /*<div class="rooms">
        <span class="rooms-names"><%=room %></span>
        <a href="/<%= room %>" class="rooms-button">Join Room</a>
    </div> */

    let room=document.createElement('div')
    room.className="rooms"

    let roomName=document.createElement('span')
    roomName.className="rooms-names"
    roomName.innerHTML=name

    let roomButton=document.createElement('a')
    roomButton.className="rooms-button"
    roomButton.href=`/${name}`
    roomButton.innerHTML="Join Room"

    room.appendChild(roomName)
    room.appendChild(roomButton)

    roomContainer.append(room)

})


socket.on('new-user-connected',nameV=>{
    joinMessage(nameV);
});

socket.on('receive-message',data=>{
    appendOtherMessage(data.name,data.message);

    messageContainer.scrollIntoView(false);
})






/*appendOtherMessage("Atri","Hi this is me");
appendOwnMessage("Hsi thiss iss msfe");
joinMessage("Atri");
appendOtherMessage("Aksssh","Hi thisfsfd is me");
appendOwnMessage("akhjfdhs msfe");
appendOwnMessage("Hsi thiss iss msfe");
joinMessage("Atri");
appendOtherMessage("Aksssh","Hi thisfsfd is me");*/


function appendOtherMessage(name,message){
    var ele=document.createElement('div')
    ele.className="recent"
    var otherMessage=document.createElement('div')
    otherMessage.className="others-message"
    
    var otherName=document.createElement('div')
    otherName.className="other-name"
    otherName.innerHTML=name
    
    var otherMsg=document.createElement('div')
    otherMsg.className="other-msg"
    otherMsg.innerHTML=message

    otherMessage.appendChild(otherName)
    otherMessage.appendChild(otherMsg)

    ele.appendChild(otherMessage)
    messageContainer.appendChild(ele)    

}

function joinMessage(name){
    var ele=document.createElement('div')
    ele.className="recent"
    var joiningMsg=document.createElement('div')
    joiningMsg.className="user-joined"
    joiningMsg.innerHTML=name+" Joined"

    ele.appendChild(joiningMsg)
    messageContainer.append(ele)
}
    

function appendOwnMessage(message){
    var ele=document.createElement('div')
    ele.className="recent"

    var ownMessage=document.createElement('div')
    ownMessage.className="own-message"
    
    var ownName=document.createElement('div')
    ownName.className="own"
    ownName.innerHTML="You"
    
    var ownMsg=document.createElement('div')
    ownMsg.className="own-msg"
    ownMsg.innerHTML=message

    ownMessage.appendChild(ownName)
    ownMessage.appendChild(ownMsg)

    ele.appendChild(ownMessage)
    messageContainer.appendChild(ele)    

}

