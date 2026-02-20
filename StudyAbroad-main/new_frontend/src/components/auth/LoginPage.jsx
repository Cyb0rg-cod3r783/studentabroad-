import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await authService.login(email, password);
            // Store token and user data
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1A1B4B] text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1B4B]/90 to-[#4353FF]/40 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Students studying"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 flex flex-col justify-between h-full p-16">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <span className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">🎓</span>
                        Study Abroad
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">
                            "The guidance I received here was instrumental in getting into my dream university."
                        </h2>
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                alt="Student"
                                className="w-12 h-12 rounded-full border-2 border-white/50"
                            />
                            <div>
                                <p className="font-bold">Sarah Williams</p>
                                <p className="text-white/70 text-sm">Computer Science at Stanford</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1 rounded-full text-white transition-all ${i === 1 ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-[#1A1B4B] mb-2">Welcome Back! 👋</h1>
                        <p className="text-gray-500">Please enter your details to access your dashboard.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm animate-shake">
                            <AlertCircle className="flex-shrink-0 mt-0.5" size={16} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] transition-all"
                                    placeholder="name@example.com"
                                    required
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] transition-all"
                                    placeholder="••••••••"
                                    required
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
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4353FF] focus:ring-[#4353FF]" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-[#4353FF] hover:underline">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1A1B4B] text-white py-3.5 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or continue with</span></div>
                    </div>

                    <button className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Don't have an account?
                        <Link to="/signup" className="font-bold text-[#4353FF] ml-1 hover:underline">Sign Up</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
