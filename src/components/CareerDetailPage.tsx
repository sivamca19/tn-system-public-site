import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Building2,
  Users,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
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
  salary_range?: string;
  positions?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  slug?: string;
}

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Application form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cover_letter: '',
    resume_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${JOBS_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getExcerpt = (description: string, length: number = 200): string => {
    const text = description.replace(/<[^>]*>/g, '').trim();
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${JOBS_API_URL.replace('/listings', '')}/apply_job/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', cover_letter: '', resume_url: '' });

        // Scroll to success message
        setTimeout(() => {
          const element = document.getElementById('apply-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        const errorMessage = result.message || 'Failed to submit application. Please try again.';
        setSubmitError(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-28"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Job Not Found</h3>
            <p className="text-gray-600 mb-8">The job listing you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to All Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={job.title}
        description={getExcerpt(job.description)}
        canonicalUrl={`https://tnsystems.in/careers/${job.id}`}
        ogType="article"
      />

      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to All Jobs</span>
            </Link>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  {job.location && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.job_type && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4" />
                      <span>{job.job_type}</span>
                    </div>
                  )}
                  {job.experience && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  )}
                  {job.department && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <Building2 className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  {job.salary_range && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary_range}</span>
                    </div>
                  )}
                  {job.positions && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.positions} position(s)</span>
                    </div>
                  )}
                  {job.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Posted on {formatDate(job.date)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-12">
                {/* Job Description */}
                {job.description && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      Job Description
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>
                )}

                {/* Responsibilities */}
                {job.responsibilities && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      Key Responsibilities
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                    />
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      Requirements
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: job.requirements }}
                    />
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      Benefits & Perks
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: job.benefits }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Apply Section */}
            <div id="apply-section" className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Apply for this Position
                  </h2>
                  <p className="text-lg text-gray-600">
                    Submit your application and we'll get back to you soon
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest. We've received your application and will review it carefully.
                      We'll get back to you within 3-5 business days.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <>
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-red-900 mb-1">Error</h4>
                          <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name and Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Resume URL */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Resume URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            name="resume_url"
                            value={formData.resume_url}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                            placeholder="https://drive.google.com/file/d/..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Upload your resume to Google Drive, Dropbox, or similar and paste the shareable link here
                        </p>
                      </div>

                      {/* Cover Letter */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Cover Letter <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="cover_letter"
                          value={formData.cover_letter}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none text-gray-900"
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Minimum 50 characters
                        </p>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] font-semibold flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
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
      </div>
    </>
  );
}
