import React from 'react';
import '../styles/SidebarChat.css';
import { Avatar } from "@material-ui/core";
import db from '../firebase.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SidebarChat = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
       if (props.id) {
           db.collection("rooms").doc(props.id).collection("messages")
           .orderBy("timestamp", "desc")
           .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => {
                return doc.data();
                }
            )
            );
           })
       };
    }, [props.id]);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room")

        if (roomName) {
            db.collection("rooms").add({
                name: roomName
            });
        }
    };

    const avatarUrl = `https://avatars.dicebear.com/api/bottts/${Math.floor(Math.random() * 5000)}.svg`
    return !props.addNewChat ? (
        <Link to={`/rooms/${props.id}`}>
            <div className="sidebarChat">
            <Avatar src={avatarUrl}/>
                <div className="sidebarChat_info">
                    <h2>{props.name}</h2>
                    <p>{messages[0]?.messages}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
    
};

export default SidebarChat;