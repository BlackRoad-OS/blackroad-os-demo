'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, User, Users, Building2 } from 'lucide-react';

export default function DelegationDemoPage() {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const delegationLevels = [
    {
      id: 0,
      level: 'Personal',
      icon: User,
      description: 'Individual user with personal workspace',
      permissions: [
        { name: 'Read own data', allowed: true },
        { name: 'Write to workspace', allowed: true },
        { name: 'Web search', allowed: true },
        { name: 'File operations', allowed: false },
        { name: 'Admin functions', allowed: false },
      ],
      color: 'blue',
    },
    {
      id: 1,
      level: 'Team',
      icon: Users,
      description: 'Team workspace with shared resources',
      permissions: [
        { name: 'Read team data', allowed: true },
        { name: 'Write to team workspace', allowed: true },
        { name: 'Web search', allowed: true },
        { name: 'File operations (team)', allowed: true },
        { name: 'Admin functions', allowed: false },
      ],
      color: 'green',
    },
    {
      id: 2,
      level: 'Enterprise',
      icon: Building2,
      description: 'Enterprise deployment with full control',
      permissions: [
        { name: 'Read all data', allowed: true },
        { name: 'Write to any workspace', allowed: true },
        { name: 'Web search', allowed: true },
        { name: 'File operations (all)', allowed: true },
        { name: 'Admin functions', allowed: true },
      ],
      color: 'purple',
    },
  ];

  const currentLevel = delegationLevels[selectedLevel];
  const Icon = currentLevel.icon;

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
            Delegation Demo
          </h1>
          <p className="text-lg text-gray-600">
            Granular permission control for AI actions
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            How Delegation Works
          </h2>
          <p className="text-sm text-blue-800 mb-4">
            Delegation lets you control exactly what the AI can do. Set permissions at the
            individual, team, or enterprise level. Every action requires explicit delegation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">Principle of Least Privilege</div>
              <div className="text-blue-700">AI gets minimum permissions needed</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">Explicit Delegation</div>
              <div className="text-blue-700">Every permission must be granted</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">Auditable Changes</div>
              <div className="text-blue-700">All permission changes logged</div>
            </div>
          </div>
        </div>

        {/* Level Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Delegation Level:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {delegationLevels.map((level) => {
              const LevelIcon = level.icon;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedLevel === level.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <LevelIcon className="h-5 w-5 text-gray-700" />
                    <div className="font-medium text-gray-900">{level.level}</div>
                  </div>
                  <div className="text-sm text-gray-600">{level.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 text-${currentLevel.color}-600`} />
              <div>
                <h3 className="font-semibold text-gray-900">{currentLevel.level} Permissions</h3>
                <p className="text-sm text-gray-600">{currentLevel.description}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentLevel.permissions.map((permission, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      permission.allowed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {permission.name}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    permission.allowed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {permission.allowed ? 'Allowed' : 'Denied'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delegation Flow */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-4">
            How AI Asks for Permission
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">AI Detects Action Need</div>
                <div className="text-sm text-gray-600">
                  "I need to search the web to answer this question"
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Check Delegation</div>
                <div className="text-sm text-gray-600">
                  Verify if user has granted web_search permission
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 flex items-start gap-3">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Ask or Execute</div>
                <div className="text-sm text-gray-600">
                  If not delegated: ask user. If delegated: execute and log.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Take Control
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Set your own permissions and experience AI that respects boundaries
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
