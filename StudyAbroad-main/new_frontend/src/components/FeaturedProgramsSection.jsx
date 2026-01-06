import React, { useState, useEffect } from 'react';
import { Code, Briefcase, Settings, Heart, BarChart, Palette, ArrowRight, GraduationCap, MapPin, DollarSign, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { universityService } from '../services/api';

// Default programs data (display fields of study as cards)
const defaultPrograms = [
    {
        title: "Computer Science & AI",
        description: "Cutting-edge programs in artificial intelligence, machine learning, and software engineering",
        icon: Code,
        color: "text-blue-600 bg-blue-100",
        buttonColor: "text-blue-600 border-blue-200 hover:bg-blue-50",
        field: "Computer Science"
    },
    {
        title: "Business Administration",
        description: "MBA and business programs from top-ranked international business schools",
        icon: Briefcase,
        color: "text-purple-600 bg-purple-100",
        buttonColor: "text-purple-600 border-purple-200 hover:bg-purple-50",
        field: "Business"
    },
    {
        title: "Engineering",
        description: "Mechanical, electrical, civil, and aerospace engineering programs worldwide",
        icon: Settings,
        color: "text-teal-600 bg-teal-100",
        buttonColor: "text-teal-600 border-teal-200 hover:bg-teal-50",
        field: "Engineering"
    },
    {
        title: "Medicine & Healthcare",
        description: "Medical degrees, nursing, and healthcare management programs",
        icon: Heart,
        color: "text-rose-600 bg-rose-100",
        buttonColor: "text-rose-600 border-rose-200 hover:bg-rose-50",
        field: "Medicine"
    },
    {
        title: "Data Science",
        description: "Analytics, big data, and business intelligence programs",
        icon: BarChart,
        color: "text-amber-600 bg-amber-100",
        buttonColor: "text-amber-600 border-amber-200 hover:bg-amber-50",
        field: "Data Science"
    },
    {
        title: "Arts & Design",
        description: "Fine arts, graphic design, and creative media programs",
        icon: Palette,
        color: "text-pink-600 bg-pink-100",
        buttonColor: "text-pink-600 border-pink-200 hover:bg-pink-50",
        field: "Arts"
    }
];

const FeaturedProgramsSection = () => {
    const [topUniversities, setTopUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopUniversities = async () => {
            try {
                const response = await universityService.getTopUniversities(6);
                if (response.success && response.data && response.data.universities) {
                    setTopUniversities(response.data.universities);
                }
            } catch (error) {
                console.error('Failed to fetch top universities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopUniversities();
    }, []);

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">
                        Top Ranked Universities
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore the highest-ranked universities in our database
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#4353FF]" size={40} />
                    </div>
                ) : topUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topUniversities.map((uni, index) => (
                            <motion.div
                                key={uni.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                                        <GraduationCap size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 font-medium">#{uni.ranking || index + 1} World Ranking</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#1A1B4B] mb-2 line-clamp-1">
                                    {uni.name}
                                </h3>
                                <p className="text-gray-500 mb-4 flex items-center gap-1 text-sm">
                                    <MapPin size={14} />
                                    {uni.city}, {uni.country}
                                </p>

                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8 text-sm">
                                    <div className="text-gray-500">Tuition</div>
                                    <div className="text-[#1A1B4B] font-semibold text-right">
                                        ${uni.tuition_fee?.toLocaleString() || 'N/A'}/yr
                                    </div>

                                    <div className="text-gray-500">Acceptance</div>
                                    <div className="text-[#1A1B4B] font-semibold text-right">
                                        {uni.acceptance_rate ? `${uni.acceptance_rate}%` : 'N/A'}
                                    </div>

                                    <div className="text-gray-500">Type</div>
                                    <div className="text-[#1A1B4B] font-semibold text-right">
                                        {uni.type || 'University'}
                                    </div>
                                </div>

                                <Link
                                    to={`/university/${uni.id}`}
                                    className="w-full py-3 rounded-lg border border-blue-200 text-blue-600 font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-50"
                                >
                                    View Details
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Fallback to Programs if no universities */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {defaultPrograms.map((program, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${program.color} group-hover:scale-110 transition-transform`}>
                                    <program.icon size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-[#1A1B4B] mb-3">
                                    {program.title}
                                </h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    {program.description}
                                </p>

                                <Link
                                    to={`/search?field=${encodeURIComponent(program.field)}`}
                                    className={`w-full py-3 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${program.buttonColor}`}
                                >
                                    View Programs
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/search"
                        className="inline-flex items-center gap-2 bg-[#1A1B4B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
                    >
                        Browse All Universities
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProgramsSection;
