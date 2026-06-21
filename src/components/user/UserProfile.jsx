import React from 'react';
import { UserIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";
import UserOrders from './UserOrders';

const UserProfile = () => {
  const userName = sessionStorage.getItem("userName") || "User";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-shopcart-dark to-slate-800 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{userName}</h2>
            </div>
            
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-slate-600">
                <UserIcon className="w-5 h-5 text-shopcart-green" />
                <span className="font-medium">{userName}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MailIcon className="w-5 h-5 text-shopcart-green" />
                <span className="font-medium text-sm">Add Email Address</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <PhoneIcon className="w-5 h-5 text-shopcart-green" />
                <span className="font-medium text-sm">Add Phone Number</span>
              </div>
            </div>
            
            <button className="w-full mt-8 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl border border-slate-200 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content - Orders */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 sm:p-6">
             <UserOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
