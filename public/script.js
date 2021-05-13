//const socket=io();

const messageContainer=document.getElementsByClassName('message-container');
//const name=prompt('What is your name?');


//socket.emit('user-connected',name);

/*<div id="message-container">
        <div>
            <div class="others-message">
                <div class="other-name">Name</div>
                <div class="other-msg">Name's message</div>
            </div>
        </div>
        <div>
            <div class="own-message">
                <div class="own">You</div>
                <div class="own-msg">your message</div>
            </div>
        </div>
</div>*/

function appendOtherMessage(name,message){
    var ele=document.createElement('div')
    var otherMessage=document.createElement('div')
    otherMessage.class="others-message"
    
    var otherName=document.createElement('div')
    otherName.class="other-name"
    otherName.innerHTML=name
    
    var otherMsg=document.createElement('div')
    otherMsg.class="other-msg"
    otherMsg.innerHTML=message

    otherMessage.appendChild(otherName)
    otherMessage.appendChild(otherMsg)

    ele.appendChild(otherMessage)
    messageContainer.append (ele)    

}

appendOtherMessage("Atri","Hi this is me");

appendOtherMessage("Atdjd","Hsi thiss iss msfe");
