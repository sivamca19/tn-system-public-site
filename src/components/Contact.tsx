import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { trackFormSubmit, trackContact, trackButtonClick } from '../utils/analytics';
import { CONTACT_FORM_API_URL } from '../config/env';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackButtonClick('Send Message', 'Contact Form');
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Map form fields to CF7 field names
      const cf7Data = {
        'your-name': formData.name,
        'your-email': formData.email,
        'your-phone-number': formData.phone,
        'your-company-name': formData.company,
        'your-service-interest': formData.service,
        'your-message': formData.message
      };

      const response = await fetch(CONTACT_FORM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cf7Data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'mail_sent') {
        // Success
        trackFormSubmit('Contact Form', true);
        trackContact('Contact Form');

        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        // CF7 validation error or other error
        const errorMessage = result.message || result.invalid_fields?.[0]?.message || 'Failed to send message. Please try again.';
        setSubmitError(errorMessage);
        trackFormSubmit('Contact Form', false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
      trackFormSubmit('Contact Form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">
            Ready to transform your business? Let's start a conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      TopNotch Systems<br />
                      2A Kalaimagal nagar, 3nd cross street,<br />
                      Ekkaduthangal, Chennai, Tamil Nadu 600032<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    {/* <p className="text-gray-600 text-sm">+91 44 4586 2134</p> */}
                    <p className="text-gray-600 text-sm">+91 63806 11236</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm">hr@tnsystems.in</p>
                    <p className="text-gray-600 text-sm">operations@tnsystems.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Business Hours</h3>
              <div className="space-y-2 text-blue-100">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
              <p className="mt-4 text-sm text-blue-200">
                24/7 emergency support available for enterprise clients
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-red-900 mb-1">Error</h4>
                        <p className="text-sm text-red-700">{submitError}</p>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a service</option>
                      <optgroup label="Products">
                        <option value="hospify">Hospify - Hospital Management System</option>
                        <option value="maidzy">Maidzy - Home Services Platform</option>
                        <option value="tasknex">TaskNex - Project Management Platform</option>
                        <option value="finshields">Finshields - Your Financial Guardian</option>
                        <option value="waitify">Waitify - Know Before You Go</option>
                      </optgroup>
                      <optgroup label="Services">
                        <option value="sap">SAP Solutions</option>
                        <option value="development">Full-Stack Development</option>
                        <option value="staffing">IT Staffing</option>
                        <option value="consulting">IT Consulting</option>
                        <option value="cloud">Cloud Services</option>
                        <option value="support">Security & Support</option>
                      </optgroup>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}