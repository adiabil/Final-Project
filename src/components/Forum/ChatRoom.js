import './ChatRoom.css';
import Navbar from "../Shared/Navbar/Navbar";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../Context/AuthContext";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext); 

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5001/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    const sendMessage = async () => {
        if (!user) {
            console.error("No user logged in");
            return;
        }

        try {
            await fetch('http://localhost:5001/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ user: {name: user.username, image: user.image}, message }),
            });

            setMessage(''); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    useEffect(() => {
        fetchMessages(); 
        const interval = setInterval(fetchMessages, 2000); 
        return () => clearInterval(interval);
    }, []); 

    return (
    <div>
        <header style={{ padding: "0 20px" }}>
            <Navbar current={"forum"}></Navbar>
        </header>
        <div className="chat-room">
            <h2 className="chat-room-title">Chat Room</h2>
            <ul className="message-list">
    			{messages.map((message) => (
        			<li key={message._id} className="message-item">
            			<strong>{message.user.name}:</strong> {message.message}
        			</li>
    			))}
			</ul>

            <div className="message-inputs">
                <input
                    type="text"
                    className="input-message"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
        </div>
    );
};

export default ChatRoom;
