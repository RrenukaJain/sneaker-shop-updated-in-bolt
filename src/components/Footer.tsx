import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">SneakerSpot</h3>
            <p className="text-sm">Your premier destination for authentic sneakers and streetwear culture.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-white">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-white">Shipping Info</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-white">Terms of Service</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-white">Return Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {currentYear} SneakerSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}