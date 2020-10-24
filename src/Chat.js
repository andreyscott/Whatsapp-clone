import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined, } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useParams } from "react-router-dom";
import "./Chat.css";
import  "./SidebarChat";
import db from './firebase';

function Chat() {
 const [seed, setSeed] = useState("");
 const [input, setInput] = useState("")
 const { roomId } = useParams();
 const [roomName, SetRoomName] = useState("");

 useEffect(() => {
     if (roomId) { 
         db.collection("rooms")
         .doc(roomId).onSnapshot((snapshot) => 
         SetRoomName(snapshot.data().name));
     }
 }, [roomId]);

useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
}, [roomId]);

const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>> ", input)
    setInput("");
}
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            <div className="Chat_headerInfo">
    <h3>{roomName}</h3>
    <p>Last seen at...</p>
    </div>

    <div className="chat_headerRight">
   <IconButton>
   <SearchOutlined />
   </IconButton>

   <IconButton>
<AttachFileIcon />
   </IconButton>

<IconButton>
<MoreVertIcon />
</IconButton>
          </div>
        </div>
            <div className="chat_body">
        <p className={`chat_message ${true && 
        "chat_reciever"}`}> <span className="chat_name">AndreyScott</span>
        work hard in order to survive
     <span className="chat_timestamp">3:45pm</span>

        </p>
            </div>
            <div className="chat_footer">
            <InsertEmoticonIcon />
            <form>
                <input 
                value={input}
                onChange={(e) => {
                    setInput(e.target.value) }}
                placeholder="type a message"
                type="text"/>
                <button onClick={sendMessage} 
                type="submit">Send</button>
            </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
