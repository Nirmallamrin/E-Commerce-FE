import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const faqsData = [
  {
    id: 1,
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be in their original condition."
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days. We also offer expedited shipping options (1-2 business days) at checkout. International shipping may take 7-14 business days depending on the destination."
  },
  {
    id: 3,
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. You can view the exact shipping rates for your country at checkout."
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package directly on our website or through the carrier's tracking portal."
  }
];

const Faqs = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">Got questions? We've got answers.</p>
        </div>
        
        <div className="space-y-4">
          {faqsData.map((faq) => (
            <div 
              key={faq.id} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openId === faq.id ? 'border-shopcart-green shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-slate-800 text-lg">{faq.question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-shopcart-green transition-transform duration-300 ${openId === faq.id ? 'transform rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
