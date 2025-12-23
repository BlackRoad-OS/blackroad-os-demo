import DemoChat from '@/components/demo/DemoChat';
import GovernancePanel from '@/components/demo/GovernancePanel';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SandboxPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Demo Home
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">
              BlackRoad <span className="text-green-600">OS</span> Demo
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-800"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Full App →
            </Link>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <DemoChat />
        <GovernancePanel />
      </div>
    </div>
  );
}
