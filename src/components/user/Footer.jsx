import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section - Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-slate-800 mb-12 gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-slate-400">Get the latest updates on new products and upcoming sales.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 rounded-l-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-shopcart-green focus:border-transparent placeholder-slate-500"
            />
            <button className="px-6 py-3 bg-shopcart-green text-shopcart-dark font-bold rounded-r-xl hover:bg-shopcart-green/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-tighter text-white">Shopy<span className="text-shopcart-green">.</span></span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your ultimate destination for fashion, electronics, and lifestyle products. Quality guaranteed with every purchase.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-shopcart-green hover:text-shopcart-dark transition-colors">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-shopcart-green hover:text-shopcart-dark transition-colors">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-shopcart-green hover:text-shopcart-dark transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-shopcart-green hover:text-shopcart-dark transition-colors">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-shopcart-green transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-shopcart-green transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-shopcart-green transition-colors">Categories</Link></li>
              <li><Link to="/about-contact" className="hover:text-shopcart-green transition-colors">About Us</Link></li>
              <li><Link to="/about-contact" className="hover:text-shopcart-green transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/profile" className="hover:text-shopcart-green transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-shopcart-green transition-colors">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-shopcart-green transition-colors">Wishlist</Link></li>
              <li><Link to="/" className="hover:text-shopcart-green transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/" className="hover:text-shopcart-green transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <LocationMarkerIcon className="w-6 h-6 text-shopcart-green flex-shrink-0" />
                <span className="text-slate-400">123 Commerce Blvd, Tech District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-shopcart-green flex-shrink-0" />
                <span className="text-slate-400">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-shopcart-green flex-shrink-0" />
                <span className="text-slate-400">support@shopy.com</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Shopy E-Commerce. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Optional payment icons can go here */}
            <span className="text-slate-500 text-sm">Secure Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
