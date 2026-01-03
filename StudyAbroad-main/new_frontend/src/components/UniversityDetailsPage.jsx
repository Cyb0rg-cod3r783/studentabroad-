import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    MapPin, Star, Users, DollarSign, Award, BookOpen, Clock,
    Calendar, CheckCircle, ArrowRight, Share2, Heart, Globe
} from 'lucide-react';

const UniversityDetailsPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Overview');

    // Mock Data (In a real app, fetch based on ID)
    const university = {
        id: 1,
        name: "Stanford University",
        location: "Stanford, California",
        ranking: "#2 Global",
        acceptanceRate: "4%",
        students: "17,000+",
        tuition: "$56,169 / year",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png",
        description: "Stanford University is one of the world's leading research and teaching institutions. It is located in Stanford, California, and provides a diverse, inclusive, and collaborative environment for learning and discovery.",
        programs: [
            { name: "Computer Science", degree: "B.S. / M.S.", duration: "4 Years", fee: "$56k/yr" },
            { name: "Business Administration", degree: "MBA", duration: "2 Years", fee: "$76k/yr" },
            { name: "Mechanical Engineering", degree: "B.S.", duration: "4 Years", fee: "$56k/yr" },
            { name: "Psychology", degree: "B.A.", duration: "4 Years", fee: "$56k/yr" },
        ],
        features: ["World-class Faculty", "Silicon Valley Location", "Huge Alumni Network", "Innovative Research"],
        admissions: {
            deadline: "January 5",
            fee: "$90",
            gpa: "3.96 Unweighted",
            sat: "1440-1570"
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">

            {/* Hero Header */}
            <div className="relative h-[400px] md:h-[500px]">
                <img
                    src={university.image}
                    alt={university.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B4B] via-[#1A1B4B]/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container mx-auto flex flex-col md:flex-row items-end gap-8">
                        <div className="bg-white p-4 rounded-2xl shadow-lg -mb-16 md:mb-0 w-32 h-32 flex items-center justify-center">
                            <img src={university.logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>

                        <div className="text-white flex-grow mb-16 md:mb-0">
                            <div className="flex items-center gap-2 text-blue-200 font-semibold mb-2">
                                <MapPin size={18} /> {university.location}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{university.name}</h1>
                            <div className="flex flex-wrap gap-4 text-sm font-medium">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <Award size={16} /> Rank: {university.ranking}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <Users size={16} /> {university.students} Students
                                </span>
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <CheckCircle size={16} /> Acceptance: {university.acceptanceRate}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4 md:mb-2">
                            <button className="bg-[#4353FF] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/30">
                                Apply Now
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition-colors">
                                <Heart size={24} />
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition-colors">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-24 md:pt-12">

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Content */}
                    <div className="lg:w-2/3">

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                            {['Overview', 'Programs', 'Admissions', 'Campus Life', 'Costs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab
                                        ? 'border-[#4353FF] text-[#4353FF]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-8">
                            {activeTab === 'Overview' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                        <h2 className="text-2xl font-bold text-[#1A1B4B] mb-4">About the University</h2>
                                        <p className="text-gray-600 leading-relaxed text-lg mb-6">{university.description}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {university.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                                    <div className="text-green-500"><CheckCircle size={20} /></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                        <h2 className="text-2xl font-bold text-[#1A1B4B] mb-4">Why Choose {university.name}?</h2>
                                        {/* Placeholder content representing dynamic data */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-blue-50 p-6 rounded-xl">
                                                <Globe className="text-[#4353FF] mb-3" size={32} />
                                                <h3 className="font-bold text-[#1A1B4B] mb-2">Global Perspective</h3>
                                                <p className="text-sm text-gray-600">Diverse community with students from over 150 countries.</p>
                                            </div>
                                            <div className="bg-purple-50 p-6 rounded-xl">
                                                <BookOpen className="text-purple-600 mb-3" size={32} />
                                                <h3 className="font-bold text-[#1A1B4B] mb-2">Interdisciplinary Studies</h3>
                                                <p className="text-sm text-gray-600">Flexible curriculum allowing you to explore multiple fields.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Programs' && (
                                <div className="space-y-4 animate-fade-in">
                                    {university.programs.map((program, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition-shadow">
                                            <div className="mb-4 md:mb-0">
                                                <h3 className="text-lg font-bold text-[#1A1B4B] mb-1">{program.name}</h3>
                                                <div className="flex gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1"><BookOpen size={14} /> {program.degree}</span>
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {program.duration}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-[#4353FF]">{program.fee}</div>
                                                    <div className="text-xs text-gray-400">Total Fees</div>
                                                </div>
                                                <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#4353FF] hover:bg-blue-50 transition-colors">
                                                    <ArrowRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Admissions Tab - simplified for now */}
                            {activeTab === 'Admissions' && (
                                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
                                    <h2 className="text-2xl font-bold text-[#1A1B4B] mb-6">Admissions Overview</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Requirements</h3>
                                            <ul className="space-y-3 text-gray-600">
                                                <li className="flex justify-between"><span>Average GPA:</span> <span className="font-bold text-[#1A1B4B]">{university.admissions.gpa}</span></li>
                                                <li className="flex justify-between"><span>SAT Range:</span> <span className="font-bold text-[#1A1B4B]">{university.admissions.sat}</span></li>
                                                <li className="flex justify-between"><span>Application Fee:</span> <span className="font-bold text-[#1A1B4B]">{university.admissions.fee}</span></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Key Deadlines</h3>
                                            <div className="flex items-start gap-4">
                                                <div className="bg-red-50 text-red-500 p-3 rounded-xl font-bold text-center min-w-[70px]">
                                                    <div className="text-xs uppercase">JAN</div>
                                                    <div className="text-2xl">05</div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#1A1B4B]">Regular Decision</h4>
                                                    <p className="text-sm text-gray-500">All application materials must be received by this date.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Other tabs placeholders */}
                            {(activeTab === 'Campus Life' || activeTab === 'Costs') && (
                                <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-500 italic">
                                    Detailed information about {activeTab} coming soon...
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:w-1/3 space-y-8">

                        {/* Quick Stats Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#1A1B4B] mb-6">University at a Glance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center"><Star size={20} /></div>
                                    <div>
                                        <div className="text-xs text-gray-500">World Ranking</div>
                                        <div className="font-bold text-[#1A1B4B]">{university.ranking}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><DollarSign size={20} /></div>
                                    <div>
                                        <div className="text-xs text-gray-500">Avg. Cost After Aid</div>
                                        <div className="font-bold text-[#1A1B4B]">$18k / year</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Users size={20} /></div>
                                    <div>
                                        <div className="text-xs text-gray-500">Student Body</div>
                                        <div className="font-bold text-[#1A1B4B]">{university.students}</div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-[#1A1B4B] text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors">
                                Download Brochure
                            </button>
                        </div>

                        {/* Similar Universities */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#1A1B4B] mb-4">Similar Universities</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'MIT', loc: 'Massachusetts', img: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
                                    { name: 'Harvard', loc: 'Massachusetts', img: 'https://images.unsplash.com/photo-1550942540-3bd143714652?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
                                    { name: 'Caltech', loc: 'California', img: 'https://images.unsplash.com/photo-1623945248366-079732732943?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
                                ].map((uni, i) => (
                                    <div key={i} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                                        <img src={uni.img} alt={uni.name} className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <div className="font-bold text-[#1A1B4B] text-sm">{uni.name}</div>
                                            <div className="text-xs text-gray-500">{uni.loc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityDetailsPage;
