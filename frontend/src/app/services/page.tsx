'use client';

import { Wrench, Car, FileText, Home, Shield, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'home-services',
      title: 'Home Services',
      description: 'Professional home maintenance and repair services',
      icon: Wrench,
      color: 'bg-blue-500',
      features: ['Painting', 'Cleaning', 'Plumbing', 'Electrical', 'AC Repair'],
      price: 'Starting ₹299'
    },
    {
      id: 'packers-movers',
      title: 'Packers & Movers',
      description: 'Reliable and safe relocation services',
      icon: Car,
      color: 'bg-green-500',
      features: ['Local Moving', 'Intercity Moving', 'Packing', 'Insurance', 'Storage'],
      price: 'Starting ₹2,999'
    },
    {
      id: 'rent-agreement',
      title: 'Rent Agreement',
      description: 'Online rent agreement in just 4 hours',
      icon: FileText,
      color: 'bg-purple-500',
      features: ['Legal Compliance', 'Fast Processing', 'Digital Delivery', 'Expert Support'],
      price: 'Starting ₹99'
    },
    {
      id: 'home-loans',
      title: 'Home Loans',
      description: 'Get instant home loan approval',
      icon: Home,
      color: 'bg-orange-500',
      features: ['Quick Approval', 'Best Rates', 'Minimal Documentation', 'Expert Guidance'],
      price: 'Best Rates'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home Services & Solutions
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Complete home solutions for all your needs - from maintenance to moving
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Quick Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Rated 4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="text-lg font-semibold text-red-600 mb-4">{service.price}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full mt-6 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium">
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose NoBroker Services?
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by millions of customers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All service providers are background verified and trained</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick & Reliable</h3>
              <p className="text-gray-600">Fast service delivery with guaranteed quality</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Highly Rated</h3>
              <p className="text-gray-600">4.8/5 average rating from satisfied customers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}