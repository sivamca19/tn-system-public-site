import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, CheckCircle, Users, Clock, Shield, BarChart3, Calendar, FileText } from 'lucide-react';
import SEO from './SEO';
import { useEffect } from 'react';
import { trackProductView, trackButtonClick, trackOutboundLink } from '../utils/analytics';

export default function HospifyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    trackProductView('Hospify');
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Request Demo', 'Hospify Page');
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
        title="Hospify - Hospital Management System"
        description="India's trusted hospital management system. Comprehensive digital platform for admissions, appointments, pharmacy, lab, and billing management."
        canonicalUrl="https://tnsystems.in/products/hospify"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  <HeartPulse className="w-5 h-5" />
                  Healthcare Management
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Hospify
                </h1>
                <p className="text-2xl text-blue-600 font-semibold">
                  India's Trusted Hospital Management System
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A comprehensive digital platform that brings admissions, appointments, pharmacy, lab, and billing under one intuitive system. Built for modern healthcare facilities of all sizes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://www.hospify.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundLink('https://www.hospify.online/')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-center"
                  >
                    Visit Hospify Website
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-semibold text-center"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-2xl">
                  <HeartPulse className="w-24 h-24 text-white/90 mx-auto mb-4" />
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
                Everything you need to manage your healthcare facility efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Smart Patient Records',
                  description: 'Comprehensive digital patient records with history tracking, medical reports, and easy access for authorized staff.',
                  color: 'blue'
                },
                {
                  icon: Calendar,
                  title: 'Doctor & Staff Scheduling',
                  description: 'Intelligent scheduling system for doctors, nurses, and support staff with automated shift management.',
                  color: 'indigo'
                },
                {
                  icon: FileText,
                  title: 'Integrated Pharmacy & Lab',
                  description: 'Seamlessly manage pharmacy inventory, prescriptions, and lab test orders all in one place.',
                  color: 'blue'
                },
                {
                  icon: Clock,
                  title: 'Appointment Management',
                  description: 'Online appointment booking, automated reminders, and queue management for better patient experience.',
                  color: 'indigo'
                },
                {
                  icon: BarChart3,
                  title: 'Billing & Insurance',
                  description: 'Automated billing, insurance claim processing, and financial reporting to streamline revenue cycle.',
                  color: 'blue'
                },
                {
                  icon: Shield,
                  title: 'HIPAA Compliant',
                  description: 'Secure, encrypted data storage with role-based access control ensuring complete data privacy.',
                  color: 'indigo'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-blue-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Hospify?</h2>
              <div className="space-y-6">
                {[
                  'Reduce administrative workload by up to 60% with automated workflows',
                  'Improve patient satisfaction with faster check-ins and shorter wait times',
                  'Increase revenue with streamlined billing and reduced claim rejections',
                  'Ensure data security with bank-level encryption and regular backups',
                  'Scale effortlessly from small clinics to multi-specialty hospitals',
                  'Get 24/7 support from our dedicated healthcare IT specialists'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Pricing Plans</h2>
              <p className="text-lg text-gray-600">Choose the plan that fits your facility's needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Basic',
                  price: '₹1,999',
                  period: 'per month',
                  description: 'Perfect for small clinics',
                  features: ['Up to 50 patients/month', 'Basic patient records', 'Appointment scheduling', 'Email support']
                },
                {
                  name: 'Standard',
                  price: '₹3,999',
                  period: 'per month',
                  description: 'Ideal for growing hospitals',
                  features: ['Up to 200 patients/month', 'Advanced patient records', 'Pharmacy & lab integration', 'Priority support'],
                  popular: true
                },
                {
                  name: 'Professional',
                  price: '₹16,999',
                  period: 'per month',
                  description: 'For multi-specialty hospitals',
                  features: ['Unlimited patients', 'Full feature access', 'Custom integrations', '24/7 dedicated support']
                }
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                    plan.popular ? 'border-4 border-blue-500 relative' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://www.hospify.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(`Get Started - ${plan.name}`, 'Hospify Pricing')}
                    className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Facility?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of hospitals and clinics already using Hospify to deliver better patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.hospify.online/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Start Free Trial', 'Hospify CTA')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold"
              >
                Start Free Trial
              </a>
              <button
                onClick={() => {
                  trackButtonClick('Schedule a Demo', 'Hospify CTA');
                  scrollToContact();
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all font-semibold"
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
