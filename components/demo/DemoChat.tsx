'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { useDemoStore } from '@/stores/demo-store';

export default function DemoChat() {
  const {
    messages,
    messagesRemaining,
    maxMessages,
    isLoading,
    addMessage,
    setLoading,
    resetSession,
  } = useDemoStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || messagesRemaining === 0) return;

    const userMessage = input;
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    // Simulate API call with realistic delay
    setTimeout(() => {
      const responses = [
        `I appreciate your question: "${userMessage}". This is a demo environment with limited responses. In the full BlackRoad OS, I have access to real-time context, governance verification, and comprehensive capabilities.`,
        `Great question! In the production version of BlackRoad OS, every interaction is logged to an append-only ledger, ensuring complete transparency and accountability.`,
        `I'm designed with transparency at my core. Unlike other AI systems, every decision I make is traceable and explainable through the governance ledger.`,
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      addMessage({ role: 'assistant', content: response });
      setLoading(false);
    }, 1500);
  };

  const isLimitReached = messagesRemaining === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages counter */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-700">
            Demo Sandbox
          </div>
          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            DEMO
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`text-sm font-medium ${messagesRemaining <= 3 ? 'text-orange-600' : 'text-gray-600'}`}>
            {messagesRemaining} / {maxMessages} messages remaining
          </div>
          <button
            onClick={resetSession}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
              )}

              <div
                className={`max-w-[70%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {isLimitReached && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Demo Limit Reached
              </h3>
              <p className="text-sm text-orange-700 mb-4">
                You've used all {maxMessages} messages in this demo session.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetSession}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition-colors"
                >
                  Start New Session
                </button>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                >
                  Create Free Account
                </a>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLimitReached ? "Demo limit reached" : "Type your message..."}
              disabled={isLoading || isLimitReached}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isLimitReached}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
