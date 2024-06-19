import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-cyan-300 text-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">Shopy &copy; {new Date().getFullYear()}</p>
          </div>
          <nav className="flex gap-4 text-center md:text-left">
            <a href="#" className="text-sm hover:text-gray-400">Home</a>
            <a href="#" className="text-sm hover:text-gray-400">About Us</a>
            <a href="#" className="text-sm hover:text-gray-400">Products</a>
            <a href="#" className="text-sm hover:text-gray-400">Contact Us</a>
          </nav>
          <div className="flex gap-4 text-center md:text-left mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
