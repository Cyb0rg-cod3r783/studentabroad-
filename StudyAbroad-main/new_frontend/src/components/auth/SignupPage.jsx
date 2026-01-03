import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image (Different from Login) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#4353FF] text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1B4B] to-[#4353FF]/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="University campus"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 flex flex-col justify-between h-full p-16">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <span className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">🎓</span>
                        Study Abroad Final Boss
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold">Start your journey to a world-class education today.</h2>
                        <div className="space-y-4">
                            {['Personalized university recommendations', 'Exclusive scholarship opportunities', 'Step-by-step visa guidance'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-1 bg-green-400 rounded-full text-[#1A1B4B]"><CheckCircle size={14} /></div>
                                    <span className="font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm opacity-60">
                        © 2026 Study Abroad Final Boss. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-[#1A1B4B] mb-2">Create Account 🚀</h1>
                        <p className="text-gray-500">Join thousands of students achieving their dreams.</p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] transition-all"
                                    placeholder="John Doe"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] transition-all"
                                    placeholder="name@example.com"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] transition-all"
                                    placeholder="Create a strong password"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters long.</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#4353FF] focus:ring-[#4353FF]" />
                            <span className="text-sm text-gray-600">
                                I agree to the <a href="#" className="text-[#4353FF] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#4353FF] font-semibold hover:underline">Privacy Policy</a>.
                            </span>
                        </div>

                        <button className="w-full bg-[#4353FF] text-white py-3.5 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                            Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or sign up with</span></div>
                    </div>

                    <button className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Sign up with Google
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?
                        <Link to="/login" className="font-bold text-[#1A1B4B] ml-1 hover:underline">Sign In</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default SignupPage;
