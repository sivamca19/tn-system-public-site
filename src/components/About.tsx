import { Target, Award, Users, TrendingUp } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '1000+', label: 'Projects Completed' },
    { icon: Target, value: '50+', label: 'Expert Team' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About TNSystems
          </h2>
          <p className="text-lg text-gray-600">
            Your trusted technology partner in Chennai, delivering excellence in IT solutions since 2008
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Driving Digital Transformation with Innovation & Expertise
            </h3>
            <p className="text-gray-600 leading-relaxed">
              TNSystems is a leading IT consulting and technology solutions company based in Chennai, specializing in delivering cutting-edge solutions that transform businesses. Our team of seasoned professionals combines deep technical expertise with strategic business insight to help organizations navigate the complexities of digital transformation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We pride ourselves on building long-term partnerships with our clients, understanding their unique challenges, and delivering tailored solutions that drive measurable results. From SAP implementations to custom software development, we're committed to your success.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Our Mission</h4>
                <p className="text-sm text-gray-600">Empower businesses through innovative technology solutions</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Our Vision</h4>
                <p className="text-sm text-gray-600">Be the most trusted IT partner for businesses across India</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 h-full">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <Icon className="h-8 w-8 text-blue-600 mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-3">Innovation</h4>
              <p className="text-blue-100">
                Leveraging the latest technologies and methodologies to deliver cutting-edge solutions
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">Expertise</h4>
              <p className="text-blue-100">
                Deep domain knowledge across multiple industries and technology stacks
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">Trust</h4>
              <p className="text-blue-100">
                Building lasting relationships through transparency, reliability, and consistent delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
