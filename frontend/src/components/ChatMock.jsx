import React, { useState } from 'react';
import { Send, Phone, MoreVertical } from 'lucide-react';
import './ChatMock.css';

const MOCK_MESSAGES = [
  { id: 1, text: "Hi John, thanks for expressing interest in our new SaaS platform.", direction: 'outbound', time: '10:00 AM' },
  { id: 2, text: "Can you send the pricing details?", direction: 'inbound', time: '10:05 AM' },
  { id: 3, text: "Sure! Our pro plan sits at $49/mo. It includes all automation features.", direction: 'outbound', time: '10:06 AM' },
];

const ChatMock = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages([...messages, { 
       id: Date.now(), 
       text: input, 
       direction: 'outbound', 
       time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]);
    setInput('');
  };

  return (
    <div className="chat-container">
       <div className="chat-header">
          <div className="contact-info">
             <div className="avatar">J</div>
             <div>
                <h3 className="text-title-medium">John Wick</h3>
                <span className="status">Online via WhatsApp API</span>
             </div>
          </div>
          <div className="header-actions">
             <Phone size={20} />
             <MoreVertical size={20} />
          </div>
       </div>

       <div className="chat-messages">
          {messages.map(msg => (
             <div key={msg.id} className={`message-bubble ${msg.direction}`}>
                <div className="message-content">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
             </div>
          ))}
       </div>

       <div className="chat-input-area">
          <input 
             type="text" 
             placeholder="Type a template or automated message..." 
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}><Send size={20} /></button>
       </div>
    </div>
  );
};

export default ChatMock;
