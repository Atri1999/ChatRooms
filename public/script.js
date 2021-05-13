const socket=io();
const messageContainer=document.querySelector('#message-container');
const name=prompt('What is your name?');

socket.emit('user-connected',name);
socket.on('new-user-connected',joinMessage(nameV));

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

    var joiningMsg=document.createElement('div')
    joiningMsg.className="user-joined"
    joiningMsg.innerHTML=name+" Joined"

    ele.appendChild(joiningMsg)
    messageContainer.append(ele)
}
    

function appendOwnMessage(message){
    var ele=document.createElement('div')
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

