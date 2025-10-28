import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
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

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(JOBS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        // Get only the latest 4 jobs
        setJobs(data.jobs.slice(0, 4));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getExcerpt = (description: string, length: number = 150): string => {
    const text = description.replace(/<[^>]*>/g, '').trim();
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <section id="careers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Join Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Current Openings
          </h2>
          <p className="text-lg text-gray-600">
            Explore exciting career opportunities and grow with us
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No openings at the moment</h3>
            <p className="text-gray-600">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/careers/${job.id}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {getExcerpt(job.description)}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
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
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Posted on {formatDate(job.date)}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold group"
              >
                <span>View All Openings</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
