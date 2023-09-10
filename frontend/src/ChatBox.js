import React, { useEffect, useState } from "react";
import socket from './Io'

function ChatBox(){
    const[inputField,setInputField]=useState({
        name:"",
        room:"",
        message:""
    })
    const inputHandler=(e)=>{
        setInputField({
            ...inputField,
            [e.target.name]:e.target.value
        })
    }
    const [isChatting,setChatting]=useState(false);
    const [messageList,setMessageList]=useState([]);

    //receive message 
    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            setMessageList([...messageList,data]);
        })
    })

    const enterRoom=()=>{
        console.log(inputField);
        setChatting(true);
        socket.emit('join_room',inputField.room)
    }
    const sendMessage= async()=>{
        console.log(inputField)
        await socket.emit('send_message',inputField)
        setMessageList([...messageList,inputField])
        setInputField({...inputField,message:''})
    }
   
    return(
        <div >
           <div className=" w-[300px]  bg-green-200 flex mx-auto shadow-2xl justify-center text-center rounded-full  "><h1 className=" text-[3rem] font-black text-gray-700">chatBoat</h1></div>
           {
              !isChatting?(
                <div className=" w-[400px] w-full shadow-2xl  flex flex-col justify-center  mx-auto mt-[10rem] p-5 gap-3 rounded-xl">
                    <h1 className="font-bold text-[2.2rem]">Create Room</h1>
                  <div  className="flex flex-col">
                    <label className="font-bold">Name</label>
                    <input 
                    type="text"
                    placeholder=""
                    name="name"
                    onChange={inputHandler}
                    />
                  </div>
                 
                 <div  className="flex flex-col">
                    <label className="font-bold">Room</label>
                    <input 
                    type="text"
                    placeholder=""
                    name="room"
                    onChange={inputHandler}
                    />
                 </div>
                <button onClick={enterRoom} className="  bg-green-250 rounded-full  mx-auto  shadow-xl  p-3 text-gray-800 font-extrabold  h-[50px] w-[150px] ">Enter</button>
            </div>
            ):(
            <div className=" bg-gray-200 w-[400px] h-full flex flex-col justify-center mx-auto mt-[6rem] rounded-2xl justify-between">
                <div className=" bg-gray-300  rounded-sm">
                    
                    <h1 className=" font-bold text-center text-[1.5rem]">Chatting...</h1> 
                  
                 </div>
                 <div className=" flex gap-2 mt-5 w-full   p-3">
                    <input
                        type="text"
                        placeholder="enter message"
                        name="message"
                        onChange={inputHandler}
                        className=" bg-gray-100 rounded-lg p-2 outline-none w-[320px] "
                        />
                    <button onClick={sendMessage} className=" rounded-full shadow-xl w-[80px] bg-green-400 ">Send</button>
                </div>
                {
                    messageList.map((item,index)=>{
                        return(
                            <div key={index} className=" px-5">
                                {item.name} :{item.message}
                            </div>
                        )
                    })
                }
             
            </div>)

           }
        </div>
    )
}

export default ChatBox