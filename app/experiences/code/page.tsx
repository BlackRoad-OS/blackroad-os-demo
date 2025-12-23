'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, Code2, CheckCircle } from 'lucide-react';

export default function CodePage() {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');

  const steps = [
    {
      id: 0,
      assistant: "I can help you write, debug, and understand code. I explain my reasoning and show you multiple approaches.\n\nTry asking: \"Write a function to check if a string is a palindrome\"",
      showInput: true,
    },
    {
      id: 1,
      user: "Write a function to check if a string is a palindrome",
      assistant: "I'll write this function and explain my approach:\n\n```typescript\nfunction isPalindrome(str: string): boolean {\n  // Clean and normalize the string\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  \n  // Compare with reversed version\n  return cleaned === cleaned.split('').reverse().join('');\n}\n```\n\n**My reasoning:**\n1. **Normalize** - Convert to lowercase and remove non-alphanumeric\n2. **Simple approach** - Compare string with its reverse\n3. **Type safety** - TypeScript for clarity\n\nAlternatives:\n- Two-pointer approach (more efficient for very long strings)\n- Recursive solution (more elegant but uses stack space)\n\nWant to see the two-pointer version?",
      showInput: true,
      showCode: true,
    },
    {
      id: 2,
      user: "Show me the two-pointer version",
      assistant: "Great! Here's the optimized two-pointer approach:\n\n```typescript\nfunction isPalindrome(str: string): boolean {\n  // Clean and normalize\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  \n  // Two pointers: start and end\n  let left = 0;\n  let right = cleaned.length - 1;\n  \n  while (left < right) {\n    if (cleaned[left] !== cleaned[right]) {\n      return false;\n    }\n    left++;\n    right--;\n  }\n  \n  return true;\n}\n```\n\n**Why this is better:**\n- **Time:** O(n) - same as before\n- **Space:** O(1) - doesn't create reversed string\n- **Early exit:** Returns false as soon as mismatch found\n\n**Trade-offs:**\n- Slightly more code\n- Harder to understand at first glance\n- Better for performance-critical applications\n\nNotice how I showed you both approaches and explained when to use each? That's transparent AI collaboration.",
      showInput: false,
      showCode: true,
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
            Code Helper
          </h1>
          <p className="text-lg text-gray-600">
            Programming assistance with explanations
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

                  {s.showCode && (
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium text-green-400">
                          Code with Explanation
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Every code suggestion includes reasoning, alternatives, and trade-offs.
                        Learn while you build.
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
              You've seen how I explain code, show alternatives, and teach while helping. Try it yourself!
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
