import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, ChefHat, Home, Baby, Heart, Shield, Clock } from 'lucide-react';
import SEO from './SEO';

export default function MaidzyPage() {
  return (
    <>
      <SEO
        title="Maidzy - Find Trusted Help for Your Daily Needs"
        description="Connect with verified and reliable household helpers for cooking, cleaning, baby sitting, and elder care. Background-checked professionals for your home."
        canonicalUrl="https://tnsystems.in/products/maidzy"
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/"
              className="text-emerald-600 hover:text-emerald-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
                  <Sparkles className="w-5 h-5" />
                  Home Services Platform
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Maidzy
                </h1>
                <p className="text-2xl text-emerald-600 font-semibold">
                  Find Trusted Help for Your Daily Needs
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Connect with verified and reliable household helpers for all your daily needs. From cooking and cleaning to baby sitting and elder care, Maidzy makes it easy to find the perfect help for your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/#contact';
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-center"
                  >
                    Get Started Today
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/#contact';
                    }}
                    className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all font-semibold text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-2xl">
                  <Sparkles className="w-24 h-24 text-white/90 mx-auto mb-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional help for every household need
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ChefHat,
                  title: 'Cooking & Meal Prep',
                  description: 'Expert cooks who can prepare delicious, nutritious meals according to your preferences and dietary needs.',
                  color: 'emerald'
                },
                {
                  icon: Home,
                  title: 'House Cleaning',
                  description: 'Professional cleaners to keep your home spotless with regular or one-time deep cleaning services.',
                  color: 'teal'
                },
                {
                  icon: Baby,
                  title: 'Baby Sitting & Child Care',
                  description: 'Experienced and caring nannies to look after your little ones with love and attention.',
                  color: 'emerald'
                },
                {
                  icon: Heart,
                  title: 'Elder Care & Assistance',
                  description: 'Compassionate caregivers providing companionship and assistance for your elderly family members.',
                  color: 'teal'
                }
              ].map((service, index) => (
                <div
                  key={service.title}
                  className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-emerald-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Maidzy?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your safety and satisfaction are our top priorities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Verified & Background Checked',
                  description: 'All our helpers undergo thorough background verification and police checks for your peace of mind.'
                },
                {
                  icon: Clock,
                  title: 'Flexible Scheduling',
                  description: 'Book services on-demand or schedule recurring help based on your convenience and needs.'
                },
                {
                  icon: CheckCircle,
                  title: 'Quality Guaranteed',
                  description: 'Rated professionals with customer reviews to help you make the right choice for your family.'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600">Simple steps to find your perfect helper</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: '1',
                    title: 'Tell Us What You Need',
                    description: 'Select the type of service you need - cooking, cleaning, baby sitting, or elder care.'
                  },
                  {
                    step: '2',
                    title: 'Browse Verified Helpers',
                    description: 'View profiles, ratings, and reviews of background-checked professionals in your area.'
                  },
                  {
                    step: '3',
                    title: 'Schedule & Book',
                    description: 'Choose your preferred helper and schedule services based on your availability.'
                  },
                  {
                    step: '4',
                    title: 'Get Reliable Help',
                    description: 'Your trusted helper arrives on time and provides quality service for your home.'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">Trusted by families across Chennai</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Priya Sharma',
                  role: 'Working Mother',
                  text: 'Maidzy made it so easy to find a reliable nanny for my kids. The background check gave me complete peace of mind!'
                },
                {
                  name: 'Rajesh Kumar',
                  role: 'IT Professional',
                  text: 'Our cook from Maidzy is amazing! Healthy meals ready when we get home. Highly recommend!'
                },
                {
                  name: 'Meena Patel',
                  role: 'Retired Teacher',
                  text: 'The caregiver for my mother is so compassionate and professional. Thank you Maidzy!'
                }
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Helper?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Join thousands of happy families who trust Maidzy for their household needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold"
              >
                Download App
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
