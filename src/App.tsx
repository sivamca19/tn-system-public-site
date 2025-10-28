import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
// import CaseStudies from './components/CaseStudies';
import Careers from './components/Careers';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import SinglePostPage from './components/SinglePostPage';
import CareersPage from './components/CareersPage';
import CareerDetailPage from './components/CareerDetailPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import HospifyPage from './components/HospifyPage';
import MaidzyPage from './components/MaidzyPage';
import TaskNexPage from './components/TaskNexPage';
import SEO from './components/SEO';
import usePageTracking from './hooks/usePageTracking';
import { initGA } from './utils/analytics';
import { GA_MEASUREMENT_ID, FEATURES } from './config/env';

// Layout for the main single-page experience
const MainPage = () => (
  <main>
    <SEO
      title="Innovative IT Solutions & Staffing"
      description="TNSystems delivers comprehensive IT consulting, SAP solutions, full-stack development, and strategic staffing services to drive your digital transformation forward."
    />
    <Hero />
    <About />
    <Services />
    <Products />
    {/* <CaseStudies /> */}
    <Careers />
    <Blogs />
    <Contact />
  </main>
);

function App() {
  // Initialize Google Analytics 4 with react-ga4
  // GA Measurement ID is configured in .env file
  useEffect(() => {
    if (FEATURES.analytics && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      initGA(GA_MEASUREMENT_ID);
    }
  }, []);

  // Track page views automatically on route changes
  usePageTracking();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TNSystems",
    "url": "https://tnsystems.in/", // Replace with your actual domain
    "logo": "https://tnsystems.in/logo.png", // Replace with your actual logo URL
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXX-XXX-XXXX", // Replace with your actual phone number
      "contactType": "customer service"
    }
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SinglePostPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<CareerDetailPage />} />
        <Route path="/products/hospify" element={<HospifyPage />} />
        <Route path="/products/maidzy" element={<MaidzyPage />} />
        <Route path="/products/tasknex" element={<TaskNexPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
