'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, CheckCircle } from 'lucide-react';

export default function MeetLucidiaPage() {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');

  const steps = [
    {
      id: 0,
      assistant: "Hi! I'm Lucidia. I'm not like other AI assistants. Every decision I make, every action I take, is logged to an immutable ledger. This means you always know exactly what I'm doing and why.\n\nTry asking me: \"What makes you different?\"",
      showInput: true,
    },
    {
      id: 1,
      user: "What makes you different?",
      assistant: "Great question! Here's what makes me different:\n\n1. **Transparency** - Every interaction is logged to an append-only ledger\n2. **Accountability** - You can audit my decisions at any time\n3. **Governance** - You set the rules, I follow them\n4. **Intents** - I ask permission before taking actions\n\nUnlike other AI systems that operate as black boxes, I'm designed to be completely transparent. You can see my reasoning, my data sources, and my decision-making process.\n\nWant to see this in action? Try asking: \"Show me your reasoning\"",
      showInput: true,
    },
    {
      id: 2,
      user: "Show me your reasoning",
      assistant: "Here's how I process your request:\n\n**Step 1: Parse Intent**\n- Detected: REQUEST_INFO\n- Subject: transparency_features\n- Confidence: 0.98\n\n**Step 2: Check Permissions**\n- Policy: demo_default\n- Action: ALLOW (read-only information)\n\n**Step 3: Generate Response**\n- Source: knowledge_base/transparency.md\n- Reasoning: User wants to understand transparency features\n- Approach: Provide structured, educational response\n\n**Step 4: Log to Ledger**\n- Entry ID: led_20251223_000123\n- Hash: a3b2c1d4e5f6...\n- Verified: ✓\n\nThis entire process happens in milliseconds, and every step is auditable. Ready to try the full sandbox?",
      showInput: false,
      showCTA: true,
    },
  ];

  const currentStep = steps[step];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
      setUserInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">
              Step {step + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Meet Lucidia
          </h1>
          <p className="text-lg text-gray-600">
            Your first conversation with transparent AI
          </p>
        </div>

        {/* Conversation */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-6">
          {/* Show all messages up to current step */}
          {steps.slice(0, step + 1).map((s) => (
            <div key={s.id} className="space-y-4">
              {s.user && (
                <div className="flex gap-4 justify-end">
                  <div className="max-w-[80%] bg-blue-600 text-white rounded-lg px-4 py-3">
                    <p className="text-sm whitespace-pre-wrap">{s.user}</p>
                  </div>
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3">
                  <p className="text-sm whitespace-pre-wrap text-gray-900">
                    {s.assistant}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input or CTA */}
        {currentStep.showInput && (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the suggested question above..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                Continue
              </button>
            </div>
          </form>
        )}

        {currentStep.showCTA && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">
                Experience Complete!
              </h3>
            </div>
            <p className="text-sm text-green-700 mb-6">
              You've seen how Lucidia's transparency works. Ready to try it yourself?
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/sandbox"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Try Full Sandbox
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                More Experiences
              </Link>
            </div>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`h-2 w-2 rounded-full transition-colors ${
                s.id <= step ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
