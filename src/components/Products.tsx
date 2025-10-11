import { ExternalLink, HeartPulse, Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: 'Hospify',
    tagline: "India's Trusted Hospital Management System",
    description: 'A comprehensive digital platform that brings admissions, appointments, pharmacy, lab, and billing under one intuitive system. Built for modern healthcare facilities.',
    features: [
      'Smart Patient Records',
      'Doctor & Staff Scheduling',
      'Integrated Pharmacy & Lab',
      'Appointment Management',
      'Billing & Insurance'
    ],
    icon: HeartPulse,
    gradient: 'from-blue-500 to-indigo-600',
    link: '/products/hospify',
    badge: 'Healthcare',
    color: 'blue'
  },
  {
    name: 'Maidzy',
    tagline: 'Find Trusted Help for Your Daily Needs',
    description: 'Connect with verified and reliable household helpers for all your daily needs. From cooking and cleaning to baby sitting and elder care, Maidzy makes it easy to find the perfect help for your home.',
    features: [
      'Cooking & Meal Prep',
      'House Cleaning Services',
      'Baby Sitting & Child Care',
      'Elder Care & Assistance',
      'Verified & Background Checked'
    ],
    icon: Sparkles,
    gradient: 'from-emerald-500 to-teal-600',
    link: '/products/maidzy',
    badge: 'Home Services',
    color: 'emerald'
  },
  {
    name: 'TaskNex',
    tagline: 'Complete Project Management Platform',
    description: 'Comprehensive solution with issue tracking, sprint boards, time tracking, wiki, and cloud storage. Create issues from emails, manage multiple projects, and collaborate with native mobile apps.',
    features: [
      'Issue Tracking & Sprint Boards',
      'Email-to-Issue Creation',
      'Cloud Asset Storage',
      'Mobile Apps (iOS & Android)',
      'Time Tracking & Reporting'
    ],
    icon: Calendar,
    gradient: 'from-violet-500 to-purple-600',
    link: '/products/tasknex',
    badge: 'Project Management',
    color: 'violet'
  }
];

export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-4 shadow-lg animate-fade-in">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent mb-4">
            Innovative Solutions for Modern Business
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our suite of cutting-edge products designed to transform your business operations and drive growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.name}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`}></div>

                {/* Card content */}
                <div className="p-8">
                  {/* Icon and badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 bg-gradient-to-br ${product.gradient} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className={`px-3 py-1 bg-${product.color}-100 text-${product.color}-700 text-xs font-semibold rounded-full`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Product name and tagline */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <svg className={`w-4 h-4 mr-2 text-${product.color}-500`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <Link
                    to={product.link}
                    className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${product.gradient} text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse`}
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000 ease-out pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
