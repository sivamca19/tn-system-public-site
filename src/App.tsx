import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import CaseStudies from './components/CaseStudies';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import SinglePostPage from './components/SinglePostPage';

// Layout for the main single-page experience
const MainPage = () => (
  <main>
    <Hero />
    <About />
    <Services />
    <Products />
    <CaseStudies />
    <Blogs />
    <Contact />
  </main>
);

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SinglePostPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
