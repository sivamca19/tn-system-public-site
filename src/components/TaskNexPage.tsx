import { Link, useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, BarChart3, Users, Zap, Smartphone, Cloud, Mail, FolderTree, FileText, GitBranch, Clock, Shield, Search } from 'lucide-react';
import SEO from './SEO';

export default function TaskNexPage() {
  const navigate = useNavigate();

  const scrollToContact = () => {
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
        title="TaskNex - Complete Project Management Platform"
        description="Comprehensive project management with issue tracking, sprint boards, email-to-issue, cloud storage, time tracking, wiki, and native mobile apps. Perfect for software teams and IT departments."
        canonicalUrl="https://tnsystems.in/products/tasknex"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/"
              className="text-violet-600 hover:text-violet-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-violet-100 text-violet-800 px-4 py-2 rounded-full font-semibold">
                  <Calendar className="w-5 h-5" />
                  Project Management
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  TaskNex
                </h1>
                <p className="text-2xl text-violet-600 font-semibold">
                  Complete Project Management Platform
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Comprehensive project management solution with issue tracking, sprint boards, time tracking, wiki, and cloud storage. Create issues from emails, manage multiple projects, and collaborate seamlessly with native mobile apps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-center"
                  >
                    Start Free Trial
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-xl hover:bg-violet-50 transition-all font-semibold text-center"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                  <Calendar className="w-24 h-24 text-white/90 mx-auto mb-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything your team needs to stay organized and productive
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: 'Issue Tracking & Management',
                  description: 'Complete issue lifecycle management with custom fields, workflows, and status tracking. Multiple project support.',
                  color: 'violet'
                },
                {
                  icon: Zap,
                  title: 'Agile Sprint Boards',
                  description: 'Visual Scrum and Kanban boards with drag-and-drop. Track velocity, burndown charts, and sprint planning.',
                  color: 'purple'
                },
                {
                  icon: Mail,
                  title: 'Email-to-Issue Creation',
                  description: 'Automatically create and update issues directly from your email inbox. No manual data entry needed.',
                  color: 'violet'
                },
                {
                  icon: Cloud,
                  title: 'Cloud Asset Storage',
                  description: 'Store documents, images, and files in the cloud. Version control and easy sharing across projects.',
                  color: 'purple'
                },
                {
                  icon: Smartphone,
                  title: 'Native Mobile Apps',
                  description: 'Full-featured iOS and Android apps. Manage issues, track time, and collaborate from anywhere.',
                  color: 'violet'
                },
                {
                  icon: Clock,
                  title: 'Time Tracking & Reports',
                  description: 'Built-in time logging, timesheet management, and detailed reports for billing and productivity analysis.',
                  color: 'purple'
                },
                {
                  icon: FolderTree,
                  title: 'Multi-Project Support',
                  description: 'Manage multiple projects with role-based access control, cross-project reporting, and sub-projects.',
                  color: 'violet'
                },
                {
                  icon: GitBranch,
                  title: 'Version Control Integration',
                  description: 'Connect with Git, SVN, and other repositories. Link commits to issues and track code changes.',
                  color: 'purple'
                },
                {
                  icon: Search,
                  title: 'Wiki & Documentation',
                  description: 'Built-in wiki for project documentation. Version history, attachments, and powerful search capabilities.',
                  color: 'violet'
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  description: 'Forums, comments, mentions, and real-time notifications. Keep everyone in sync across time zones.',
                  color: 'purple'
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Reporting & Analytics',
                  description: 'Customizable reports, Gantt charts, calendar views, and real-time analytics dashboards.',
                  color: 'violet'
                },
                {
                  icon: Shield,
                  title: 'Role-Based Security',
                  description: 'Granular permissions system with custom roles. LDAP/Active Directory integration and audit logs.',
                  color: 'purple'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-white to-violet-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-violet-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
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
        <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Teams Love TaskNex</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Track thousands of issues across multiple projects with ease',
                  'Create issues instantly from email - no context switching',
                  'Visualize workflows with agile sprint boards and Gantt charts',
                  'Store unlimited files and documents in secure cloud storage',
                  'Access full project management features on mobile devices',
                  'Integrate with Git, SVN, and popular development tools',
                  'Generate detailed time and cost reports automatically',
                  'Customize workflows, fields, and permissions for your needs'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For Every Team</h2>
              <p className="text-lg text-gray-600">From startups to enterprises</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Software Development',
                  description: 'Issue tracking, sprint boards, version control integration, code review workflows, and release management.',
                  icon: '💻'
                },
                {
                  title: 'IT & Support Teams',
                  description: 'Ticket management, SLA tracking, time logging, asset management, and service desk operations.',
                  icon: '🔧'
                },
                {
                  title: 'Project Management',
                  description: 'Multi-project portfolios, resource planning, Gantt charts, time tracking, and comprehensive reporting.',
                  icon: '📊'
                }
              ].map((useCase) => (
                <div key={useCase.title} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Project Management?
            </h2>
            <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
              Join thousands of teams already using TaskNex to deliver projects faster and more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-white text-violet-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold"
              >
                Start Free Trial
              </button>
              <button
                onClick={scrollToContact}
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
