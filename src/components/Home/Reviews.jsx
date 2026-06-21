import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

const reviewsData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    content: "Absolutely love the quality! The shipping was incredibly fast and the customer service was extremely helpful when I had questions. Highly recommend!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    content: "I've ordered from many e-commerce sites, but the packaging and attention to detail here are next level. The products look exactly like the pictures.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    content: "Great prices and an amazing selection. I was looking for a specific item and found it here cheaper than anywhere else. Will definitely shop here again.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Reviews = () => {
  return (
    <div className="w-full py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">What Our Customers Say</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Don't just take our word for it. Read verified reviews from our happy customers around the world.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 mb-8 flex-grow leading-relaxed italic">"{review.content}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-shopcart-green/20" />
                <div>
                  <h4 className="font-bold text-slate-800">{review.name}</h4>
                  <p className="text-xs text-shopcart-green font-semibold uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
