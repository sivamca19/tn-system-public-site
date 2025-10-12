import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoDark from '../assets/logo-dark.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src={logoDark}
                alt="TNSystems Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Transforming businesses through innovative technology solutions. Your trusted IT partner in Chennai.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/topnotch-systems-chennai/" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              {/* <li>
                <button onClick={() => scrollToSection('case-studies')} className="hover:text-white transition-colors">
                  Case Studies
                </button>
              </li> */}
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>SAP Solutions</li>
              <li>Full-Stack Development</li>
              <li>IT Staffing</li>
              <li>IT Consulting</li>
              <li>Cloud Services</li>
              <li>Security & Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>2A Kalaimagal nagar, 3nd cross street, Ekkaduthangal, Chennai, Tamil Nadu 600032, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 63806 11236</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hr@tnsystems.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} TNSystems. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
