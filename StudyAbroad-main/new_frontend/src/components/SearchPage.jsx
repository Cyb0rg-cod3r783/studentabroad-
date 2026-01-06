import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, BookOpen, Heart, Filter, Grid, List, Map, ChevronDown, Check, SlidersHorizontal, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { universityService } from '../services/api';

// Country flag mapping
const countryFlags = {
    "United States": "https://flagcdn.com/us.svg",
    "United Kingdom": "https://flagcdn.com/gb.svg",
    "Canada": "https://flagcdn.com/ca.svg",
    "Australia": "https://flagcdn.com/au.svg",
    "Germany": "https://flagcdn.com/de.svg",
    "France": "https://flagcdn.com/fr.svg",
    "Netherlands": "https://flagcdn.com/nl.svg",
    "Switzerland": "https://flagcdn.com/ch.svg",
    "Ireland": "https://flagcdn.com/ie.svg",
    "New Zealand": "https://flagcdn.com/nz.svg",
    "Singapore": "https://flagcdn.com/sg.svg",
    "Japan": "https://flagcdn.com/jp.svg",
    "South Korea": "https://flagcdn.com/kr.svg",
    "China": "https://flagcdn.com/cn.svg"
};

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

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group mb-3 last:mb-0">
        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#4353FF] transition-colors relative">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer w-0 h-0 opacity-0"
            />
            <Check size={12} className={`text-[#4353FF] ${checked ? 'opacity-100' : 'opacity-0'} absolute`} strokeWidth={3} />
        </div>
        <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900">{label}</span>
    </label>
);

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

    // Filter state
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
    const [minTuition, setMinTuition] = useState('');
    const [maxTuition, setMaxTuition] = useState('');
    const [maxRanking, setMaxRanking] = useState('');
    const [sortBy, setSortBy] = useState('ranking');
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch countries and fields on mount
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [countriesRes, fieldsRes] = await Promise.all([
                    universityService.getCountries(),
                    universityService.getFields()
                ]);

                if (countriesRes.success) setCountries(countriesRes.data || []);
                if (fieldsRes.success) setFields(fieldsRes.data || []);
            } catch (err) {
                console.error('Failed to fetch filters:', err);
            }
        };

        fetchFilters();
    }, []);

    // Fetch universities when filters change
    useEffect(() => {
        const fetchUniversities = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = {
                    page: pagination.page,
                    per_page: 12,
                    sort_by: sortBy,
                    sort_order: sortOrder
                };

                if (searchQuery) params.q = searchQuery;
                if (selectedCountry) params.country = selectedCountry;
                if (minTuition) params.min_tuition = minTuition;
                if (maxTuition) params.max_tuition = maxTuition;
                if (maxRanking) params.max_ranking = maxRanking;

                const response = await universityService.getAll(params);

                if (response.success && response.data) {
                    setUniversities(response.data.universities || []);
                    setPagination(prev => ({
                        ...prev,
                        total: response.data.pagination?.total || 0,
                        pages: response.data.pagination?.pages || 1
                    }));
                } else {
                    setUniversities([]);
                }
            } catch (err) {
                console.error('Failed to fetch universities:', err);
                setError('Failed to load universities. Please try again.');
                setUniversities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, [searchQuery, selectedCountry, minTuition, maxTuition, maxRanking, sortBy, sortOrder, pagination.page]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Trigger search - useEffect will handle it
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleApplyFilters = () => {
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCountry('');
        setMinTuition('');
        setMaxTuition('');
        setMaxRanking('');
        setSortBy('ranking');
        setSortOrder('asc');
        setPagination({ page: 1, total: 0, pages: 1 });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'ranking_asc') {
            setSortBy('ranking');
            setSortOrder('asc');
        } else if (value === 'ranking_desc') {
            setSortBy('ranking');
            setSortOrder('desc');
        } else if (value === 'tuition_asc') {
            setSortBy('tuition_fee');
            setSortOrder('asc');
        } else if (value === 'tuition_desc') {
            setSortBy('tuition_fee');
            setSortOrder('desc');
        } else if (value === 'name_asc') {
            setSortBy('name');
            setSortOrder('asc');
        }
    };

    const getFlag = (country) => {
        return countryFlags[country] || `https://flagcdn.com/xx.svg`;
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-white border-b border-gray-100 pt-16 pb-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-[#1A1B4B] mb-4">Discover Your Dream University</h1>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        Search through {pagination.total || 'thousands of'} universities worldwide with AI-powered recommendations
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative mb-8">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search universities, programs, or locations..."
                            className="w-full pl-16 pr-6 py-5 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4353FF] focus:border-transparent text-lg"
                        />
                    </form>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        <span className="text-gray-500 font-medium">Popular searches:</span>
                        {['Computer Science', 'Business', 'Engineering', 'Medicine'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                            >
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
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]"
                                >
                                    <option value="">All Countries</option>
                                    {countries.map(country => (
                                        <option key={country.code || country.name} value={country.name || country.code}>
                                            {country.name || country.code}
                                        </option>
                                    ))}
                                </select>
                            </FilterSection>

                            <FilterSection title="Tuition Range (USD/year)">
                                <div className="flex gap-4">
                                    <input
                                        type="number"
                                        value={minTuition}
                                        onChange={(e) => setMinTuition(e.target.value)}
                                        placeholder="Min"
                                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                    <input
                                        type="number"
                                        value={maxTuition}
                                        onChange={(e) => setMaxTuition(e.target.value)}
                                        placeholder="Max"
                                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                            </FilterSection>

                            <FilterSection title="University Ranking">
                                <select
                                    value={maxRanking}
                                    onChange={(e) => setMaxRanking(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4353FF]"
                                >
                                    <option value="">All Rankings</option>
                                    <option value="50">Top 50</option>
                                    <option value="100">Top 100</option>
                                    <option value="200">Top 200</option>
                                    <option value="500">Top 500</option>
                                </select>
                            </FilterSection>

                            <div className="mt-8 space-y-3">
                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full py-3 bg-[#1A1B4B] text-white rounded-xl font-semibold hover:bg-[#3E3B92] transition-colors"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={handleResetFilters}
                                    className="w-full py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
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
                                <p className="text-sm text-gray-500">
                                    {loading ? 'Loading...' : `${pagination.total} universities found`}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">Sort by:</span>
                                    <select
                                        onChange={handleSortChange}
                                        className="border-none bg-transparent font-semibold text-[#1A1B4B] focus:outline-none cursor-pointer"
                                    >
                                        <option value="ranking_asc">Rank: Best First</option>
                                        <option value="ranking_desc">Rank: Low First</option>
                                        <option value="tuition_asc">Tuition: Low to High</option>
                                        <option value="tuition_desc">Tuition: High to Low</option>
                                        <option value="name_asc">Name: A-Z</option>
                                    </select>
                                </div>

                                <div className="h-6 w-px bg-gray-200"></div>

                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button className="p-2 bg-white text-[#4353FF] rounded shadow-sm"><Grid size={18} /></button>
                                    <button className="p-2 text-gray-500 hover:text-gray-700"><List size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="animate-spin text-[#4353FF] mb-4" size={40} />
                                <p className="text-gray-500">Loading universities...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="flex flex-col items-center justify-center py-20 text-red-500">
                                <AlertCircle size={40} className="mb-4" />
                                <p>{error}</p>
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev }))}
                                    className="mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && universities.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Search size={48} className="text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        )}

                        {/* Grid */}
                        {!loading && !error && universities.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {universities.map((uni) => (
                                        <motion.div
                                            key={uni.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                        >
                                            {/* Card Image */}
                                            <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                                                {uni.image ? (
                                                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-6xl font-bold text-white/30">{uni.name?.charAt(0)}</span>
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4 flex gap-2">
                                                    {uni.ranking && (
                                                        <span className="bg-[#10B981] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            #{uni.ranking}
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
                                                    <div>
                                                        <h3 className="font-bold text-[#1A1B4B] line-clamp-2 group-hover:text-[#4353FF] transition-colors" title={uni.name}>
                                                            {uni.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                            <MapPin size={14} className="text-gray-400" />
                                                            <span>{uni.city}, {uni.country}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mb-4">
                                                    <img
                                                        src={getFlag(uni.country)}
                                                        alt={uni.country}
                                                        className="w-5 h-3.5 rounded-sm shadow-sm"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                    <span className="text-sm font-medium text-gray-600">{uni.country}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">💲 Tuition/year</p>
                                                        <p className="font-bold text-[#1A1B4B]">
                                                            ${uni.tuition_fee?.toLocaleString() || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                            <Users size={12} /> Acceptance
                                                        </p>
                                                        <p className="font-bold text-[#1A1B4B]">
                                                            {uni.acceptance_rate ? `${uni.acceptance_rate}%` : 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {uni.fields && uni.fields.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {uni.fields.slice(0, 2).map(field => (
                                                            <span key={field} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">
                                                                {field}
                                                            </span>
                                                        ))}
                                                        {uni.fields.length > 2 && (
                                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-lg">
                                                                +{uni.fields.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <Link
                                                    to={`/university/${uni.id}`}
                                                    className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-[#4353FF] hover:text-[#4353FF] transition-all flex items-center justify-center gap-2 group/btn"
                                                >
                                                    View Details
                                                    <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="flex justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                                            disabled={pagination.page === 1}
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 text-gray-600">
                                            Page {pagination.page} of {pagination.pages}
                                        </span>
                                        <button
                                            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                                            disabled={pagination.page === pagination.pages}
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
