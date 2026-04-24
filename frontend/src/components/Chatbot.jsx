import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm your AI fitness assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = ["Lose weight", "Build muscle", "Diet plan"];

  const handleSend = (text) => {
    if (!text.trim()) return;

    setMessages([...messages, { text, sender: 'user' }]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      let reply = "That's a great goal! Tell me more about your current routine.";
      if (text.toLowerCase().includes("lose weight")) {
        reply = "To lose weight, focus on a caloric deficit and mix cardio with strength training. Would you like a suggested starter plan?";
      } else if (text.toLowerCase().includes("build muscle")) {
        reply = "Building muscle requires progressive overload and sufficient protein intake (around 1.6-2.2g per kg of body weight). Need a split routine?";
      } else if (text.toLowerCase().includes("diet plan")) {
        reply = "A good diet consists of lean proteins, complex carbs, and healthy fats. What are your current macro goals?";
      }

      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg z-50 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full text-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold">Fitness AI</h3>
                  <p className="text-gray-400 text-xs">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-slate-800 text-gray-200 border border-white/5 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
               <div className="px-4 py-2 flex flex-wrap gap-2">
                 {quickReplies.map(reply => (
                   <button 
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-gray-300 transition-colors"
                   >
                     {reply}
                   </button>
                 ))}
               </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-slate-800/50">
              <div className="flex items-center gap-2">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-slate-900 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={() => handleSend(inputText)}
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity transition-transform hover:scale-105"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
