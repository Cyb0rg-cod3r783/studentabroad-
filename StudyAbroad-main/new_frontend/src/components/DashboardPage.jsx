import React, { useState } from 'react';
import {
    LayoutDashboard, FileText, FolderOpen, Users, Video, MessageSquare,
    Plus, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight,
    MoreHorizontal, Upload, Eye, CheckCircle, TrendingUp
} from 'lucide-react';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    // Mock Data
    const stats = [
        { label: 'Total Applications', value: '12', trend: '+20%', color: 'text-emerald-500', icon: FileText },
        { label: 'In Progress', value: '5', trend: '-10%', color: 'text-red-500', icon: Clock },
        { label: 'Submitted', value: '4', trend: '+15%', color: 'text-emerald-500', icon: createIconComponent('Send') }, // Send icon
        { label: 'Accepted', value: '3', trend: '+25%', color: 'text-emerald-500', icon: CheckCircle },
    ];

    const applications = [
        {
            id: 1,
            university: 'Stanford University',
            program: 'Master of Science in Computer Science',
            deadline: 'January 15, 2026',
            fee: '$125',
            documents: '6/8',
            appliedDate: 'December 10, 2025',
            progress: 75,
            status: 'In Progress',
            image: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
            id: 2,
            university: 'Massachusetts Institute of Technology',
            program: 'Master of Engineering in Artificial Intelligence',
            deadline: 'December 31, 2025',
            fee: '$95',
            documents: '10/10',
            appliedDate: 'November 20, 2025',
            progress: 100,
            status: 'Submitted',
            image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
            id: 3,
            university: 'University of Cambridge',
            program: 'MPhil in Advanced Computer Science',
            deadline: 'January 25, 2026',
            fee: '£85',
            documents: '4/8',
            appliedDate: 'December 15, 2025',
            progress: 45,
            status: 'In Progress',
            image: 'https://images.unsplash.com/photo-1492305175278-c93f5433035c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
        }
    ];

    const upcomingDeadlines = [
        { university: 'Stanford University', date: 'January 15, 2026' },
        { university: 'Carnegie Mellon University', date: 'January 20, 2026' },
        { university: 'University of Cambridge', date: 'January 25, 2026' },
    ];

    function createIconComponent(name) {
        // Simple placeholder for dynamic icons if needed, or just import
        return FileText; // Default fallback
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A1B4B] mb-2">Application Dashboard</h1>
                    <p className="text-gray-600">Track and manage your study abroad applications in one centralized hub</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
                    {[
                        { name: 'Overview', icon: LayoutDashboard },
                        { name: 'Applications', icon: FileText },
                        { name: 'Documents', icon: FolderOpen },
                        { name: 'Recommendations', icon: Users },
                        { name: 'Interviews', icon: Video },
                        { name: 'Communications', icon: MessageSquare }
                    ].map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.name
                                    ? 'bg-[#1A1B4B] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-[#4353FF]">
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.trend.startsWith('+') ? <TrendingUp size={14} /> : null}
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-4xl font-bold text-[#1A1B4B] mb-1">{stat.value}</h3>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content - Applications List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-[#1A1B4B]">Recent Applications</h2>
                            <button className="flex items-center gap-2 text-[#4353FF] font-semibold text-sm hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
                                <Plus size={18} /> New Application
                            </button>
                        </div>

                        {applications.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <div className="w-full md:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                        <img src={app.image} alt={app.university} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-[#1A1B4B]">{app.university}</h3>
                                                <p className="text-gray-500 text-sm mb-3">{app.program}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Submitted' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon size={14} className="text-gray-400" />
                                                <span className="text-gray-400 text-xs">Deadline:</span> {app.deadline}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400 font-bold text-xs">$</span>
                                                <span className="text-gray-400 text-xs">Fee:</span> {app.fee}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileText size={14} className="text-gray-400" />
                                                <span className="text-gray-400 text-xs">Documents:</span> {app.documents}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="text-gray-400 text-xs">Applied:</span> {app.appliedDate}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="font-semibold text-[#1A1B4B]">Application Progress</span>
                                                <span className="font-bold text-[#4353FF]">{app.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${app.status === 'Submitted' ? 'bg-[#10B981]' : 'bg-[#10B981]'}`}
                                                    style={{ width: `${app.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-1 bg-[#1A1B4B] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                                                <Eye size={16} /> View Details
                                            </button>
                                            <button className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                                <Upload size={16} /> Upload Document
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Sidebar - Calendar & Deadlines */}
                    <div className="space-y-8">

                        {/* Calendar Widget */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-[#1A1B4B]">January 2026</h3>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronLeft size={16} /></button>
                                    <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronRight size={16} /></button>
                                </div>
                            </div>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-4 font-medium">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                            </div>

                            {/* Calendar Grid (Mock) */}
                            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
                                {/* Empty slots for previous month */}
                                {[1, 2, 3, 4].map(i => <div key={`empty-${i}`}></div>)}

                                {/* Days */}
                                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                    const isSelected = day === 3;
                                    const isDeadline = [15, 20, 25].includes(day);
                                    return (
                                        <div key={day} className="flex flex-col items-center gap-1 cursor-pointer">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isSelected
                                                    ? 'bg-[#4353FF] text-white shadow-md'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                                }`}>
                                                {day}
                                            </div>
                                            {isDeadline && <div className="w-1 h-1 bg-red-500 rounded-full"></div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                            <h3 className="font-bold text-[#1A1B4B] mb-4">Upcoming Deadlines</h3>
                            <div className="space-y-4">
                                {upcomingDeadlines.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                        <div className="min-w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#1A1B4B]">{item.university}</h4>
                                            <p className="text-xs text-gray-500">{item.date}</p>
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

export default DashboardPage;
