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

const rooms={room:{users:{}}}

app.get('/',(req,res)=>{
    res.render('index',{rooms});
})

app.post('/room',(req,res)=>{
    if(rooms[req.body.room]!=null){
        return res.redirect('/')
    }
    
    rooms[req.body.room]={ users:{} };
    res.redirect(req.body.room);
    io.emit("room-created",req.body.room);

})

app.get('/:room',(req,res)=>{
    /*if(rooms[req.params.room]===Null){
        return res.redirect('/')
    }*/
    res.render('room',{ room:req.params.room })
})


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
        //delete rooms[roomName].users[socket.id]
    })
})

server.listen(PORT,()=>{
    console.log("Listening to Port ");
})