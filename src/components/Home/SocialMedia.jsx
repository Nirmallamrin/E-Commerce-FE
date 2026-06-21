import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';

const SocialMedia = () => {
  return (
    <div className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-shopcart-dark to-slate-900">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-shopcart-green blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Join Our Community</h2>
        <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Follow us on social media for exclusive drops, behind-the-scenes content, and styling inspiration.</p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-pink-600 transition-all duration-300 backdrop-blur-sm group shadow-lg border border-white/20 hover:scale-110">
            <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
          </a>
          <a href="#" className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-blue-400 transition-all duration-300 backdrop-blur-sm group shadow-lg border border-white/20 hover:scale-110">
            <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
          </a>
          <a href="#" className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm group shadow-lg border border-white/20 hover:scale-110">
            <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
          </a>
          <a href="#" className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 backdrop-blur-sm group shadow-lg border border-white/20 hover:scale-110">
            <FontAwesomeIcon icon={faTiktok} className="text-3xl" />
          </a>
        </div>
        
        <div className="mt-12 inline-block">
          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold tracking-widest uppercase border border-white/20">#ShopyStyle</span>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
