import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Learn about how TNSystems uses cookies and similar technologies on our website. Read our cookie policy for details."
        canonicalUrl="https://tnsystems.in/cookie-policy"
      />
      <div className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="text-cyan-600 hover:text-cyan-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <article className="prose prose-lg max-w-none">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
              <p className="text-gray-600 mb-8">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies help us understand how you use our website and improve your experience.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  TNSystems uses cookies for several purposes, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Enabling certain functions of the website</li>
                  <li>Providing analytics to improve our services</li>
                  <li>Storing your preferences and settings</li>
                  <li>Understanding how you interact with our content</li>
                  <li>Delivering personalized content and advertisements</li>
                  <li>Maintaining security and preventing fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3.1 Essential Cookies</h3>
                  <p className="text-gray-700 mb-4">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Examples:</strong> Session cookies, security cookies, load balancing cookies</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3.2 Performance and Analytics Cookies</h3>
                  <p className="text-gray-700 mb-4">
                    These cookies collect information about how visitors use our website, such as which pages are visited most often and if they receive error messages. This helps us improve the performance and user experience of our website.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Examples:</strong> Google Analytics, page load time tracking, error monitoring</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3.3 Functionality Cookies</h3>
                  <p className="text-gray-700 mb-4">
                    These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personalized features.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Examples:</strong> Language preferences, region settings, customized views</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3.4 Targeting and Advertising Cookies</h3>
                  <p className="text-gray-700 mb-4">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They also help limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Examples:</strong> Retargeting cookies, conversion tracking, interest-based advertising</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements. These third-party services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li><strong>Google Analytics:</strong> For website analytics and user behavior tracking</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and integration features</li>
                  <li><strong>Advertising Networks:</strong> For delivering targeted advertisements</li>
                  <li><strong>CDN Providers:</strong> For content delivery and performance optimization</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  These third parties have their own privacy policies, and we have no control over their cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
                <p className="text-gray-700 mb-4">
                  Cookies can be either "session" cookies or "persistent" cookies:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> These remain on your device for a set period of time or until you delete them. The duration varies depending on the purpose of the cookie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How to Control Cookies</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">
                    Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Opt-Out Tools</h3>
                  <p className="text-gray-700 mb-4">
                    You can also opt out of certain cookies using these resources:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 underline">www.networkadvertising.org</a></li>
                    <li>Digital Advertising Alliance: <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 underline">www.aboutads.info</a></li>
                    <li>European Interactive Digital Advertising Alliance: <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 underline">www.youronlinechoices.eu</a></li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track Signals</h2>
                <p className="text-gray-700 mb-4">
                  Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. How browsers communicate the DNT signal is not yet uniform, and we currently do not respond to DNT signals.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Cookie Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we use cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. More Information</h2>
                <p className="text-gray-700 mb-4">
                  For more information about how we handle your personal data, please see our{' '}
                  <Link to="/privacy-policy" className="text-cyan-600 hover:text-cyan-700 underline">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <ul className="list-none text-gray-700 space-y-2">
                  <li><strong>Email:</strong> privacy@tnsystems.in</li>
                  <li><strong>Phone:</strong> +91 44 1234 5678</li>
                  <li><strong>Address:</strong> 123 IT Corridor, Anna Nagar, Chennai 600040</li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
