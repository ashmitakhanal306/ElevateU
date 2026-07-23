import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getBotReply } from '../../services/chatbotService';

// Suggestion chips shown only before the user sends their first message
const SUGGESTIONS = [
  "Resume tips",
  "Interview prep",
  "Career advice"
];

// Initial welcome message
const INITIAL_MESSAGE = {
  id: 'msg-0',
  sender: 'bot',
  text: "Hi! I'm here to help with career guidance, skills, and interview prep. What's on your mind?"
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow CSS transition
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Get bot reply
    try {
      const replyText = await getBotReply(userMsg.text);
      const botMsg = { id: (Date.now() + 1).toString(), sender: 'bot', text: replyText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: "Sorry, I'm having trouble connecting right now. Please try again later." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      
      {/* ─── Chat Panel ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div 
          className="mb-4 bg-bg-surface border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
                     w-[calc(100vw-32px)] h-[calc(100vh-100px)] sm:w-[360px] sm:h-[480px]"
        >
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm leading-tight">
                  ElevateU Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-white/80 text-xs font-medium">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-bg-page flex flex-col gap-4">
            
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isUser 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-bg-surface border border-border text-text-primary rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-bg-surface border border-border px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-10">
                  <span className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions & Input Area */}
          <div className="bg-bg-surface border-t border-border p-3">
            
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full bg-bg-page border border-border text-text-primary text-sm rounded-xl focus:ring-secondary focus:border-secondary p-2.5 resize-none overflow-hidden min-h-[44px] max-h-[120px]"
                rows={1}
                style={{ fieldSizing: 'content' }} // Modern CSS for auto-expanding textareas if supported, otherwise just a 1-liner
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 h-[44px] w-[44px] flex items-center justify-center"
              >
                <Send className="h-5 w-5 ml-0.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ─── Floating Button ───────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-bg-surface text-text-primary border border-border' : 'bg-primary text-white hover:bg-secondary'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

    </div>
  );
}
