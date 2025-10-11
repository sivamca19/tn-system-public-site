import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-sky-50 via-cyan-100 to-blue-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-cyan-100 text-cyan-800 px-4 py-1 rounded-full text-sm font-medium">
                Chennai's Trusted IT Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Business with
              <span className="text-cyan-700"> Innovative Technology</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              TNSystems delivers comprehensive IT consulting, SAP solutions, full-stack development, and strategic staffing services to drive your digital transformation forward.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span className="text-gray-700">15+ Years of Industry Expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span className="text-gray-700">100+ Successful Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span className="text-gray-700">24/7 Dedicated Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-all hover:shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-cyan-600 hover:text-cyan-600 transition-colors"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">System Performance</span>
                  <span className="text-2xl font-bold text-blue-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Client Satisfaction</span>
                  <span className="text-2xl font-bold text-cyan-600">98%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Project Success Rate</span>
                  <span className="text-2xl font-bold text-sky-600">95%</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
