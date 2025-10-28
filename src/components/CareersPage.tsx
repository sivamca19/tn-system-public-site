import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Calendar, ArrowRight, Search, TrendingUp } from 'lucide-react';
import SEO from './SEO';
import { JOBS_API_URL } from '../config/env';

interface Job {
  id: number;
  title: string;
  description: string;
  excerpt?: string;
  date?: string;
  location?: string;
  job_type?: string;
  experience?: string;
  department?: string;
  slug?: string;
}

const JOBS_PER_PAGE = 9;

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchJobs = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(JOBS_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      const jobsArray = data.jobs || [];
      setJobs(jobsArray);
      setFilteredJobs(jobsArray);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.department?.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, jobs]);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getExcerpt = (description: string, length: number = 150): string => {
    const text = description.replace(/<[^>]*>/g, '').trim();
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    pages.push(1);

    if (showEllipsisStart) {
      pages.push('ellipsis-start');
    } else {
      for (let i = 2; i < Math.min(currentPage, 4); i++) {
        pages.push(i);
      }
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (showEllipsisEnd) {
      pages.push('ellipsis-end');
    } else {
      for (let i = Math.max(currentPage + 2, totalPages - 2); i < totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return (
      <nav className="flex justify-center items-center gap-2 mt-16" aria-label="Pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 rounded-xl bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 font-medium">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`min-w-[44px] px-4 py-3 rounded-xl font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 text-gray-700 hover:shadow-md'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 rounded-xl bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    );
  };

  return (
    <>
      <SEO
        title="Careers"
        description="Join our team at TNSystems. Explore exciting career opportunities and grow with us."
        canonicalUrl="https://tnsystems.in/careers"
        ogType="website"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Explore exciting opportunities and grow with a team that values innovation and excellence
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by job title, location, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all shadow-lg bg-white/90 backdrop-blur-sm text-lg text-gray-900 placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            {!loading && !error && (
              <div className="flex justify-center gap-8 mt-10 flex-wrap">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {jobs.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Open Positions</div>
                </div>
                {searchQuery && (
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {filteredJobs.length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Search Results</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-6 shadow-lg">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Failed to load jobs</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't fetch the job listings. Please try again.</p>
              <button
                onClick={fetchJobs}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mb-6">
                  <Search className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No results found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No openings at the moment</h3>
                <p className="text-gray-600">Check back soon for new opportunities!</p>
              </div>
            )
          ) : (
            <>
              {/* Jobs Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {currentJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/careers/${job.id}`}
                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                        {job.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {getExcerpt(job.description)}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      {job.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.job_type && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{job.job_type}</span>
                        </div>
                      )}
                      {job.experience && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span>{job.experience}</span>
                        </div>
                      )}
                    </div>

                    {job.date && (
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Posted on {formatDate(job.date)}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              <Pagination />
            </>
          )}
        </div>
      </div>
    </>
  );
}
