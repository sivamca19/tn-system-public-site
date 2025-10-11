import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                Chennai's Trusted IT Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Business with
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Innovative Technology</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              TNSystems delivers comprehensive IT consulting, SAP solutions, full-stack development, and strategic staffing services to drive your digital transformation forward.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">15+ Years of Industry Expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">100+ Successful Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">24/7 Dedicated Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 group font-semibold"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-semibold"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className="relative hidden md:block animate-slide-up">
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300 border border-purple-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500 transform hover:scale-105 transition-transform">
                  <span className="text-sm font-semibold text-gray-700">System Performance</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">99.9%</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-500 transform hover:scale-105 transition-transform">
                  <span className="text-sm font-semibold text-gray-700">Client Satisfaction</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100%</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-xl border-l-4 border-emerald-500 transform hover:scale-105 transition-transform">
                  <span className="text-sm font-semibold text-gray-700">Project Success Rate</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">99.9%</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
