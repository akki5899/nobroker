import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
    'For Tenants': [
      { label: 'Rent in Mumbai', href: '/rent/mumbai' },
      { label: 'Rent in Delhi', href: '/rent/delhi' },
      { label: 'Rent in Bangalore', href: '/rent/bangalore' },
      { label: 'Rent in Hyderabad', href: '/rent/hyderabad' },
      { label: 'Rent in Chennai', href: '/rent/chennai' },
    ],
    'For Buyers': [
      { label: 'Buy in Mumbai', href: '/buy/mumbai' },
      { label: 'Buy in Delhi', href: '/buy/delhi' },
      { label: 'Buy in Bangalore', href: '/buy/bangalore' },
      { label: 'Buy in Hyderabad', href: '/buy/hyderabad' },
      { label: 'Buy in Chennai', href: '/buy/chennai' },
    ],
    'Services': [
      { label: 'Home Services', href: '/services' },
      { label: 'Packers & Movers', href: '/packers-movers' },
      { label: 'Rent Agreement', href: '/rent-agreement' },
      { label: 'Home Loans', href: '/home-loans' },
      { label: 'Property Management', href: '/property-management' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">PropDirect</span>
                <div className="text-xs text-gray-400 -mt-1">Discover Your Perfect Space</div>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Direct property marketplace connecting owners, tenants, buyers, and agents for residential & commercial properties.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-gray-400">support@propdirect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-gray-400">+91 9999999999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-gray-400">Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <div className="text-sm text-gray-400">
              Follow us for the latest updates and property news
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © 2024 PropDirect Technologies Pvt Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}