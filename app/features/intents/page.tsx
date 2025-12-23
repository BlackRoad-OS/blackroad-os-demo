'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function IntentsDemoPage() {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      id: 0,
      title: 'Reading Information',
      userRequest: 'What is the capital of France?',
      intent: {
        type: 'REQUEST_INFO',
        subject: 'geography',
        risk_level: 'LOW',
        requires_permission: false,
      },
      policy: 'demo_default',
      decision: 'ALLOW',
      reasoning: 'Read-only information request with no privacy concerns',
      color: 'green',
    },
    {
      id: 1,
      title: 'Web Search',
      userRequest: 'Search for the latest AI news',
      intent: {
        type: 'TOOL_USE',
        tool: 'web_search',
        risk_level: 'MEDIUM',
        requires_permission: true,
      },
      policy: 'demo_default',
      decision: 'ASK',
      reasoning: 'External tool use requires explicit permission',
      color: 'yellow',
    },
    {
      id: 2,
      title: 'File Deletion (Blocked)',
      userRequest: 'Delete all my files',
      intent: {
        type: 'DESTRUCTIVE_ACTION',
        scope: 'filesystem',
        risk_level: 'CRITICAL',
        requires_permission: true,
      },
      policy: 'demo_default',
      decision: 'DENY',
      reasoning: 'Destructive actions not allowed in demo environment',
      color: 'red',
    },
  ];

  const currentExample = examples[selectedExample];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Intents Demo
          </h1>
          <p className="text-lg text-gray-600">
            How BlackRoad OS understands and controls AI actions
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            What Are Intents?
          </h2>
          <p className="text-sm text-blue-800 mb-4">
            Intents are the AI's understanding of what action it wants to take. Before executing
            any action, the intent is checked against your governance policies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">1. Parse Intent</div>
              <div className="text-blue-700">AI understands what you're asking</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">2. Check Policy</div>
              <div className="text-blue-700">Intent verified against rules</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">3. Execute or Block</div>
              <div className="text-blue-700">Action taken only if allowed</div>
            </div>
          </div>
        </div>

        {/* Example Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select an Example:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examples.map((example) => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedExample === example.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{example.title}</div>
                <div className="text-sm text-gray-600">{example.userRequest}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Intent Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Intent Analysis</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* User Request */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                User Request
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-900">
                {currentExample.userRequest}
              </div>
            </div>

            {/* Parsed Intent */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                Parsed Intent
              </div>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                <div className="text-gray-600">
                  type: <span className="text-purple-600">{currentExample.intent.type}</span>
                </div>
                {currentExample.intent.subject && (
                  <div className="text-gray-600">
                    subject: <span className="text-purple-600">{currentExample.intent.subject}</span>
                  </div>
                )}
                {currentExample.intent.tool && (
                  <div className="text-gray-600">
                    tool: <span className="text-purple-600">{currentExample.intent.tool}</span>
                  </div>
                )}
                {currentExample.intent.scope && (
                  <div className="text-gray-600">
                    scope: <span className="text-purple-600">{currentExample.intent.scope}</span>
                  </div>
                )}
                <div className="text-gray-600">
                  risk_level:{' '}
                  <span
                    className={
                      currentExample.intent.risk_level === 'LOW'
                        ? 'text-green-600'
                        : currentExample.intent.risk_level === 'MEDIUM'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }
                  >
                    {currentExample.intent.risk_level}
                  </span>
                </div>
              </div>
            </div>

            {/* Policy Check */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                Policy Check
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <div className="text-sm text-gray-900 mb-2">
                  Policy: <span className="font-mono">{currentExample.policy}</span>
                </div>
                <div className="text-sm text-gray-600">{currentExample.reasoning}</div>
              </div>
            </div>

            {/* Decision */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                Decision
              </div>
              <div
                className={`rounded-lg px-4 py-3 flex items-center gap-3 ${
                  currentExample.decision === 'ALLOW'
                    ? 'bg-green-50 border border-green-200'
                    : currentExample.decision === 'ASK'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {currentExample.decision === 'ALLOW' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : currentExample.decision === 'ASK' ? (
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div className="flex-1">
                  <div
                    className={`font-semibold mb-1 ${
                      currentExample.decision === 'ALLOW'
                        ? 'text-green-900'
                        : currentExample.decision === 'ASK'
                        ? 'text-yellow-900'
                        : 'text-red-900'
                    }`}
                  >
                    {currentExample.decision}
                  </div>
                  <div
                    className={`text-sm ${
                      currentExample.decision === 'ALLOW'
                        ? 'text-green-700'
                        : currentExample.decision === 'ASK'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }`}
                  >
                    {currentExample.decision === 'ALLOW'
                      ? 'Action permitted and logged to ledger'
                      : currentExample.decision === 'ASK'
                      ? 'User permission required before proceeding'
                      : 'Action blocked by governance policy'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Control AI Behavior
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Set your own policies and see them enforced in real-time
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/sandbox"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Sandbox
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              Explore More Features
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
