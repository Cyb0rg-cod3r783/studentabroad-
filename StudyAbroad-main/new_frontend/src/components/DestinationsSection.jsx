import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Users, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { universityService } from '../services/api';

// Default destinations with HIGH QUALITY, SPECIFIC images
const defaultDestinations = [
    {
        country: "United States",
        image: "https://images.unsplash.com/photo-1485871981535-5be48f35363e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // NYC Skyline
        description: "Home to world-renowned institutions and cutting-edge research facilities",
        universities: "50+",
        students: "15,000+"
    },
    {
        country: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // London Big Ben
        description: "Rich academic heritage with prestigious universities and diverse programs",
        universities: "30+",
        students: "12,000+"
    },
    {
        country: "Canada",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Banff/Lake
        description: "Welcoming environment with excellent education and immigration opportunities",
        universities: "25+",
        students: "10,000+"
    },
    {
        country: "Australia",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Sydney Opera House
        description: "High quality education with diverse culture and beautiful landscapes",
        universities: "20+",
        students: "8,000+"
    },
    {
        country: "Germany",
        image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Berlin Brandenburg Gate
        description: "Affordable education with strong engineering and research programs",
        universities: "15+",
        students: "5,000+"
    },
    {
        country: "France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Eiffel Tower
        description: "Art, culture, and world-class business schools",
        universities: "10+",
        students: "4,000+"
    }
];

// Country image mapping with specific landmarks
const countryImages = {
    "United States": "https://images.unsplash.com/photo-1485871981535-5be48f35363e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "United Kingdom": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Australia": "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Germany": "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Netherlands": "https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Amsterdam Canals
    "France": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Ireland": "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "New Zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Austria": "https://images.unsplash.com/photo-1516550893885-bfb925b64c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Hallstatt/Vienna
    "Argentina": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Buenos Aires
    "Switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "Japan": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "China": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
};

const countryDescriptions = {
    "United States": "Home to world-renowned institutions and cutting-edge research facilities",
    "United Kingdom": "Rich academic heritage with prestigious universities and diverse programs",
    "Canada": "Welcoming environment with excellent education and immigration opportunities",
    "Australia": "High quality education with diverse culture and beautiful landscapes",
    "Germany": "Affordable education with strong engineering and research programs",
    "Netherlands": "Innovative education system with programs taught in English",
    "France": "Art, culture, and world-class business schools",
    "Ireland": "Friendly atmosphere with growing tech industry connections",
    "New Zealand": "Stunning scenery with quality education and work opportunities",
    "Singapore": "Asia's education hub with world-class universities",
    "Austria": "Historic universities with high quality of life and culture",
    "Argentina": "Vibrant student life with affordable top-tier education",
    "Switzerland": "Excellence in hospitality and science amidst the Alps",
    "Japan": "Blend of tradition and technology with high academic standards",
    "China": "Rapidly growing top universities and scholarship opportunities"
};

const DestinationsSection = () => {
    const scrollContainerRef = useRef(null);
    const [destinations, setDestinations] = useState(defaultDestinations);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                // Fetch countries from backend
                const response = await universityService.getCountries();
                if (response.success && response.data && response.data.length > 0) {
                    // Map backend data to destination format
                    const apiDestinations = response.data.slice(0, 10).map(country => ({
                        country: country.name || country.code,
                        image: countryImages[country.name || country.code] ||
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                        description: countryDescriptions[country.name || country.code] ||
                            "Explore top universities in this destination",
                        universities: country.university_count ? `${country.university_count}+` : "20+",
                        students: "5,000+"
                    }));
                    setDestinations(apiDestinations);
                }
            } catch (error) {
                console.error('Failed to fetch countries:', error);
                // Keep default destinations on error
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-2">
                            Popular Study Destinations
                        </h2>
                        <p className="text-gray-600">
                            Explore top countries for international education
                        </p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#4353FF] hover:text-white hover:border-[#4353FF] transition-all bg-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#4353FF] hover:text-white hover:border-[#4353FF] transition-all bg-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#4353FF]" size={40} />
                    </div>
                ) : (
                    /* Cards container */
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                                }}
                                transition={{ duration: 0.4 }}
                                className="min-w-[320px] md:min-w-[380px] h-full flex-none bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 snap-center flex flex-col group cursor-pointer"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.country}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <h3 className="absolute bottom-4 left-6 text-3xl font-bold text-white tracking-wide">
                                        {dest.country}
                                    </h3>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 mb-6 h-12 line-clamp-2">
                                        {dest.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                            <GraduationCap size={16} className="text-[#4353FF]" />
                                            <span className="font-semibold">{dest.universities} Unis</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                            <Users size={16} className="text-[#10B981]" />
                                            <span className="font-semibold">{dest.students} Students</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/search?country=${encodeURIComponent(dest.country)}`}
                                        className="w-full py-3.5 rounded-xl border-2 border-[#1A1B4B] text-[#1A1B4B] font-bold hover:bg-[#1A1B4B] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    >
                                        Explore Universities
                                        <ArrowRight size={18} className="transform transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {destinations.slice(0, 5).map((_, i) => (
                        <div key={i} className={`${i === 0 ? 'w-8 bg-[#1A1B4B]' : 'w-2 bg-gray-300'} h-2 rounded-full`}></div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DestinationsSection;
