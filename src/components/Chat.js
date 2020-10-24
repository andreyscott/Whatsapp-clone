import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from "../StateProvider.js";
import firebase from 'firebase';
// import SelectInput from '@material-ui/core/Select/SelectInput';

const Chat = (props) => {
    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [{user}, dispatch] = useStateValue();
    

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            });

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot( snapshot => 
                setMessages(snapshot.docs.map( doc => {
                    return doc.data()
                    })
                )
            );
        };
    },[roomId]);

    const handleSend = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            messages: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    };
    const avatarUrl = `https://avatars.dicebear.com/api/bottts/${Math.floor(Math.random() * 5000)}.svg`;

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar  src={avatarUrl}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}{
                        new Date(messages[messages.length - 1]?.timestamp?.toDate())
                        .toUTCString()
                    }
                    </p>
                </div>
            
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        
            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat_name">
                            {message.name}
                        </span>
                            {message.messages}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" onClick={handleSend}>send</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
};

export default Chat;