import { Link, useNavigate } from 'react-router-dom';
import { Clock, Map, Share2, BarChart2, Smile, TrendingUp } from 'lucide-react';
import SEO from './SEO';
import { useEffect } from 'react';
import { trackProductView, trackButtonClick, trackOutboundLink } from '../utils/analytics';

export default function WaitifyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    trackProductView('Waitify');
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Request Demo', 'Waitify Page');
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
        title="Waitify - Know Before You Go"
        description="A community-powered app that shows you real-time wait times and crowd levels at your favorite spots, so you can make smarter decisions about where to go."
        canonicalUrl="https://tnsystems.in/products/waitify"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/products"
              className="text-indigo-600 hover:text-indigo-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                  <Clock className="w-5 h-5" />
                  Social & Productivity
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Waitify
                </h1>
                <p className="text-2xl text-indigo-600 font-semibold">
                  Know Before You Go
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                A community-powered app that shows you real-time wait times and crowd levels at your favorite spots, so you can make smarter decisions about where to go.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://waitify.fun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundLink('https://waitify.fun/')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-center"
                  >
                    Visit Waitify Website
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all font-semibold text-center"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                  <Clock className="w-24 h-24 text-white/90 mx-auto mb-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">Works</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Five simple steps to stay informed and make smarter decisions about where to go
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Map,
                  title: 'Explore Nearby Spots',
                  description: 'Open the app to instantly see nearby registered locations in a map view or list view. Each spot shows live wait times, likes/dislikes, and recent user updates.',
                },
                {
                  icon: Share2,
                  title: 'Share Real-Time Updates',
                  description: 'At any location, you can add or update the current wait time, share short notes (like “crowded but quick”), or give a 👍/👎 to help others.',
                },
                {
                  icon: BarChart2,
                  title: 'Poll the Crowd',
                  description: 'Create a quick poll (e.g., “Is Café X busy now?”) or vote on existing ones. Results update instantly so everyone stays informed.',
                },
                {
                  icon: Smile,
                  title: 'Set Your Mood',
                  description: 'Express how you feel — 😎, 😍, 😴, 😡 — and others within a 10km radius will get notified. People nearby can react or +1 your mood to build local vibes.',
                },
                {
                  icon: TrendingUp,
                  title: 'Favorite & Track Trends',
                  description: 'Mark places as favorites to get updates automatically. View the Trending Dashboard to discover popular spots, moods, and polls around your area.',
                },
                {
                  icon: Clock,
                  title: 'Wait Time History',
                  description: 'Check historical wait time data to predict future busy times and plan your visits accordingly.',
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-indigo-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
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
