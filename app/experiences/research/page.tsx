'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, Globe, FileText, CheckCircle } from 'lucide-react';

export default function ResearchPage() {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');

  const steps = [
    {
      id: 0,
      assistant: "I can help you research any topic by searching the web, synthesizing information, and providing citations. Let's try it!\n\nAsk me: \"What are the latest developments in AI governance?\"",
      showInput: true,
    },
    {
      id: 1,
      user: "What are the latest developments in AI governance?",
      assistant: "I'm searching for the latest information on AI governance...",
      searching: true,
      sources: [
        { title: "OpenAI governance updates", url: "openai.com/governance" },
        { title: "EU AI Act 2024", url: "europa.eu/ai-act" },
        { title: "NIST AI Risk Framework", url: "nist.gov/ai-rmf" },
      ],
    },
    {
      id: 2,
      user: "What are the latest developments in AI governance?",
      assistant: "Based on my research, here are the key developments:\n\n**1. EU AI Act (2024)**\n- First comprehensive AI regulation\n- Risk-based approach to AI systems\n- Banned applications: social scoring, biometric surveillance\n\n**2. NIST AI Risk Management Framework**\n- Voluntary framework for AI safety\n- Focus on trustworthy AI characteristics\n- Adopted by major tech companies\n\n**3. Industry Self-Regulation**\n- OpenAI board restructuring for safety\n- Anthropic's Constitutional AI approach\n- Microsoft/Google safety commitments\n\nEvery claim is backed by verifiable sources. Check the sources panel below!",
      showSources: true,
      sources: [
        { title: "EU AI Act Overview", url: "europa.eu/ai-act", date: "Dec 2024" },
        { title: "NIST AI RMF", url: "nist.gov/ai-rmf", date: "Jan 2023" },
        { title: "OpenAI Safety Update", url: "openai.com/safety", date: "Nov 2024" },
      ],
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
            Research Assistant
          </h1>
          <p className="text-lg text-gray-600">
            See web search and synthesis in action
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

                  {s.searching && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-blue-600 animate-pulse" />
                        <span className="text-sm font-medium text-blue-900">
                          Searching the web...
                        </span>
                      </div>
                      <div className="space-y-2">
                        {s.sources?.map((source, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-blue-700">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            {source.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {s.showSources && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">
                          Sources
                        </span>
                      </div>
                      <div className="space-y-2">
                        {s.sources?.map((source, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-purple-900">
                                {source.title}
                              </div>
                              <div className="text-xs text-purple-600">
                                {source.url} • {source.date}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
              You've seen how I search, synthesize, and cite sources. Try it yourself!
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
