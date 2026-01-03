import React, { useState } from 'react';
import { Search, Filter, Globe, DollarSign, MapPin, FileText, ArrowRight, Home, ShoppingBag, Bus, Zap, Film, Layers, Users, Phone, Shield, Heart, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for Destinations
const destinations = [
    {
        id: 1,
        country: "United States",
        code: "US",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "4,500 Universities",
        description: "Home to world-renowned universities and diverse academic programs across all fields.",
        cost: "$35,000 - $55,000",
        cities: "New York, Boston, Los Angeles",
        visa: "F-1 Student Visa"
    },
    {
        id: 2,
        country: "United Kingdom",
        code: "GB",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "395 Universities",
        description: "Rich academic heritage with prestigious institutions offering world-class education.",
        cost: "£15,000 - £30,000",
        cities: "London, Oxford, Cambridge",
        visa: "Tier 4 Student Visa"
    },
    {
        id: 3,
        country: "Canada",
        code: "CA",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "223 Universities",
        description: "Welcoming multicultural environment with high-quality education and post-study work options.",
        cost: "CAD 20,000 - 35,000",
        cities: "Toronto, Vancouver, Montreal",
        visa: "Study Permit"
    },
    {
        id: 4,
        country: "Australia",
        code: "AU",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "43 Universities",
        description: "Outstanding education system with beautiful campuses and excellent quality of life.",
        cost: "AUD 25,000 - 45,000",
        cities: "Sydney, Melbourne, Brisbane",
        visa: "Subclass 500 Visa"
    },
    {
        id: 5,
        country: "Germany",
        code: "DE",
        image: "https://images.unsplash.com/photo-1467269204594-9661b133dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "426 Universities",
        description: "Affordable or tuition-free education at world-class institutions with strong industry links.",
        cost: "€0 - €20,000",
        cities: "Berlin, Munich, Hamburg",
        visa: "Student Visa"
    },
    {
        id: 6,
        country: "France",
        code: "FR",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        uniCount: "3,500 Universities",
        description: "Rich cultural experience with excellent programs in arts, sciences, and business.",
        cost: "€3,000 - €15,000",
        cities: "Paris, Lyon, Toulouse",
        visa: "Long-Stay Student Visa"
    }
];

const regions = [
    { name: "North America", count: 12, active: true },
    { name: "Europe", count: 18, active: false },
    { name: "Asia", count: 10, active: false },
    { name: "Oceania", count: 5, active: false },
    { name: "South America", count: 3, active: false },
    { name: "Africa", count: 2, active: false },
];

const expenseItems = [
    { icon: Home, label: "Accommodation", value: "$1000", percentage: "46.1%", color: "bg-blue-600" },
    { icon: ShoppingBag, label: "Food & Groceries", value: "$500", percentage: "23.0%", color: "bg-green-500" },
    { icon: Bus, label: "Transportation", value: "$120", percentage: "5.5%", color: "bg-blue-400" },
    { icon: Zap, label: "Utilities", value: "$150", percentage: "6.9%", color: "bg-yellow-500" },
    { icon: Film, label: "Entertainment", value: "$200", percentage: "9.2%", color: "bg-purple-500" },
    { icon: Layers, label: "Miscellaneous", value: "$200", percentage: "9.2%", color: "bg-red-500" },
];

const DestinationsPage = () => {
    const [lifestyle, setLifestyle] = useState('Moderate');
    const [visaCountry, setVisaCountry] = useState('US');

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#4353FF] to-[#8B5CF6] py-24 text-center relative overflow-hidden">
                {/* Background Overlay or Pattern could go here */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                        <Globe size={16} />
                        Explore 50+ Study Destinations
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Discover Your Perfect Study Destination
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Comprehensive country guides with cultural insights, living costs, visa requirements, and everything you need to make an informed decision about your study abroad journey.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search countries, cities, or regions..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                        <button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-colors w-full sm:w-auto justify-center">
                            <Filter size={20} />
                            Advanced Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Popularity Badge or similar could go here if needed, but styling allows direct flow */}
            </div>

            {/* Top Study Destinations */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-[#4353FF] font-semibold mb-2">
                        <span className="text-lg">📈</span> Most Popular
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">Top Study Destinations</h2>
                    <p className="text-gray-600">Explore the most sought-after countries for international students with comprehensive guides and insights.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="h-56 relative overflow-hidden">
                                <img src={dest.image} alt={dest.country} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-2xl font-bold text-white mb-1">{dest.country}</h3>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                                            🎓 {dest.uniCount}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 text-white/20 font-bold text-6xl pointer-events-none select-none">
                                    {dest.code}
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    {dest.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                            <DollarSign size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Avg. Annual Cost</p>
                                            <p className="font-semibold text-[#1A1B4B]">{dest.cost}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Popular Cities</p>
                                            <p className="font-semibold text-[#1A1B4B]">{dest.cities}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                            <FileText size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Visa Type</p>
                                            <p className="font-semibold text-[#1A1B4B]">{dest.visa}</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-auto w-full py-3 text-[#4353FF] font-semibold hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-between px-4 group">
                                    Explore Details
                                    <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Explore by Region */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">Explore by Region</h2>
                        <p className="text-gray-600">Select a region to discover universities, student populations, and cost insights across the globe.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {regions.map((region) => (
                            <button
                                key={region.name}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${region.active
                                    ? 'bg-[#1A1B4B] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {region.active && <MapPin size={14} />} {region.name}
                                <span className={`px-2 py-0.5 rounded-full text-xs ${region.active ? 'bg-white/20' : 'bg-gray-200'}`}>
                                    {region.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Map Placeholder */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="bg-gray-50 rounded-3xl p-12 lg:p-24 border border-dashed border-gray-300 relative group cursor-pointer hover:bg-gray-100 transition-colors">
                            <Globe className="mx-auto text-gray-300 mb-6 group-hover:text-blue-300 transition-colors" size={64} strokeWidth={1} />
                            <h3 className="text-2xl font-bold text-[#1A1B4B] mb-2">North America</h3>
                            <p className="text-gray-500">Interactive map visualization coming soon</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                        <div className="bg-white p-6 rounded-2xl">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Home size={24} />
                            </div>
                            <h4 className="text-3xl font-bold text-[#1A1B4B] mb-1">5,200</h4>
                            <p className="text-gray-500">Universities</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Users size={24} />
                            </div>
                            <h4 className="text-3xl font-bold text-[#1A1B4B] mb-1">1.8M</h4>
                            <p className="text-gray-500">International Students</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <DollarSign size={24} />
                            </div>
                            <h4 className="text-3xl font-bold text-[#1A1B4B] mb-1">$25K - $55K</h4>
                            <p className="text-gray-500">Avg. Annual Cost</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cost of Living Calculator */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[#4353FF] font-semibold mb-2 bg-blue-50 px-4 py-1.5 rounded-full text-sm">
                        <DollarSign size={14} /> Financial Planning
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">Cost of Living Calculator</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Get accurate estimates of living expenses in your chosen destination to plan your budget effectively.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Left: Inputs */}
                    <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold text-[#1A1B4B] mb-8">Calculate Your Expenses</h3>

                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Country</label>
                            <select className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]">
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Australia</option>
                            </select>
                        </div>

                        <div className="mb-10">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Lifestyle Preference</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Budget', 'Moderate', 'Comfortable'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setLifestyle(option)}
                                        className={`py-3 px-2 rounded-xl text-sm font-semibold border transition-all ${lifestyle === option
                                            ? 'border-[#4353FF] text-[#4353FF] bg-blue-50 ring-1 ring-[#4353FF]'
                                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                                            }`}
                                    >
                                        {option}
                                        <span className="block text-[10px] font-normal text-gray-500 mt-1">
                                            {option === 'Budget' ? 'Essential expenses' : option === 'Moderate' ? 'Balanced lifestyle' : 'Premium living'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-500">Estimated Monthly Cost</span>
                                {/* Simple trend icon */}
                                <Zap size={24} className="text-[#4353FF] mb-1" />
                            </div>
                            <div className="text-5xl font-bold text-[#1A1B4B]">$2,170</div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Annual Estimate</span>
                                <span className="font-bold text-gray-900">$26,040</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Breakdown */}
                    <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 border border-gray-200">
                        <h3 className="text-xl font-bold text-[#1A1B4B] mb-8">Expense Breakdown</h3>

                        <div className="space-y-6">
                            {expenseItems.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{item.label}</div>
                                                <div className="text-xs text-gray-500">{item.percentage} of total</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-gray-900">{item.value}</div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.percentage }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-4">
                            <div className="flex-shrink-0 text-[#4353FF] mt-1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            </div>
                            <div className="text-sm text-blue-800 leading-relaxed">
                                <span className="font-semibold">Cost Estimate Note:</span> These are average estimates and may vary based on specific location, lifestyle choices, and current exchange rates. Always research current costs for your specific destination.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visa Requirements Section */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-red-500 font-semibold mb-2 bg-red-50 px-4 py-1.5 rounded-full text-sm">
                            <FileText size={14} /> Documentation Guide
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">Visa Requirements & Process</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive guide to student visa requirements, application process, and timelines for your destination.</p>
                    </div>

                    {/* Country Tabs */}
                    <div className="flex justify-center gap-4 mb-16">
                        {['US United States', 'GB United Kingdom', 'CA Canada', 'AU Australia'].map((tab) => {
                            const [code, ...nameParts] = tab.split(' ');
                            const name = nameParts.join(' ');
                            const isActive = visaCountry === code;
                            return (
                                <button
                                    key={code}
                                    onClick={() => setVisaCountry(code)}
                                    className={`px-6 py-3 rounded-xl font-semibold border transition-all flex items-center gap-2 ${isActive
                                        ? 'bg-[#1A1B4B] text-white border-[#1A1B4B] shadow-lg'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="font-bold">{code}</span> {name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Visa Content */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Key Details */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-fit">
                            <div className="text-6xl font-bold text-[#1A1B4B] mb-2">{visaCountry}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{destinations.find(d => d.code === visaCountry)?.country}</h3>
                            <p className="text-gray-500 mb-8">{destinations.find(d => d.code === visaCountry)?.visa}</p>

                            <div className="w-full space-y-6">
                                <div className="flex items-center gap-4 text-left p-4 bg-blue-50 rounded-xl">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Zap size={20} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold">Processing Time</p>
                                        <p className="font-bold text-[#1A1B4B]">3-5 weeks</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-left p-4 bg-green-50 rounded-xl">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><DollarSign size={20} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold">Application Cost</p>
                                        <p className="font-bold text-[#1A1B4B]">$160 + $350 SEVIS fee</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm text-left flex gap-3">
                                <div className="flex-shrink-0 mt-0.5"><Zap size={16} /></div>
                                <div>
                                    <span className="font-bold block mb-1">Important Note</span>
                                    Visa requirements and processing times may change. Always verify current information with official embassy websites before applying.
                                </div>
                            </div>
                        </div>

                        {/* Right: Docs & Process */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Required Documents */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-200">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <span className="font-bold text-lg">✓</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A1B4B]">Required Documents</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        "Valid passport (6 months beyond stay)",
                                        "Form I-20 from US institution",
                                        "SEVIS fee payment receipt",
                                        "Visa application form DS-160",
                                        "Passport-sized photographs",
                                        "Proof of financial support",
                                        "Academic transcripts and certificates",
                                        "English proficiency test scores"
                                    ].map((doc, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="font-bold text-blue-600 text-sm mt-0.5">{i + 1}</span>
                                            <span className="text-gray-600 text-sm">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Application Process */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-200">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Layers size={18} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A1B4B]">Application Process</h3>
                                </div>

                                <div className="space-y-0 relative">
                                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
                                    {[
                                        "Receive Form I-20 from university",
                                        "Pay SEVIS I-901 fee online",
                                        "Complete DS-160 form online",
                                        "Schedule visa interview",
                                        "Attend visa interview at embassy",
                                        "Wait for visa processing",
                                        "Receive passport with visa"
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-6 relative group pb-8 last:pb-0">
                                            <div className="w-10 h-10 rounded-full bg-[#4353FF] text-white font-bold flex items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                                                {i + 1}
                                            </div>
                                            <div className="pt-1.5">
                                                <h4 className="font-bold text-[#1A1B4B] mb-1">{step}</h4>
                                                <p className="text-xs text-gray-400">Step {i + 1} of 7</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Contact Numbers */}
            <div className="container mx-auto px-4 py-24 border-t border-gray-200">
                <div className="mb-12">
                    <div className="flex items-end gap-4 mb-2">
                        <div className="bg-red-100 p-2 rounded-lg text-red-500">
                            <Phone size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#1A1B4B]">Emergency Contact Numbers</h2>
                    </div>
                    <p className="text-gray-500 ml-14">Save these numbers in your phone immediately upon arrival</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-4 bg-gray-50 p-6 font-semibold text-gray-700 border-b border-gray-200">
                        <div>Country</div>
                        <div className="text-center">Police</div>
                        <div className="text-center">Ambulance</div>
                        <div className="text-center">Fire</div>
                    </div>
                    {[
                        { c: "United States", p: "911", a: "911", f: "911" },
                        { c: "United Kingdom", p: "999", a: "999", f: "999" },
                        { c: "Canada", p: "911", a: "911", f: "911" },
                        { c: "Australia", p: "000", a: "000", f: "000" },
                        { c: "Germany", p: "110", a: "112", f: "112" },
                        { c: "France", p: "17", a: "15", f: "18" },
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <div className="font-medium text-[#1A1B4B]">{row.c}</div>
                            <div className="text-center text-[#4353FF] font-mono flex items-center justify-center gap-2"><Phone size={14} className="opacity-50" /> {row.p}</div>
                            <div className="text-center text-green-600 font-mono flex items-center justify-center gap-2"><Phone size={14} className="opacity-50" /> {row.a}</div>
                            <div className="text-center text-red-500 font-mono flex items-center justify-center gap-2"><Phone size={14} className="opacity-50" /> {row.f}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                        { icon: Globe, label: "Embassy Registration", desc: "Register with your home country's embassy for emergency assistance and updates." },
                        { icon: MapPin, label: "Location Sharing", desc: "Use location sharing apps to keep trusted contacts informed of your whereabouts." },
                        { icon: FileText, label: "Document Copies", desc: "Keep digital and physical copies of passport, visa, and important documents." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-[#4353FF] flex items-center justify-center">
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1A1B4B] mb-1">{item.label}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Student Safety Guide */}
            <div className="bg-white py-24 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-[#10B981] font-semibold mb-2 bg-green-50 px-4 py-1.5 rounded-full text-sm">
                            <Shield size={14} /> Safety First
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">Student Safety Guide</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Essential safety information and best practices to ensure your well-being while studying abroad.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Personal Safety", icon: Shield, color: "text-[#4353FF]", items: ["Always keep emergency contacts saved in your phone", "Share your location with trusted friends or family", "Avoid walking alone late at night in unfamiliar areas", "Keep copies of important documents in secure locations", "Register with your country's embassy or consulate", "Learn local emergency numbers and procedures"] },
                            { title: "Health & Wellness", icon: Heart, color: "text-[#10B981]", items: ["Obtain comprehensive health insurance coverage", "Keep a list of nearby hospitals and clinics", "Carry necessary medications with prescriptions", "Know how to access mental health support services", "Understand local healthcare system procedures", "Maintain regular health check-ups and vaccinations"] },
                            { title: "Financial Security", icon: CreditCard, color: "text-[#3B82F6]", items: ["Use secure banking apps and enable two-factor authentication", "Keep emergency cash in a safe location", "Monitor your accounts regularly for suspicious activity", "Avoid carrying large amounts of cash", "Use ATMs in well-lit, secure locations", "Know how to report lost or stolen cards immediately"] },
                            { title: "Digital Safety", icon: Smartphone, color: "text-orange-500", items: ["Use strong, unique passwords for all accounts", "Enable device encryption and remote wipe features", "Be cautious with public Wi-Fi networks", "Regularly backup important data to cloud storage", "Be aware of common online scams targeting students", "Protect your personal information on social media"] },
                            { title: "Transportation Safety", icon: Bus, color: "text-red-500", items: ["Use licensed and reputable transportation services", "Share ride details with friends when using ride-sharing", "Learn safe routes between home, campus, and frequent destinations", "Keep your phone charged when traveling", "Understand local traffic rules if driving", "Avoid accepting rides from strangers"] },
                            { title: "Campus Security", icon: Home, color: "text-purple-600", items: ["Familiarize yourself with campus security services", "Use campus escort services when available", "Report suspicious activities to campus security", "Keep your student ID accessible at all times", "Know the locations of emergency call boxes", "Attend campus safety orientation sessions"] },
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 ${card.color}`}>
                                    <card.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1B4B] mb-6">{card.title}</h3>
                                <ul className="space-y-4">
                                    {card.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                            <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${card.color}`} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};


export default DestinationsPage;
