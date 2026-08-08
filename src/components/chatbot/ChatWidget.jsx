import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Check, AlertTriangle, FileText, Target, Briefcase, Sparkles } from 'lucide-react';
import { getBotReply } from '../../services/chatbotService';

const SUGGESTIONS = [
  "Check my resume for ATS keywords",
  "What skills am I missing for Frontend Dev?",
  "Find React internships for me",
  "Practice interview questions with me"
];

const INITIAL_MESSAGE = {
  id: 'msg-0',
  sender: 'bot',
  text: "Hi! I'm your ElevateU Career Assistant 👋\n\nI can help you with:\n• Resume review & ATS optimization\n• Skill gap analysis & learning roadmaps\n• Internship & job search\n• Interview preparation\n\nWhat would you like to work on today?"
};

// Map internal agent names to friendly display labels
const AGENT_LABELS = {
  'Resume & ATS Specialist Agent': { label: 'Resume Expert', icon: '📄' },
  'Career & Skill Coach Agent':    { label: 'Career Coach', icon: '🎯' },
  'Job & Opportunity Matcher Agent': { label: 'Job Finder', icon: '💼' },
  'STAR Interview Coach':          { label: 'Interview Coach', icon: '🎙️' },
  'ElevateU General Assistant':    { label: 'ElevateU Assistant', icon: '✨' },
  'Security Guardrail':            { label: 'ElevateU Assistant', icon: '✨' },
};

function getFriendlyAgent(agent) {
  return AGENT_LABELS[agent] || { label: 'ElevateU Assistant', icon: '✨' };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getBotReply(userMsg.text);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        agent: response.agent,
        text: response.reply,
        dataCard: response.dataCard || null,
        hitlAction: response.hitlAction || null,
        isBlocked: response.isBlocked || false
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Sorry, something went wrong. Please try again."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHitlAction = (msgId, hitlId, approved) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.hitlAction?.id === hitlId) {
        return {
          ...m,
          hitlAction: { ...m.hitlAction, status: approved ? 'APPROVED' : 'REJECTED' }
        };
      }
      return m;
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans">
      
      {/* ─── Chat Panel ──────────────────────────────────────────── */}
      {isOpen && (
        <div 
          className="mb-4 bg-bg-surface border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
                     w-[calc(100vw-32px)] h-[calc(100vh-100px)] sm:w-[400px] sm:h-[560px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary px-4 py-3 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm leading-tight">
                  ElevateU Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium">Online · Career AI</span>
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
              const friendlyAgent = msg.agent ? getFriendlyAgent(msg.agent) : null;

              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Friendly agent tag */}
                  {!isUser && friendlyAgent && msg.agent && (
                    <div className="flex items-center gap-1 mb-1 px-1">
                      <span className="text-xs">{friendlyAgent.icon}</span>
                      <span className="text-[10px] font-semibold text-text-secondary">
                        {friendlyAgent.label}
                      </span>
                    </div>
                  )}

                  <div 
                    className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isUser 
                        ? 'bg-primary text-white rounded-tr-sm shadow-sm' 
                        : msg.isBlocked
                          ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-tl-sm'
                          : 'bg-bg-surface border border-border text-text-primary rounded-tl-sm shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Interactive Data Cards */}
                    {msg.dataCard && (
                      <div className="mt-3 pt-2 border-t border-border/60">

                        {/* ATS Resume Score Card */}
                        {msg.dataCard.type === 'RESUME_SCORE' && (
                          <div className="bg-primary/5 rounded-xl p-3 border border-primary/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-xs text-primary flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                {msg.dataCard.title}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-primary text-white font-bold text-xs">
                                {msg.dataCard.score}/100
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary mb-2">
                              <span className="font-semibold text-text-primary">Priority fix:</span> {msg.dataCard.topIssue}
                            </p>
                            <p className="text-[10px] text-text-secondary mb-1.5 font-medium">Add these keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {msg.dataCard.missingKeywords.map(kw => (
                                <span key={kw} className="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded font-semibold">
                                  + {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skill Gap Readiness Card */}
                        {msg.dataCard.type === 'SKILL_GAP' && (
                          <div className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                <Target className="h-3.5 w-3.5" />
                                Role Readiness
                              </span>
                              <span className="font-bold text-xs text-emerald-600">
                                {msg.dataCard.readinessScore}% Ready
                              </span>
                            </div>
                            <div className="w-full bg-emerald-200 dark:bg-emerald-950 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${msg.dataCard.readinessScore}%` }} />
                            </div>
                            <p className="text-[10px] text-text-secondary mb-1.5 font-medium">Skills to learn next:</p>
                            <div className="flex flex-wrap gap-1">
                              {msg.dataCard.missingSkills.map(sk => (
                                <span key={sk} className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Opportunity Listings Card */}
                        {msg.dataCard.type === 'OPPORTUNITY_LIST' && (
                          <div className="space-y-2 mt-1">
                            <p className="text-[10px] font-semibold text-text-secondary mb-1">Top matches for you:</p>
                            {msg.dataCard.items.slice(0, 2).map(item => (
                              <div key={item.id} className="bg-bg-page border border-border p-2.5 rounded-xl flex items-center justify-between">
                                <div>
                                  <h4 className="font-bold text-xs text-text-primary">{item.title}</h4>
                                  <p className="text-[11px] text-text-secondary">{item.company} · {item.location}</p>
                                </div>
                                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md shrink-0 ml-2">
                                  {item.matchPercent ? `${item.matchPercent}% match` : 'Good fit'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Confirmation Card (HITL) */}
                    {msg.hitlAction && (
                      <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 text-xs font-bold mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Confirm Action
                        </div>
                        <p className="text-xs text-text-primary mb-2">
                          {msg.hitlAction.promptMessage}
                        </p>
                        
                        {msg.hitlAction.status === 'PENDING' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleHitlAction(msg.id, msg.hitlAction.id, true)}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Check className="h-3.5 w-3.5" /> Yes, confirm
                            </button>
                            <button
                              onClick={() => handleHitlAction(msg.id, msg.hitlAction.id, false)}
                              className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-text-primary text-xs font-medium py-1.5 px-3 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className={`text-xs font-bold px-2 py-1 rounded-md ${
                            msg.hitlAction.status === 'APPROVED' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                          }`}>
                            {msg.hitlAction.status === 'APPROVED' ? '✓ Done! Your profile has been updated.' : '✕ Cancelled.'}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-bg-surface border border-border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-10">
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
              <div className="flex flex-wrap gap-1.5 mb-3">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border border-secondary/40 text-secondary hover:bg-secondary hover:text-white transition-colors"
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
                placeholder="Ask about your resume, skills, jobs..."
                className="w-full bg-bg-page border border-border text-text-primary text-sm rounded-xl focus:ring-secondary focus:border-secondary p-2.5 resize-none overflow-hidden min-h-[44px] max-h-[120px]"
                rows={1}
                style={{ fieldSizing: 'content' }}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 h-[44px] w-[44px] flex items-center justify-center shadow-md"
              >
                <Send className="h-5 w-5 ml-0.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ─── Floating Button ──────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-bg-surface text-text-primary border border-border' : 'bg-gradient-to-r from-primary to-secondary text-white ring-4 ring-primary/20'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

    </div>
  );
}
