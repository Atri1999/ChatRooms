const express=require('express')
const app=express();
const server=require('http').Server(app);
const io=require('socket.io')(server);
const PORT=process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

const rooms={'Room 1':{users:{}}}

app.get('/',(req,res)=>{
    res.render('index',{rooms});
})

app.post('/room',(req,res)=>{
    if(rooms[req.body.room]!=null){
        return res.redirect('/')
    }
    
    rooms[req.body.room]={ users:{} };
    //console.log(rooms)
    io.emit("room-created",req.body.room);
    res.redirect(req.body.room);
    

})

app.get('/:room',(req,res)=>{
    //console.log(req.params.room)
    if (req.params.room in rooms){
        return res.render('room',{ room:req.params.room })
           
    }
    res.redirect('/') 
    //
})

function getRoomNames(socket){

    return Object.entries(rooms).reduce((usersRooms,[name,room])=>{
        if(room.users[socket.id]!=null){
            usersRooms.push(name)
        }
        return usersRooms
    },[])
}

io.on('connection',socket=>{

    socket.on('user-connected',(name,roomName)=>{
        //console.log(rooms)
        socket.join(roomName)
        rooms[roomName].users[socket.id]=name;
        socket.to(roomName).emit("new-user-connected",rooms[roomName].users[socket.id]);
    })

    socket.on('send-messages',(roomName,message)=>{
        socket.to(roomName).emit("receive-message",{ name:rooms[roomName].users[socket.id],message:message });
    })

    socket.on('disconnect',()=>{
        //console.log(rooms)
        getRoomNames(socket).forEach(roomName=>{
            socket.to(roomName).emit('user-disconnected',{ name:rooms[roomName].users[socket.id] })
            delete rooms[roomName].users[socket.id]
            if (roomName!="Room 1" && isEmpty(rooms[roomName].users)){
                delete rooms[roomName]
                io.emit('room-removed')
                
            }
        })
        //console.log(rooms)
    })
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


server.listen(PORT,()=>{
    console.log("Listening to Port ");
})