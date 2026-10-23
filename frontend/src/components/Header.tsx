'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Home, User, LogOut, Plus, Menu, X, ChevronDown, Building, Heart, Bell, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: 'Buy', href: '/buy', hasDropdown: true },
    { label: 'Rent', href: '/rent', hasDropdown: true },
    { label: 'Sell', href: '/sell', hasDropdown: false },
    { label: 'Commercial', href: '/commercial', hasDropdown: true },
    { label: 'Plots/Land', href: '/plots-land', hasDropdown: false },
    { label: 'Projects', href: '/projects', hasDropdown: false },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Help', href: '/help', hasDropdown: false },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">PropDirect</span>
              <div className="text-xs text-gray-500 -mt-1">Discover Your Perfect Space</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link 
                  href={item.href} 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Post Property Button */}
                <Link 
                  href="/post-property" 
                  className="hidden md:flex bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors items-center space-x-2 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Post Property — Free</span>
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>

                {/* Favorites */}
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user?.full_name}</div>
                      <div className="text-xs text-gray-500">View Profile</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Building className="h-4 w-4" />
                        <span>My Properties</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                      <Link href="/favorites" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Heart className="h-4 w-4" />
                        <span>Saved Properties</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link 
                  href="/post-property" 
                  className="block mx-4 mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post Property
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}