'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, FileText, CheckCircle } from 'lucide-react';
import { useDemoStore } from '@/stores/demo-store';

export default function GovernancePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sessionId, messages } = useDemoStore();

  const ledgerEntries = messages.length;
  const userMessages = messages.filter((m) => m.role === 'user').length;

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="font-medium text-gray-900">Governance Panel</span>
          <div className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
            TRANSPARENT
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Intent */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Intent</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-mono text-xs">{sessionId}</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Policy: demo_default (ALLOW)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ledger */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Ledger</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {ledgerEntries} {ledgerEntries === 1 ? 'entry' : 'entries'} logged
                  </p>
                  <div className="space-y-2">
                    {messages.slice(-3).map((msg, idx) => (
                      <div
                        key={msg.id}
                        className="text-xs font-mono text-gray-600 bg-gray-50 px-3 py-2 rounded border border-gray-100"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                          <span className={msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
                            {msg.role.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-gray-700 truncate">
                          {msg.content.substring(0, 60)}...
                        </div>
                      </div>
                    ))}
                  </div>
                  {ledgerEntries > 3 && (
                    <div className="mt-2 text-xs text-gray-500">
                      + {ledgerEntries - 3} more entries
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{ledgerEntries}</div>
                <div className="text-xs text-gray-600">Total Entries</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{userMessages}</div>
                <div className="text-xs text-gray-600">User Messages</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-green-600">100%</div>
                <div className="text-xs text-gray-600">Logged</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Transparency in action:</strong> Every message in this demo is logged to an append-only ledger.
                In the full BlackRoad OS, this extends to all AI actions, decisions, and tool invocations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
