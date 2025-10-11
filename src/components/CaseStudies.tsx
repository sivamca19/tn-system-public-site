import { ArrowRight, TrendingUp } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      company: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
      challenge: 'Legacy ERP system causing operational inefficiencies and data silos',
      solution: 'Implemented SAP S/4HANA with custom modules for inventory and supply chain management',
      results: [
        '40% reduction in operational costs',
        '60% faster order processing',
        '95% improvement in inventory accuracy',
        'Real-time visibility across operations'
      ],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      company: 'FinTech Innovations Ltd',
      industry: 'Financial Services',
      challenge: 'Need for a scalable, secure platform to handle growing customer base',
      solution: 'Built a cloud-native microservices architecture with React frontend and Node.js backend',
      results: [
        '10x increase in transaction capacity',
        '99.99% system uptime',
        '50% reduction in infrastructure costs',
        'Seamless mobile experience'
      ],
      color: 'from-emerald-600 to-teal-600'
    },
    {
      company: 'Healthcare Plus Network',
      industry: 'Healthcare',
      challenge: 'Fragmented patient data across multiple systems and compliance requirements',
      solution: 'Developed integrated healthcare management system with HIPAA-compliant cloud infrastructure',
      results: [
        '80% faster patient data retrieval',
        '100% compliance achievement',
        '35% improvement in patient care',
        'Reduced administrative burden'
      ],
      color: 'from-violet-600 to-purple-600'
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            Real results for real businesses. See how we've helped organizations achieve their goals.
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div className={`md:col-span-2 bg-gradient-to-br ${study.color} p-8 md:p-10 text-white flex flex-col justify-between`}>
                  <div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-4">
                      {study.industry}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{study.company}</h3>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2 text-white/80">Challenge</h4>
                      <p className="text-white/90 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-white/80">Solution</h4>
                      <p className="text-white/90 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <TrendingUp className="h-12 w-12 text-white/30" />
                  </div>
                </div>

                <div className="md:col-span-3 p-8 md:p-10">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Key Results</h4>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{result}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 group">
                      <span>Read Full Case Study</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their businesses with TNSystems. Let's discuss how we can help you achieve similar results.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Start Your Transformation
          </button>
        </div>
      </div>
    </section>
  );
}
