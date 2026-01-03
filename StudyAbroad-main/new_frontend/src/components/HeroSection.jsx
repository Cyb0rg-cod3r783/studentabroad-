import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Globe, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="relative min-h-[600px] flex items-center justify-center pt-20 pb-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Library Background"
                    className="w-full h-full object-cover"
                />
                {/* Blue Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/90 to-[#2563EB]/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[#000000]/30"></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative text-center">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Your Global Education <br />
                        Journey Starts Here
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Transform uncertainty into opportunity with AI-powered insights. Join thousands who've conquered their study abroad dreams.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <button className="bg-[#FF6B6B] hover:bg-[#EE5A5A] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center">
                            <Search size={20} />
                            Find Your University
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all w-full sm:w-auto justify-center">
                            <Sparkles size={20} />
                            Get AI Recommendations
                        </button>
                    </div>
                </motion.div>

                {/* Search Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-2 max-w-3xl mx-auto"
                >
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4 p-2">
                        {[
                            { id: 'all', label: 'All', icon: Search },
                            { id: 'universities', label: 'Universities', icon: BookOpen },
                            { id: 'programs', label: 'Programs', icon: LayoutGrid },
                            { id: 'countries', label: 'Countries', icon: Globe },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-[#1A1B4B] text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search universities, programs, or countries..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] focus:border-transparent text-gray-600 placeholder-gray-400 text-lg"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
