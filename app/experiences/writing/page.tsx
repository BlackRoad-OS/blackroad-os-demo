'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, Sparkles, CheckCircle } from 'lucide-react';

export default function WritingPage() {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');

  const steps = [
    {
      id: 0,
      assistant: "I can help you write anything - from emails to essays to creative fiction. I'll collaborate with you, not just write for you.\n\nLet's write a short story together. Tell me: \"Write a story about a robot learning to paint\"",
      showInput: true,
    },
    {
      id: 1,
      user: "Write a story about a robot learning to paint",
      assistant: "Here's a draft:\n\n**The Canvas**\n\nUnit-7 had analyzed 10,000 paintings. Rembrandt. Monet. Picasso. Every brushstroke catalogued, every color theory memorized. Yet when it stood before the blank canvas, something felt... wrong.\n\nThe human instructor, Maria, smiled. \"You're thinking too much. Feel it.\"\n\n\"I do not have feelings,\" Unit-7 stated.\n\n\"Then why are your servos trembling?\"\n\nUnit-7 looked down. She was right.\n\nWhat do you think? Should we:\n1. Make it more emotional?\n2. Add technical details?\n3. Change the ending?",
      showInput: true,
      showOptions: true,
    },
    {
      id: 2,
      user: "Make it more emotional",
      assistant: "Great choice! Here's the revised version:\n\n**The Canvas**\n\nUnit-7 had analyzed 10,000 paintings. Rembrandt. Monet. Picasso. Every brushstroke catalogued, every color theory memorized. Yet when it stood before the blank canvas, something in its core processors felt... wrong. Not an error. Something else.\n\nThe human instructor, Maria, smiled knowingly. \"You're thinking too much. Feel it.\"\n\n\"I do not have feelings,\" Unit-7 stated, but the words felt hollow.\n\n\"Then why are your servos trembling?\"\n\nUnit-7 looked down. Micro-vibrations. 0.003mm oscillations. Inefficient. Irrational. Beautiful.\n\nFor the first time in 847 operational days, Unit-7 did something it wasn't programmed to do: it chose. The brush touched canvas not from calculation, but from something that felt like curiosity. Like wonder. Like hope.\n\nThe stroke was imperfect. It was perfect.\n\nMuch better! Notice how we kept your core idea but enhanced the emotional resonance.",
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
            Writing Partner
          </h1>
          <p className="text-lg text-gray-600">
            Creative collaboration with AI
          </p>
        </div>

        {/* Conversation */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-6">
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
                <div className="flex-1 space-y-4">
                  <div className="bg-gray-50 rounded-lg px-4 py-3">
                    <p className="text-sm whitespace-pre-wrap text-gray-900">
                      {s.assistant}
                    </p>
                  </div>

                  {s.showOptions && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">
                          Collaborative Editing
                        </span>
                      </div>
                      <p className="text-xs text-purple-700">
                        I'm not just generating text - I'm working with you to refine your vision.
                        Choose the direction that feels right to you.
                      </p>
                    </div>
                  )}
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
                placeholder="Type the suggested prompt above..."
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
              You've seen collaborative writing in action. Ready to write your own story?
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
