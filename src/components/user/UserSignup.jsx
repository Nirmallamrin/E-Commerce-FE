import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MailIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline";

const userSchema = yup.object({
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function UserSignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${window.API_URL}/users/signup`, data);

      if (res.data.message === "Signed Successfully!") {
        sessionStorage.setItem("userToken", res.data.token);
        sessionStorage.setItem("userName", res.data.userName || data.userName);
        toast.success("Successfully signed up");
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
      toast.error(error.response?.data || "Error creating account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-shopcart-dark to-slate-900 py-10 px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-shopcart-green rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Join Shopy</h2>
            <p className="text-slate-300 font-medium text-sm">Create your account to unlock exclusive deals and fast checkout.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Username Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("userName")}
                  type="text"
                  placeholder="johndoe123"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.userName ? 'border-red-400 focus:ring-red-500' : 'border-slate-200 focus:border-shopcart-green focus:ring-shopcart-green'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                />
              </div>
              {errors.userName && <p className="mt-1 text-sm text-red-500 font-medium">{errors.userName.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-slate-200 focus:border-shopcart-green focus:ring-shopcart-green'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.password ? 'border-red-400 focus:ring-red-500' : 'border-slate-200 focus:border-shopcart-green focus:ring-shopcart-green'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500 font-medium">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center mt-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-shopcart-dark hover:bg-shopcart-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shopcart-green transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm font-medium text-slate-600">
              Already have an account?{" "}
              <Link to="/users/signin" className="text-shopcart-green font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
