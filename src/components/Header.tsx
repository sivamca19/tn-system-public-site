import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { trackButtonClick } from '../utils/analytics';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // Triggers when the middle of the section is in the middle of the viewport
    );

    const sections = document.querySelectorAll('main section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]); // Rerun when path changes

  const scrollToSection = (id: string) => {
    trackButtonClick(`Nav ${id}`, 'Header');
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
    setIsMenuOpen(false);
  };

  const navLinkClasses = (id: string) => {
    return `text-gray-700 hover:text-cyan-600 transition-colors ${
      activeSection === id && location.pathname === '/' ? 'text-cyan-600 font-bold' : ''
    }`;
  };

  const mobileNavLinkClasses = (id: string) => {
    return `block w-full text-left py-2 transition-colors ${
      activeSection === id && location.pathname === '/' ? 'text-cyan-600 font-bold' : 'text-gray-700 hover:text-cyan-600'
    }`;
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img
              src={logo}
              alt="TNSystems Logo"
              className="h-10 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className={navLinkClasses('about')}>
              About
            </button>
            <button onClick={() => scrollToSection('services')} className={navLinkClasses('services')}>
              Services
            </button>
            <button onClick={() => scrollToSection('products')} className={navLinkClasses('products')}>
              Products
            </button>
            {/* <button onClick={() => scrollToSection('case-studies')} className={navLinkClasses('case-studies')}>
              Case Studies
            </button> */}
            <button onClick={() => scrollToSection('careers')} className={navLinkClasses('careers')}>
              Careers
            </button>
            <button onClick={() => scrollToSection('blogs')} className={navLinkClasses('blogs')}>
              Blogs
            </button>
            <button onClick={() => scrollToSection('contact')} className={navLinkClasses('contact')}>
              Contact Us
            </button>
          </div>

          <button
            className="md:hidden text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button onClick={() => scrollToSection('about')} className={mobileNavLinkClasses('about')}>
              About
            </button>
            <button onClick={() => scrollToSection('services')} className={mobileNavLinkClasses('services')}>
              Services
            </button>
            <button onClick={() => scrollToSection('products')} className={mobileNavLinkClasses('products')}>
              Products
            </button>
            {/* <button onClick={() => scrollToSection('case-studies')} className={mobileNavLinkClasses('case-studies')}>
              Case Studies
            </button> */}
            <button onClick={() => scrollToSection('careers')} className={mobileNavLinkClasses('careers')}>
              Careers
            </button>
            <button onClick={() => scrollToSection('blogs')} className={mobileNavLinkClasses('blogs')}>
              Blogs
            </button>
            <button onClick={() => scrollToSection('contact')} className={mobileNavLinkClasses('contact')}>
              Contact Us
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
