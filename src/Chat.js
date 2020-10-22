import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined, } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import "./Chat.css";

function Chat() {
 const [seed, setSeed] = useState("");
 const [input, setInput] = useState("")

useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
}, []);

const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>> ", input)
}
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            <div className="Chat_headerInfo">
    <h3>Room name</h3>
    <p>Last message..</p>
    </div>

    <div className="sidebar_headerRight">
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
