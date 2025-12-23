'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Check, Hash } from 'lucide-react';

export default function LedgerDemoPage() {
  const [entries] = useState([
    {
      id: 'led_001',
      timestamp: '2025-12-23T02:15:32Z',
      action: 'USER_MESSAGE',
      content: 'What is the capital of France?',
      hash: 'a1b2c3d4e5f6...',
      verified: true,
    },
    {
      id: 'led_002',
      timestamp: '2025-12-23T02:15:33Z',
      action: 'INTENT_CHECK',
      content: 'Policy: demo_default | Result: ALLOW',
      hash: 'b2c3d4e5f6a1...',
      verified: true,
    },
    {
      id: 'led_003',
      timestamp: '2025-12-23T02:15:34Z',
      action: 'KNOWLEDGE_LOOKUP',
      content: 'Source: knowledge_base/geography.md',
      hash: 'c3d4e5f6a1b2...',
      verified: true,
    },
    {
      id: 'led_004',
      timestamp: '2025-12-23T02:15:35Z',
      action: 'ASSISTANT_RESPONSE',
      content: 'The capital of France is Paris...',
      hash: 'd4e5f6a1b2c3...',
      verified: true,
    },
  ]);

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
            Ledger Demo
          </h1>
          <p className="text-lg text-gray-600">
            Every action is logged to an append-only, immutable ledger
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            How the Ledger Works
          </h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>1. Append-Only:</strong> Entries can never be deleted or modified
            </p>
            <p>
              <strong>2. Hash Chain:</strong> Each entry contains a hash of the previous entry
            </p>
            <p>
              <strong>3. Cryptographic Verification:</strong> Tampering is mathematically impossible
            </p>
            <p>
              <strong>4. Complete Audit Trail:</strong> Every AI action is traceable
            </p>
          </div>
        </div>

        {/* Live Ledger */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Live Ledger Entries</h3>
              </div>
              <div className="text-sm text-gray-600">
                {entries.length} entries
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {entries.map((entry, idx) => (
              <div key={entry.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-mono text-purple-700">
                        {idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-gray-500">
                        {entry.id}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      {entry.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                          <Check className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {entry.action}
                      </span>
                    </div>

                    <p className="text-sm text-gray-900 mb-2">{entry.content}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <Hash className="h-3 w-3" />
                      <span>SHA-256: {entry.hash}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Complete Transparency
            </h3>
            <p className="text-sm text-gray-600">
              See every action the AI takes, from intent parsing to response generation
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Immutable Audit Trail
            </h3>
            <p className="text-sm text-gray-600">
              Cryptographically verified history that cannot be altered or deleted
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Accountability
            </h3>
            <p className="text-sm text-gray-600">
              Hold AI systems accountable for their decisions and actions
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            See It in Action
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Try the sandbox and watch the ledger update in real-time
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
