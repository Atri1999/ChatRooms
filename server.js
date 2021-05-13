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

app.get('/',(req,res)=>{
    res.render('index');
})

const Users={}

io.on('connection',socket=>{
    console.log("A user connected");

    socket.on('user-connected',name=>{
        Users[socket.id]=name;
    })

    socket.on('disconnect',()=>{
        console.log("a user disconnected");
    })
})

server.listen(PORT,()=>{
    console.log("Listening to Port ");
})