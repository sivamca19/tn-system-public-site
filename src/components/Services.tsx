import { Database, Code, Users, Lightbulb, Cloud, Shield } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Database,
      title: 'SAP Solutions',
      description: 'End-to-end SAP implementation, customization, and support services. We help businesses optimize their operations with tailored SAP solutions.',
      features: ['SAP S/4HANA', 'SAP FICO', 'SAP MM', 'SAP SD', 'Custom Modules']
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Custom web and mobile applications built with modern technologies. From concept to deployment, we deliver scalable, high-performance solutions.',
      features: ['React & Angular', 'Node.js & Python', 'Mobile Apps', 'API Development', 'Cloud Native']
    },
    {
      icon: Users,
      title: 'IT Staffing',
      description: 'Strategic IT staffing solutions to scale your team with top talent. We connect you with skilled professionals who fit your technical and cultural requirements.',
      features: ['Contract Staffing', 'Permanent Placement', 'Team Augmentation', 'Specialized Roles', 'Quick Turnaround']
    },
    {
      icon: Lightbulb,
      title: 'IT Consulting',
      description: 'Expert guidance on technology strategy, digital transformation, and IT infrastructure. We help you make informed decisions that drive business growth.',
      features: ['Digital Strategy', 'Tech Assessment', 'Architecture Design', 'Process Optimization', 'Change Management']
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description: 'Comprehensive cloud solutions including migration, optimization, and management. Harness the power of AWS, Azure, and Google Cloud.',
      features: ['Cloud Migration', 'DevOps', 'Infrastructure Management', 'Cost Optimization', 'Security & Compliance']
    },
    {
      icon: Shield,
      title: 'Security & Support',
      description: '24/7 monitoring, maintenance, and security services to keep your systems running smoothly and securely. Proactive support you can rely on.',
      features: ['Security Audits', 'Monitoring', 'Incident Response', 'Backup & Recovery', 'Maintenance']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Don't see what you're looking for? We offer custom solutions for unique business challenges.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
