import React, { useState } from 'react';
import {
    Search, Filter, BookOpen, Download, Users, Star,
    Calculator, Calendar, Target, Video, Calendar as CalendarIcon,
    Clock, User, Share2, ArrowRight
} from 'lucide-react';

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        { label: 'Resources', value: '156+', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Downloads', value: '45K+', icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Active Users', value: '12K+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-red-500', bg: 'bg-red-50' },
    ];

    const tools = [
        {
            title: 'Cost of Living Calculator',
            desc: 'Calculate your monthly expenses in different countries',
            icon: Calculator
        },
        {
            title: 'Application Timeline Planner',
            desc: 'Create a personalized application timeline',
            icon: Calendar
        },
        {
            title: 'University Match Calculator',
            desc: 'Find your compatibility with universities',
            icon: Target
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-24">

            {/* Header Section with Stats */}
            <div className="bg-white pt-20 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 text-[#4353FF] font-semibold mb-3 bg-blue-50 px-4 py-1.5 rounded-full text-sm">
                        <Target size={14} /> Your Knowledge Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1B4B] mb-6">Resource Center</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                        Comprehensive guides, templates, and tools to empower your study abroad journey.
                        Expert insights and interactive resources at your fingertips.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md transition-shadow">
                                <div className={`w-10 h-10 ${stat.bg} ${stat.statColor} rounded-lg flex items-center justify-center mb-4 text-[#4353FF]`}>
                                    <stat.icon size={20} />
                                </div>
                                <h3 className="text-3xl font-bold text-[#1A1B4B] mb-1">{stat.value}</h3>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 space-y-20">

                {/* Interactive Tools */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#1A1B4B] mb-4">Interactive Tools</h2>
                        <p className="text-gray-600">Use our calculators and planners to make informed decisions about your study abroad journey</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tools.map((tool, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-[#4353FF] mb-6 group-hover:bg-[#4353FF] group-hover:text-white transition-colors">
                                    <tool.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1B4B] mb-2">{tool.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{tool.desc}</p>

                                <div className="flex justify-end">
                                    <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-blue-50 group-hover:text-[#4353FF] transition-colors">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Webinar */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-[#1A1B4B]">Featured Webinar</h2>
                        <button className="text-[#4353FF] font-semibold text-sm hover:underline flex items-center gap-1">
                            <CalendarIcon size={16} /> View All Events
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Webinar"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-[#FF5A5F] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                                    <Video size={14} fill="currentColor" /> Live Webinar
                                </span>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-[#4353FF] font-semibold text-sm mb-4">
                                <CalendarIcon size={16} />
                                <span>Jan 15, 2026, 06:00 PM</span>
                            </div>

                            <h3 className="text-3xl font-bold text-[#1A1B4B] mb-4 leading-tight">Mastering Your Study Abroad Journey: Expert Q&A Session</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Join our panel of education consultants and successful international students for an interactive session covering application strategies, scholarship opportunities, and cultural preparation.
                            </p>

                            <div className="flex items-center gap-4 mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Speaker"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                />
                                <div>
                                    <div className="font-bold text-[#1A1B4B]">Dr. Sarah Mitchell</div>
                                    <div className="text-xs text-gray-500">International Education Consultant, 15+ years experience</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-[#1A1B4B] text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <User size={18} /> Register Now
                                </button>
                                <button className="px-6 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                                    <Share2 size={18} /> Share
                                </button>
                            </div>

                            <div className="mt-6 flex items-center gap-6 text-xs text-gray-500 font-medium">
                                <span className="flex items-center gap-1"><Users size={14} /> 2847 registered</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> 90 minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resource Library Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-2 font-bold text-[#1A1B4B] mb-6">
                                <Filter size={20} />
                                <h3>Categories</h3>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { name: 'All Resources', count: 156, active: true },
                                    { name: 'Applications', count: 42, active: false },
                                    { name: 'Visas & Immigration', count: 28, active: false },
                                    { name: 'Scholarships', count: 35, active: false },
                                    { name: 'Cultural Preparation', count: 24, active: false },
                                    { name: 'Academic Prep', count: 18, active: false },
                                    { name: 'Financial Planning', count: 9, active: false },
                                ].map((cat, i) => (
                                    <button
                                        key={i}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${cat.active
                                                ? 'bg-[#1A1B4B] text-white'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${cat.active
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-gray-500">Showing 9 resources</div>
                            {/* Search could function here too if desired, keeping it simple as per image */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Ultimate Study Abroad Application Guide 2026",
                                    desc: "Comprehensive step-by-step guide covering everything from university selection to...",
                                    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["Applications", "Getting Started"], // Fixed tags
                                    meta: { time: "45 min read", downloads: "12.5K", level: "Beginner" }
                                },
                                {
                                    title: "Statement of Purpose Templates & Examples",
                                    desc: "Professional SOP templates with real examples from successful applicants to top...",
                                    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["Essays", "Templates"],
                                    meta: { time: "30 min read", downloads: "8.3K", level: "Intermediate" }
                                },
                                {
                                    title: "Pre-Departure Preparation Checklist",
                                    desc: "Complete checklist covering visa documentation, packing essentials, financial...",
                                    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["Pre-Departure", "Checklist"],
                                    meta: { time: "20 min read", downloads: "15.2K", level: "Beginner" }
                                },
                                {
                                    title: "Study Abroad Budget Calculator",
                                    desc: "Interactive tool to estimate your total study abroad costs including tuition, living...",
                                    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["Financial", "Calculator"],
                                    meta: { time: "15 min", downloads: "9.7K", level: "" },
                                    customIcon: Calculator
                                },
                                {
                                    title: "Visa Interview Success Strategies",
                                    desc: "Expert video guide covering common visa interview questions, body language tips...",
                                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["Visa", "Interview"],
                                    meta: { time: "35 min watch", downloads: "6.8K", level: "Intermediate" },
                                    customIcon: Video
                                },
                                {
                                    title: "Living in the UK: Complete Student Guide",
                                    desc: "Comprehensive guide to student life in the UK covering accommodation, healthcare...",
                                    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                                    tags: ["UK", "Culture"],
                                    meta: { time: "40 min read", downloads: "11.4K", level: "Beginner" }
                                },
                            ].map((res, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
                                    <div className="h-48 relative overflow-hidden">
                                        <img src={res.image} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {res.customIcon && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#4353FF] p-2 rounded-lg">
                                                <res.customIcon size={18} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-[#1A1B4B] mb-2 line-clamp-2">{res.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{res.desc}</p>

                                        <div className="mt-auto space-y-4">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Clock size={12} /> {res.meta.time}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Download size={12} /> {res.meta.downloads}
                                                </div>
                                                {res.meta.level && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Target size={12} /> {res.meta.level}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {res.tags.map((tag, idx) => (
                                                    <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <button className="w-full bg-[#1A1B4B] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                                                <Download size={16} /> Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Expert Insights */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1A1B4B] mb-2">Expert Insights</h2>
                            <p className="text-gray-600">Learn from experienced education consultants and advisors</p>
                        </div>
                        <button className="text-[#4353FF] font-semibold text-sm hover:underline flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                author: "Dr. James Chen",
                                role: "Visa & Immigration Specialist",
                                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                                title: "Common Visa Interview Mistakes and How to Avoid Them",
                                desc: "Learn about the most frequent mistakes students make during visa interviews and proven strategies to present yourself...",
                                meta: "8 min read • Dec 28, 2025"
                            },
                            {
                                author: "Prof. Emily Rodriguez",
                                role: "Academic Advisor & SOP Expert",
                                image: "https://images.unsplash.com/photo-1573496359-92f44a49c670?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                                title: "Writing a Statement of Purpose That Stands Out",
                                desc: "Discover the key elements that make a compelling SOP and learn how to showcase your unique story effectively. Includes...",
                                meta: "12 min read • Dec 25, 2025"
                            },
                            {
                                author: "Michael Thompson",
                                role: "Financial Aid Counselor",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                                title: "Maximizing Your Scholarship Opportunities",
                                desc: "Strategic approach to finding and applying for scholarships that match your profile. Learn about hidden funding sources and...",
                                meta: "10 min read • Dec 22, 2025"
                            },
                        ].map((post, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={post.author === "Michael Thompson" ? "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" : post.image} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-[#1A1B4B] text-sm">{post.author}</h4>
                                        <p className="text-xs text-gray-500">{post.role}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#1A1B4B] mb-3 leading-tight">{post.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.desc}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Clock size={12} /> {post.meta}
                                    </div>
                                    <button className="text-[#4353FF] font-semibold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                                        Read More <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Final CTA Section */}
            <div className="bg-gradient-to-r from-[#4353FF] to-[#2E3BA4] py-20 text-white text-center">
                <div className="container mx-auto px-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <Target size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
                        Get personalized guidance from our expert counselors and access exclusive resources found nowhere else.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-[#50E3C2] text-[#1A1B4B] px-8 py-4 rounded-xl font-bold hover:bg-[#3FD1B3] transition-colors shadow-lg shadow-teal-900/10">
                            <CalendarIcon size={20} className="inline mr-2 -mt-1" />
                            Book Free Consultation
                        </button>
                        <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                            <Download size={20} className="inline mr-2 -mt-1" />
                            Download Guide
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResourcesPage;
