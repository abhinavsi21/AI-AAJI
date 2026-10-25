import React, { useState, useRef, useEffect } from 'react';
import {
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Collapsed Orb Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="relative group p-3.5 rounded-full btn-gradient text-white shadow-xl shadow-[var(--accent-primary)]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          aria-label="Open AI Aaji Chatbot"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full badge-gradient opacity-40 blur-sm group-hover:opacity-75 animate-pulse" />
          
          <div className="relative w-8 h-8 rounded-full bg-[var(--bg-main)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
          </div>

          <span className="sr-only">Chat with AI Aaji</span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          className={`relative w-[calc(100vw-2rem)] max-w-[360px] sm:max-w-[410px] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-elevated)] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-[64px]' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Window Header */}
          <div className="bg-[var(--bg-elevated)] px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full bg-[var(--gradient-btn)] p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[var(--bg-main)] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-primary)]" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-main)] flex items-center gap-1.5">
                  AI Aaji Assistant
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)] animate-pulse" />
                </h3>
                <span className="text-[10px] text-[var(--accent-secondary)]">Workflow Architect Active</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Navigation Shortcuts Bar */}
              <div className="px-3 py-2 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center justify-between gap-1 overflow-x-auto text-[11px] text-[var(--text-secondary)] shrink-0">
                <button
                  onClick={() => scrollToSection('live-demo')}
                  className="px-2 py-1 rounded hover:bg-[var(--glass-pill-bg)] hover:text-[var(--accent-secondary)] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Mic className="w-3 h-3 text-[var(--accent-secondary)]" />
                  Voice Demo
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="px-2 py-1 rounded hover:bg-[var(--glass-pill-bg)] hover:text-[var(--accent-primary)] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Tag className="w-3 h-3 text-[var(--accent-primary)]" />
                  Pricing
                </button>
                <a
                  href={PRODUCT_IDENTITY.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded hover:bg-[var(--glass-pill-bg)] hover:text-[var(--status-success)] flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3 h-3 text-[var(--status-success)]" />
                  Drive Folder
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href={`mailto:${PRODUCT_IDENTITY.contactEmail}`}
                  className="px-2 py-1 rounded hover:bg-[var(--glass-pill-bg)] hover:text-[var(--text-main)] flex items-center gap-1 shrink-0"
                >
                  <Mail className="w-3 h-3" />
                  Contact
                </a>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[var(--bg-main)]/50 font-sans">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[var(--gradient-btn)] text-white rounded-tr-none'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Tool Badge & Transparency Notice */}
                    {msg.sender === 'assistant' && msg.toolStatus && (
                      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-[var(--accent-secondary)]">
                        <CheckCircle2 className="w-3 h-3 text-[var(--status-success)]" />
                        <span>{msg.toolStatus}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Workflow Status Banner during processing */}
                {isLoading && (
                  <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] max-w-[280px]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent-secondary)]">
                      <Wrench className="w-3 h-3 animate-spin text-[var(--accent-secondary)]" />
                      <span>{activeWorkflowStatus || 'Workflow Architect executing...'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)] animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pills */}
              <div className="p-2.5 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] shrink-0 overflow-x-auto">
                <span className="text-[10px] text-[var(--text-secondary)] block mb-1.5 px-1 font-semibold">
                  Suggested Questions:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 rounded-full bg-[var(--glass-pill-bg)] hover:bg-[var(--bg-hover)] text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] transition-colors cursor-pointer text-left"
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
                className="p-3 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about features, Google Drive, pricing..."
                  className="flex-1 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-full px-4 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-2.5 rounded-full btn-gradient text-white disabled:opacity-40 hover:opacity-95 transition-all cursor-pointer shadow-md"
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
