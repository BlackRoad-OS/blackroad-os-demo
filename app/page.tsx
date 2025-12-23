import Link from 'next/link';
import { Play, Shield, FileText, Lock } from 'lucide-react';

export default function DemoHome() {
  const experiences = [
    {
      title: 'Meet Lucidia',
      description: 'First conversation with transparent AI',
      duration: '5 min',
      icon: '👋',
      href: '/experiences/meet-lucidia',
    },
    {
      title: 'Research Assistant',
      description: 'See web search and synthesis in action',
      duration: '5 min',
      icon: '🔍',
      href: '/experiences/research',
    },
    {
      title: 'Writing Partner',
      description: 'Creative collaboration with AI',
      duration: '5 min',
      icon: '✍️',
      href: '/experiences/writing',
    },
    {
      title: 'Code Helper',
      description: 'Programming assistance',
      duration: '5 min',
      icon: '💻',
      href: '/experiences/code',
    },
  ];

  const governanceFeatures = [
    {
      title: 'Ledger Demo',
      description: 'Every action logged',
      icon: FileText,
      href: '/features/ledger',
    },
    {
      title: 'Intents Demo',
      description: 'How intents work',
      icon: Shield,
      href: '/features/intents',
    },
    {
      title: 'Delegation Demo',
      description: 'Permission system',
      icon: Lock,
      href: '/features/delegation',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            BlackRoad <span className="text-green-600">OS</span> Demo
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="https://blackroad.io"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="https://docs.blackroad.io"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Docs
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-semibold text-gray-900 mb-6">
              Experience BlackRoad OS
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Try transparent AI collaboration — no signup needed
            </p>
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors"
            >
              <Play className="h-6 w-6" />
              Start Sandbox
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              or choose a guided experience below
            </p>
          </div>
        </section>

        {/* Guided Experiences */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">
              Choose Your Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((exp) => (
                <Link
                  key={exp.title}
                  href={exp.href}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-600 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{exp.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{exp.description}</p>
                  <div className="text-xs text-gray-500">{exp.duration}</div>
                  <div className="mt-4 text-sm font-medium text-green-600">
                    Try →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-semibold text-gray-900 text-center mb-4">
              See Governance in Action
            </h3>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Every action is logged. Every decision is traceable. See it for yourself.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {governanceFeatures.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-green-600 hover:shadow-lg transition-all text-center"
                >
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm font-medium text-green-600">
                    Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-semibold text-gray-900 mb-6">
              Ready for the full experience?
            </h3>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors"
            >
              Create Free Account →
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} BlackRoad OS, Inc. |{' '}
          <Link href="https://blackroad.io" className="hover:text-gray-900">
            About
          </Link>
          {' | '}
          <Link href="https://docs.blackroad.io" className="hover:text-gray-900">
            Documentation
          </Link>
          {' | '}
          <Link href="/legal/privacy" className="hover:text-gray-900">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
