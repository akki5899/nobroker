'use client';

import Link from 'next/link';
import { Plus, TrendingUp, Users, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function SellPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Direct Buyer Contact',
      description: 'Connect directly with genuine buyers without intermediaries'
    },
    {
      icon: TrendingUp,
      title: 'Best Market Price',
      description: 'Get the best value for your property with market insights'
    },
    {
      icon: Shield,
      title: 'Verified Buyers',
      description: 'All buyers are verified for genuine property inquiries'
    }
  ];

  const steps = [
    'Create your account and verify your identity',
    'Add property details, photos, and pricing',
    'Get your listing approved by our team',
    'Start receiving inquiries from interested buyers'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sell Your Property
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            List your property for free and connect directly with verified buyers. 
            No commission, no hidden charges.
          </p>
          <Link 
            href="/post-property" 
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Post Property — Free</span>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Sell with PropDirect?
            </h2>
            <p className="text-xl text-gray-600">
              Get the best value for your property with our direct marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to list your property and find buyers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Sell Your Property?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of property owners who have successfully sold their properties
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post-property" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Property
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}