const express=require("express")
const socket=require("socket.io")

const app=express();

const cors=require("cors");

const PORT=4046;
app.use(cors({origin:'http://localhost:3000'}));
app.get('/test',(req,res)=>{
    res.send("bolo bhai");
})

const server=app.listen(PORT,()=>{
    console.log('server start at '+PORT);
})

// var io=socket(server);
const io=socket(server,{
    cors:{
        origin:'*'
    }
})
io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('join_room',(data)=>{
        console.log('join Room :',data);
        socket.join(data);
    })

    //{room,name,message}
    socket.on('send_message',(data)=>{
        console.log("message send data",data);
        socket.to(data.room).emit('receive_message',data);
    })

    socket.on('disconnect',()=>{
        console.log('User Disconnect')
    })
})