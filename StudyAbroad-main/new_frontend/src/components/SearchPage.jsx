import React, { useState } from 'react';
import { Search, MapPin, Users, BookOpen, Heart, Filter, Grid, List, Map, ChevronDown, Check, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const universities = [
    {
        id: 1,
        name: "Massachusetts Institute of Technology (MIT)",
        location: "Cambridge, Massachusetts",
        country: "United States",
        flag: "https://flagcdn.com/us.svg",
        rank: 1,
        image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1024px-MIT_logo.svg.png",
        tuition: "$53,790",
        students: "11,520",
        scholarships: true,
        featured: true,
        tags: ["Computer Science", "Engineering", "Business"]
    },
    {
        id: 2,
        name: "University of Oxford",
        location: "Oxford, England",
        country: "United Kingdom",
        flag: "https://flagcdn.com/gb.svg",
        rank: 2,
        image: "https://images.unsplash.com/photo-1590559770513-db376092bb84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/University_of_Oxford.svg/800px-University_of_Oxford.svg.png",
        tuition: "$32,760",
        students: "24,515",
        scholarships: true,
        featured: true,
        tags: ["Law", "Medicine", "Philosophy"]
    },
    {
        id: 3,
        name: "Stanford University",
        location: "Stanford, California",
        country: "United States",
        flag: "https://flagcdn.com/us.svg",
        rank: 3,
        image: "https://images.unsplash.com/photo-1627918544975-29641473950c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Stanfordish
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1024px-Seal_of_Leland_Stanford_Junior_University.svg.png",
        tuition: "$56,169",
        students: "17,249",
        scholarships: true,
        featured: false,
        tags: ["Computer Science", "Business", "Engineering"]
    },
    {
        id: 4,
        name: "University of Toronto",
        location: "Toronto, Ontario",
        country: "Canada",
        flag: "https://flagcdn.com/ca.svg",
        rank: 18,
        image: "https://images.unsplash.com/photo-1626154502570-557c50f83fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png",
        tuition: "$45,690",
        students: "91,286",
        scholarships: true,
        featured: false,
        tags: ["Engineering", "Medicine", "Business"]
    },
    {
        id: 5,
        name: "ETH Zurich",
        location: "Zurich, Switzerland",
        country: "Switzerland",
        flag: "https://flagcdn.com/ch.svg",
        rank: 7,
        image: "https://images.unsplash.com/photo-1643275727049-3dbfa1400300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ETH_Z%C3%BCrich_Logo_black.svg/2048px-ETH_Z%C3%BCrich_Logo_black.svg.png",
        tuition: "$1,460",
        students: "22,200",
        scholarships: true,
        featured: false,
        tags: ["Engineering", "Computer Science", "Physics"]
    },
    {
        id: 6,
        name: "University of Melbourne",
        location: "Melbourne, Victoria",
        country: "Australia",
        flag: "https://flagcdn.com/au.svg",
        rank: 33,
        image: "https://images.unsplash.com/photo-1549618090-e2938a4d2c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Generic Campus
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/The_University_of_Melbourne_Seal.png/1200px-The_University_of_Melbourne_Seal.png",
        tuition: "$38,976",
        students: "51,051",
        scholarships: true,
        featured: false,
        tags: ["Medicine", "Law", "Business"]
    }
];

const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-gray-100 py-6 last:border-0">
            <button
                className="flex items-center justify-between w-full mb-4"
                onClick={() => setOpen(!open)}
            >
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <ChevronDown size={16} className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div>{children}</div>}
        </div>
    );
};

const Checkbox = ({ label }) => (
    <label className="flex items-center gap-3 cursor-pointer group mb-3 last:mb-0">
        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#4353FF] transition-colors relative">
            <input type="checkbox" className="peer w-0 h-0 opacity-0" />
            <Check size={12} className="text-[#4353FF] opacity-0 peer-checked:opacity-100 absolute" strokeWidth={3} />
        </div>
        <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900">{label}</span>
    </label>
);

const SearchPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-white border-b border-gray-100 pt-16 pb-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-[#1A1B4B] mb-4">Discover Your Dream University</h1>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        Search through thousands of universities worldwide with AI-powered recommendations
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative mb-8">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <input
                            type="text"
                            placeholder="Search universities, programs, or locations..."
                            className="w-full pl-16 pr-6 py-5 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4353FF] focus:border-transparent text-lg"
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        <span className="text-gray-500 font-medium">Popular searches:</span>
                        {['Computer Science USA', 'Business UK', 'Engineering Canada', 'Medicine Australia'].map(tag => (
                            <button key={tag} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-[#1A1B4B]">
                                <SlidersHorizontal size={20} />
                                <h3 className="text-xl font-bold">Filters</h3>
                            </div>

                            <FilterSection title="Country">
                                <select className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]">
                                    <option>Select country</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                </select>
                            </FilterSection>

                            <FilterSection title="Program Type">
                                <Checkbox label="Bachelor's Degree" />
                                <Checkbox label="Master's Degree" />
                                <Checkbox label="PhD/Doctorate" />
                                <Checkbox label="Diploma/Certificate" />
                            </FilterSection>

                            <FilterSection title="Tuition Range (USD/year)">
                                <div className="flex gap-4">
                                    <input type="text" placeholder="Min" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                                    <input type="text" placeholder="Max" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                                </div>
                            </FilterSection>

                            <FilterSection title="University Ranking">
                                <select className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]">
                                    <option>Select ranking range</option>
                                    <option>Top 50</option>
                                    <option>Top 100</option>
                                    <option>Top 500</option>
                                </select>
                            </FilterSection>

                            <FilterSection title="Intake Month">
                                <select className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]">
                                    <option>Select intake month</option>
                                    <option>September 2024</option>
                                    <option>January 2025</option>
                                </select>
                            </FilterSection>

                            <div className="py-6 border-b border-gray-100">
                                <Checkbox label="Scholarships Available" />
                                <p className="text-xs text-gray-400 mt-2 ml-8">Show only universities offering scholarships</p>
                            </div>

                            <div className="mt-8 space-y-3">
                                <button className="w-full py-3 bg-[#1A1B4B] text-white rounded-xl font-semibold hover:bg-[#3E3B92] transition-colors">
                                    Apply Filters
                                </button>
                                <button className="w-full py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Reset All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1B4B]">Search Results</h2>
                                <p className="text-sm text-gray-500">12 universities found</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">Sort by:</span>
                                    <select className="border-none bg-transparent font-semibold text-[#1A1B4B] focus:outline-none cursor-pointer">
                                        <option>Most Relevant</option>
                                        <option>Rank: High to Low</option>
                                        <option>Tuition: Low to High</option>
                                    </select>
                                </div>

                                <div className="h-6 w-px bg-gray-200"></div>

                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button className="p-2 bg-white text-[#4353FF] rounded shadow-sm"><Grid size={18} /></button>
                                    <button className="p-2 text-gray-500 hover:text-gray-700"><List size={18} /></button>
                                    <button className="p-2 text-gray-500 hover:text-gray-700"><Map size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {universities.map((uni) => (
                                <div key={uni.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    {/* Card Image */}
                                    <div className="h-48 relative overflow-hidden">
                                        <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-[#10B981] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">#{uni.rank}</span>
                                            {uni.featured && (
                                                <span className="bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                                    <span>★</span> Featured
                                                </span>
                                            )}
                                        </div>
                                        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                                            <Heart size={16} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-md border border-gray-100 flex-shrink-0">
                                                    <img src={uni.logo} alt="logo" className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#1A1B4B] line-clamp-1 group-hover:text-[#4353FF] transition-colors" title={uni.name}>{uni.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                                        <MapPin size={14} className="text-gray-400" />
                                                        <span>{uni.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-6">
                                            <img src={uni.flag} alt={uni.country} className="w-5 h-3.5 rounded-sm shadow-sm" />
                                            <span className="text-sm font-medium text-gray-600">{uni.country}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                    <span>💲</span> Tuition/year
                                                </p>
                                                <p className="font-bold text-[#1A1B4B]">{uni.tuition}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                    <Users size={12} /> Students
                                                </p>
                                                <p className="font-bold text-[#1A1B4B]">{uni.students}</p>
                                            </div>
                                        </div>

                                        {uni.scholarships && (
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] mb-4">
                                                <BookOpen size={14} />
                                                <span>Scholarships Available</span>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {uni.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">
                                                    {tag}
                                                </span>
                                            ))}
                                            {uni.tags.length > 2 && (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-lg">
                                                    +{uni.tags.length - 2} more
                                                </span>
                                            )}
                                        </div>

                                        <button className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-[#4353FF] hover:text-[#4353FF] transition-all flex items-center justify-center gap-2 group/btn">
                                            View Details
                                            <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
