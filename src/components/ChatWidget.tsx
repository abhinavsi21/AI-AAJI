import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Minus,
  Send,
  Sparkles,
  Mic,
  Tag,
  Download,
  Mail,
  ExternalLink,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCT_IDENTITY } from '../data/productData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  mode?: string;
  toolUsed?: string;
  toolStatus?: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeWorkflowStatus, setActiveWorkflowStatus] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm AI Aaji, your everyday AI assistant created by Abhinav Singh and Tanisha Kolhar. I use an intelligent Workflow Architect to answer questions about features, pricing editions, or provide our official download folder!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What is AI Aaji?',
    'What features do you offer?',
    'What is the difference between Base and Premium?',
    'How can I purchase AI Aaji?',
    'Can I download it for free?',
    'Who are Abhinav and Tanisha Kolhar?',
    'What is your official Instagram?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, activeWorkflowStatus]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setActiveWorkflowStatus('Workflow Architect: Analyzing intent & selecting tool...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const reply = data.reply || "I'm here to help with information about AI Aaji.";

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'assistant',
          text: reply,
          timestamp: new Date(),
          mode: data.mode,
          toolUsed: data.toolUsed,
          toolStatus: data.toolStatus,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'assistant',
          text: `AI Aaji is an everyday personal assistant created by Abhinav Singh and Tanisha Kolhar. You can explore our editions (Free ₹0, Base ₹399, Premium ₹699) or contact us directly at ${PRODUCT_IDENTITY.contactEmail}.`,
          timestamp: new Date(),
          mode: 'workflow-tool',
          toolUsed: 'lookupProductKnowledge',
          toolStatus: 'Checking verified product knowledge...',
        },
      ]);
    } finally {
      setIsLoading(false);
      setActiveWorkflowStatus(null);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Collapsed Orb Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="relative group p-3.5 rounded-full bg-gradient-to-tr from-[#8065FF] to-[#35D9F2] text-white shadow-xl shadow-[#8065FF]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          aria-label="Open AI Aaji Chatbot"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8065FF] to-[#35D9F2] opacity-40 blur-sm group-hover:opacity-75 animate-pulse" />
          
          <div className="relative w-8 h-8 rounded-full bg-[#080B14] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#B8A6FF]" />
          </div>

          <span className="sr-only">Chat with AI Aaji</span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          className={`relative w-[360px] sm:w-[410px] glass-panel-elevated rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-[64px]' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Window Header */}
          <div className="bg-[#080B14]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[#8065FF] to-[#35D9F2] p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#080B14] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#8065FF]" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  AI Aaji Assistant
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43D9A3] animate-pulse" />
                </h3>
                <span className="text-[10px] text-[#35D9F2]">Workflow Architect Active</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[#A7B0C5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#A7B0C5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Navigation Shortcuts Bar */}
              <div className="px-3 py-2 bg-[#0D1220] border-b border-white/5 flex items-center justify-between gap-1 overflow-x-auto text-[11px] text-[#A7B0C5] shrink-0">
                <button
                  onClick={() => scrollToSection('live-demo')}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-[#35D9F2] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Mic className="w-3 h-3 text-[#35D9F2]" />
                  Voice Demo
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-[#B8A6FF] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Tag className="w-3 h-3 text-[#B8A6FF]" />
                  Pricing
                </button>
                <a
                  href={PRODUCT_IDENTITY.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-[#43D9A3] flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3 h-3 text-[#43D9A3]" />
                  Drive Folder
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href={`mailto:${PRODUCT_IDENTITY.contactEmail}`}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-white flex items-center gap-1 shrink-0"
                >
                  <Mail className="w-3 h-3" />
                  Contact
                </a>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#080B14]/40 font-sans">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-[#8065FF] text-white rounded-tr-none'
                          : 'bg-[#182136] text-[#F7F8FF] border border-white/10 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Tool Badge & Transparency Notice */}
                    {msg.sender === 'assistant' && msg.toolStatus && (
                      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-[#35D9F2]/90">
                        <CheckCircle2 className="w-3 h-3 text-[#43D9A3]" />
                        <span>{msg.toolStatus}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Workflow Status Banner during processing */}
                {isLoading && (
                  <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#182136] border border-white/10 max-w-[280px]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#35D9F2]">
                      <Wrench className="w-3 h-3 animate-spin text-[#35D9F2]" />
                      <span>{activeWorkflowStatus || 'Workflow Architect executing...'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8065FF] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35D9F2] animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pills */}
              <div className="p-2.5 bg-[#0D1220]/90 border-t border-white/5 shrink-0 overflow-x-auto">
                <span className="text-[10px] text-[#A7B0C5] block mb-1.5 px-1 font-semibold">
                  Suggested Questions:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-[#A7B0C5] hover:text-white border border-white/5 transition-colors cursor-pointer text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#080B14] border-t border-white/10 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about features, Google Drive, pricing..."
                  className="flex-1 bg-[#12192A] border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-[#A7B0C5] focus:outline-none focus:border-[#8065FF]"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-2.5 rounded-full bg-gradient-to-r from-[#8065FF] to-[#35D9F2] text-white disabled:opacity-40 hover:opacity-95 transition-all cursor-pointer"
                  title="Send"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};
