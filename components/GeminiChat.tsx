import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiService';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Yo! 我是 Atom 的招募小幫手。有什麼想問的嗎？儘管出招！🤘', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const apiHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await generateResponse(apiHistory, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "哎呀，訊號不好，等我一下再來！🤖", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full border-2 border-black shadow-retro transition-all duration-300 transform hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-black text-white rotate-90' : 'bg-pop-pink text-black hover:bg-pop-yellow'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} strokeWidth={2.5} />}
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] md:w-96 bg-white rounded-3xl shadow-retro-lg border-2 border-black z-50 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-pop-blue p-4 border-b-2 border-black flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl border-2 border-black shadow-retro-hover">
            <Sparkles size={20} className="text-black" />
          </div>
          <div>
            <h3 className="text-white font-black text-lg tracking-wide uppercase stroke-black" style={{textShadow: '2px 2px 0 #000'}}>Atom Bot</h3>
            <p className="text-white text-xs font-bold border border-black bg-black px-1 inline-block">ONLINE</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 font-bold text-sm border-2 border-black shadow-retro-hover
                  ${msg.role === 'user' 
                    ? 'bg-pop-yellow text-black rounded-2xl rounded-tr-none' 
                    : 'bg-white text-black rounded-2xl rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-black rounded-2xl rounded-tl-none px-4 py-3 border-2 border-black shadow-retro-hover">
                <Loader2 className="animate-spin" size={20} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t-2 border-black">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything..."
              className="w-full bg-cream text-black font-bold text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-black border-2 border-black placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-black text-white rounded-lg hover:bg-pop-pink hover:text-black border border-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeminiChat;