import { useRef } from 'react';
import { GlassCard, GlassButton, GlassInput } from '../components/glass';
import { useStaggerAnimation, useScrollReveal } from '../hooks';
import { Search, Bell, Settings, Zap, Globe, Shield } from 'lucide-react';

export default function GlassShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useScrollReveal({ animation: 'slide-up' });

  useStaggerAnimation(containerRef, {
    animation: 'slide-up',
    stagger: 150,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 p-6 lg:p-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            Apple Glass Design System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern glassmorphism components with smooth animations inspired by Apple's design language
          </p>
        </div>

        {/* Hero Card */}
        <GlassCard
          elevated
          animation="scale-in"
          className="mb-16 p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Experience the Future
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Beautifully crafted components with glassmorphic effects, smooth transitions, and delightful interactions. Perfect for modern web applications.
              </p>
              <div className="flex gap-4">
                <GlassButton variant="primary">Get Started</GlassButton>
                <GlassButton variant="outline">Learn More</GlassButton>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
                <div className="absolute inset-0 glass-base flex items-center justify-center">
                  <Zap className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Search and Input Section */}
        <div className="mb-16" ref={containerRef}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white" data-stagger>
            Components
          </h2>

          <div className="space-y-4 mb-8" data-stagger>
            <GlassInput
              placeholder="Search anything..."
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Reach',
                description: 'Connect with users worldwide with seamless performance',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Secure Design',
                description: 'Enterprise-grade security and privacy built-in',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                description: 'Optimized for speed and smooth interactions',
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: 'Smart Alerts',
                description: 'Intelligent notifications that never feel intrusive',
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: 'Customizable',
                description: 'Fully themeable and adaptable to your brand',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Performance',
                description: 'Built for speed with minimal bundle size',
              },
            ].map((feature, index) => (
              <GlassCard
                key={index}
                animation="slide-up"
                delay={index * 100}
                className="p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-blue-600 dark:text-blue-400 mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16" ref={featuresRef}>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Why Choose Glass Design?
          </h2>

          <div className="space-y-6">
            {[
              {
                number: '01',
                title: 'Modern Aesthetics',
                description: 'Clean, minimalist design that looks stunning on any device',
              },
              {
                number: '02',
                title: 'Smooth Animations',
                description: 'Carefully crafted transitions that feel natural and responsive',
              },
              {
                number: '03',
                title: 'Accessibility First',
                description: 'WCAG compliant components that work for everyone',
              },
              {
                number: '04',
                title: 'Dark Mode Support',
                description: 'Perfect light and dark variants for all times of day',
              },
            ].map((item, index) => (
              <GlassCard
                key={index}
                animation="slide-up"
                delay={index * 100}
                className="p-6 flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {item.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <GlassCard
          elevated
          animation="slide-up"
          className="p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Start using our glass components today and create beautiful, modern applications with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassButton variant="primary" size="lg">
              Start Building
            </GlassButton>
            <GlassButton variant="secondary" size="lg">
              View Documentation
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
