import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Clock, BarChart3, FileText, Calendar, Wallet, Shield, Database, Cloud, Lock } from 'lucide-react';
import SEO from './SEO';
import { useEffect } from 'react';
import { trackProductView, trackButtonClick, trackOutboundLink } from '../utils/analytics';

export default function FinshieldsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    trackProductView('Finshields');
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Request Demo', 'Finshields Page');
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <SEO
        title="Finshields - Your Financial Guardian"
        description="A comprehensive suite of financial tools to protect and grow your wealth. Track investments, manage budgets, and plan for your financial future with confidence."
        canonicalUrl="https://tnsystems.in/products/finshields"
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/products"
              className="text-emerald-600 hover:text-emerald-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
                  <ShieldCheck className="w-5 h-5" />
                  Financial Technology
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Finshields
                </h1>
                <p className="text-2xl text-emerald-600 font-semibold">
                  Your Financial Guardian
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    A comprehensive suite of financial tools to protect and grow your wealth. Track investments, manage budgets, and plan for your financial future with confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://finshields.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundLink('https://finshields.xyz/')}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-center"
                  >
                    Visit Finshields Website
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all font-semibold text-center"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 shadow-2xl">
                  <ShieldCheck className="w-24 h-24 text-white/90 mx-auto mb-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your finances effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Wallet,
                  title: 'Daily Expense Tracking',
                  description: 'Effortlessly track your daily spending with intuitive categorization and smart insights to help you stay on budget.',
                  color: 'emerald'
                },
                {
                  icon: Shield,
                  title: 'Family Vault & Legacy Sharing',
                  description: 'Securely store important financial information and automatically share with trusted family members after inactivity.',
                  color: 'emerald'
                },
                {
                  icon: Database,
                  title: 'Secure Bank & Investment Records',
                  description: 'Keep all your bank accounts, investment portfolios, and financial documents in one encrypted, organized place.',
                  color: 'emerald'
                },
                {
                  icon: Cloud,
                  title: 'Backup to Google Drive',
                  description: 'Automatic encrypted backups to your Google Drive ensure your data is always safe and accessible when you need it.',
                  color: 'emerald'
                },
                {
                  icon: Lock,
                  title: 'End-to-End Encryption',
                  description: 'Military-grade encryption ensures your sensitive financial data remains private and secure at all times.',
                  color: 'emerald'
                },
                {
                  icon: Users,
                  title: 'Multi-User Support',
                  description: 'Manage finances for your entire household with separate profiles and customizable sharing permissions.',
                  color: 'emerald'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-emerald-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
